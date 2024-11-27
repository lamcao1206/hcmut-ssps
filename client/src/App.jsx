import Welcome from './pages/welcome/Welcome';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/ui/Footer';
import NavBar from './components/ui/NavBar';
import Login from './pages/welcome/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import { useAuth } from './contexts/AuthContext';
import Purchase from './pages/student/Purchase';
import Print from './pages/student/Print';
import StudentProfile from './pages/student/StudentProfile';
import DocumentConfig from './pages/student/DocumentConfig';
import History from './pages/student/History';
import SPSODashboard from './pages/spso/SPSODashboard';

export default function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <NavBar />
      <Routes>
        {user && user.role === 'student' && (
          <Route>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/payment" element={<Purchase />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/history" element={<History />} />
            <Route path="print">
              <Route index element={<Print />} />
              <Route path="config" element={<DocumentConfig />} />
            </Route>
          </Route>
        )}

        {user && user.role == 'spso' && (
          <Route>
            <Route path="/" element={<SPSODashboard />} />
          </Route>
        )}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
