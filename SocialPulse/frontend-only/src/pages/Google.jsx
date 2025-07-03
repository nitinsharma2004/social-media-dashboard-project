// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const Google = () => {
//   const { googletoken, googleusername, setGoogletoken, setGoogleusername } = useAuth();
//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/analytics/youtube', {
//           headers: {
//             Authorization: `Bearer ${googletoken}`
//           }
//         });
//         setAnalytics(res.data);
//       } catch (err) {
//         console.error("Analytics Fetch Error:", err);
//       }
//     };

//     if (googletoken && !analytics) {
//       fetchAnalytics();
//     }
//   }, [googletoken]);

//   const handleLogout = () => {
//     localStorage.removeItem('googletoken');
//     localStorage.removeItem('googleusername');
//     setGoogletoken(null);
//     setGoogleusername(null);
//     setAnalytics(null);
//   };

//   return (
//     <div>
//       {!googletoken ? (
//         <a href="http://localhost:3000/auth/google">
//           <button>Login with Google</button>
//         </a>
//       ) : (
//         <>
//           <h1>Welcome, {googleusername}</h1>
//           <button onClick={handleLogout}>Logout</button>
//           {analytics ? (
//             <pre>{JSON.stringify(analytics, null, 2)}</pre>
//           ) : (
//             <p>Loading analytics...</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Google;
