import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="container bg-white w-[450px] shadow-2xl rounded-lg h-[200px] flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl font-bold text-blue-600">404 Page Not Found</h1>
        <a className="text-blue-600 hover:underline cursor-pointer font-md" onClick={() => navigate('/')}>
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}
