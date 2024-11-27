import React from 'react';
import { useNavigate } from 'react-router-dom';

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

function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-md" />;
}

function StudentDetails({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

function StudentProfile() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => navigate('/')}>
        Quay lại trang chủ
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <Avatar src={student.avatar} alt="Avatar" />
          <h1 className="text-2xl font-bold mb-2 text-blue-600">{student.name}</h1>
          <p className="text-gray-700 mb-4">{student.email}</p>
        </div>
        <div className="space-y-4">
          <StudentDetails label="Mã số sinh viên" value={student.id} />
          <StudentDetails label="Giới tính" value={student.gender} />
          <StudentDetails label="Số trang còn lại (A4)" value={student.remainingPages} />
          <StudentDetails label="Ngày tạo tài khoản" value={student.registDate} />
          <StudentDetails label="Lần đăng nhập gần nhất" value={student.loginDate} />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
