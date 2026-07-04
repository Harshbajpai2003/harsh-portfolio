import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Certifications from './pages/Certifications';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAddProject from './pages/admin/AdminAddProject';
import AdminAddSkill from './pages/admin/AdminAddSkill';
import AdminAddCertificate from './pages/admin/AdminAddCertificate';
import AdminAddBlog from './pages/admin/AdminAddBlog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><AdminAddProject /></ProtectedRoute>} />
        <Route path="/admin/skills/new" element={<ProtectedRoute><AdminAddSkill /></ProtectedRoute>} />
        <Route path="/admin/certificates/new" element={<ProtectedRoute><AdminAddCertificate /></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><AdminAddBlog /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;