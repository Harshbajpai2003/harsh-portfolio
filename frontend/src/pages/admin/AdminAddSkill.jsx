import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';

function AdminAddSkill() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: 'BACKEND', proficiencyLevel: 80, iconUrl: '', displayOrder: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/skills', { ...form, proficiencyLevel: Number(form.proficiencyLevel), displayOrder: Number(form.displayOrder) });
      navigate('/admin');
    } catch {
      setError('Failed to create skill.');
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
        <h1 className="text-3xl font-heading font-bold mb-8">Add Skill</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Skill Name *</label>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Category *</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            >
              {['BACKEND', 'FRONTEND', 'DATABASE', 'DEVOPS', 'TOOLS'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Proficiency Level: {form.proficiencyLevel}%
            </label>
            <input
              type="range" min="0" max="100"
              value={form.proficiencyLevel}
              onChange={e => setForm({ ...form, proficiencyLevel: e.target.value })}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Display Order</label>
            <input
              type="number"
              value={form.displayOrder}
              onChange={e => setForm({ ...form, displayOrder: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Add Skill'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminAddSkill;