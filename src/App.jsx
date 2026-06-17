import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudyDetails from './pages/CaseStudyDetails';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminProjects from './pages/admin/AdminProjects';
import AdminTeam from './pages/admin/AdminTeam';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminMessages from './pages/admin/AdminMessages';

import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

const PortfolioRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/case-studies/case-study/${id}`} replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#e2e8f0',
              border: '1px solid #274e85',
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<Portfolio />} />
          <Route path="/case-studies/case-study/:id" element={<CaseStudyDetails />} />
          <Route path="/portfolio" element={<Navigate to="/case-studies" replace />} />
          <Route path="/portfolio/case-study/:id" element={<PortfolioRedirect />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
