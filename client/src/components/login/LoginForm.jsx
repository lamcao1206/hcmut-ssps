import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

function LoginForm({ role, inputs }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      token: '123',
      role: 'student',
      files: ['1.pdf', '2.pdf', '3.pdf', '4.pdf', '5.pdf', '6.pdf', '7.pdf', '8.pdf', '9.pdf', '10.pdf'],
    });
    localStorage.setItem('user', JSON.stringify(user));
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
