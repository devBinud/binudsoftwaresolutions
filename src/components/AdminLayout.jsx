import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiViewGrid, HiCog, HiCollection, HiUsers, HiStar,
  HiMail, HiLogout, HiMenuAlt2, HiExternalLink, HiX
} from 'react-icons/hi';

const navItems = [
  { icon: HiViewGrid, label: 'Dashboard', path: '/admin' },
  { icon: HiCog, label: 'Services', path: '/admin/services' },
  { icon: HiCollection, label: 'Projects', path: '/admin/projects' },
  { icon: HiUsers, label: 'Team', path: '/admin/team' },
  { icon: HiStar, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: HiMail, label: 'Messages', path: '/admin/messages' },
];

const SidebarContent = ({ onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Binud Software Solutions" className="h-7 w-auto object-contain" />
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#475569] lg:hidden">
            <HiX size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={17} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="admin-nav-item">
          <HiExternalLink size={17} />
          View Website
        </a>
        <button onClick={handleLogout}
          className="admin-nav-item w-full text-left hover:!bg-red-50 hover:!text-red-500">
          <HiLogout size={17} />
          Logout
        </button>
      </div>
    </div>
  );
};

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 bg-white border-r border-gray-100 z-50 shadow-xl">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-[#64748b] hover:text-[#0f172a] p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenuAlt2 size={20} />
            </button>
            <h1 className="text-[#0f172a] font-semibold text-base">{title}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
