import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  const fetchTestimonials = async () => {
    const snap = await getDocs(collection(db, 'testimonials'));
    setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openAdd = () => { setEditing(null); reset(); setShowModal(true); };
  const openEdit = (t) => {
    setEditing(t);
    ['name', 'role', 'text', 'rating'].forEach(k => setValue(k, t[k]));
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, rating: parseInt(data.rating) || 5 };
      if (editing) {
        await updateDoc(doc(db, 'testimonials', editing.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Testimonial updated!');
      } else {
        await addDoc(collection(db, 'testimonials'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Testimonial added!');
      }
      setShowModal(false); reset(); fetchTestimonials();
    } catch { toast.error('Something went wrong.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await deleteDoc(doc(db, 'testimonials', id));
    toast.success('Testimonial deleted.');
    fetchTestimonials();
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Manage Testimonials</h2>
          <p className="text-[#94a3b8] text-sm">Client reviews shown on your website.</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add Testimonial</button>
      </div>

      {loading ? (
        <div className="text-[#94a3b8] text-center py-20">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-[#94a3b8] mb-4">No testimonials yet.</p>
          <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add First Testimonial</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <FaStar key={i} size={12} className="text-yellow-400" />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(t)} className="text-[#94a3b8] hover:text-[#005d9e]"><HiPencil size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} className="text-[#94a3b8] hover:text-red-400"><HiTrash size={16} /></button>
                </div>
              </div>
              <p className="text-[#94a3b8] text-sm line-clamp-3 mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #005d9e, #00b4d8)' }}>
                  {t.name?.[0] || '?'}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-[#94a3b8] text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
          <div className="relative glass rounded-2xl p-6 w-full max-w-md z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#94a3b8] hover:text-white"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Client Name *</label>
                <input {...register('name', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="Sarah Johnson" />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Role / Company</label>
                <input {...register('role')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]"
                  placeholder="CEO, TechStart Inc." />
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Rating (1-5)</label>
                <select {...register('rating')}
                  className="w-full bg-[#0d1526] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e]">
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="text-[#94a3b8] text-sm mb-1 block">Review Text *</label>
                <textarea {...register('text', { required: true })} rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#005d9e] resize-none"
                  placeholder="What did the client say..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center text-sm">
                  {isSubmitting ? 'Saving...' : editing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTestimonials;
