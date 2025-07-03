import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MetricCard, BarChart } from './Analytics';

const Youtube = ({ Timerange }) => {
  const { googletoken, analyticsData, setAnalyticsData, googlerefrestoken } = useAuth();

  const fetchAnalytics = () => {
    axios.get('http://localhost:3000/analytics/youtube', {
      headers: {
        googletoken,
        googlerefrestoken,
      },
    })
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem("youtubeanalytic", JSON.stringify(res.data));
        setAnalyticsData(res.data);
      })
      .catch((err) => {
        console.error("Analytics Fetch Error:", err);
      });
  };

  useEffect(() => {
    if (googletoken && !analyticsData) {
      fetchAnalytics();
      console.log(analyticsData);
    }
  }, [googletoken, Timerange]);

  const getMetricValue = (metricName) => {
    if (!analyticsData?.analytics?.rows?.length) return 0;
    const index = analyticsData.analytics.columnHeaders.findIndex(
      (header) => header.name === metricName
    );
    if (index === -1) return 0;

    return analyticsData.analytics.rows.reduce((sum, row) => {
      return sum + (parseInt(row[index]) || 0);
    }, 0);
  };

  const audienceGrowth = getMetricValue('subscribersGained') - getMetricValue('subscribersLost');
  const engagementRate = getMetricValue('likes') + getMetricValue('comments');
  const reachPercent = Math.min(Math.floor((getMetricValue('views') / 10000) * 100), 100);

  const transformChartData = () => {
    if (!analyticsData?.analytics?.rows?.length) return [];

    const headers = analyticsData.analytics.columnHeaders.map((h) => h.name);

    const recentRows = analyticsData.analytics.rows.slice(-Timerange);

    return recentRows.map((row) => {
      const entry = {};
      headers.forEach((name, index) => {
        entry[name] = isNaN(row[index]) ? row[index] : parseInt(row[index]);
      });
      return entry;
    });
  };



  const chartData = transformChartData();

  return (
    <>
      {googletoken ? (
        <div className="space-y-6 pt-9  dark:bg-gray-900">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard title="Subscribers" value={analyticsData?.channelStats?.totalSubscribers} />
            <MetricCard title="Videos" value={analyticsData?.channelStats?.totalVideos} />
            <MetricCard title="Views" value={analyticsData?.channelStats?.totalViews} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart data={chartData} dataKey="views" title="Views Over Time" xKey="day" color="#3b82f6" />
            <BarChart data={chartData} dataKey="likes" title="Likes Over Time" xKey="day" color="#10b981" />
            <BarChart data={chartData} dataKey="comments" title="Comments Over Time" xKey="day" color="#f97316" />
            <BarChart data={chartData} dataKey="estimatedMinutesWatched" title="Watch Time (Minutes)" xKey="day" color="#6366f1" />
            <BarChart data={chartData} dataKey="averageViewDuration" title="Avg View Duration" xKey="day" color="#eab308" />
            <BarChart data={chartData} dataKey="subscribersGained" title="Subscribers Gained" xKey="day" color="#22c55e" />
            <BarChart data={chartData} dataKey="subscribersLost" title="Subscribers Lost" xKey="day" color="#ef4444" />
          </div>

          {/* Additional Stats */}
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <StatBar label="Audience Growth" percent={Math.min(audienceGrowth, 100)} color="green" />
              <StatBar label="Engagement Rate" percent={Math.min(engagementRate / 100, 100)} color="blue" />
              <StatBar label="Reach vs. Target" percent={reachPercent} color="purple" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50 px-4  dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-red-800 mb-4">
              Welcome to Social Dashboard
            </h1>
            <p className="text-red-500 mb-6">
              Please log in with your Google account to access your social media analytics.
            </p>
            <a href="http://localhost:3000/auth/google">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Login with Google
              </button>
            </a>
          </div>
        </div>

      )}
    </>
  );
};

// Component for stat bars like Audience Growth
const StatBar = ({ label, percent, color }) => {
  const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className={`${colorMap[color]} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default Youtube;
