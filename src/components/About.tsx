
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });  const timelineItems = [
    {
      year: '2024 June',
      title: 'BE. Computer Science',
      company: 'Kumaraguru College of Science and Technology',
      description: 'Started pursuing Bachelor of Engineering in Computer Science, focusing on core computer science fundamentals and modern software development practices.'
    },
    {
      year: '2025 January',
      title: 'C Language',
      company: 'Resources: College Course, YouTube, ChatGPT',
      description: 'Learned fundamental programming concepts through C language, including memory management, data structures, and algorithmic thinking.'
    },
    {
      year: '2025 April',
      title: 'HTML',
      company: 'Resources: YouTube, ChatGPT',
      description: 'Mastered the fundamentals of HTML, creating semantic markup structures and learning about accessibility best practices for modern web development.'
    },
    {
      year: '2025 May',
      title: 'Python and CSS',
      company: 'Resources: YouTube, ChatGPT',
      description: 'Developed skills in Python programming for automation and data analysis while simultaneously learning CSS for creating responsive and visually appealing web interfaces.'
    },
    {
      year: '2025 June',
      title: 'JavaScript',
      company: 'Resources: YouTube, ChatGPT',
      description: 'Built interactive web experiences using JavaScript, focusing on DOM manipulation, event handling, and modern ES6+ features to create dynamic web applications.'
    },
    {
      year: '2025 June',
      title: 'React & Next.js',
      company: 'Resources: YouTube, ChatGPT, Udemy',
      description: 'Advanced to modern frontend frameworks, building component-based UIs with React and server-side rendering with Next.js to develop fast, SEO-friendly web applications.'
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
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a Computer Science student at Kumaraguru College of Science and Technology
            with a passion for web development. Currently on a self-learning journey,
            I'm building my skills in HTML, CSS, JavaScript, Python and modern frameworks
            to create engaging and responsive web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Personal Info & Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Quick Facts</h3>
              <div className="space-y-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{fact}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">My Learning Journey</h3>
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="relative pl-8 border-l-2 border-cyan-400/30"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full" />
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-cyan-400">{item.year}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-400 mb-2">{item.company}</p>
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
