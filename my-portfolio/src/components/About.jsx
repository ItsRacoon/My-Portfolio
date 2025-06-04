import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Brain, Users, Award } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { icon: Code, label: "Projects Completed", value: "20+", color: "from-blue-500 to-cyan-500" },
    { icon: Brain, label: "Technologies Mastered", value: "15+", color: "from-purple-500 to-pink-500" },
    { icon: Users, label: "Students Trained", value: "60+", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Years Experience", value: "1+", color: "from-orange-500 to-red-500" },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>

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
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate developer crafting digital experiences with modern technologies
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I am currently pursuing a Bachelor of Engineering in{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Information Science and Engineering
                  </span>{' '}
                  from Dayananda Sagar College of Engineering, graduating in June 2026. 
                  With a strong foundation in full-stack development and AI/ML technologies, 
                  I specialize in creating innovative solutions.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As a{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    Technical Trainer at SwipeGen
                  </span>
                  , I conducted comprehensive training sessions in Java and competitive 
                  programming, focusing on problem-solving and algorithmic skills. I'm 
                  passionate about sharing knowledge and helping others grow in their 
                  technical journey.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Beyond academics and work, I'm actively involved in community service 
                  as a volunteer at{' '}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    Spreading Smiles NGO
                  </span>
                  , where I teach underprivileged children foundational subjects including 
                  math, science, and basic computing to bridge learning gaps.
                </p>
              </div>

              {/* Skills Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">React, Vue, TypeScript</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 p-4 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Node.js, Python, Java</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI/ML</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">TensorFlow, PyTorch</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 p-4 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Database</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MongoDB, PostgreSQL</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Quick Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-full h-full text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Current Focus</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Advanced React & Next.js Development
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Machine Learning & AI Integration
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Cloud Architecture & DevOps
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Open Source Contributions
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;