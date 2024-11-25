import { useState } from 'react';
import LoginForm from '../../components/login/LoginForm';
import LoginHeader from '../../components/login/LoginHeader';
import RoleSelector from '../../components/login/RoleSelector';

const roles = [
  { name: 'student', description: 'Sinh viên trường Đại học Bách Khoa TPHCM' },
  { name: 'spso', description: 'Quản lý máy in SPSO' },
];

const loginInput = {
  student: [
    { type: 'email', label: 'Email', placeholder: 'Nhập email sinh viên HCMUT của bạn' },
    { type: 'password', label: 'Mật khẩu', placeholder: 'Nhập mật khẩu' },
  ],
  spso: [
    { type: 'username', label: 'Tên đăng nhập', placeholder: 'Nhập tên đăng nhập SPSO của bạn' },
    { type: 'password', label: 'Mật khẩu', placeholder: 'Nhập mật khẩu' },
  ],
};

function Login() {
  const [role, setRole] = useState(null);

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="container bg-white w-[450px] shadow-2xl rounded-lg">
        <LoginHeader />
        {/* Show two options for role selecting*/}
        {!role && <RoleSelector roles={roles} setRole={setRole} />}
        {/* Show the login form for choosen role */}
        {role && <LoginForm role={role} inputs={loginInput[role]} />}
      </div>
    </div>
  );
}

export default Login;
