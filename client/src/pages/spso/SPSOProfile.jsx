import { useNavigate } from 'react-router-dom';
import AvatarProfile from '../../components/profile/AvatarProfile';
import ProfileDetail from '../../components/profile/ProfileDetail';
import { useAuth } from '../../contexts/AuthContext';

export default function SPSOProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={() => navigate('/')}>
        Quay lại trang chủ
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <AvatarProfile src={user.avatar} alt="Avatar" />
          <h1 className="text-2xl font-bold mb-2 text-blue-600">{user.name}</h1>
          <p className="text-gray-700 mb-4">{user.email}</p>
        </div>
        <div className="space-y-4">
          <ProfileDetail label="Mã số SPSO" value={user.id} />
          <ProfileDetail label="Tên tài khoản" value={user.username} />
          <ProfileDetail label="Giới tính" value={user.gender} />
          <ProfileDetail label="Ngày sinh" value={user.dateOfBirth} />
        </div>
      </div>
    </div>
  );
}
