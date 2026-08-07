import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';
import { HiCog, HiCollection, HiUsers, HiStar, HiMail, HiArrowRight } from 'react-icons/hi';

const statCards = [
  { label: 'Services', icon: HiCog, path: '/admin/services', color: '#005d9e', bg: '#e8f2fb', collection: 'services' },
  { label: 'Projects', icon: HiCollection, path: '/admin/projects', color: '#0073c4', bg: '#eff6ff', collection: 'projects' },
  { label: 'Team Members', icon: HiUsers, path: '/admin/team', color: '#0284c7', bg: '#f0f9ff', collection: 'team' },
  { label: 'Testimonials', icon: HiStar, path: '/admin/testimonials', color: '#005d9e', bg: '#e8f2fb', collection: 'testimonials' },
  { label: 'Messages', icon: HiMail, path: '/admin/messages', color: '#0073c4', bg: '#eff6ff', collection: 'messages' },
];

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const results = {};
      for (const card of statCards) {
        const snap = await getDocs(collection(db, card.collection));
        results[card.collection] = snap.size;
      }
      setCounts(results);
      const unreadSnap = await getDocs(query(collection(db, 'messages'), where('read', '==', false)));
      setUnreadMessages(unreadSnap.size);
    };
    fetchCounts();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0f172a]">Welcome back! 👋</h2>
        <p className="text-[#64748b] text-sm mt-0.5">Here's an overview of your website content.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.path}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#005d9e]/30 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: card.bg }}>
                <card.icon size={17} style={{ color: card.color }} />
              </div>
              {card.collection === 'messages' && unreadMessages > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                  {unreadMessages}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-[#0f172a]">{counts[card.collection] ?? '—'}</div>
            <div className="text-[#64748b] text-xs mt-0.5">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h3 className="text-[#0f172a] font-semibold text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Service', path: '/admin/services' },
            { label: 'Add Project', path: '/admin/projects' },
            { label: 'Add Team Member', path: '/admin/team' },
            { label: 'View Messages', path: '/admin/messages' },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] rounded-lg text-sm font-medium text-[#475569] hover:bg-[#e8f2fb] hover:text-[#005d9e] transition-all group"
            >
              {action.label}
              <HiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
