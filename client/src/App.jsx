import Welcome from './pages/welcome/Welcome';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/ui/Footer';
import NavBar from './components/ui/NavBar';
import Login from './pages/welcome/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import { useAuth } from './contexts/AuthContext';
import Purchase from './pages/student/Purchase';
import Print from './pages/student/Print';

export default function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user?.role === 'student' ? <StudentDashboard /> : <Welcome />} />
        <Route path="/print" element={<Print />} />
        <Route path="/payment" element={<Purchase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
