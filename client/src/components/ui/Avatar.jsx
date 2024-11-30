import { useAuth } from '../../contexts/AuthContext';

function Avatar({ className }) {
  const { user } = useAuth();
  console.log(user);
  return <img src={user.avatar} alt="avatar" className={className} />;
}

export default Avatar;
