
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });  const skillCategories = [
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML', level: 85 },
        { name: 'CSS', level: 75 },
        { name: 'JavaScript', level: 70 },
        { name: 'React', level: 60 }
      ],
      color: 'cyan'
    },    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'C Language', level: 75 }
      ],
      color: 'blue'
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git/GitHub', level: 75 },
        { name: 'VS Code', level: 85 },
        { name: 'Figma', level: 60 },
        { name: 'ChatGPT', level: 90 }
      ],
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: {
        text: 'text-cyan-400',
        bg: 'bg-cyan-400',
        border: 'border-cyan-400',
        gradient: 'from-cyan-400 to-cyan-600'
      },
      blue: {
        text: 'text-blue-400',
        bg: 'bg-blue-400',
        border: 'border-blue-400',
        gradient: 'from-blue-400 to-blue-600'
      },
      purple: {
        text: 'text-purple-400',
        bg: 'bg-purple-400',
        border: 'border-purple-400',
        gradient: 'from-purple-400 to-purple-600'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            As a computer science student, I'm constantly learning and improving my skills in these areas. Here's my current progress on my learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
              >
                <h3 className={`text-2xl font-bold mb-6 ${colors.text}`}>
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>        {/* Currently Learning Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-auto rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 flex items-center justify-center p-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Currently Learning</h3>            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Next.js', icon: '⚛️' },
                { name: 'Tailwind CSS', icon: '🎨' },
                { name: 'TypeScript', icon: '📘' }
              ].map((item) => (
                <div key={item.name} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-medium text-white">{item.name}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-6">Always expanding my knowledge in computer science and web development</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
