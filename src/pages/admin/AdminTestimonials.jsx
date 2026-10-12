import { useEffect, useState } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp, writeBatch,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import AdminLoadError from '../../components/AdminLoadError';
import Skeleton from '../../components/Skeleton';
import { describeFirestoreError } from '../../utils/firestoreError';
import { DEFAULT_TESTIMONIALS, sortTestimonials } from '../../data/testimonials';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX, HiEye, HiEyeOff, HiDownload } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';

const TEXT_LIMIT = 600;

const inputClass =
  'w-full bg-white border border-slate-200 rounded-[10px] px-4 py-2.5 text-[15px] text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:border-[#005eb8] focus:ring-2 focus:ring-[#005eb8]/10';
const labelClass = 'block text-sm font-medium text-[#0f172a] mb-1.5';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [importing, setImporting] = useState(false);
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm();

  const textLength = (useWatch({ control, name: 'text' }) || '').length;

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'testimonials'));
        if (!active) return;
        setTestimonials(sortTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
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

  const refresh = () => setReloadKey((k) => k + 1);

  const retryFetch = () => {
    setLoading(true);
    refresh();
  };

  const nextOrder = () => testimonials.reduce((max, t) => Math.max(max, Number(t.order) || 0), 0) + 1;

  const openAdd = () => {
    setEditing(null);
    reset({ name: '', role: '', company: '', text: '', rating: '5', order: nextOrder(), visible: true });
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    reset({
      name: t.name || '',
      role: t.role || '',
      company: t.company || '',
      text: t.text || '',
      rating: String(t.rating || 5),
      order: t.order ?? '',
      visible: t.visible !== false,
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name.trim(),
      role: data.role.trim(),
      company: data.company.trim(),
      text: data.text.trim(),
      rating: parseInt(data.rating, 10) || 5,
      order: Number(data.order) || nextOrder(),
      visible: Boolean(data.visible),
    };
    try {
      if (editing) {
        await updateDoc(doc(db, 'testimonials', editing.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Testimonial updated!');
      } else {
        await addDoc(collection(db, 'testimonials'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Testimonial added!');
      }
      setShowModal(false);
      refresh();
    } catch (err) {
      toast.error(describeFirestoreError(err));
    }
  };

  const toggleVisible = async (t) => {
    try {
      await updateDoc(doc(db, 'testimonials', t.id), { visible: t.visible === false, updatedAt: serverTimestamp() });
      toast.success(t.visible === false ? 'Now shown on the website.' : 'Hidden from the website.');
      refresh();
    } catch (err) {
      toast.error(describeFirestoreError(err));
    }
  };

  const handleDelete = async (t) => {
    if (!confirm(`Delete the testimonial from ${t.name}? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'testimonials', t.id));
      toast.success('Testimonial deleted.');
      refresh();
    } catch (err) {
      toast.error(describeFirestoreError(err));
    }
  };

  const importDefaults = async () => {
    setImporting(true);
    try {
      const batch = writeBatch(db);
      DEFAULT_TESTIMONIALS.forEach((t) => {
        batch.set(doc(collection(db, 'testimonials')), { ...t, createdAt: serverTimestamp() });
      });
      await batch.commit();
      toast.success('Website testimonials imported. You can now edit them here.');
      refresh();
    } catch (err) {
      toast.error(describeFirestoreError(err));
    } finally {
      setImporting(false);
    }
  };

  const shownCount = testimonials.filter((t) => t.visible !== false).length;

  return (
    <AdminLayout title="Testimonials">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a]">Manage Testimonials</h2>
          <p className="text-[#64748b] text-sm">
            Client reviews shown in the &quot;Client Testimonials&quot; section of your home page.
            {testimonials.length > 0 && ` ${shownCount} of ${testimonials.length} shown.`}
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm self-start sm:self-auto"><HiPlus /> Add Testimonial</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" role="status" aria-label="Loading testimonials">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-4 w-14 rounded-full" />
              </div>
              <div className="space-y-2 mb-5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
              <div className="flex items-center gap-2.5 mb-4">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 flex-1" />
              </div>
            </div>
          ))}
        </div>
      ) : loadError ? (
        <AdminLoadError message={loadError} onRetry={retryFetch} />
      ) : testimonials.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-8 sm:p-12 text-center">
          <h3 className="text-[#0f172a] font-bold mb-2">No testimonials managed here yet</h3>
          <p className="text-[#64748b] text-sm max-w-lg mx-auto mb-6">
            Your website is currently showing its {DEFAULT_TESTIMONIALS.length} built-in testimonials. Import them to
            edit, reorder or hide them from this panel, or add a new one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={importDefaults} disabled={importing} className="btn-primary text-sm justify-center disabled:opacity-60">
              <HiDownload /> {importing ? 'Importing...' : 'Import website testimonials'}
            </button>
            <button onClick={openAdd} className="btn-outline text-sm justify-center"><HiPlus /> Add New</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {testimonials.map((t) => {
            const hidden = t.visible === false;
            return (
              <div key={t.id} className={`bg-white border border-gray-100 rounded-xl p-5 flex flex-col ${hidden ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={13} className={i < (t.rating || 5) ? 'text-amber-400' : 'text-slate-200'} />
                    ))}
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${hidden ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'}`}>
                    {hidden ? 'Hidden' : 'Shown'}
                  </span>
                </div>

                <p className="text-[#334155] text-sm leading-relaxed line-clamp-4 mb-4 flex-1">&ldquo;{t.text}&rdquo;</p>

                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-[#005eb8] text-white flex items-center justify-center text-xs font-bold">
                    {(t.name || '?').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#0f172a] text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-[#64748b] text-xs truncate">{[t.role, t.company].filter(Boolean).join(', ')}</div>
                  </div>
                  <span className="ml-auto text-[11px] text-[#94a3b8] whitespace-nowrap">Order {t.order ?? '—'}</span>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button onClick={() => openEdit(t)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-[#475569] hover:bg-slate-50 hover:text-[#005eb8] cursor-pointer">
                    <HiPencil size={15} /> Edit
                  </button>
                  <button onClick={() => toggleVisible(t)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-[#475569] hover:bg-slate-50 hover:text-[#005eb8] cursor-pointer">
                    {hidden ? <><HiEye size={15} /> Show</> : <><HiEyeOff size={15} /> Hide</>}
                  </button>
                  <button onClick={() => handleDelete(t)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-[#475569] hover:bg-red-50 hover:text-red-600 cursor-pointer">
                    <HiTrash size={15} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-[#0f172a] font-bold text-lg">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={closeModal} className="text-[#94a3b8] hover:text-[#0f172a] cursor-pointer" aria-label="Close"><HiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Client name *</label>
                <input {...register('name', { required: 'Client name is required', maxLength: 80 })} className={inputClass} placeholder="e.g. Rahul Sharma" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message || 'Too long'}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Role</label>
                  <input {...register('role', { maxLength: 60 })} className={inputClass} placeholder="e.g. CEO & Founder" />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input {...register('company', { maxLength: 80 })} className={inputClass} placeholder="e.g. ScaleTech Solutions" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Review text *</label>
                <textarea
                  {...register('text', { required: 'Review text is required', maxLength: { value: TEXT_LIMIT, message: `Keep it under ${TEXT_LIMIT} characters` } })}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="What did the client say about working with you?"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-red-500 text-xs">{errors.text?.message}</p>
                  <p className={`text-xs ${textLength > TEXT_LIMIT ? 'text-red-500' : 'text-[#94a3b8]'}`}>{textLength}/{TEXT_LIMIT}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Rating</label>
                  <select {...register('rating')} className={inputClass}>
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Display order</label>
                  <input type="number" min="1" {...register('order')} className={inputClass} />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" {...register('visible')} className="w-4 h-4 accent-[#005eb8] cursor-pointer" />
                <span className="text-sm text-[#0f172a]">Show on website</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center text-sm disabled:opacity-60">
                  {isSubmitting ? 'Saving...' : editing ? 'Save Changes' : 'Add Testimonial'}
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
