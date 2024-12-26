// components/profile/ProfilePage.tsx
import React, { useState } from 'react';
import { User, Clock } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

type TimeRange = 'day' | 'week' | 'month' | 'quarter' | 'halfYear' | 'year';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ProfilePage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  // 示例数据
  const timeData = {
    day: [
      { name: 'Study', time: 4 },
      { name: 'Exercise', time: 1 },
      { name: 'Entertainment', time: 2 },
      { name: 'Work', time: 6 },
      { name: 'Rest', time: 3 },
    ],
    week: [
      { date: 'Mon', study: 4, exercise: 1, entertainment: 2 },
      { date: 'Tue', study: 5, exercise: 1.5, entertainment: 1.5 },
      { date: 'Wed', study: 3, exercise: 2, entertainment: 2 },
      { date: 'Thu', study: 6, exercise: 1, entertainment: 1 },
      { date: 'Fri', study: 4, exercise: 1, entertainment: 3 },
      { date: 'Sat', study: 2, exercise: 2, entertainment: 4 },
      { date: 'Sun', study: 3, exercise: 2, entertainment: 3 },
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 个人信息部分 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-gray-500" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">User Name</h1>
            <p className="text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>

      {/* 时间范围选择器 */}
      <div className="mb-6">
        <div className="flex gap-2 border-b">
          {[
            { key: 'day', label: 'Yesterday' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'quarter', label: '3 Months' },
            { key: 'halfYear', label: '6 Months' },
            { key: 'year', label: 'This Year' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeRange(key as TimeRange)}
              className={`px-4 py-2 font-medium transition-colors relative
                ${timeRange === key 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 数据概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {timeData.day.map((item, index) => (
          <div key={item.name} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}
                     style={{ backgroundColor: `${COLORS[index]}20` }}>
                  <Clock className="h-5 w-5" style={{ color: COLORS[index] }} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.name}</p>
                  <p className="text-xl font-semibold">{item.time}h</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 趋势图 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Time Distribution Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData.week}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="study" stroke="#0088FE" />
                <Line type="monotone" dataKey="exercise" stroke="#00C49F" />
                <Line type="monotone" dataKey="entertainment" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 饼图 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeData.day}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="time"
                  nameKey="name"
                  label
                >
                  {timeData.day.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;