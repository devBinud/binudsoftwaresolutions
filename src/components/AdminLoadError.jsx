import { HiExclamationCircle, HiRefresh } from 'react-icons/hi';

/* Error box shown on admin pages when Firestore data cannot be loaded. */
const AdminLoadError = ({ message, onRetry }) => (
  <div className="bg-white border border-red-200 rounded-card p-6 flex flex-col sm:flex-row sm:items-start gap-4">
    <div className="w-10 h-10 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
      <HiExclamationCircle size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-[#0f172a] font-bold mb-1">Couldn&apos;t load data</h3>
      <p className="text-[#64748b] text-sm leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-[#0f172a] hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <HiRefresh size={16} /> Retry
      </button>
    )}
  </div>
);

export default AdminLoadError;
