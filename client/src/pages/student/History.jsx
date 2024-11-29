import React, { useState } from 'react';
import OrderFilter from '../../components/history/OrderFilter';

const getStatusClass = (status) => {
  switch (status) {
    case 'Hoàn thành':
      return 'bg-green-500 text-white';
    case 'Đang in':
      return 'bg-blue-500 text-white';
    case 'Bị hủy':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-200 text-black';
  }
};

function StatusInfo({ status }) {
  const statusClass = getStatusClass(status);
  return <p className={`rounded-lg font-bold p-1 text-center ${statusClass}`}>{status}</p>;
}

export default function History() {
  const data = [
    {
      id: 1,
      name: 'Computer_Network.pdf',
      printer: 'Máy in 1',
      startTime: '18/10/2024, 09:01:01',
      endTime: '20/10/2024, 11:01:01',
      status: 'Hoàn thành',
    },
    {
      id: 2,
      name: 'Database_Design.pdf',
      printer: 'Máy in 10',
      startTime: '18/10/2024, 09:01:01',
      endTime: '18/10/2024, 09:01:01',
      status: 'Đang in',
    },
    {
      id: 3,
      name: 'Database_Design.pdf',
      printer: 'Máy in 10',
      startTime: '18/10/2024, 09:01:01',
      endTime: '18/10/2024, 09:01:01',
      status: 'Bị hủy',
    },
  ];

  const [printerFilter, setPrinterFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const resetFilters = () => {
    setPrinterFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
  };

  const filteredData = data.filter((item) => {
    const matchesPrinter = printerFilter ? item.printer === printerFilter : true;
    const matchesStartDate = startDateFilter ? new Date(item.startTime) >= new Date(startDateFilter) : true;
    const matchesEndDate = endDateFilter ? new Date(item.endTime) <= new Date(endDateFilter) : true;
    return matchesPrinter && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col py-[80px] justify-start items-center">
      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Tất cả đơn in</h1>
        <div className="mb-4 flex justify-between items-center">
          <OrderFilter
            label="Chọn máy in"
            value={printerFilter}
            onChange={(e) => setPrinterFilter(e.target.value)}
            options={[
              { value: '', label: 'Tất cả' },
              { value: 'Máy in 1', label: 'Máy in 1' },
              { value: 'Máy in 10', label: 'Máy in 10' },
            ]}
            inputType="select"
            width="w-1/4"
          />
          <OrderFilter label="Chọn ngày bắt đầu" value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} inputType="date" width="w-1/3" />
          <OrderFilter label="Chọn ngày kết thúc" value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} inputType="date" width="w-1/3" />
          <button className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700" onClick={resetFilters}>
            Reset
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border-collapse">
            <thead>
              <tr className="bg-blue-600 text-center text-white">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Tên tài liệu</th>
                <th className="border px-4 py-2">Máy in</th>
                <th className="border px-4 py-2">Thời gian bắt đầu</th>
                <th className="border px-4 py-2">Thời gian kết thúc</th>
                <th className="border px-4 py-2">Trạng thái</th>
                <th className="border px-4 py-2">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 text-center">
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.printer}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.startTime}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.endTime}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <StatusInfo status={item.status} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <a href="#" className="text-blue-500 underline hover:text-blue-700">
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
