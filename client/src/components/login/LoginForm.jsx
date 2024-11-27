import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

function LoginForm({ role, inputs }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      username: 'Cao Ngọc Lâm',
      token: '123',
      files: [],
      role,
    });
    // localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center items-center mx-[25px] mt-[10px] mb-[30px]">
      {inputs.map((input) => (
        <Input key={input.label} type={input.type} label={input.label} name={input.type} placeholder={input.placeholder} />
      ))}
      <Button text={'Đăng nhập'} type="submit" />
    </form>
  );
}

export default LoginForm;
