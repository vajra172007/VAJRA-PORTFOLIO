
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface SocialLink {
  icon: typeof Github;
  href: string;
  label: string;
}

const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/vajra172007', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/vajra-s-108068333', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/vajra_shivam/?hl=en', label: 'Instagram' }
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 hover:border-cyan-400 hover:bg-gray-700/50 transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
