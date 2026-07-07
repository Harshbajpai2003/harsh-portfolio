import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  FaProjectDiagram, FaTools, FaCertificate,
  FaEnvelope, FaSignOutAlt, FaPlus, FaTrash
} from 'react-icons/fa';

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, skills: 0, certificates: 0, messages: 0 });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [experiences, setExperiences] = useState([]);

 useEffect(() => {
  Promise.all([
    api.get('/projects'),
    api.get('/skills'),
    api.get('/certificates'),
    api.get('/contact'),
    api.get('/experiences'),
  ]).then(([p, s, c, m, e]) => {
    setProjects(p.data);
    setSkills(s.data);
    setCertificates(c.data);
    setMessages(m.data);
    setExperiences(e.data);
    setStats({
      projects: p.data.length,
      skills: s.data.length,
      certificates: c.data.length,
      messages: m.data.length,
    });
  }).catch(console.error);
}, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const deleteItem = async (endpoint, id, setter, list) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    await api.delete(`/${endpoint}/${id}`);
    setter(list.filter(item => item.id !== id));
  };

  const handleMarkRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

 const tabs = ['overview', 'projects', 'skills', 'experiences', 'certificates', 'messages'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-medium mb-1">Welcome back,</p>
          <h1 className="text-3xl font-heading font-bold">{user?.username}</h1>
        </motion.div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl text-gray-400 hover:text-red-400 transition-all text-sm"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<FaProjectDiagram />} label="Projects" value={stats.projects} color="text-primary" />
        <StatCard icon={<FaTools />} label="Skills" value={stats.skills} color="text-secondary" />
        <StatCard icon={<FaCertificate />} label="Certificates" value={stats.certificates} color="text-accent" />
        <StatCard icon={<FaEnvelope />} label="Messages" value={stats.messages} color="text-green-400" />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="font-heading font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Add Project', path: '/admin/projects/new' },
              { label: 'Add Skill', path: '/admin/skills/new' },
              { label: 'Add Certificate', path: '/admin/certificates/new' },
              { label: 'Write Blog Post', path: '/admin/blogs/new' },
              { label: 'Add Experience', path: '/admin/experiences/new' },
            ].map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white transition-all text-left"
              >
                <FaPlus className="text-primary" /> {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-lg">Projects</h3>
            <button
              onClick={() => navigate('/admin/projects/new')}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm transition-colors"
            >
              <FaPlus /> Add New
            </button>
          </div>
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No projects yet.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-medium text-white mb-1">{project.title}</h4>
                  <p className="text-gray-400 text-sm line-clamp-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies?.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteItem('projects', project.id, setProjects, projects)}
                  className="flex-shrink-0 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-lg">Skills</h3>
            <button
              onClick={() => navigate('/admin/skills/new')}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm transition-colors"
            >
              <FaPlus /> Add New
            </button>
          </div>
          {skills.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No skills yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map(skill => (
                <div key={skill.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{skill.name}</p>
                    <p className="text-xs text-gray-500">{skill.category} — {skill.proficiencyLevel}%</p>
                  </div>
                  <button
                    onClick={() => deleteItem('skills', skill.id, setSkills, skills)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Experiences Tab */}
{activeTab === 'experiences' && (
  <div className="space-y-3">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-heading font-semibold text-lg">Experience</h3>
      <button
        onClick={() => navigate('/admin/experiences/new')}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm transition-colors"
      >
        <FaPlus /> Add New
      </button>
    </div>
    {experiences.length === 0 ? (
      <p className="text-gray-400 text-center py-10">No experience entries yet.</p>
    ) : (
      experiences.map(exp => (
        <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
          <div>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
              exp.type === 'EDUCATION' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
            }`}>
              {exp.type}
            </span>
            <h4 className="font-medium text-white">{exp.title}</h4>
            <p className="text-sm text-primary">{exp.organization}</p>
            <p className="text-xs text-gray-500">{exp.startDate} — {exp.endDate || 'Present'}</p>
          </div>
          <button
            onClick={() => deleteItem('experiences', exp.id, setExperiences, experiences)}
            className="flex-shrink-0 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      ))
    )}
  </div>
)}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-lg">Certificates</h3>
            <button
              onClick={() => navigate('/admin/certificates/new')}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm transition-colors"
            >
              <FaPlus /> Add New
            </button>
          </div>
          {certificates.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No certificates yet.</p>
          ) : (
            certificates.map(cert => (
              <div key={cert.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{cert.title}</p>
                  <p className="text-sm text-primary">{cert.issuedBy}</p>
                  <p className="text-xs text-gray-500">{cert.issueDate}</p>
                </div>
                <button
                  onClick={() => deleteItem('certificates', cert.id, setCertificates, certificates)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-lg mb-4">Contact Messages</h3>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No messages yet.</p>
          ) : (
            messages.map(msg => (
              <div
                key={msg.id}
                className={`bg-white/5 border rounded-2xl p-5 ${msg.read ? 'border-white/10' : 'border-primary/30'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-white">{msg.name}</p>
                      {!msg.read && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mb-2">{msg.email}</p>
                    {msg.subject && <p className="text-gray-400 text-sm font-medium mb-1">{msg.subject}</p>}
                    <p className="text-gray-400 text-sm">{msg.message}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!msg.read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="px-3 py-1 text-xs bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteItem('contact', msg.id, setMessages, messages)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;