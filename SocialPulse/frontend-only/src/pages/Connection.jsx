import React, { useState } from "react";

const Connection = () => {
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      status: "Following",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Rahul Verma",
      status: "Follow Back",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Sneha Kapoor",
      status: "Requested",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=5",
    },

    {
      id: 6,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
    {
      id: 7,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 8,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 9,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=9",
    },
    {
      id: 10,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=10",
    },
    {
      id: 11,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
      id: 12,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 13,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=13",
    },
    {
      id: 14,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=14",
    },
    {
      id: 15,
      name: "Michael Doe",
      status: "Follower",
      avatar: "https://i.pravatar.cc/100?img=15",
    },

  ]);

  const handleFollow = (id) => {
    setConnections(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: "Following" }
          : user
      )
    );
  };

  return (
    
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 dark:bg-gray-700">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 shadow-sm dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium ">{user.name}</p>
                  <p className="text-sm ">{user.status}</p>
                </div>
              </div>

              {/* Action button */}
              {user.status === "Follow Back" || user.status === "Follower" ? (
                <button
                  onClick={() => handleFollow(user.id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  Follow
                </button>
              ) : user.status === "Requested" ? (
                <button
                  disabled
                  className="px-4 py-1 bg-gray-300 text-gray-600 rounded-lg text-sm cursor-not-allowed"
                >
                  Requested
                </button>
              ) : (
                <span className="text-green-600 text-sm font-medium">Following</span>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Connection;
