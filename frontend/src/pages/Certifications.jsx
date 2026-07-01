import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/certificates')
      .then((res) => setCerts(res.data))
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
        <p className="text-primary font-medium mb-2">My Achievements</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Certifications</h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : certs.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No certifications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all"
            >
              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-primary text-sm mb-1">{cert.issuedBy}</p>
              <p className="text-gray-500 text-xs mb-4">{cert.issueDate}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  View Credential <FaExternalLinkAlt size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certifications;