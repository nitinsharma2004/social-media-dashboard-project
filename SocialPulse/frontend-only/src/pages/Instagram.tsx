import { useAuth } from '../context/AuthContext';

const Instagram = ({ Timerange }) => {

  const analyticsData = {
    7: {
      followers: 2,
      likes: 0,
      comments: 0,
      reach: 4,
      stories: 0,
    },
    30: {
      followers: 4,
      likes: 0,
      comments: 0,
      reach: 8,
      stories: 0,
    },
    90: {
      followers: 15,
      likes: 0,
      comments: 0,
      reach: 53,
      stories: 0,
    },
    365: {
      followers: 48,
      likes: 0,
      comments: 0,
      reach: 159,
      stories: 0,
    },
  };
  const currentData = analyticsData[Timerange];
  const { facebooktoken, analyticsDatas, setAnalyticsData } = useAuth();

  return (
    <>
      {facebooktoken ? (

        <div className="p-6 bg-gray-100 min-h-screen font-sans  dark:bg-gray-900">
          <div className="flex bg-white rounded-xl shadow p-6 w-full mb-10  dark:bg-gray-800 ">
            {/* Left - Profile Info */}
            <div className="w-[32%] flex flex-col items-center justify-center ">
              {analyticsDatas && (
                <img
                  src={analyticsDatas.user.picture.data.url}
                  alt="Instagram Profile"
                  className="w-24 h-24 rounded-full border-4 border-pink-500"
                />
              )}
              {analyticsDatas && <h2 className="mt-4 text-xl font-semibold text-gray-800">{analyticsDatas.user.name}</h2>}
            </div>

            {/* Right - Instagram Branding */}
            <div className="w-[68%] pl-8 flex flex-col justify-between">
              <div className="flex items-center gap-3">

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  alt="Instagram Logo"
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold text-pink-600">Instagram Insights</h2>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Your Instagram activity summary, reach, engagement, and story performance at a glance.
              </p>


              <div className='mt-6'>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  View Page on Instagram
                </a>
              </div>
            </div>
          </div>



          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Followers */}
            <div className="bg-white p-6 rounded-xl shadow text-center dark:bg-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">Followers</h4>
              <p className="text-3xl font-bold text-pink-600">{currentData.followers.toLocaleString()}</p>
            </div>

            {/* Likes */}
            <div className="bg-white p-6 rounded-xl shadow text-center dark:bg-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">Likes</h4>
              <p className="text-3xl font-bold text-pink-600">{currentData.likes.toLocaleString()}</p>
            </div>

            {/* Comments */}
            <div className="bg-white p-6 rounded-xl shadow text-center dark:bg-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">Comments</h4>
              <p className="text-3xl font-bold text-pink-600">{currentData.comments.toLocaleString()}</p>
            </div>

            {/* Reach */}
            <div className="bg-white p-6 rounded-xl shadow text-center dark:bg-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">Reach</h4>
              <p className="text-3xl font-bold text-pink-600">{currentData.reach.toLocaleString()}</p>
            </div>

            {/* Stories Posted */}
            <div className="bg-white p-6 rounded-xl shadow text-center dark:bg-gray-800">
              <h4 className="text-sm text-gray-500 mb-2">Stories Posted</h4>
              <p className="text-3xl font-bold text-pink-600">{currentData.stories}</p>
            </div>
          </div>
        </div>

      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-50 px-4  dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-pink-800 mb-4">
              Welcome to Social Dashboard
            </h1>
            <p className="text-pink-500 mb-6">
              Please log in with your Google account to access your social media analytics.
            </p>
            <a href="http://localhost:3000/auth/facebook">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Login with Instagram
              </button>
            </a>
          </div>
        </div>

      )}
    </>
  );
};
export default Instagram;
