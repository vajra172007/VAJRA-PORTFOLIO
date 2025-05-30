
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfoItem {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string | null;
}

interface ContactInfoProps {
  inView: boolean;
}

const ContactInfo = ({ inView }: ContactInfoProps) => {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex.johnson@email.com',
      href: 'mailto:alex.johnson@email.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: null
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            className="flex items-center space-x-4"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700">
              <info.icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{info.label}</p>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-white">{info.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
