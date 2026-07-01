import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experiences')
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-primary font-medium mb-2">My Journey</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Experience</h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : experiences.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No experience entries yet.</p>
      ) : (
        <div className="relative border-l-2 border-primary/30 ml-4 space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-gray-900" />
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                exp.type === 'EDUCATION'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-primary/20 text-primary'
              }`}>
                {exp.type}
              </span>
              <h3 className="text-lg font-heading font-semibold text-white">{exp.title}</h3>
              <p className="text-primary text-sm mb-1">{exp.organization}</p>
              <p className="text-gray-500 text-xs mb-3">
                {exp.startDate} — {exp.endDate || 'Present'}
              </p>
              {exp.description && (
                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Experience;