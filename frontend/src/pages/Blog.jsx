import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs/published')
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-primary font-medium mb-2">My Thoughts</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Blog</h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No blog posts yet.</p>
          <p className="text-gray-600 text-sm mt-2">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer"
            >
              <p className="text-gray-500 text-xs mb-3">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{blog.summary}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;