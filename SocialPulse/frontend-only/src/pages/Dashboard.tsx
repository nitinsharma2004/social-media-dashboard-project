import React, { useState, useEffect } from 'react';
import { socialData } from '../utils/mockData';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const PlatformCard = ({ platform, stats, icon }: any) => {
  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
      </svg>
    );
  };

  return (
    <div className="stats-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full bg-${platform}-100 dark:bg-${platform}-900/30`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.count.toLocaleString()}</span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{stats.label}</span>
            </div>
          </div>
        </div>
        <div className={`flex items-center ${getGrowthColor(stats.growth)}`}>
          {getGrowthIcon(stats.growth)}
          <span className="ml-1 font-medium">{Math.abs(stats.growth)}%</span>
        </div>
      </div>
    </div>
  );
};

const ConnectionCard = ({ connection }: any) => {
  return (
    <div className="stats-card flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {connection.platform === 'instagram' ? (
          <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        ) : connection.platform === 'youtube' ? (
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium">{connection.platform.charAt(0).toUpperCase() + connection.platform.slice(1)}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">@{connection.username}</p>
        </div>
      </div>
      <div>
        {connection.connected ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Connected
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Not Connected
          </span>
        )}
      </div>
    </div>
  );
};


const SubscribersChart = ({ data }) => {
  const maxValue = Math.max(...data) || 1;

  return (
    <div className="h-40 flex items-end justify-between space-x-1">
      {data.map((value, index) => (
        <div
          key={index}
          className="w-full bg-red-500 dark:bg-red-600 rounded-t"
          style={{ height: `${(value / maxValue) * 100}%` }}
          title={`${format(new Date(2023, index), 'MMM')}: ${value.toLocaleString()} subscribers`}
        />
      ))}
    </div>
  );
};


const getMonthlySubscriberGrowth = (rows) => {
  const monthlyMap = {};

  rows.forEach(row => {
    const date = new Date(row[0]);
    const key = `${date.getFullYear()}-${date.getMonth()}`; // e.g. "2023-0" for Jan 2023
    const gained = row[7] || 0;
    const lost = row[8] || 0;

    if (!monthlyMap[key]) monthlyMap[key] = 0;
    monthlyMap[key] += gained - lost;
  });

  // Convert to array of 12 months (Jan to Dec 2023 or latest year)
  const monthlyData = Array(12).fill(0);
  Object.entries(monthlyMap).forEach(([key, value]) => {
    const [, month] = key.split('-');
    monthlyData[parseInt(month)] = value;
  });

  return monthlyData;
};



const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { analyticsData, setAnalyticsData, facebooktoken,analyticsDatas } = useAuth();

  const connections = [
  {
    id: 1,
    userId: 1,
    platform: 'instagram',
    username: 'social_dash_insta',
    connected: analyticsDatas?true:false
  },
  {
    id: 2,
    userId: 1,
    platform: 'youtube',
    username: 'SocialDashOfficial',
    connected: analyticsData?true:false
  },
  {
    id: 3,
    userId: 1,
    platform: 'facebook',
    username: 'SocialDashBusiness',
    connected: analyticsDatas?true:false
  }

  ]

  // Simulate loading delay
  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              const blob = new Blob([document.documentElement.outerHTML], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "report.html"; // file name to download
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Report
            </span>
          </button>
        </div>
      </div>

      {/* Platform Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlatformCard
          platform="instagram"
          stats={{
            count: facebooktoken ? socialData.instagram.followers : 0,
            label: 'followers',
            growth: facebooktoken ? socialData.instagram.growth : 0
          }}
          icon={
            <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07...z" />
            </svg>
          }
        />

        <PlatformCard
          platform="youtube"
          stats={{
            count: analyticsData?.channelStats?.totalSubscribers || 0,
            label: 'subscribers',
            growth: analyticsData ? socialData.youtube.growth : 0
          }}
          icon={
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136...z" />
            </svg>
          }
        />

        <PlatformCard
          platform="facebook"
          stats={{
            count: facebooktoken ? formatCount(socialData.facebook.followers) : 0,
            label: 'friends',
            growth: facebooktoken ? socialData.facebook.growth : 0
          }}
          icon={
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12...z" />
            </svg>
          }
        />
      </div>


      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">YouTube Subscriber Growth</h3>

            {analyticsData && analyticsData.analytics?.rows ? (
              <SubscribersChart
                data={getMonthlySubscriberGrowth(analyticsData.analytics.rows)}
              />
            ) : (
              <div className="text-red-500 text-sm font-medium">
                Login with Google first to view subscriber growth data.
              </div>
            )}

            <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index}>
                  {format(new Date(2023, index), 'MMM')}
                </span>
              ))}
            </div>
          </div>

          {/* Connected Platforms */}
          <div className="stats-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Connected Platforms</h3>
            </div>
            <div className="space-y-4">
              {connections.map(connection => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          </div>
        </div>
        {/* Right Column - Project Info and Actions */}
        <div className="space-y-6">

          {/* Project Summary */}
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-2">📊 Dashboard Overview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This social media analytics dashboard provides real-time insights across platforms like Instagram, YouTube, and Facebook.
              It tracks follower growth, engagement metrics, and content performance using data fetched from APIs.
            </p>
          </div>

          {/* Key Project Stats */}
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">📌 Project Highlights</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✅ Integrated with Google & Facebook APIs</li>
              <li>📈 Visualized follower/subscriber growth by month</li>
              <li>⚙️ Built using React, Context API, and Tailwind CSS</li>
              <li>🧠 Smart insights from dynamic chart components</li>
            </ul>
          </div>

          {/* Action Center */}
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">🚀 Action Center</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-left space-y-1">
                <span className="block font-medium text-primary">Connect Instagram</span>
                <span className="block text-xs text-gray-500">Sync latest data</span>
              </button>

              <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-left space-y-1">
                <span className="block font-medium text-primary">Check YouTube Stats</span>
                <span className="block text-xs text-gray-500">View subscriber trends</span>
              </button>

              <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-left space-y-1">
                <span className="block font-medium text-primary">Refresh Facebook</span>
                <span className="block text-xs text-gray-500">Get recent activity</span>
              </button>

              <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-left space-y-1">
                <span className="block font-medium text-primary">Generate Report</span>
                <span className="block text-xs text-gray-500">Export chart summary</span>
              </button>
            </div>
          </div>
        </div>

      </div >
    </div >

  );
};

export default Dashboard;