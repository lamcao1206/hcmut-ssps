import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UploadedFileBox() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleDeleteFile = () => {
    const updatedFiles = user.files.filter((file) => file !== fileToDelete);
    setUser({ ...user, files: updatedFiles });
    setShowModal(false);
    setFileToDelete(null);
  };

  const openDeleteModal = (fileName) => {
    setFileToDelete(fileName);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setFileToDelete(null);
  };

  const handleConfig = (fileName) => {
    navigate(`/print/config?file=${encodeURIComponent(fileName)}`);
  };

  return (
    <div className="container bg-white shadow-2xl rounded-lg h-[450px] w-[450px] p-[15px] overflow-y-auto">
      <header className="bg-white text-center z-10 mb-2">
        <h2 className="text-xl font-medium text-blue-600">Danh sách các file đã tải lên</h2>
      </header>
      {user.files && user.files.length > 0 ? (
        <ul className="space-y-2">
          {user.files.map((fileName, index) => (
            <li key={index} className="flex justify-between items-center text-gray-700 border-2 rounded-lg p-3">
              <div className="flex items-center">
                <img src="/src/assets/file.png" alt="File Icon" className="w-6 h-6 mr-2" />
                <span>{fileName}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <img src="/src/assets/config.png" alt="Download Icon" className="w-6 h-6 cursor-pointer ml-2" onClick={() => handleConfig(fileName)} />
                <img src="/src/assets/delete.png" alt="Delete Icon" className="w-6 h-6 cursor-pointer" onClick={() => openDeleteModal(fileName)} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No files uploaded.</p>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Xác nhận</h3>
            </div>
            <div className="p-4">
              <p>Bạn có chắc chắn muốn xoá "{fileToDelete}"?</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2" onClick={closeDeleteModal}>
                Huỷ
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDeleteFile}>
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
