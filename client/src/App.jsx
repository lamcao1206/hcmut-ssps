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
import SPSOProfile from './pages/spso/SPSOProfile';
import SystemConfig from './pages/spso/SystemConfig';
import PrinterManagement from './pages/spso/PrinterManagement';
import SPSOReport from './pages/spso/SPSOReport';
import Success from './pages/student/Success';
import OrderDetail from './pages/student/OrderDetail';

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <NavBar />
      <Routes>
        {user && user.role === 'student' && (
          <Route>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/payment" element={<Purchase />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/orders" element={<History />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="print">
              <Route index element={<Print />} />
              <Route path="config" element={<DocumentConfig />} />
              <Route path="success" element={<Success />} />
            </Route>
          </Route>
        )}

        {user && user.role == 'spso' && (
          <Route>
            <Route path="/" element={<SPSODashboard />} />
            <Route path="/printer-management" element={<PrinterManagement />} />
            <Route path="/system-config" element={<SystemConfig />} />
            <Route path="/profile" element={<SPSOProfile />} />
            <Route path="/report" element={<SPSOReport />} />
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
