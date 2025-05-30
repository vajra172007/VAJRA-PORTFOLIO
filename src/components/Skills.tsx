
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { Suspense } from 'react';

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Framer Motion', level: 88 }
      ],
      color: 'cyan'
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 87 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MongoDB', level: 80 }
      ],
      color: 'blue'
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'AWS/Cloud', level: 83 },
        { name: 'Docker', level: 78 },
        { name: 'Git/GitHub', level: 92 },
        { name: 'Figma', level: 85 }
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
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies and tools.
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
        </div>

        {/* 3D Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-96 rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-gray-700/30"
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              
              <Center>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={0.5}
                  height={0.1}
                  curveSegments={12}
                >
                  SKILLS
                  <meshStandardMaterial attach="material" color="#00ffff" />
                </Text3D>
              </Center>
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
