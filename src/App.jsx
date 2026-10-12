import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Home loads with the main bundle; every other page is downloaded only when visited.
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import VisitTracker from './components/VisitTracker';

const About = lazy(() => import('./pages/About'));
const VisionMission = lazy(() => import('./pages/VisionMission'));
const FoundersDesk = lazy(() => import('./pages/FoundersDesk'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudyDetails = lazy(() => import('./pages/CaseStudyDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const AIAutomation = lazy(() => import('./pages/AIAutomation'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The admin area (and Firebase Authentication) is a separate download.
const AdminApp = lazy(() => import('./pages/admin/AdminApp'));

const PortfolioRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/case-studies/case-study/${id}`} replace />;
};

/* Shown for a moment while a page's code downloads. */
const PageFallback = () => <div className="min-h-screen bg-white" aria-hidden="true" />;

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <VisitTracker />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#3E4265',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          },
        }}
      />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/founders-desk" element={<FoundersDesk />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/case-studies" element={<Portfolio />} />
          <Route path="/case-studies/case-study/:id" element={<CaseStudyDetails />} />
          <Route path="/coding-guides" element={<Tutorials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />

          {/* Old URLs (also 301-redirected by Vercel in production — see vercel.json) */}
          <Route path="/ai-automation" element={<Navigate to="/services/ai-automation" replace />} />
          <Route path="/portfolio" element={<Navigate to="/case-studies" replace />} />
          <Route path="/portfolio/case-study/:id" element={<PortfolioRedirect />} />
          <Route path="/tutorials" element={<Navigate to="/coding-guides" replace />} />
          <Route path="/programming-tutorials" element={<Navigate to="/coding-guides" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
          <Route path="/terms-of-use" element={<Navigate to="/terms" replace />} />

          {/* Admin */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* 404 Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
