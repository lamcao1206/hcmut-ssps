import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

function LoginForm({ role, inputs }) {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};

    formData.forEach((value, key) => {
      user[key] = value;
    });

    user.role = role;
    setUser(user);
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
