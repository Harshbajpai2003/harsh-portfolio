import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../services/api';

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/contact', data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-primary font-medium mb-2">Get In Touch</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Contact</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-gray-400 leading-relaxed">
            I am open to full-time roles, freelance projects, and collaboration
            opportunities. Feel free to reach out!
          </p>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <span>harshbaj369@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-primary" />
              <span>+91 9369826491</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
              })}
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('subject')}
              placeholder="Subject (optional)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <textarea
              {...register('message', { required: 'Message is required' })}
              placeholder="Your Message"
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-sm text-center">
              Message sent! I will get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">
              Failed to send. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}

export default Contact;