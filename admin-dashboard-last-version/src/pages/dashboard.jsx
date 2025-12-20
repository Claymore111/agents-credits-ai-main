import React from "react";
import { Users, User, ClockFading, Ban } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const STATUS_COLORS = {
  Approved: "#10B981",
  "Needs Manual Review": "#FFA500",
  Rejected: "#EF4444",
  Pending: "#0000FF",
};

const productCategories1 = [
  { name: "Smartphones", value: 387, amount: 2850000, fill: "#6366F1" },
  { name: "TVs & Audio", value: 298, amount: 4200000, fill: "#8B5CF6" },
  { name: "Laptops", value: 245, amount: 3100000, fill: "#EC4899" },
  { name: "Home Appliances", value: 198, amount: 2800000, fill: "#06B6D4" },
  { name: "Gaming", value: 400, amount: 950000, fill: "#10B981" },
];

const statusDistribution1 = [
  { name: "Approved", value: 856, percentage: 68.6 },
  { name: "Needs Manual Review", value: 198, percentage: 15.9 },
  { name: "Rejected", value: 193, percentage: 15.5 },
];

const dailyApplications1 = [
  {
    date: "09 Aug",
    Approved: 42,
    "Needs Manual Review": 8,
    Rejected: 12,
    total: 62,
  },
  {
    date: "10 Aug",
    Approved: 38,
    "Needs Manual Review": 15,
    Rejected: 9,
    total: 62,
  },
  {
    date: "11 Aug",
    Approved: 45,
    "Needs Manual Review": 12,
    Rejected: 8,
    total: 65,
  },
  {
    date: "12 Aug",
    Approved: 51,
    "Needs Manual Review": 9,
    Rejected: 14,
    total: 74,
  },
  {
    date: "13 Aug",
    Approved: 48,
    "Needs Manual Review": 11,
    Rejected: 13,
    total: 72,
  },
  {
    date: "14 Aug",
    Approved: 44,
    "Needs Manual Review": 16,
    Rejected: 11,
    total: 71,
  },
  {
    date: "15 Aug",
    Approved: 39,
    "Needs Manual Review": 13,
    Rejected: 15,
    total: 67,
  },
];

const cards1 = [
  {
    dataKey: "Approved",
    name: "Approved",
    color: "green",
    fill: "url(#approvedGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Needs Manual Review",
    name: "Needs Manual Review",
    color: "yellow",
    fill: "url(#reviewGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Rejected",
    name: "Rejected",
    color: "red",
    fill: "url(#rejectedGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Pending",
    name: "Pending",
    color: "purple",
    fill: "url(#pendingGradient)",
    strokeWidth: 3,
  },
];

const chartItems1 = [
  {
    dataKey: "Approved",
    name: "Approved",
    color: "green",
    fill: "url(#approvedGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Pending",
    name: "Pending",
    color: "yellow",
    fill: "url(#pendingGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Rejected",
    name: "Rejected",
    color: "red",
    fill: "url(#rejectedGradient)",
    strokeWidth: 3,
  },
  {
    dataKey: "Needs Manual Review",
    name: "Needs Manual Review",
    color: "indigo",
    fill: "url(#reviewGradient)",
    strokeWidth: 3,
  },
];

const cardIcons = {
  "Total Applications": <Users className="w-5 h-5" />,
  Approved: <User className="w-5 h-5" />,
  Pending: <ClockFading className="w-5 h-5" />,
  Rejected: <Ban className="w-5 h-5" />,
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyApplications, setDailyApplications] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats`, {
          withCredentials: true,
        });
        setStats(response.data);
        setDailyApplications(response.data.dailyApplications);
        setProductCategories(response.data.productCategories);
        setStatusDistribution(response.data.statusDistribution);
        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <p className="text-sm font-medium text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl font-bold">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900 ">Credit Analytics</h1>
        <p className="text-lg text-gray-400">
          Real-time insights for consumer electronics credit applications in
          Morocco
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {cards.map((card) => (
          <div className="bg-white flex items-center justify-between rounded-lg shadow-sm p-5 border border-gray-200 hover:border-gray-200 transition-all duration-300 cursor-pointer">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-500">
                {card.title}
              </h3>
              <p className="text-2xl font-extrabold">{card.value}</p>
            </div>
            <span className={`text-2xl p-2 rounded-md ${
              card.color === 'green' ? 'bg-green-200' :
              card.color === 'yellow' ? 'bg-yellow-200' :
              card.color === 'red' ? 'bg-red-200' :
              card.color === 'purple' ? 'bg-purple-200' : 'bg-gray-200'
            }`}>
              <span className={`${
                card.color === 'green' ? 'text-green-600' :
                card.color === 'yellow' ? 'text-yellow-600' :
                card.color === 'red' ? 'text-red-600' :
                card.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
              }`}>
                {cardIcons[card.title]}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 border border-gray-200 pb-4 shadow-sm rounded-lg p-4 bg-white">
        <h2 className="text-2xl font-bold text-gray-900">
          Applications Over Time
        </h2>
        <span className="text-sm text-gray-400">
          Real-time application status tracking
        </span>
        <div className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dailyApplications}>
              <defs>
                <linearGradient
                  id="approvedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="rejectedGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="Approved"
                stackId="1"
                stroke="#10B981"
                fill="url(#approvedGradient)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="Needs Manual Review"
                stackId="1"
                stroke="#F59E0B"
                fill="url(#reviewGradient)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="Rejected"
                stackId="1"
                stroke="#EF4444"
                fill="url(#rejectedGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-2 border border-gray-200 pb-4 shadow-sm rounded-lg p-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Categories
          </h1>
          <span className="text-sm text-gray-400 mb-5">
            Electronics credit applications by category
          </span>
          <div className="mb-10">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productCategories}>
                <defs>
                  {productCategories.map((item, index) => (
                    <linearGradient
                      key={index}
                      id={`gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={item.fill} stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor={item.fill}
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  formatter={(value) => [`${value} applications`, ""]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {productCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#gradient-${index})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 pb-4 shadow-sm rounded-lg p-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-900">
            Status Distribution
          </h1>
          <span className="text-sm text-gray-400 mb-5">
            Application approval rates
          </span>
          <div className="mb-10">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <defs>
                  <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="4"
                      stdDeviation="3"
                      flood-opacity="0.3"
                    />
                  </filter>
                </defs>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name]}
                      filter="url(#shadow)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} (${
                      statusDistribution.find((s) => s.name === name)
                        ?.percentage
                    }%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-row gap-2 items-center justify-center">
              {chartItems1.map((item) => (
                <div key={item.dataKey} className="flex flex-row gap-2 items-center justify-center">
                  <span
                    className={`w-4 h-4 rounded-full ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'yellow' ? 'bg-yellow-500' :
                      item.color === 'red' ? 'bg-red-500' :
                      item.color === 'indigo' ? 'bg-indigo-500' : 'bg-gray-500'
                    }`}
                  />
                  <span className={`text-sm font-bold ${
                    item.color === 'green' ? 'text-green-500' :
                    item.color === 'yellow' ? 'text-yellow-500' :
                    item.color === 'red' ? 'text-red-500' :
                    item.color === 'indigo' ? 'text-indigo-500' : 'text-gray-500'
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
