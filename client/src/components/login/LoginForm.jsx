import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm({ role, inputs }) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3000/${role}`);
    const userData = response.data;
    if (role == 'student') {
      const student = userData.find((student) => student.email === email && student.password === password);
      if (!student) {
        toast.error('Invalid student email or password');
        return;
      } else {
        setUser({
          id: student.id,
          avatar: student.avatar,
          role: 'student',
          files: [],
          name: student.name,
          email: student.email,
          password: student.password,
          gender: student.gender,
          page: student.page,
          registerDate: student.registerDate,
          lastAccessDate: student.lastAccessDate,
        });
        navigate('/');
      }
    } else if (role == 'spso') {
      console.log('ok');
      const spso = userData.find((spso) => spso.username === username && spso.password === password);
      if (!spso) {
        toast.error('Invalid SPSO username or password');
        return;
      } else {
        setUser({
          id: spso.id,
          role: 'spso',
          avatar: spso.avatar,
          name: spso.name,
          username: spso.username,
          password: spso.password,
          gender: spso.gender,
          dateOfBirth: spso.dateOfBirth,
        });
        navigate('/');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center items-center mx-[25px] mt-[10px] mb-[30px]">
        {inputs.map((input) => (
          <Input
            key={input.label}
            type={input.type}
            label={input.label}
            name={input.type}
            placeholder={input.placeholder}
            onChange={(e) => {
              if (input.type === 'email') {
                console.log('yeah');
                setEmail(e.target.value);
              } else if (input.type === 'password') {
                setPassword(e.target.value);
              } else if (input.type === 'username') {
                setUsername(e.target.value);
              }
            }}
          />
        ))}
        <Button text={'Đăng nhập'} type="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}
