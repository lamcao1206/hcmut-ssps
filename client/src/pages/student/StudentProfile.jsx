import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarProfile from '../../components/profile/AvatarProfile';
import ProfileDetail from '../../components/profile/ProfileDetail';

const student = {
  name: 'Nguyen Van A',
  email: 'nguyenvana@example.com',
  id: '123456789',
  gender: 'Male',
  remainingPages: 100,
  avatar: '/src/assets/avatar.png',
  registDate: '01/01/2022',
  loginDate: '01/10/2023',
};

function StudentProfile() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <AvatarProfile src={student.avatar} alt="Avatar" />
          <h1 className="text-2xl font-bold mb-2 text-blue-600">{student.name}</h1>
          <p className="text-gray-700 mb-4">{student.email}</p>
        </div>
        <div className="space-y-4">
          <ProfileDetail label="Mã số sinh viên" value={student.id} />
          <ProfileDetail label="Email" value={student.email} />
          <ProfileDetail label="Giới tính" value={student.gender} />
          <ProfileDetail label="Số trang còn lại (A4)" value={student.remainingPages} />
          <ProfileDetail label="Ngày tạo tài khoản" value={student.registDate} />
          <ProfileDetail label="Lần đăng nhập gần nhất" value={student.loginDate} />
        </div>
      </div>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded mt-5 hover:bg-blue-700" onClick={() => navigate('/')}>
        Quay lại trang chủ
      </button>
    </div>
  );
}

export default StudentProfile;
