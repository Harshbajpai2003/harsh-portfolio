import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getAllProjects } from '../services/projectService';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-heading font-semibold text-white">
          {project.title}
        </h3>
        <div className="flex gap-3 text-gray-400">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Live Demo"
            >
              <FaExternalLinkAlt size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies?.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProjects()
      .then((data) => setProjects(data))
      .catch(() => setError('Failed to load projects.'))
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
        <p className="text-primary font-medium mb-2">What I have Built</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Projects
        </h1>
      </motion.div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center py-20">{error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-400 text-center py-20">No projects yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Projects;