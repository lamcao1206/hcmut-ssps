import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarProfile from '../../components/profile/AvatarProfile';
import ProfileDetail from '../../components/profile/ProfileDetail';
import { useAuth } from '../../contexts/AuthContext';

function StudentProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <AvatarProfile src={user.avatar} alt="Avatar" />
          <h1 className="text-2xl font-bold mb-2 text-blue-600">{user.name}</h1>
          <p className="text-gray-700 mb-4">{user.email}</p>
        </div>
        <div className="space-y-4">
          <ProfileDetail label="Mã số sinh viên" value={user.id} />
          <ProfileDetail label="Email" value={user.email} />
          <ProfileDetail label="Giới tính" value={user.gender} />
          <ProfileDetail label="Số trang còn lại (A4)" value={user.page} />
          <ProfileDetail label="Ngày tạo tài khoản" value={user.registerDate} />
          <ProfileDetail label="Lần đăng nhập gần nhất" value={user.lastAccessDate} />
        </div>
      </div>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded mt-5 hover:bg-blue-700" onClick={() => navigate('/')}>
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default StudentProfile;
