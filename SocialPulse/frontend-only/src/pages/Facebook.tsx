import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MetricCard, BarChart } from './Analytics';

const Facebook = ({ Timerange }) => {

  const analyticsData = {
    pageViews: {
      trend: 'up',
      dailyViews: [
        1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27,
        30, 33, 36, 38, 41, 43, 46, 48, 52, 54, 59, 61, 72, 81, 88, 94
      ]
    },
    engagement: {
      7: { likes: 15, comments: 5, shares: 3 },
      30: { likes: 48, comments: 10, shares: 8 },
      90: { likes: 75, comments: 22, shares: 17 },
      default: { likes: 152, comments: 69, shares: 34 }
    },
    likesData: [
      2, 3, 5, 7, 10, 12, 14, 16, 18, 20, 22, 23, 25, 26,
      28, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 40.5, 41, 42, 43, 44
    ],
    audience: {
      7: {
        total: 38,
        demographics: { male: 24, female: 14 },
        ageGroups: { '18-24': 24 }
      },
      30: {
        total: 105,
        demographics: { male: 75, female: 30 },
        ageGroups: { '18-24': 48 }
      },
      90: {
        total: 420,
        demographics: { male: 348, female: 72 },
        ageGroups: { '18-24': 57 }
      },
      default: {
        total: 1058,
        demographics: { male: 852, female: 206 },
        ageGroups: { '18-24': 247 }
      }
    },
    topPosts: [
      { id: 1, title: 'Summer Sale Announcement', reach: 15432, engagement: 23.4 },
      { id: 2, title: 'New Product Launch', reach: 14321, engagement: 19.8 },
      { id: 3, title: 'Customer Story', reach: 13210, engagement: 18.2 },
    ],
  };

  const mapY = (value, maxVal, chartHeight = 160, yBase = 200) => {
    return yBase - (value / maxVal) * chartHeight;
  };
  // Helper function to generate line chart points
  const generateLinePoints = (data) => {
    const maxValue = Math.max(...data);
    const step = 250 / maxValue;
    const points = data.map((value, index) => {
      const x = 30 + (index * 30);
      const y = 200 - (value * step);
      return `${x},${y}`;
    });
    return points.join(' ');
  };


  const { facebooktoken, analyticsDatas, setAnalyticsDatas } = useAuth();


  const fetchAnalytics = async () => {
    await axios.get(`http://localhost:3000/analytics/facebook?access_token=${facebooktoken}`
    )
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.user.name);
        // localStorage.setItem("facebookanalytic",JSON.stringify(res.data));
        setAnalyticsDatas(res.data);
      })
      .catch((err) => {
        console.error("Analytics Fetch Error:", err);
      });
  };
  // console.log(analyticsDatas?.user.name)
  useEffect(() => {
    if (facebooktoken) {
      fetchAnalytics();
    }
  }, [facebooktoken, Timerange]);



  return (
    <>
      {facebooktoken ? (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 dark:bg-gray-900">
          {/* Header */}

          <div className="flex bg-white rounded-xl shadow p-6 w-full mb-10 dark:bg-gray-800">
            {/* Left - Profile Info */}
            <div className="w-[32%] flex flex-col items-center justify-center">
              {analyticsDatas && (
                <img
                  src={analyticsDatas.user.picture.data.url}
                  alt="Instagram Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
              )}
              {analyticsDatas && <h2 className="mt-4 text-xl font-semibold text-gray-800">{analyticsDatas.user.name}</h2>}
            </div>

            {/* Right - Instagram Branding */}
            <div className="w-[68%] pl-8 flex flex-col justify-between">
              <div className="flex items-center gap-3">

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold text-blue-600">Facebook Insights</h2>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Monitor your page's performance including engagement, reach, and audience.
              </p>

              <div className='mt-6'>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  View Page on Facebook
                </a>
              </div>

            </div>
          </div>



          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Page Views Card */}
            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-200 text-sm font-medium">Page Views</h3>
                  <p className="text-3xl font-bold mt-1">
                    {Timerange === 7 ? 24 : Timerange === 30 ? 94 : Timerange === 90 ? 137 : 459}
                  </p>            </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${analyticsData.pageViews.trend === 'up'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {analyticsData.pageViews.trend === 'up' ? '↑' : '↓'}  {Timerange === 7 ? 1.2 : Timerange === 30 ? 2.2 : Timerange === 90 ? 3.5 : 9.7}%
                </span>
              </div>
              <div className="mt-4 h-2 bg-gray-500 dark:text-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      (Timerange === 7
                        ? 1.2
                        : Timerange === 30
                          ? 2.2
                          : Timerange === 90
                            ? 3.5
                            : 9.7) * 5,
                      100
                    )
                      }%`
                  }}

                ></div>
              </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-700">
              <h3 className="text-gray-500 dark:text-gray-200 text-sm font-medium">Engagement</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {(() => {
                  const data =
                    Timerange === 7
                      ? analyticsData.engagement[7]
                      : Timerange === 30
                        ? analyticsData.engagement[30]
                        : Timerange === 90
                          ? analyticsData.engagement[90]
                          : analyticsData.engagement.default;

                  return (
                    <>
                      <div className="text-center">
                        <p className="text-xl font-bold text-blue-600">{data.likes.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs mt-1 dark:text-gray-200">Likes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-green-600">{data.comments.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs mt-1 dark:text-gray-200">Comments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-purple-600">{data.shares.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs mt-1 dark:text-gray-200">Shares</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Audience Card */}
            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-700">
              <h3 className="text-gray-500 dark:text-gray-200 text-sm font-medium">Audience</h3>
              {(() => {
                const data =
                  Timerange === 7
                    ? analyticsData.audience[7]
                    : Timerange === 30
                      ? analyticsData.audience[30]
                      : Timerange === 90
                        ? analyticsData.audience[90]
                        : analyticsData.audience.default;

                return (
                  <>
                    <p className="text-3xl font-bold mt-1">{data.total.toLocaleString()}</p>
                    <div className="flex mt-4">
                      <div className="w-1/2 pr-2">
                        <h4 className="text-gray-500 dark:text-gray-200 text-xs font-medium mb-1">Gender</h4>
                        <div className="flex items-center">
                          <div className="w-1/2">
                            <div className="h-2 bg-blue-500 rounded-full mb-1"></div>
                            <p className="text-xs text-gray-600 dark:text-gray-200">Male {data.demographics.male}%</p>
                          </div>
                          <div className="w-1/2 pl-2">
                            <div className="h-2 bg-pink-500 rounded-full mb-1"></div>
                            <p className="text-xs text-gray-600 dark:text-gray-200">Female {data.demographics.female}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 pl-2">
                        <h4 className="text-gray-500 text-xs font-medium mb-1 dark:text-gray-200">Top Age</h4>
                        <p className="text-sm font-medium">18-24 ({data.ageGroups['18-24']}%)</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Page Views Chart */}
            <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow p-6">
              <h3 className="text-gray-800 font-medium mb-4 dark:text-gray-200">Page Views Over Time</h3>
              <div className="h-64">
                <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                  {/* Axes */}
                  <line x1="30" y1="200" x2="370" y2="200" stroke="#D1D5DB" strokeWidth="1" />
                  <line x1="30" y1="30" x2="30" y2="200" stroke="#D1D5DB" strokeWidth="1" />

                  {/* Y-axis labels and grid lines */}
                  {[0, 30, 60, 94].map((val, i) => {
                    const y = mapY(val, 94);
                    return (
                      <g key={i}>
                        <text x="20" y={y + 4} textAnchor="end" fontSize="10" fill="#6B7280">{val}</text>
                        <line x1="30" y1={y} x2="370" y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                      </g>
                    );
                  })}

                  {/* Data Line */}
                  <polyline
                    points={analyticsData.pageViews.dailyViews.map((val, i) => `${30 + i * 11},${mapY(val, 94)}`).join(" ")}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Data Points */}
                  {analyticsData.pageViews.dailyViews.map((val, i) => {
                    const x = 30 + i * 11;
                    const y = mapY(val, 94);
                    return <circle key={i} cx={x} cy={y} r="4" fill="#3B82F6" stroke="#FFF" strokeWidth="2" />;
                  })}

                  {/* X-axis labels */}
                  {analyticsData.pageViews.dailyViews.map((_, i) => (
                    i % 2 === 0 ? (
                      <text key={i} x={30 + i * 11} y="220" textAnchor="middle" fontSize="10" fill="#6B7280">
                        {i + 1}
                      </text>
                    ) : null
                  ))}
                </svg>
              </div>
            </div>

            {/* Likes Chart */}
            <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
              <h3 className="text-gray-800 font-medium mb-4 dark:text-gray-200">Total Likes Over Time</h3>
              <div className="h-64">
                <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                  {/* Axes */}
                  <line x1="30" y1="200" x2="370" y2="200" stroke="#D1D5DB" strokeWidth="1" />
                  <line x1="30" y1="30" x2="30" y2="200" stroke="#D1D5DB" strokeWidth="1" />

                  {/* Y-axis labels and grid lines */}
                  {[0, 12, 24, 36, 48].map((val, i) => {
                    const y = mapY(val, 48);
                    return (
                      <g key={i}>
                        <text x="20" y={y + 4} textAnchor="end" fontSize="10" fill="#6B7280">{val}</text>
                        <line x1="30" y1={y} x2="370" y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                      </g>
                    );
                  })}

                  {/* Data Line */}
                  <polyline
                    points={analyticsData.likesData.map((val, i) => `${30 + i * 11},${mapY(val, 48)}`).join(" ")}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  />

                  {/* Data Points */}
                  {analyticsData.likesData.map((val, i) => {
                    const x = 30 + i * 11;
                    const y = mapY(val, 48);
                    return <circle key={i} cx={x} cy={y} r="4" fill="#10B981" stroke="#FFF" strokeWidth="2" />;
                  })}

                  {/* X-axis labels */}
                  {analyticsData.likesData.map((_, i) => (
                    i % 2 === 0 ? (
                      <text key={i} x={30 + i * 11} y="220" textAnchor="middle" fontSize="10" fill="#6B7280">
                        {i + 1}
                      </text>
                    ) : null
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Top Posts Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8 dark:bg-gray-800">
            <div className="px-6 py-4 border-b border-gray-200 ">
              <h3 className=" font-medium ">Top Posts</h3>
            </div>
            <div className="overflow-x-auto  dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50  dark:bg-gray-800 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200  dark:bg-gray-800 dark:text-gray-200">
                  {analyticsData.topPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium ">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm ">{post.reach.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm ">{post.engagement}%</div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div >
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50 px-4  dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-blue-800 mb-4">
              Welcome to Social Dashboard
            </h1>
            <p className="text-blue-500 mb-6">
              Please log in with your Google account to access your social media analytics.
            </p>
            <a href="http://localhost:3000/auth/facebook">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Login with Facebook
              </button>
            </a>
          </div>
        </div>

      )}
    </>
  );
};
export default Facebook
