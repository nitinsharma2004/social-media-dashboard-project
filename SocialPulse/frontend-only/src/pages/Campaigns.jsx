import React, { useState } from 'react';

const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale",
    status: "Running",
    reach: "12.3k",
    clicks: "1.2k",
    likes: "980",
    createdAt: "2025-06-01",
  },
  {
    id: 2,
    name: "New Feature Launch",
    status: "Completed",
    reach: "18.7k",
    clicks: "2.5k",
    likes: "1.8k",
    createdAt: "2025-05-10",
  },
  {
    id: 3,
    name: "Diwali Discounts",
    status: "Paused",
    reach: "5.1k",
    clicks: "640",
    likes: "512",
    createdAt: "2025-06-10",
  },
  {
    id: 4,
    name: "Independence Day Offers",
    status: "Running",
    reach: "9.3k",
    clicks: "1.1k",
    likes: "790",
    createdAt: "2025-08-10",
  },
  {
    id: 5,
    name: "Back to School",
    status: "Completed",
    reach: "15.2k",
    clicks: "1.9k",
    likes: "1.5k",
    createdAt: "2025-04-05",
  },
  {
    id: 6,
    name: "Flash Friday",
    status: "Running",
    reach: "10.4k",
    clicks: "1.6k",
    likes: "1.2k",
    createdAt: "2025-06-14",
  },
  {
    id: 7,
    name: "Winter Warmers",
    status: "Paused",
    reach: "7.5k",
    clicks: "850",
    likes: "678",
    createdAt: "2025-01-12",
  },
  {
    id: 8,
    name: "Fitness Challenge",
    status: "Completed",
    reach: "20.3k",
    clicks: "3.1k",
    likes: "2.4k",
    createdAt: "2025-03-20",
  },
  {
    id: 9,
    name: "Referral Rewards",
    status: "Running",
    reach: "6.9k",
    clicks: "920",
    likes: "760",
    createdAt: "2025-06-15",
  },
  {
    id: 10,
    name: "Mega Tech Expo",
    status: "Paused",
    reach: "11.1k",
    clicks: "1.3k",
    likes: "1.1k",
    createdAt: "2025-02-28",
  },
];


const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const toggleStatus = (id) => {
    setCampaigns(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Running" ? "Paused" : "Running",
            }
          : c
      )
    );
  };

  return (
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Your Campaigns</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-gray-50 border p-4 rounded-xl shadow hover:shadow-md transition dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold ">{campaign.name}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    campaign.status === "Running"
                      ? "bg-green-100 text-green-700"
                      : campaign.status === "Paused"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              <p className="text-sm  mb-2">Created on: {campaign.createdAt}</p>

              <div className="grid grid-cols-3 gap-4 text-center text-sm  mb-4">
                <div>
                  <p className="font-medium">{campaign.reach}</p>
                  <p>Reach</p>
                </div>
                <div>
                  <p className="font-medium">{campaign.clicks}</p>
                  <p>Clicks</p>
                </div>
                <div>
                  <p className="font-medium">{campaign.likes}</p>
                  <p>Likes</p>
                </div>
              </div>

              {campaign.status !== "Completed" && (
                <button
                  onClick={() => toggleStatus(campaign.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
                >
                  {campaign.status === "Running" ? "Pause" : "Resume"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Campaigns;
