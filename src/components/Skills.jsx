import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Palette, 
  Brain, 
  Server, 
  Smartphone,
  Globe,
  GitBranch,
  Zap,
  Star
} from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React.js', level: 90, description: 'Component-based UI development' },
  { name: 'JavaScript (ES6+)', level: 85, description: 'Modern JavaScript syntax and logic' },
  { name: 'Tailwind CSS', level: 95, description: 'Utility-first CSS framework for styling' },
  { name: 'HTML5', level: 90, description: 'Semantic and responsive markup' },
  { name: 'CSS3', level: 85, description: 'Flexbox, Grid, and modern styling techniques' }        
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
         { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime' },
  { name: 'Express.js', level: 85, description: 'Fast web framework for Node.js' },
  { name: 'Spring Boot', level: 70, description: 'Java-based microservice framework' },
  { name: 'Python', level: 90, description: 'Scripting and backend logic, ML API support' },
  { name: 'Java', level: 80, description: 'OOP, Android, and server-side applications' }
      ]
    },
    database: {
      title: 'Database & Cloud',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
  { name: 'MongoDB', level: 85, description: 'NoSQL document database (Atlas used)' },
  { name: 'MySQL', level: 85, description: 'Structured query language and relational DBs' },
  { name: 'PostgreSQL', level: 80, description: 'Advanced relational database with features' },
  { name: 'Docker', level: 80, description: 'Containerization and app deployment' }
]

    },
    aiml: {
      title: 'AI/ML & Data Science',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      skills: [
  { name: 'Pandas', level: 90, description: 'Data manipulation and analysis' },
  { name: 'NumPy', level: 85, description: 'Numerical computing with arrays' },
  { name: 'Scikit-learn', level: 80, description: 'Machine learning models and pipelines' },
  { name: 'Matplotlib', level: 85, description: 'Data visualization and plotting' }
]

    }
  };

  const tools = [
    { name: 'VS Code', icon: Code2, category: 'Editor' },
    { name: 'Git & GitHub', icon: GitBranch, category: 'Version Control' },
    { name: 'Figma', icon: Palette, category: 'Design' },
    { name: 'Postman', icon: Globe, category: 'API Testing' },
    { name: 'Android Studio', icon: Smartphone, category: 'Mobile Dev' },
    { name: 'Jupyter', icon: Brain, category: 'Data Science' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const SkillBar = ({ skill, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {skill.description}
      </p>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Technical{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(skillCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === key
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg hover:shadow-xl`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  {category.title}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Content */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Skills List */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {skillCategories[activeCategory].title}
              </h3>
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 0.1} />
              ))}
            </div>

            {/* Visual Representation */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Skill Distribution
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.99 }}
                    className="relative group cursor-pointer"
                  >
                    <motion.div 
                      className={`w-full h-20 rounded-xl bg-gradient-to-r ${skillCategories[activeCategory].color} opacity-20 transition-all duration-300`}
                      whileHover={{ opacity: 0.4 }}
                    ></motion.div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      <motion.span 
                        className="text-sm font-medium text-gray-900 dark:text-white"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.span>
                      <motion.div 
                        className="flex items-center gap-1 mt-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`transition-colors duration-200 ${
                              i < Math.floor(skill.level / 20)
                                ? 'text-yellow-400 fill-current group-hover:text-yellow-300'
                                : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-400'
                            }`}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -12,
                      transition: { duration: 0.15, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="text-center">
                      <motion.div 
                        className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center transition-all duration-200"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 8,
                          transition: { duration: 0.12 }
                        }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.h4 
                        className="font-medium text-gray-900 dark:text-white text-sm"
                        whileHover={{ 
                          scale: 1.08,
                          transition: { duration: 0.1 }
                        }}
                      >
                        {tool.name}
                      </motion.h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {tool.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;