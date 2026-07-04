import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';

function AdminAddProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', imageUrl: '', githubUrl: '',
    liveDemoUrl: '', technologies: '', featured: false, displayOrder: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/projects', {
        ...form,
        technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
      });
      navigate('/admin');
    } catch {
      setError('Failed to create project.');
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
        <h1 className="text-3xl font-heading font-bold mb-8">Add Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Title *', key: 'title', required: true },
            { label: 'GitHub URL', key: 'githubUrl' },
            { label: 'Live Demo URL', key: 'liveDemoUrl' },
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

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              placeholder="React, Spring Boot, MySQL"
              value={form.technologies}
              onChange={e => setForm({ ...form, technologies: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="featured" className="text-sm text-gray-400">Featured project</label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Add Project'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminAddProject;