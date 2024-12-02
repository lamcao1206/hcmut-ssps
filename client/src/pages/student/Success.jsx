import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Success() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (!user.order) navigate('/print');
  }, [user.order, navigate]);

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-6">
          <h1 className="text-2xl font-bold">🎉 Đơn in đã được cập nhật thành công!</h1>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin đơn in</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <div className="text-gray-700">
              <span className="font-medium">Tên tài liệu:</span> {user.order.documentName}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Số trang:</span> {user.order.documentPage}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Mã đơn:</span> {user.order.id}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Kích thước giấy:</span> {user.order.paperSize}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Số lượng in:</span> {user.order.printCount}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Hướng in:</span> {user.order.printOrientation}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Số mặt in:</span> {user.order.printSides}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Máy in:</span> {user.order.printer}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-4 px-8 flex justify-center gap-4">
          <button onClick={() => handleNavigate('/print')} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
            Quay lại in
          </button>
          <button onClick={() => handleNavigate('/orders')} className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
            Xem lịch sử
          </button>
        </div>
      </div>
    </div>
  );
}
