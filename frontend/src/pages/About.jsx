import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';

function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-medium mb-2">Get to Know Me</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">About Me</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Full Stack Java Developer
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            I am a passionate Full Stack Java Developer currently pursuing my B.Tech in
            Computer Science Engineering (2026) from Lucknow, Uttar Pradesh, India.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            I specialize in building scalable Java applications using Spring Boot and
            modern web experiences using React.js. My core strength lies in designing
            robust backend systems with clean RESTful APIs, JWT authentication, and
            efficient database management.
          </p>
          <p className="text-gray-400 leading-relaxed">
            I have hands-on experience with Docker, Git, and CI/CD pipelines, and I
            enjoy building full-stack solutions from database design to polished UI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Personal Info</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a href="mailto:harshbaj369@gmail.com" className="hover:text-primary transition-colors">
                  harshbaj369@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary flex-shrink-0" />
                <span>+91 9369826491</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="text-primary flex-shrink-0" />
                <a
                  href="https://github.com/Harshbajpai2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  github.com/Harshbajpai2003
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-primary flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/in/harsh-bajpai-200h3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  linkedin.com/in/harsh-bajpai-200h3
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Education</h3>
            <div className="text-sm text-gray-400">
              <p className="text-white font-medium">B.Tech in Computer Science Engineering</p>
              <p className="text-primary mt-1">2022 – 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;