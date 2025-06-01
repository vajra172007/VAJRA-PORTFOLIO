
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Reduced threshold for better mobile performance
    triggerOnce: true,
    rootMargin: '50px' // Trigger animations earlier on mobile
  });  const timelineItems = [
    {
      year: '2024 June',
      title: 'BE. Computer Science',
      company: 'Kumaraguru College of Technology',
      description: 'Started pursuing Bachelor of Engineering in Computer Science with focus on modern software development.'
    },
    {
      year: '2025 Jan',
      title: 'C Language',
      company: 'College Course & Self-Study',
      description: 'Learned fundamental programming concepts, memory management, and data structures.'
    },
    {
      year: '2025 Apr',
      title: 'HTML',
      company: 'Self-Study',
      description: 'Mastered HTML semantics and accessibility best practices for web development.'
    },
    {
      year: '2025 May',
      title: 'Python and CSS',
      company: 'Self-Study',
      description: 'Developed Python skills for automation and CSS for responsive web interfaces.'
    },
    {
      year: '2025 June',
      title: 'JavaScript',
      company: 'Self-Study',
      description: 'Built interactive web experiences with modern JavaScript and ES6+ features.'
    },
    {
      year: '2025 June',
      title: 'React & Next.js',
      company: 'Online Courses',
      description: 'Advanced to modern frontend frameworks for building fast, scalable applications.'
    }
  ];
  const funFacts = [
    'Computer Science enthusiast 💻',
    'Self-taught web developer 🌐',
    'Learning multiple technologies simultaneously 🚀',
    'Building portfolio projects to showcase skills 🛠️',
    'Passionate about modern web development frameworks ⚛️'
  ];
  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            I'm a Computer Science student at Kumaraguru College of Technology
            with a passion for web development. Currently on a self-learning journey,
            building skills in modern web technologies to create engaging experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Personal Info & Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-gray-800/40 rounded-2xl p-6 sm:p-8 border border-gray-700/50">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-cyan-400">Quick Facts</h3>
              <div className="space-y-3 sm:space-y-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">{fact}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-cyan-400">My Learning Journey</h3>
            <div className="space-y-6 sm:space-y-8">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + index * 0.03, // Reduced stagger delay
                    ease: "easeOut" 
                  }}
                  className="relative pl-6 sm:pl-8 border-l-2 border-cyan-400/30"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full" />
                  <div className="bg-gray-800/20 rounded-lg p-4 sm:p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-cyan-400">{item.year}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">{item.company}</p>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
