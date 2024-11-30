import { useNavigate } from 'react-router-dom';
import WebsiteBrand from './WebsiteBrand';
import Tab from './Tab';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from './Avatar';

const tabs = [
  { link: '/', content: 'Trang chủ' },
  { link: '/print', content: 'In tài liệu' },
  { link: '/orders', content: 'Xem đơn in' },
  { link: '/payment', content: 'Mua trang in' },
];

const SPSOTabs = [
  { link: '/', content: 'Trang chủ' },
  { link: '/management', content: 'Quản lí máy in' },
  { link: '/config', content: 'Cấu hình' },
  { link: '/report', content: 'Báo cáo' },
];

function ButtonArrow({ isDropdownOpen, setIsDropdownOpen }) {
  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <button className="absolute -bottom-1 -right-1 bg-gray-300 border-white border-2 rounded-full shadow" onClick={handleClick}>
      <svg className={`h-4 w-4 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

function AvatarContainer({ children }) {
  return <div className="relative flex justify-center items-center gap-2">{children}</div>;
}

const elements = [
  { name: 'Thông tin', link: '/profile' },
  { name: 'Đăng xuất', link: '/' },
];

function Dropdown({ setIsDropdownOpen }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleOptionClick = (link) => {
    setIsDropdownOpen(false);
    if (link === '/') {
      setUser(null);
      localStorage.clear();
    }
    navigate(link);
  };

  return (
    <div className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-300 shadow-lg font-semibold">
      {elements.map((element) => (
        <div key={element.name} className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick(element.link)}>
          {element.name}
        </div>
      ))}
    </div>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white h-16 shadow-lg w-full fixed top-0 left-0 z-16 flex justify-center">
      <div className="w-[1400px] h-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <WebsiteBrand onClick={() => navigate('/')} />
          <div className="flex justify-center items-center gap-1">
            {user?.role === 'student' && tabs.map((tab) => <Tab key={tab.content} link={tab.link} content={tab.content} />)}
            {user?.role === 'spso' && SPSOTabs.map((tab) => <Tab key={tab.content} link={tab.link} content={tab.content} />)}
          </div>
        </div>
        {user?.role ? (
          <AvatarContainer>
            <div className="flex flex-col justify-between items-end">
              <p className="font-medium">{user.name}</p>
              <p className="font-light">{user.role === 'student' && 'Học sinh'}</p>
              <p className="font-light">{user.role === 'spso' && 'SPSO'}</p>
            </div>
            <Avatar className={'h-12 rounded-full'} />
            <ButtonArrow isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
            {isDropdownOpen && <Dropdown setIsDropdownOpen={setIsDropdownOpen} />}
          </AvatarContainer>
        ) : (
          <Tab link="/login" content="Đăng nhập" />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
