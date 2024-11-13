import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
