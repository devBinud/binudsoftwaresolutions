import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import AdminLoadError from '../../components/AdminLoadError';
import Skeleton from '../../components/Skeleton';
import { describeFirestoreError } from '../../utils/firestoreError';
import toast from 'react-hot-toast';
import { HiTrash, HiMail, HiMailOpen, HiX, HiReply } from 'react-icons/hi';

const formatDate = (msg, withTime = false) => {
  const date = msg.createdAt?.toDate?.();
  if (!date) return 'Just now';
  return date.toLocaleString('en-IN', withTime
    ? { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }
    : { day: 'numeric', month: 'short' });
};

const DetailRow = ({ label, value }) =>
  value ? (
    <div className="flex flex-col sm:flex-row sm:gap-3 py-2 border-b border-gray-100 last:border-0">
      <dt className="sm:w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#94a3b8] pt-0.5">{label}</dt>
      <dd className="text-sm text-[#0f172a] break-words">{value}</dd>
    </div>
  ) : null;

const MessageDetail = ({ msg, onClose, onDelete }) => {
  const interests = msg.surveyData?.interests;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <h3 className="text-[#0f172a] font-bold text-lg break-words">{msg.name}</h3>
          <a href={`mailto:${msg.email}`} className="text-[#005eb8] text-sm hover:underline break-all">{msg.email}</a>
          <p className="text-[#94a3b8] text-xs mt-1">{formatDate(msg, true)}</p>
        </div>
        <button onClick={onClose} className="text-[#94a3b8] hover:text-[#0f172a] cursor-pointer shrink-0" aria-label="Close message">
          <HiX size={20} />
        </button>
      </div>

      {(msg.purpose || msg.service) && (
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#005eb8]/10 text-[#005eb8] mb-4">
          {msg.purpose || msg.service}
        </span>
      )}

      <div className="bg-slate-50 rounded-xl p-4 mb-5">
        <p className="text-[#334155] text-sm leading-relaxed whitespace-pre-line break-words">{msg.message}</p>
      </div>

      <dl className="mb-6">
        <DetailRow label="Phone" value={msg.phone} />
        <DetailRow label="Company" value={msg.company && msg.company !== 'N/A' ? msg.company : ''} />
        <DetailRow label="Prefers" value={msg.preferredComm} />
        <DetailRow label="NDA requested" value={msg.ndaRequested === true ? 'Yes' : ''} />
        <DetailRow label="Files named" value={msg.filesAttached && msg.filesAttached !== 'None' ? msg.filesAttached : ''} />
        <DetailRow label="Interests" value={Array.isArray(interests) ? interests.join(', ') : interests} />
        <DetailRow label="Goal" value={msg.surveyData?.goal} />
      </dl>

      <div className="flex gap-3">
        <a href={`mailto:${msg.email}`} className="btn-primary text-sm flex-1 justify-center">
          <HiReply size={16} /> Reply via Email
        </a>
        <button
          onClick={() => onDelete(msg)}
          className="inline-flex items-center gap-1.5 px-4 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <HiTrash size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

const MessagesSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" role="status" aria-label="Loading messages">
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-4 h-4 rounded" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-3 w-full mt-3" />
        </div>
      ))}
    </div>
    <div className="hidden lg:block bg-white border border-gray-100 rounded-xl p-6 space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-3.5 w-52" />
      <Skeleton className="h-28 w-full mt-4" />
    </div>
  </div>
);

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')));
        if (!active) return;
        setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadError('');
      } catch (err) {
        if (active) setLoadError(describeFirestoreError(err));
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retryFetch = () => {
    setLoading(true);
    setReloadKey((k) => k + 1);
  };

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
      try {
        await updateDoc(doc(db, 'messages', msg.id), { read: true });
      } catch {
        // Marking as read is best-effort; the message is still shown.
      }
    }
  };

  const handleDelete = async (msg) => {
    if (!confirm(`Delete the message from ${msg.name}? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'messages', msg.id));
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      setSelected(null);
      toast.success('Message deleted.');
    } catch (err) {
      toast.error(describeFirestoreError(err));
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout title="Messages">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
          Messages
          {unread > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{unread} unread</span>
          )}
        </h2>
        <p className="text-[#64748b] text-sm">Contact form and AI survey submissions from your website.</p>
      </div>

      {loading ? (
        <MessagesSkeleton />
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={retryFetch} />
      ) : messages.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <HiMail size={40} className="text-[#cbd5e1] mx-auto mb-3" />
          <p className="text-[#64748b]">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Message List */}
          <div className="space-y-3">
            {messages.map((msg) => {
              const isSelected = selected?.id === msg.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left bg-white rounded-xl p-4 border transition-all cursor-pointer ${isSelected
                    ? 'border-[#005eb8] shadow-sm'
                    : 'border-gray-100 hover:border-[#005eb8]/40'
                    } ${!msg.read ? 'border-l-4 border-l-[#005eb8]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {msg.read
                        ? <HiMailOpen size={16} className="text-[#94a3b8] shrink-0" />
                        : <HiMail size={16} className="text-[#005eb8] shrink-0" />}
                      <div className="min-w-0">
                        <div className={`text-sm truncate ${msg.read ? 'text-[#475569] font-medium' : 'text-[#0f172a] font-bold'}`}>
                          {msg.name}
                        </div>
                        <div className="text-[#94a3b8] text-xs truncate">{msg.email}</div>
                      </div>
                    </div>
                    <div className="text-[#94a3b8] text-xs shrink-0">{formatDate(msg)}</div>
                  </div>
                  <p className="text-[#64748b] text-xs mt-2 line-clamp-1">{msg.message}</p>
                  {(msg.purpose || msg.service) && (
                    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mt-2 bg-[#005eb8]/10 text-[#005eb8]">
                      {msg.purpose || msg.service}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Message Detail — side panel on desktop */}
          <div className="hidden lg:block lg:sticky lg:top-20">
            {selected ? (
              <MessageDetail msg={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
            ) : (
              <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
                <HiMail size={40} className="text-[#cbd5e1] mx-auto mb-3" />
                <p className="text-[#64748b] text-sm">Select a message to read</p>
              </div>
            )}
          </div>

          {/* Message Detail — full-screen sheet on phones & tablets */}
          {selected && (
            <div className="lg:hidden fixed inset-0 z-50 bg-[#f8fafc] overflow-y-auto p-4">
              <MessageDetail msg={selected} onClose={() => setSelected(null)} onDelete={handleDelete} />
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
