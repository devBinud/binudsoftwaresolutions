import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiX } from 'react-icons/hi';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  const fetchServices = async () => {
    const snap = await getDocs(collection(db, 'services'));
    setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => { setEditing(null); reset(); setShowModal(true); };
  const openEdit = (service) => {
    setEditing(service);
    setValue('title', service.title);
    setValue('description', service.description);
    setValue('icon', service.icon);
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateDoc(doc(db, 'services', editing.id), { ...data, updatedAt: serverTimestamp() });
        toast.success('Service updated!');
      } else {
        await addDoc(collection(db, 'services'), { ...data, createdAt: serverTimestamp() });
        toast.success('Service added!');
      }
      setShowModal(false);
      reset();
      fetchServices();
    } catch {
      toast.error('Something went wrong.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    await deleteDoc(doc(db, 'services', id));
    toast.success('Service deleted.');
    fetchServices();
  };

  return (
    <AdminLayout title="Services">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a]">Manage Services</h2>
          <p className="text-[#64748b] text-sm">Add, edit, or remove services shown on your website.</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <HiPlus /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="text-[#64748b] text-center py-20">Loading...</div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
          <p className="text-[#64748b] mb-4">No services yet.</p>
          <button onClick={openAdd} className="btn-primary text-sm"><HiPlus /> Add First Service</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[#0f172a] font-semibold">{service.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(service)} className="text-[#64748b] hover:text-[#005d9e] transition-colors">
                    <HiPencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-[#64748b] hover:text-red-500 transition-colors">
                    <HiTrash size={15} />
                  </button>
                </div>
              </div>
              <p className="text-[#64748b] text-sm line-clamp-3">{service.description}</p>
              {service.icon && <p className="text-[#005d9e] text-xs mt-2">Icon: {service.icon}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#0f172a] font-bold text-lg">{editing ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#94a3b8] hover:text-[#475569]"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Title *</label>
                <input {...register('title', { required: true })}
                  className="form-input" placeholder="Web Development" />
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Icon (emoji or name)</label>
                <input {...register('icon')}
                  className="form-input" placeholder="💻 or FaCode" />
              </div>
              <div>
                <label className="text-[#475569] text-sm font-medium mb-1.5 block">Description *</label>
                <textarea {...register('description', { required: true })} rows={4}
                  className="form-input resize-none" placeholder="Describe this service..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center text-sm">
                  {isSubmitting ? 'Saving...' : editing ? 'Update' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;
