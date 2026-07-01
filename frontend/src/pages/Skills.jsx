import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const categories = ['ALL', 'BACKEND', 'FRONTEND', 'DATABASE', 'DEVOPS', 'TOOLS'];

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-primary text-sm font-semibold">
          {skill.proficiencyLevel}%
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.proficiencyLevel}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
        />
      </div>
      <span className="text-gray-500 text-xs mt-2 block">{skill.category}</span>
    </motion.div>
  );
}

function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/skills')
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'ALL'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-primary font-medium mb-2">What I Know</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">Skills</h1>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;