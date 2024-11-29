import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const pieData = [
  { name: 'Buổi sáng', value: 40 },
  { name: 'Buổi chiều', value: 32 },
  { name: 'Buổi tối', value: 28 },
];

const COLORS = ['#6366f1', '#fda4af', '#d1d5db'];

function OverviewCard({ title, value, percentage, trend }) {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <div className="flex items-center mt-2">
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className={`ml-4 text-sm ${trendColor}`}>
          {percentage} {trend === 'up' ? '↑' : '↓'}
        </div>
      </div>
    </div>
  );
}

function PrintRequest({ fileName, date, pages, status }) {
  const statusClass = status === 'success' ? 'text-green-500' : status === 'pending' ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <p className="font-medium text-gray-800">{fileName}</p>
        <p className="text-sm text-gray-600">
          {date} • {pages}
        </p>
      </div>
      <div className={`text-sm font-semibold ${statusClass}`}>{status === 'success' ? 'Thành công' : status === 'pending' ? 'Đang chờ' : 'Bị hủy'}</div>
    </div>
  );
}

function ReportChart() {
  return (
    <div className="col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thời gian đặt</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60} // Adds a donut-like effect
              fill="#8884d8"
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} // Adds a label with percentage
              isAnimationActive={true} // Enables animations
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
            <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px', border: 'none' }} itemStyle={{ color: '#555' }} formatter={(value, name) => [`${value}%`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Đang truy cập</h2>
        <div className="text-2xl font-bold text-blue-500">20</div>
      </div>
    </div>
  );
}

export default function SPSODashboard() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-start items-center gap-5">
      <div className="w-fit">
        <div className="text-gray-500 text-lg mt-[90px] bg-white p-2 flex items-center space-x-2 rounded-lg shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date().toLocaleDateString('en-GB')}</span>
        </div>
      </div>

      <div className="container flex flex-col gap-5 mb-[50px]">
        <div className="grid grid-cols-4 gap-8">
          <OverviewCard title="Lượt đăng nhập thành công" value="200" percentage="20%" trend="up" />
          <OverviewCard title="Lần sử dụng dịch vụ in" value="49" percentage="5.1%" trend="down" />
          <OverviewCard title="Số trang A4 sử dụng" value="300k" percentage="20%" trend="up" />
          <OverviewCard title="Số trang A4 đã giao dịch" value="450k" percentage="5.1%" trend="down" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Đơn in</h2>
            <PrintRequest fileName="Computer_Network.pdf" date="18/10/2024" pages="24 Trang" status="success" />
            <PrintRequest fileName="DSA.pdf" date="20/10/2024" pages="24 Trang" status="pending" />
            <PrintRequest fileName="PPL.pdf" date="09/10/2024" pages="24 Trang" status="error" />
            <PrintRequest fileName="Test.pdf" date="03/10/2024" pages="24 Trang" status="error" />
          </div>
          <ReportChart />
        </div>
      </div>
    </div>
  );
}
