import Welcome from './pages/welcome/Welcome';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/ui/Footer';
import NavBar from './components/ui/NavBar';

export default function App() {
  const [user, setUser] = useState({ token: null, role: '', files: [] });

  useEffect(function () {
    const storageUser = localStorage.getItem('user');
    if (storageUser && storageUser !== 'undefined') {
      setUser({ ...JSON.parse(storageUser) });
    } else {
      setUser({ token: null, role: '', files: [] });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}
