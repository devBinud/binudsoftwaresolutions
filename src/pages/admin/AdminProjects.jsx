import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  const fetchProjects = async () => {
    const snap = await getDocs(collection(db, 'projects'));
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => { setEditing(null); reset(); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    ['title', 'category', 'description', 'tags', 'liveUrl'].forEach(k => setValue(k, p[k]));
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, tags: data.tags?.split(',').map(t => t.trim()).filter(Boolean) || [] };
      if (editing) {
        await updateDoc(doc(db, 'projects', editing.id), { ...payload, updatedAt: serverTimestamp() });
        toast.success('Project updated!');
      } else {
        await addDoc(collection(db, 'projects'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Project added!');
      }
      setShowModal(false); reset(); fetchProjects();
    } catch { toast.error('Something went wrong.'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await deleteDoc(doc(db, 'projects', id));
    toast.success('Project deleted.');
    fetchProjects();
  };

  return (
    <AdminLayout title="Projects">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a]">Manage Projects</h2>
          <p className="text-[#64748b] text-sm">Showcase your portfolio projects.</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add Project</button>
      </div>

      {loading ? (
        <div className="text-[#64748b] text-center py-20">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-[#64748b] mb-4">No projects yet.</p>
          <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add First Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-[#0f172a] font-semibold">{p.title}</h3>
                  <span className="text-xs text-[#005d9e] font-medium">{p.category}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-[#64748b] hover:text-[#005d9e]"><HiPencil size={15} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-[#64748b] hover:text-red-500"><HiTrash size={15} /></button>
                </div>
              </div>
              <p className="text-[#64748b] text-sm line-clamp-2 mb-3">{p.description}</p>
              {p.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-[#475569] rounded">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#0f172a] font-bold text-lg">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#94a3b8] hover:text-[#475569]"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Title *</label>
                <input {...register('title', { required: true })} className="form-input" placeholder="E-Commerce Platform" />
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Category</label>
                <select {...register('category')} className="form-input">
                  <option value="">Select category</option>
                  <option>Web</option><option>Mobile</option><option>Design</option><option>Cloud</option>
                </select>
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Description</label>
                <textarea {...register('description')} rows={3} className="form-input resize-none" placeholder="Project description..." />
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Tags (comma separated)</label>
                <input {...register('tags')} className="form-input" placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Live URL</label>
                <input {...register('liveUrl')} className="form-input" placeholder="https://example.com" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center text-sm">
                  {isSubmitting ? 'Saving...' : editing ? 'Update' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;
