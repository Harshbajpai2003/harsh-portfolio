import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Harsh Bajpai. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-xl text-gray-400">
          <a
            href="https://github.com/Harshbajpai2003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          
          <a
            href="https://www.linkedin.com/in/harsh-bajpai-200h3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:harshbaj369@gmail.com"
            className="hover:text-primary transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;