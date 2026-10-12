import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import AdminLoadError from '../../components/AdminLoadError';
import Skeleton from '../../components/Skeleton';
import { describeFirestoreError } from '../../utils/firestoreError';
import { fetchVisitsSince, isLocalVisit, MAX_VISITS } from '../../utils/visits';

const RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
];

const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About Us',
  '/about/vision-mission': 'Vision & Mission',
  '/about/founders-desk': "From Founder's Desk",
  '/services': 'Services',
  '/services/ai-automation': 'AI & Automation',
  '/case-studies': 'Case Studies',
  '/blog': 'Blog',
  '/gallery': 'Gallery',
  '/contact': 'Contact',
  '/coding-guides': 'Coding Guides',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Use',
};

const pageName = (path) => PAGE_NAMES[path] || path;
const dayKey = (date) => date.toLocaleDateString('en-CA');

const formatCount = (n) =>
  n >= 10000
    ? new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
    : n.toLocaleString('en-IN');

const formatTime = (date) =>
  date
    ? date.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
    : '—';

/* Groups visits by a key and returns rows sorted by views. */
const groupBy = (visits, getKey) => {
  const map = new Map();
  visits.forEach((v) => {
    const key = getKey(v);
    const row = map.get(key) || { key, views: 0, visitors: new Set() };
    row.views += 1;
    row.visitors.add(v.visitorId);
    map.set(key, row);
  });
  return [...map.values()]
    .map((row) => ({ key: row.key, views: row.views, visitors: row.visitors.size }))
    .sort((a, b) => b.views - a.views);
};

const StatTile = ({ label, value, hint }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 min-w-0">
    <div className="text-[#64748b] text-sm truncate">{label}</div>
    <div className="text-2xl sm:text-3xl font-semibold text-[#0f172a] mt-1.5">{value}</div>
    {hint && <div className="text-[#94a3b8] text-xs mt-1">{hint}</div>}
  </div>
);

const TableCard = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
      <h3 className="text-[#0f172a] font-semibold text-sm">{title}</h3>
    </div>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const th = 'px-4 sm:px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b] bg-slate-50/70';
const td = 'px-4 sm:px-5 py-3 text-sm text-[#334155]';
const num = 'text-right tabular-nums';

const EmptyRow = ({ cols }) => (
  <tr>
    <td colSpan={cols} className="px-5 py-10 text-center text-sm text-[#94a3b8]">No visits recorded in this period yet.</td>
  </tr>
);

/* Placeholder layout matching the real page while visits load. */
const SkeletonTable = ({ rows }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
      <Skeleton className="h-4 w-28" />
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 sm:px-5 py-3.5 flex items-center gap-4">
          <Skeleton className="h-4 flex-1 max-w-[220px]" />
          <Skeleton className="h-4 w-10 ml-auto" />
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
    </div>
  </div>
);

const VisitorsSkeleton = () => (
  <div className="space-y-6" role="status" aria-label="Loading visitor statistics">
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16 mt-2.5" />
          <Skeleton className="h-3 w-20 mt-2" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <div className="xl:col-span-3"><SkeletonTable rows={6} /></div>
      <div className="xl:col-span-2 space-y-6">
        <SkeletonTable rows={3} />
        <SkeletonTable rows={3} />
      </div>
    </div>
  </div>
);

