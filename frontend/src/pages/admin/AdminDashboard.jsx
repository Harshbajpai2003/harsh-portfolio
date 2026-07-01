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
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/skills'),
      api.get('/certificates'),
      api.get('/contact'),
    ]).then(([projects, skills, certs, msgs]) => {
      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        certificates: certs.data.length,
        messages: msgs.data.length,
      });
      setMessages(msgs.data);
    }).catch(console.error);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteMessage = async (id) => {
    await api.delete(`/contact/${id}`);
    setMessages(messages.filter((m) => m.id !== id));
  };

  const handleMarkRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    setMessages(messages.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
        {['overview', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Add Project', path: '/admin/projects/new' },
                { label: 'Add Skill', path: '/admin/skills/new' },
                { label: 'Add Certificate', path: '/admin/certificates/new' },
                { label: 'Write Blog Post', path: '/admin/blogs/new' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white transition-all text-left"
                >
                  <FaPlus className="text-primary" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-heading font-semibold mb-4">
              Unread Messages
              {messages.filter((m) => !m.read).length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-xs rounded-full">
                  {messages.filter((m) => !m.read).length}
                </span>
              )}
            </h3>
            {messages.filter((m) => !m.read).length === 0 ? (
              <p className="text-gray-500 text-sm">No unread messages.</p>
            ) : (
              <div className="space-y-3">
                {messages.filter((m) => !m.read).slice(0, 3).map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <p className="text-white font-medium">{msg.name}</p>
                    <p className="text-gray-400 truncate">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-10">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white/5 border rounded-2xl p-5 ${
                  msg.read ? 'border-white/10' : 'border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-white">{msg.name}</p>
                      {!msg.read && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mb-2">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-gray-400 text-sm font-medium mb-1">{msg.subject}</p>
                    )}
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
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
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