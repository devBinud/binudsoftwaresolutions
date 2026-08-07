import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import toast from 'react-hot-toast';
import { HiTrash, HiMail, HiMailOpen, HiX } from 'react-icons/hi';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')));
    setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      await updateDoc(doc(db, 'messages', msg.id), { read: true });
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await deleteDoc(doc(db, 'messages', id));
    toast.success('Message deleted.');
    setSelected(null);
    fetchMessages();
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <AdminLayout title="Messages">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Messages
            {unread > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unread} unread</span>
            )}
          </h2>
          <p className="text-[#94a3b8] text-sm">Contact form submissions from your website.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-[#94a3b8] text-center py-20">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <HiMail size={40} className="text-[#94a3b8] mx-auto mb-3" />
          <p className="text-[#94a3b8]">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Message List */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`glass rounded-xl p-4 cursor-pointer transition-all hover:border-[#005d9e]/50 ${
                  selected?.id === msg.id ? 'border-[#005d9e]' : ''
                } ${!msg.read ? 'border-l-2 border-l-[#005d9e]' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    {msg.read
                      ? <HiMailOpen size={16} className="text-[#94a3b8] shrink-0" />
                      : <HiMail size={16} className="text-[#005d9e] shrink-0" />
                    }
                    <div className="min-w-0">
                      <div className={`font-medium text-sm truncate ${msg.read ? 'text-[#94a3b8]' : 'text-white'}`}>
                        {msg.name}
                      </div>
                      <div className="text-[#94a3b8] text-xs truncate">{msg.email}</div>
                    </div>
                  </div>
                  <div className="text-[#94a3b8] text-xs shrink-0">
                    {msg.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                  </div>
                </div>
                <p className="text-[#94a3b8] text-xs mt-2 line-clamp-1">{msg.message}</p>
                {msg.service && (
                  <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block"
                    style={{ background: '#005d9e20', color: '#005d9e' }}>
                    {msg.service}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Message Detail */}
          {selected ? (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-white font-bold text-lg">{selected.name}</h3>
                  <p className="text-[#94a3b8] text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-[#94a3b8] text-sm">{selected.phone}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="text-[#94a3b8] hover:text-white">
                  <HiX size={20} />
                </button>
              </div>

              {selected.service && (
                <div className="mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: '#005d9e20', color: '#005d9e' }}>
                    Interested in: {selected.service}
                  </span>
                </div>
              )}

              <div className="glass rounded-xl p-4 mb-5">
                <p className="text-[#e2e8f0] text-sm leading-relaxed">{selected.message}</p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="btn-primary text-sm flex-1 justify-center"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="btn-outline text-sm px-4 text-red-400 border-red-400/30 hover:bg-red-400/10"
                >
                  <HiTrash size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <HiMail size={40} className="text-[#94a3b8] mx-auto mb-3" />
                <p className="text-[#94a3b8] text-sm">Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