const AdminVisitors = () => {
  const [days, setDays] = useState(30);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [includeLocal, setIncludeLocal] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setVisits(await fetchVisitsSince(days));
        setLoadError('');
      } catch (err) {
        setLoadError(describeFirestoreError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, [days, reloadKey]);

  const changeRange = (d) => {
    if (d === days) return;
    setLoading(true);
    setDays(d);
  };

  const retry = () => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const stats = useMemo(() => {
    const localCount = visits.filter((v) => isLocalVisit(v.host)).length;
    const data = includeLocal ? visits : visits.filter((v) => !isLocalVisit(v.host));
    const uniqueVisitors = new Set(data.map((v) => v.visitorId)).size;
    const today = dayKey(new Date());
    const visitorsToday = new Set(data.filter((v) => v.date && dayKey(v.date) === today).map((v) => v.visitorId)).size;

    return {
      localCount,
      pageViews: data.length,
      uniqueVisitors,
      visitorsToday,
      pagesPerVisitor: uniqueVisitors ? (data.length / uniqueVisitors).toFixed(1) : '0',
      topPages: groupBy(data, (v) => v.path || '/').slice(0, 10),
      sources: groupBy(data, (v) => v.referrer || 'Direct / none').slice(0, 8),
      devices: groupBy(data, (v) => v.device || 'Unknown'),
      browsers: groupBy(data, (v) => v.browser || 'Other'),
      recent: data.slice(0, 25),
    };
  }, [visits, includeLocal]);

  const share = (n) => (stats.pageViews ? `${Math.round((n / stats.pageViews) * 100)}%` : '0%');
  const rangeLabel = RANGES.find((r) => r.days === days)?.label.toLowerCase();
  const capped = visits.length >= MAX_VISITS;

  return (
    <AdminLayout title="Visitors">
      {/* Header & filters (one row) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a]">Website Visitors</h2>
          <p className="text-[#64748b] text-sm">Who is visiting your website and which pages they read.</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <div className="flex w-full sm:w-auto p-1 bg-white border border-gray-200 rounded-xl">
            {RANGES.map((r) => (
              <button
                key={r.days}
                type="button"
                onClick={() => changeRange(r.days)}
                className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${days === r.days ? 'bg-[#005eb8] text-white' : 'text-[#475569] hover:bg-slate-50'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-[#475569] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeLocal}
              onChange={(e) => setIncludeLocal(e.target.checked)}
              className="w-4 h-4 accent-[#005eb8] cursor-pointer"
            />
            Include localhost visits{stats.localCount > 0 ? ` (${stats.localCount})` : ''}
          </label>
        </div>
      </div>

      {loading ? (
        <VisitorsSkeleton />
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={retry} />
      ) : (
        <div className="space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <StatTile label="Unique visitors" value={formatCount(stats.uniqueVisitors)} hint={rangeLabel} />
            <StatTile label="Page views" value={formatCount(stats.pageViews)} hint={rangeLabel} />
            <StatTile label="Visitors today" value={formatCount(stats.visitorsToday)} hint="Since midnight" />
            <StatTile label="Pages per visitor" value={stats.pagesPerVisitor} hint="Average" />
          </div>

          {capped && (
            <p className="text-xs text-[#64748b]">
              Showing the most recent {MAX_VISITS.toLocaleString('en-IN')} page views for this period.
            </p>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Top pages */}
            <div className="xl:col-span-3">
              <TableCard title="Top pages">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className={th}>Page</th>
                      <th className={`${th} ${num}`}>Views</th>
                      <th className={`${th} ${num}`}>Visitors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.topPages.length === 0 ? <EmptyRow cols={3} /> : stats.topPages.map((row) => (
                      <tr key={row.key}>
                        <td className={td}>
                          <div className="font-medium text-[#0f172a]">{pageName(row.key)}</div>
                          <div className="text-xs text-[#94a3b8]">{row.key}</div>
                        </td>
                        <td className={`${td} ${num}`}>{row.views.toLocaleString('en-IN')}</td>
                        <td className={`${td} ${num}`}>{row.visitors.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableCard>
            </div>

            {/* Sources & devices */}
            <div className="xl:col-span-2 space-y-6">
              <TableCard title="Traffic sources">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className={th}>Source</th>
                      <th className={`${th} ${num}`}>Views</th>
                      <th className={`${th} ${num}`}>Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.sources.length === 0 ? <EmptyRow cols={3} /> : stats.sources.map((row) => (
                      <tr key={row.key}>
                        <td className={`${td} font-medium text-[#0f172a]`}>{row.key}</td>
                        <td className={`${td} ${num}`}>{row.views.toLocaleString('en-IN')}</td>
                        <td className={`${td} ${num}`}>{share(row.views)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableCard>

              <TableCard title="Devices & browsers">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className={th}>Type</th>
                      <th className={`${th} ${num}`}>Views</th>
                      <th className={`${th} ${num}`}>Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.devices.length === 0 ? <EmptyRow cols={3} /> : (
                      [...stats.devices, ...stats.browsers].map((row, i) => (
                        <tr key={`${i < stats.devices.length ? 'd' : 'b'}-${row.key}`}>
                          <td className={td}>
                            <span className="font-medium text-[#0f172a]">{row.key}</span>
                            <span className="ml-2 text-xs text-[#94a3b8]">{i < stats.devices.length ? 'Device' : 'Browser'}</span>
                          </td>
                          <td className={`${td} ${num}`}>{row.views.toLocaleString('en-IN')}</td>
                          <td className={`${td} ${num}`}>{share(row.views)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </TableCard>
            </div>
          </div>

          {/* Recent visits */}
          <TableCard title="Recent visits">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr>
                  <th className={th}>Time</th>
                  <th className={th}>Page</th>
                  <th className={th}>Source</th>
                  <th className={th}>Device</th>
                  <th className={th}>Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recent.length === 0 ? <EmptyRow cols={5} /> : stats.recent.map((v) => (
                  <tr key={v.id}>
                    <td className={`${td} whitespace-nowrap tabular-nums text-[#64748b]`}>{formatTime(v.date)}</td>
                    <td className={`${td} font-medium text-[#0f172a]`}>{pageName(v.path)}</td>
                    <td className={td}>{v.referrer || 'Direct / none'}</td>
                    <td className={td}>{v.device}</td>
                    <td className={td}>{v.browser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVisitors;
