import React, { useState } from 'react';
import Youtube from './Youtube';
import Facebook from './Facebook.tsx';
import Instagram from './Instagram.tsx';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const platforms = [
  { id: 'instagram', name: 'Instagram', color: 'pink' },
  { id: 'youtube', name: 'YouTube', color: 'red' },
  { id: 'facebook', name: 'Facebook', color: 'blue' }
];

const timeRanges = [
  { id: 7, name: 'Last 7 days' },
  { id: 30, name: 'Last 30 days' },
  { id: 90, name: 'Last 3 months' },
  { id: 365, name: 'Last 12 months' }
];

export const MetricCard = ({ title, value }: any) => (
  <div className="stats-card">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold">{value}</p>
      
    </div>
  </div>
);

export const BarChart = ({ data, dataKey, xKey, title, color }) => (
  <div className="bg-white p-4 rounded shadow dark:bg-gray-800">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <ReBarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis
          tickFormatter={(value) => {
            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
            if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
            return value;
          }}
          domain={[0, "dataMax + dataMax * 0.1"]} 
        />
        <Tooltip
          formatter={(value) => new Intl.NumberFormat().format(Number(value))}
        />
        <Bar dataKey={dataKey} fill={color || "#3b82f6"} />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
);

const Analytics: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [selectedTimeRange, setSelectedTimeRange] = useState<Number>(30);

  function renderMessage(platform: string,selectedTimeRange:Number) {
    if (platform === "youtube") {
      return <Youtube Timerange ={selectedTimeRange}/>;
    } else if (platform === "facebook") {
      return <Facebook Timerange={selectedTimeRange} />;
    } else {
      return <Instagram Timerange={selectedTimeRange} />;
    }
  }

  return (
    <>
    <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold">Analytics</h1>
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

       <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Platform
          </label>
          <select 
            className="input-field"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Range
          </label>
          <select 
            className="input-field"
            value={selectedTimeRange.toString()}
            onChange={(e) => setSelectedTimeRange( parseInt(e.target.value))}
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {renderMessage(selectedPlatform,selectedTimeRange)}
    </>
  );
};

export default Analytics;