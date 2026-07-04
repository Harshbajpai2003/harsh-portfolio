import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-heading font-bold text-white">
          Harsh<span className="text-primary">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-gray-300 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <Link
                to="/admin"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-primary transition-colors ml-2"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-300 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/admin" className="text-primary font-medium" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-red-400 text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-500" onClick={() => setIsOpen(false)}>
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;