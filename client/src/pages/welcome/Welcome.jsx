import { useContext } from 'react';
import AboutTeam from '../../components/welcome/AboutTeam';
import Introduction from '../../components/welcome/Introduction';
import { AuthContext } from '../../contexts/AuthContext';

export default function Welcome() {
  const { user } = useContext(AuthContext);
  return (
    <div className="my-[7rem] h-auto mx-auto w-[1200px]">
      <Introduction />
      <AboutTeam />
    </div>
  );
}
