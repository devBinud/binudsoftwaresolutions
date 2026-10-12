import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import SEOHead from '../../components/SEOHead';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminTestimonials from './AdminTestimonials';
import AdminMessages from './AdminMessages';
import AdminVisitors from './AdminVisitors';

/**
 * The whole admin area, loaded on demand at /admin/*.
 * Firebase Authentication is only needed here, so the public website never waits for it.
 */
const AdminApp = () => (
  <AuthProvider>
    <SEOHead title="Admin" noIndex />
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
      <Route path="messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
      <Route path="visitors" element={<ProtectedRoute><AdminVisitors /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </AuthProvider>
);

export default AdminApp;
