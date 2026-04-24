import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  const fetchTeam = async () => {
    const snap = await getDocs(collection(db, 'team'));
    setTeam(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchTeam(); }, []);

  const openAdd = () => { setEditing(null); reset(); setShowModal(true); };
  const openEdit = (m) => {
    setEditing(m);
    ['name', 'role', 'bio', 'linkedin', 'github', 'twitter'].forEach(k => setValue(k, m[k]));
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateDoc(doc(db, 'team', editing.id), { ...data, updatedAt: serverTimestamp() });
        toast.success('Member updated!');
      } else {
        await addDoc(collection(db, 'team'), { ...data, createdAt: serverTimestamp() });
        toast.success('Member added!');
      }
      setShowModal(false); reset(); fetchTeam();
    } catch { toast.error('Something went wrong.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this team member?')) return;
    await deleteDoc(doc(db, 'team', id));
    toast.success('Member removed.');
    fetchTeam();
  };

  return (
    <AdminLayout title="Team">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Team</h2>
          <p className="text-[#94a3b8] text-sm">Add or update team members shown on your website.</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add Member</button>
      </div>

      {loading ? (
        <div className="text-[#94a3b8] text-center py-20">Loading...</div>
      ) : team.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-[#94a3b8] mb-4">No team members yet.</p>
          <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add First Member</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((m) => (
            <div key={m.id} className="glass rounded-2xl p-5 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #005d9e, #00b4d8)' }}>
                {m.name?.[0] || '?'}
              </div>
              <h3 className="text-white font-semibold">{m.name}</h3>
              <p className="text-[#005d9e] text-sm mb-2">{m.role}</p>
              <p className="text-[#94a3b8] text-xs line-clamp-2 mb-4">{m.bio}</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => openEdit(m)} className="text-[#94a3b8] hover:text-[#005d9e] transition-colors flex items-center gap-1 text-sm">
                  <HiPencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-[#94a3b8] hover:text-red-400 transition-colors flex items-center gap-1 text-sm">
                  <HiTrash size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
          <div className="relative glass rounded-2xl p-6 w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#94a3b8] hover:text-white"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Full Name *</label>
                <input {...register('name', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Role *</label>
                <input {...register('role', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="Lead Developer" />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Bio</label>
                <textarea {...register('bio')} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e] resize-none"
                  placeholder="Short bio..." />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">LinkedIn URL</label>
                <input {...register('linkedin')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">GitHub URL</label>
                <input {...register('github')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="https://github.com/..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center text-sm">
                  {isSubmitting ? 'Saving...' : editing ? 'Update' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTeam;
