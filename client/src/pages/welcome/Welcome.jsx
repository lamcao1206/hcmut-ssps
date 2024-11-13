import AboutTeam from '../../components/welcome/AboutTeam';
import Introduction from '../../components/welcome/Introduction';

export default function Welcome() {
  return (
    <div className="my-[7rem] h-auto mx-auto w-[1200px]">
      <Introduction />
      <AboutTeam />
    </div>
  );
}
