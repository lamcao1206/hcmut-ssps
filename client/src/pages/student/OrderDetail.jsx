import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import StatusInfo from '../../components/history/StatusInfo';

const CancelOrderModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Xác nhận hủy đơn hàng</h2>
        <p className="mb-4">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition duration-300" onClick={onCancel}>
            Quay lại
          </button>
          <button className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300" onClick={onConfirm}>
            Huỷ Đơn in
          </button>
        </div>
      </div>
    </div>
  );
};

export default function OrderDetail() {
  const { user } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      await axios.put(`http://localhost:3000/orders/${orderId}`, { ...order, status: 'Đã hủy' });
      navigate('/orders');
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  if (!order) return <div>Loading...</div>;

  const isCancelDisabled = () => {
    if (order.status !== 'Đang in') return true;
    const startDate = new Date(order.startDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 4;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col py-[80px] justify-start items-center">
      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Chi tiết đơn hàng</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Thông tin chung</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ID:</span> {order.id}
              </p>
              <p>
                <span className="font-semibold">Tên máy in:</span> {order.printer}
              </p>
              <p>
                <span className="font-semibold">Trạng thái:</span> <StatusInfo status={order.status} />
              </p>
              <p>
                <span className="font-semibold">Thời gian bắt đầu:</span> {order.startDate}
              </p>
              <p>
                <span className="font-semibold">Thời gian kết thúc:</span> {order.endDate}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Cấu hình in</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Số mặt in:</span> {order.printSides}
              </p>
              <p>
                <span className="font-semibold">Khổ giấy:</span> {order.paperSize}
              </p>
              <p>
                <span className="font-semibold">Số lượng in:</span> {order.printCount}
              </p>
              <p>
                <span className="font-semibold">Hướng in:</span> {order.printOrientation}
              </p>
              <p>
                <span className="font-semibold">Số trang tài liệu:</span> {order.documentPage}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition duration-300" onClick={() => navigate('/orders')}>
            Quay lại
          </button>
          <button className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300" onClick={() => setIsModalOpen(true)} disabled={isCancelDisabled()}>
            Huỷ Đơn in
          </button>
        </div>
      </div>
      {isModalOpen && <CancelOrderModal onConfirm={handleCancelOrder} onCancel={() => setIsModalOpen(false)} />}
    </div>
  );
}
