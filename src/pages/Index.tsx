import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import TechBackground from '../components/TechBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative">
      {/* Global Tech Background */}
      <TechBackground />
      
      {/* Navigation - high z-index for overlay */}
      <Navigation />
      
      {/* Main content - middle z-index */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        <Hero />
        <About />
        <Projects />
        <Skills />        <Contact />
      </motion.main>
    </div>
  );
};

export default Index;
