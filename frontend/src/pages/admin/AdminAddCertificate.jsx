import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';

function AdminAddCertificate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', issuedBy: '', issueDate: '', credentialUrl: '', imageUrl: '', displayOrder: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/certificates', form);
      navigate('/admin');
    } catch {
      setError('Failed to create certificate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-white text-sm mb-6 block">
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-heading font-bold mb-8">Add Certificate</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Title *', key: 'title', required: true },
            { label: 'Issued By *', key: 'issuedBy', required: true },
            { label: 'Issue Date', key: 'issueDate', type: 'date' },
            { label: 'Credential URL', key: 'credentialUrl' },
            { label: 'Image URL', key: 'imageUrl' },
            { label: 'Display Order', key: 'displayOrder', type: 'number' },
          ].map(({ label, key, required, type }) => (
            <div key={key}>
              <label className="block text-sm text-gray-400 mb-1">{label}</label>
              <input
                type={type || 'text'}
                required={required}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Add Certificate'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminAddCertificate;