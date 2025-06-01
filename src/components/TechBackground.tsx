import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CodeLine {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
}

const TechBackground = () => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [screenDimensions, setScreenDimensions] = useState({ width: 1920, height: 1080 });
  const codeSnippets = [
    // VAJRA's Core Identity & Bio
    "const developer = 'VAJRA';",
    "console.log('Building the future...');",
    "// Computer Science Student",
    "// Web Developer & Tech Enthusiast",
    "const passion = 'coding + creativity';",
    "// Always learning, always growing",
    "const university = 'KCST';",
    "let dreamJob = 'Full Stack Developer';",
    "const location = 'India 🇮🇳';",
    
    // Programming Languages & Skills
    "const skills = ['HTML', 'CSS', 'JavaScript'];",
    "const frameworks = ['React', 'Next.js'];",
    "const languages = ['Python', 'C', 'JavaScript'];",
    "import React from 'react';",
    "from flask import Flask, render_template",
    "console.log('Hello, World!');",
    "print('Learning Python is awesome!')",
    "const isLearning = true;",
    "while(learning) { skills++; }",
    "function createMagic() { return 'code'; }",
    
    // Web Development Focus
    "const portfolio = 'vajra-dev.me';",
    "document.querySelector('.hero');",
    "const responsive = 'mobile-first';",
    "fetch('/api/projects').then(res => res.json())",
    "const UI = beautiful && functional;",
    "localStorage.setItem('theme', 'dark');",
    "const animations = 'framer-motion';",
    "import { motion } from 'framer-motion';",
    "const styling = 'tailwind-css';",
    "git add . && git commit -m 'New feature'",
    
    // Projects & Achievements
    "// Weather Web App ⛅",
    "// Age Calculator 📅",
    "// To-Do List App ✅",
    "// Expense Tracker 💰",
    "const projects = 'showcase-ready';",
    "const deployment = 'netlify.app';",
    "// Building responsive UIs",
    "const apiKey = process.env.WEATHER_API;",
    "const calculator = (birthDate) => age;",
    "const tasks = JSON.parse(localStorage);",
    
    // Learning Journey & Growth
    "// Started coding in 2024",
    "const progress = 'exponential';",
    "// Self-taught developer",
    "const resources = ['YouTube', 'ChatGPT', 'Udemy'];",
    "const mentality = 'growth-mindset';",
    "// From beginner to building apps",
    "const journey = 'just-getting-started';",
    "// HTML → CSS → JS → React",
    "const nextGoal = 'TypeScript';",
    "// Practice makes perfect",
    
    // Technical Comments & Philosophy
    "// Clean code is happy code",
    "// Mobile-first approach",
    "// User experience matters",
    "// Responsive design is key",
    "// Accessibility for everyone",
    "// Performance optimization",
    "// Code review is learning",
    "// Debug like a detective",
    "// Version control is life",
    "// Documentation saves time",
    
    // Tech Stack & Tools
    "const editor = 'VS Code';",
    "const browser = 'Chrome DevTools';",
    "const design = 'Figma';",
    "const hosting = 'Netlify';",
    "const version_control = 'Git & GitHub';",
    "const package_manager = 'npm';",
    "const css_framework = 'Tailwind';",
    "const ai_assistant = 'ChatGPT';",
    "const terminal = 'PowerShell';",
    "const deployment = 'CI/CD pipeline';",
    
    // Motivational & Personal
    "// Code with purpose",
    "const motto = 'Learn. Build. Share.';",
    "// Every bug is a lesson",
    "const caffeine = 'developer.fuel';",
    "// Think in components",
    "const creativity = 'unlimited';",
    "// Problem solver by nature",
    "const curiosity = 'never-ending';",
    "// Building digital experiences",
    "const impact = 'positive-change';",
    
    // Future Aspirations
    "// Goal: Senior Developer",
    "const future = 'full-stack-expert';",
    "// Open source contributor",
    "const vision = 'tech-for-good';",
    "// Continuous improvement",
    "const learning = 'lifelong-journey';",
    "// Mentoring future devs",
    "const legacy = 'knowledge-sharing';",
    "// Innovation through code",
    "const mission = 'solve-real-problems';",
    
    // Code Patterns & Syntax
    "if (passionate) { code(); }",
    "for (let i = 0; i < projects.length; i++)",
    "const handleClick = (e) => { ... }",
    "try { buildApp(); } catch(e) { learn(e); }",
    "return <Component {...props} />;",
    "async function fetchData() { ... }",
    "const [state, setState] = useState();",
    "useEffect(() => { ... }, []);",
    "export default MyComponent;",
    "className='flex items-center'",
    
    // Fun & Personality
    "// Powered by determination",
    "const energy = 'positive-vibes';",
    "// Code is poetry in motion",
    "const hobby = 'turning-ideas-into-reality';",
    "// Always curious, always coding",
    "const playlist = 'lo-fi-coding-beats';",
    "// Breaking things to build better",
    "const mindset = 'solution-oriented';",
    "// From pixels to functionality",
    "// Making the web a better place",
    
    // Development Process
    "// Plan → Code → Test → Deploy",
    "const workflow = 'agile-methodology';",
    "// Start with wireframes",
    "const approach = 'iterative-development';",
    "// User feedback drives improvement",
    "const testing = 'essential-step';",
    "// Refactor for clarity",
    "const optimization = 'ongoing-process';",
    "// Ship fast, learn faster",
    "const delivery = 'mvp-first';",
  ];

  useEffect(() => {
    const updateScreenDimensions = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreenDimensions();
    window.addEventListener('resize', updateScreenDimensions);

    return () => {
      window.removeEventListener('resize', updateScreenDimensions);
    };
  }, []);

  useEffect(() => {
    const updateCodeLines = () => {
      const newCodeLines: CodeLine[] = [];
      const colors = [
        '#00ff88', '#06b6d4', '#fbbf24', '#8b5cf6',
        '#f97316', '#10b981', '#ef4444', '#ec4899',
        '#3b82f6', '#84cc16', '#f59e0b', '#14b8a6',
        '#6366f1', '#f472b6', '#22d3ee', '#a78bfa',
      ];      const screenWidth = Math.max(320, window.innerWidth);
      const screenHeight = Math.max(568, window.innerHeight);
      const screenArea = screenWidth * screenHeight;

      // Smart snippet count calculation based on screen density and aspect ratio
      const calculateSnippetCount = () => {
        const aspectRatio = screenWidth / screenHeight;
        let baseCount;
        
        // Adjust base count based on screen size categories
        if (screenWidth < 480) {
          baseCount = Math.floor(screenArea / 60000); // Fewer snippets on very small screens
        } else if (screenWidth < 768) {
          baseCount = Math.floor(screenArea / 50000);
        } else if (screenWidth < 1024) {
          baseCount = Math.floor(screenArea / 45000);
        } else if (screenWidth < 1440) {
          baseCount = Math.floor(screenArea / 40000);
        } else {
          baseCount = Math.floor(screenArea / 35000); // More snippets on large screens
        }
        
        // Adjust for aspect ratio - wider screens can handle more snippets
        if (aspectRatio > 1.8) {
          baseCount = Math.floor(baseCount * 1.15); // Ultra-wide screens
        } else if (aspectRatio > 1.5) {
          baseCount = Math.floor(baseCount * 1.05); // Wide screens
        } else if (aspectRatio < 0.8) {
          baseCount = Math.floor(baseCount * 0.85); // Portrait or very tall screens
        }
        
        return baseCount;
      };

      const baseSnippetCount = calculateSnippetCount();      const snippetCount = Math.max(8, Math.min(baseSnippetCount, 50));
      
      // Responsive snippet dimensions
      const snippetWidth = screenWidth < 640 ? 180 : screenWidth < 1024 ? 210 : 240;
      const snippetHeight = screenWidth < 640 ? 28 : screenWidth < 1024 ? 32 : 36;
      
      // Smart minimum distance calculation based on screen size and density
      const calculateMinDistance = () => {
        const baseDistance = Math.max(snippetWidth, snippetHeight);
        let multiplier;
        
        // Adjust spacing based on screen size for optimal visual distribution
        if (screenWidth < 480) {
          multiplier = 1.2; // Closer spacing on very small screens
        } else if (screenWidth < 768) {
          multiplier = 1.3;
        } else if (screenWidth < 1024) {
          multiplier = 1.4;
        } else if (screenWidth < 1440) {
          multiplier = 1.5; // More breathing room on larger screens
        } else {
          multiplier = 1.6; // Maximum spacing on very large screens
        }
        
        return baseDistance * multiplier;
      };
      
      const minDist = calculateMinDistance();function poissonDiskSampling(width: number, height: number, minDist: number, maxTries: number, count: number) {
        const points: { x: number, y: number }[] = [];
        let tries = 0;
        
        // Smart responsive padding based on screen size and resolution
        const calculatePadding = () => {
          const basePercentage = 0.08; // 8% of screen as base padding
          const minPadding = 40;
          const maxPadding = 120;
          
          // Calculate percentage-based padding
          const percentagePadding = Math.max(width, height) * basePercentage;
          
          // Apply responsive scaling
          let scaledPadding;
          if (screenWidth < 480) {
            scaledPadding = percentagePadding * 0.7; // Reduce padding on very small screens
          } else if (screenWidth < 768) {
            scaledPadding = percentagePadding * 0.85;
          } else if (screenWidth < 1024) {
            scaledPadding = percentagePadding;
          } else if (screenWidth < 1440) {
            scaledPadding = percentagePadding * 1.1;
          } else {
            scaledPadding = percentagePadding * 1.25; // More padding on large screens
          }
          
          // Clamp to min/max values
          return Math.min(Math.max(scaledPadding, minPadding), maxPadding);
        };

        const padding = calculatePadding();
        
        // Add extra safe zone for snippet content
        const safeZoneX = snippetWidth * 0.6;
        const safeZoneY = snippetHeight * 0.6;

        while (points.length < count && tries < count * maxTries) {
          const x = Math.random() * (width - snippetWidth - (padding + safeZoneX) * 2) + (padding + safeZoneX) + snippetWidth / 2;
          const y = Math.random() * (height - snippetHeight - (padding + safeZoneY) * 2) + (padding + safeZoneY) + snippetHeight / 2;
          let ok = true;

          for (let p of points) {
            const dx = p.x - x;
            const dy = p.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDist) {
              ok = false;
              break;
            }
          }
          if (ok) points.push({ x, y });
          tries++;
        }
        return points;
      }

      const positions = poissonDiskSampling(screenWidth, screenHeight, minDist, 40, snippetCount);
      for (let i = 0; i < positions.length; i++) {
        const baseSpeed = screenWidth < 640 ? 0.08 : screenWidth < 1024 ? 0.1 : 0.12;
        const speedVariation = 0.02;

        newCodeLines.push({
          id: i,
          text: codeSnippets[i % codeSnippets.length],
          x: positions[i].x,
          y: positions[i].y,
          speed: baseSpeed + Math.random() * speedVariation,
          opacity: 0.45 + Math.random() * 0.25,
          color: colors[i % colors.length],
        });
      }
      setCodeLines(newCodeLines);
    };

    updateCodeLines();

    const handleResize = () => {
      updateCodeLines();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animateElements = (currentTime: number) => {
      if (currentTime - lastTime >= frameTime) {
        setCodeLines((prev) =>
          prev.map((line) => {
            const newY = line.y - line.speed;            if (newY < -100) {              const screenWidth = Math.max(320, window.innerWidth);
              const screenHeight = Math.max(568, window.innerHeight);
              const snippetWidth = screenWidth < 640 ? 180 : screenWidth < 1024 ? 210 : 240;
              const snippetHeight = screenWidth < 640 ? 28 : screenWidth < 1024 ? 32 : 36;
              
              // Smart minimum distance calculation (same as initial positioning)
              const calculateMinDistance = () => {
                const baseDistance = Math.max(snippetWidth, snippetHeight);
                let multiplier;
                
                if (screenWidth < 480) {
                  multiplier = 1.2;
                } else if (screenWidth < 768) {
                  multiplier = 1.3;
                } else if (screenWidth < 1024) {
                  multiplier = 1.4;
                } else if (screenWidth < 1440) {
                  multiplier = 1.5;
                } else {
                  multiplier = 1.6;
                }
                
                return baseDistance * multiplier;
              };
              
              const minDist = calculateMinDistance();
              
              // Smart responsive padding calculation (same as initial positioning)
              const calculateRepositionPadding = () => {
                const basePercentage = 0.08;
                const minPadding = 40;
                const maxPadding = 120;
                
                const percentagePadding = Math.max(screenWidth, screenHeight) * basePercentage;
                
                let scaledPadding;
                if (screenWidth < 480) {
                  scaledPadding = percentagePadding * 0.7;
                } else if (screenWidth < 768) {
                  scaledPadding = percentagePadding * 0.85;
                } else if (screenWidth < 1024) {
                  scaledPadding = percentagePadding;
                } else if (screenWidth < 1440) {
                  scaledPadding = percentagePadding * 1.1;
                } else {
                  scaledPadding = percentagePadding * 1.25;
                }
                
                return Math.min(Math.max(scaledPadding, minPadding), maxPadding);
              };

              const padding = calculateRepositionPadding();
              const safeZoneX = snippetWidth * 0.6;
              const safeZoneY = snippetHeight * 0.6;

              let tries = 0;
              let x = 0,
                y = 0,
                ok = false;
              const maxTries = 50;

              while (!ok && tries < maxTries) {
                x = Math.random() * (screenWidth - snippetWidth - (padding + safeZoneX) * 2) + (padding + safeZoneX) + snippetWidth / 2;
                y = screenHeight + Math.random() * 200 + 100;
                ok = true;

                for (let other of prev) {
                  if (other.id !== line.id) {
                    const dx = other.x - x;
                    const dy = other.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < minDist) {
                      ok = false;
                      break;
                    }
                  }
                }
                tries++;
              }

              const baseSpeed = screenWidth < 640 ? 0.08 : screenWidth < 1024 ? 0.1 : 0.12;
              const speedVariation = 0.02;

              return {
                ...line,
                y: y,
                x: x,
                speed: baseSpeed + Math.random() * speedVariation,
                text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
              };
            }

            return {
              ...line,
              y: newY,
            };
          })
        );
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animateElements);
    };

    animationId = requestAnimationFrame(animateElements);
    return () => cancelAnimationFrame(animationId);
  }, [codeSnippets]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#06b6d4" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 165, 0, 0.4) 30%, rgba(255, 140, 0, 0.2) 60%, transparent 100%)',
            filter: 'blur(8px)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 215, 0, 0.6) 40%, transparent 70%)',
            filter: 'blur(4px)',
            animation: 'pulse 6s ease-in-out infinite reverse',
          }}
        />
        {[...Array(3)].map((_, i) => {
          const getOrbitSize = () => {
            const width = screenDimensions.width;
            const height = screenDimensions.height;
            const baseSize = Math.min(width, height) * 0.25;

            if (width < 480) return baseSize + i * 50;
            if (width < 640) return baseSize + i * 70;
            if (width < 768) return baseSize + i * 90;
            if (width < 1024) return baseSize + i * 110;
            return baseSize + i * 130;
          };

          const orbitSize = getOrbitSize();

          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute border rounded-full opacity-35"
              style={{
                width: `${orbitSize}px`,
                height: `${orbitSize}px`,
                borderColor: `rgba(6, 182, 212, ${0.2 + i * 0.05})`,
                boxShadow: `0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.1)`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 30 + i * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="absolute w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full opacity-35"
                style={{
                  top: -1,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 1) 0%, rgba(6, 182, 212, 0.8) 50%, rgba(6, 182, 212, 0.4) 100%)',
                  boxShadow: '0 0 25px rgba(6, 182, 212, 1), 0 0 50px rgba(6, 182, 212, 0.6)',
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 30 + i * 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {codeLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute font-mono text-2xs xs:text-xs sm:text-sm select-none whitespace-nowrap"
            style={{
              left: line.x,
              opacity: line.opacity,
              color: line.color,
              textShadow: `0 0 10px ${line.color}`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
            animate={{
              y: line.y,
            }}
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: 0.02,
            }}
          >
            <span
              className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded backdrop-blur-sm border text-2xs xs:text-xs sm:text-sm whitespace-nowrap block"
              style={{
                backgroundColor: `${line.color}20`,
                borderColor: `${line.color}40`,
                minWidth: 'max-content',
                display: 'inline-block',
              }}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>
      <style>
        {`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.25;
          }
        }

        @keyframes sun-glow {
          0%, 100% {
            filter: blur(8px) brightness(1);
            transform: scale(1);
          }
          50% {
            filter: blur(12px) brightness(1.2);
            transform: scale(1.05);
          }
        }
        `}
      </style>
    </div>
  );
};

export default TechBackground;
