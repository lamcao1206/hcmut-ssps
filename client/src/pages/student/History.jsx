import React, { useEffect, useState } from 'react';
import OrderFilter from '../../components/history/OrderFilter';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatusInfo from '../../components/history/StatusInfo';

export default function History() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [printerFilter, setPrinterFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [printers, setPrinters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders?studentId=${user.id}`);
        const data = response.data;
        setOrders(data);

        const uniquePrinters = [...new Set(data.map((order) => order.printer))];
        setPrinters(uniquePrinters);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const resetFilters = () => {
    setPrinterFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
  };

  const filteredData = orders.filter((item) => {
    const matchesPrinter = printerFilter ? item.printer === printerFilter : true;
    const matchesStartDate = startDateFilter ? new Date(item.startDate) >= new Date(startDateFilter) : true;
    const matchesEndDate = endDateFilter ? new Date(item.endDate) <= new Date(endDateFilter) : true;
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
            options={[{ value: '', label: 'Tất cả' }, ...printers.map((printer) => ({ value: printer, label: printer }))]}
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
                  <td className="border border-gray-300 px-4 py-2">{item.documentName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.printer}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <StatusInfo status={item.status} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="text-blue-500 underline hover:text-blue-700"
                      onClick={() => {
                        navigate(`/orders/${item.id}`);
                      }}
                    >
                      Xem
                    </button>
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
