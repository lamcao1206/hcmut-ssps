import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCLick = () => {
    navigate('/print');
  };

  return (
    <div className="bg-gray-100 h-[700px] flex justify-center items-center">
      <div className="container bg-white shadow-2xl rounded-lg h-[500px] w-[1400px] flex justify-center items-center gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-blue-600 text-center inline-block">
            Chào mừng quay trở lại, <span className="text-black">{user.name}</span>
          </h1>
          <p className="text-xl text-gray-500 ">
            Số trang còn lại của bạn (A4): <span className="text-black font-semibold">{user.page}</span>
          </p>
          <button className="text-lg text-white font-bold bg-blue-600 p-1 rounded-lg hover:bg-blue-700 w-[170px]" onClick={handleCLick}>
            Bắt đầu in ngay!
          </button>
        </div>
        <div>
          <img src="./src/assets/printing.jpg" className="w-80" alt="printer" />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
