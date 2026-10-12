import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import AdminLoadError from '../../components/AdminLoadError';
import Skeleton from '../../components/Skeleton';
import { describeFirestoreError } from '../../utils/firestoreError';
import { fetchVisitsSince, isLocalVisit } from '../../utils/visits';
import { Link } from 'react-router-dom';
import { HiStar, HiUsers, HiArrowRight, HiChartBar } from 'react-icons/hi';

const STATS_DAYS = 30;

const statCards = [
  { key: 'visitors', label: 'Website Visitors', hint: `Unique, last ${STATS_DAYS} days`, icon: HiUsers, path: '/admin/visitors', color: '#005d9e', bg: '#e8f2fb' },
  { key: 'pageViews', label: 'Page Views', hint: `Last ${STATS_DAYS} days`, icon: HiChartBar, path: '/admin/visitors', color: '#0073c4', bg: '#eff6ff' },
  { key: 'testimonials', label: 'Testimonials', hint: 'Managed in admin', icon: HiStar, path: '/admin/testimonials', color: '#0284c7', bg: '#f0f9ff' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loadError, setLoadError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const [visits, testimonials, unread] = await Promise.all([
          fetchVisitsSince(STATS_DAYS),
          getCountFromServer(collection(db, 'testimonials')),
          getCountFromServer(query(collection(db, 'messages'), where('read', '==', false))),
        ]);
        if (!active) return;
        const realVisits = visits.filter((v) => !isLocalVisit(v.host));
        setStats({
          visitors: new Set(realVisits.map((v) => v.visitorId)).size,
          pageViews: realVisits.length,
          testimonials: testimonials.data().count,
        });
        setUnreadMessages(unread.data().count);
        setLoadError('');
      } catch (err) {
        if (active) setLoadError(describeFirestoreError(err));
      }
    };
    fetchStats();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retry = () => {
    setStats(null);
    setLoadError('');
    setReloadKey((k) => k + 1);
  };

  const quickActions = [
    { label: 'View Messages', path: '/admin/messages', badge: unreadMessages },
    { label: 'View Visitors', path: '/admin/visitors' },
    { label: 'Manage Testimonials', path: '/admin/testimonials' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0f172a]">Welcome back! 👋</h2>
        <p className="text-[#64748b] text-sm mt-0.5">Here's an overview of your website.</p>
      </div>

      {loadError && (
        <div className="mb-6">
          <AdminLoadError message={loadError} onRetry={retry} />
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.key}
            to={card.path}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#005d9e]/30 hover:shadow-sm transition-all"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: card.bg }}>
              <card.icon size={17} style={{ color: card.color }} />
            </div>
            {stats ? (
              <div className="text-2xl font-bold text-[#0f172a]">{stats[card.key].toLocaleString('en-IN')}</div>
            ) : loadError ? (
              <div className="text-2xl font-bold text-[#cbd5e1]">—</div>
            ) : (
              <Skeleton className="h-8 w-16" />
            )}
            <div className="text-[#0f172a] text-xs font-medium mt-1">{card.label}</div>
            <div className="text-[#94a3b8] text-[11px]">{card.hint}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h3 className="text-[#0f172a] font-semibold text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] rounded-lg text-sm font-medium text-[#475569] hover:bg-[#e8f2fb] hover:text-[#005d9e] transition-all group"
            >
              <span className="flex items-center gap-2">
                {action.label}
                {action.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                    {action.badge} new
                  </span>
                )}
              </span>
              <HiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
