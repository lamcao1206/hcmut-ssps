import { NavLink, useLocation } from 'react-router-dom';

export default function Tab({ link, content = 'Đăng nhập' }) {
  const location = useLocation();
  const isActive = link === '/' ? location.pathname === '/' : location.pathname.startsWith(link);
  return (
    <div className="px-[16px] py-[8px] hover:bg-gray-300 rounded-xl">
      <NavLink to={link} className={`text-[20px] font-bold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {content}
      </NavLink>
    </div>
  );
}
