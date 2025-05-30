
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import ContactForm from './ContactForm';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-gray-900/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and explore how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <ContactInfo inView={inView} />
            <SocialLinks />
          </motion.div>

          {/* Contact Form */}
          <ContactForm inView={inView} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
