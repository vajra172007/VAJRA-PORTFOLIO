
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { portfolioEvents } from '../lib/analytics';

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projects = [
    {
      id: 1,
      title: 'WHEATHER WEB-APP',
      description: 'The app fetches real-time weather data based on user input and displays temperature, weather conditions, and humidity details in a clean and user-friendly interface. This project really helped me improve my skills in API integration, responsive design, and JavaScript DOM manipulation.',
      image: '/Wheather Web-App.png',
      technologies: ['HTML', 'CSS', 'JAVA-SCRIPT'],
      github: 'https://github.com',
      live: 'https://musiiwheather.netlify.app/',
      featured: true
    },
    {
      id: 2,
      title: 'Age Calculator Web-App',
      description: 'The app allows users to input their date of birth and instantly calculates their exact age in years, months, and days. This project helped me get better at date manipulation, form handling, and responsive UI design. Loved seeing how small ideas like this can turn into interactive, useful tools! 🔥',
      image: '/Age Calculator Web-App.png',
      technologies: ['HTML', 'CSS', 'JAVA-SCRIPT'],
      github: 'https://github.com',
      live: 'https://v-meenu-a.netlify.app/',
      featured: true
    },
    {
      id: 3,
      title: 'To-Do List Web App 📝',
      description: 'A simple yet powerful to-do list application that allows users to create, edit, and delete tasks with a clean and intuitive interface. This app lets users add and track their daily tasks in a smooth, clutter-free interface and local storage for persistent data.',
      image: '/To-Do List App.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      live: 'https://vajra-to-do.netlify.app/',
      featured: false
    },    {
      id: 4,
      title: 'Expense Tracker Web App 💰',
      description: 'A web application that helps users track their expenses and manage their budget effectively. Users can add, edit, and delete expenses, categorize them, and view their spending patterns over time.',
      image: '/Expense Tracker.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      live: 'https://67fe82be055d6311a7424156--heroic-kashata-483410.netlify.app/',
      featured: false
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in modern web development, 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}              onMouseEnter={() => {
                setHoveredProject(project.id);
                portfolioEvents.projectView(project.title);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative group cursor-pointer"
            >              <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="relative">
                  <div className="aspect-video overflow-hidden bg-gray-900/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 bg-gradient-to-br from-gray-900 to-gray-800"
                      style={{
                        imageRendering: 'crisp-edges',
                        filter: 'brightness(0.9) contrast(1.1) saturate(1.1)',
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.filter = 'brightness(1) contrast(1.1) saturate(1.1)';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                  </div>                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gray-900/95 backdrop-blur-md flex items-center justify-center z-10 rounded-xl"
                  >
                    <div className="text-center p-6 max-w-sm">
                      <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: hoveredProject === project.id ? 0 : 20 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                        <div className="flex justify-center space-x-3">                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => portfolioEvents.projectLinkClick(project.title, 'github')}
                            className="p-3 bg-gray-700/80 rounded-full hover:bg-gray-600 transition-all duration-200 shadow-lg"
                          >
                            <Github size={18} />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => portfolioEvents.projectLinkClick(project.title, 'demo')}
                            className="p-3 bg-cyan-600/90 rounded-full hover:bg-cyan-500 transition-all duration-200 shadow-lg shadow-cyan-500/20"
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-1.5 xs:px-2 sm:px-2.5 md:px-3 py-0.5 xs:py-0.5 sm:py-1 text-2xs xs:text-xs sm:text-xs md:text-xs font-medium bg-gray-700/50 text-cyan-400 rounded-full border border-gray-600/50 whitespace-nowrap min-w-0 flex-shrink-0"
                        style={{
                          fontSize: 'clamp(0.5rem, 2.5vw, 0.75rem)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
