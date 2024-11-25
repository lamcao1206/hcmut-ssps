import { useNavigate } from 'react-router-dom';

export default function Introduction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <article className="w-full flex justify-around items-center mb-[5rem]">
      <div className="flex justify-center items-start">
        <img src="/src/assets/welcome.jpg" rel="img/jpg" style={{ width: '450px' }} />
      </div>
      <div className="w-3/6 ml-0">
        <h1 className="text-4xl font-bold inline text-blue-600">Chào mừng tới HCMUT SPSS</h1>
        <p className="font-roboto text-2xl text-gray-500 mt-5 mb-2">
          <span className="font-bold text-blue-600">HCMUT Student Smart Printing Service </span>
          (HCMUT SSPS) là giải pháp của bạn cho việc in ấn tiện lợi, hiệu quả và thân thiện với môi trường trên 2 cơ sở của trường đại học Bách Khoa. Được thiết kế để hợp lý hóa quy trình in ấn, hệ thống của chúng tôi cho phép bạn tải lên tài liệu, chọn máy in ưa thích của bạn và tùy chỉnh các tùy chọn in - tất cả từ sự thoải mái của thiết bị của bạn.
        </p>
        <button className="text-lg text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg hover:from-blue-600 hover:to-purple-800" onClick={handleClick}>
          Khám phá ngay
        </button>
      </div>
    </article>
  );
}
