import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';

function AdminAddBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', summary: '', content: '', coverImageUrl: '', status: 'DRAFT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/blogs', form);
      navigate('/admin');
    } catch {
      setError('Failed to create blog post.');
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
        <h1 className="text-3xl font-heading font-bold mb-8">Write Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Summary</label>
            <input
              value={form.summary}
              onChange={e => setForm({ ...form, summary: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Cover Image URL</label>
            <input
              value={form.coverImageUrl}
              onChange={e => setForm({ ...form, coverImageUrl: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Content *</label>
            <textarea
              required
              rows={10}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Write your blog post here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Publish Post'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminAddBlog;