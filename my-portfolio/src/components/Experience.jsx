import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const experiences = [
    {
      title: 'Technical Trainer',
      company: 'SwipeGen',
      location: 'Bengaluru, Karnataka',
      duration: 'Mar 2024 – Sep 2024',
      type: 'Professional Experience',
      description: 'Conducted training sessions in Java and other programming languages for competitive programming, focusing on problem-solving and algorithmic skills.',
      skills: ['Java Programming', 'Competitive Programming', 'Teaching', 'Problem Solving', 'Algorithm Design'],
      logo: '/images/swipegen.png'
    }
  ]

  const activities = [
    {
      title: 'Volunteer',
      company: 'Spreading Smiles (NGO)',
      location: 'Bengaluru, Karnataka',
      duration: 'Jun 2024 – Present',
      type: 'Community Service',
      description: 'Taught underprivileged children and orphans, providing foundational education in subjects like math, science, and basic computing to bridge learning gaps.',
      skills: ['Teaching', 'Community Service', 'Education', 'Math', 'Science', 'Basic Computing'],
      logo: null
    },
    {
      title: 'Design Team Member',
      company: 'Genesis (Tech Club)',
      location: 'Bengaluru, Karnataka',
      duration: 'Sept 2024 – Present',
      type: 'Leadership & Activities',
      description: 'Organized and managed tech events for the department\'s tech club, while also designing posters and promotional materials for various events.',
      skills: ['Event Management', 'Graphic Design', 'Leadership', 'Team Coordination', 'Creative Design'],
      logo: null
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Experience & Leadership
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Professional journey, community service, and leadership roles
          </p>
          
          {/* Professional Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Professional Experience</h3>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="bg-white rounded-lg shadow-lg p-8 mb-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {exp.logo ? (
                        <img 
                          src={exp.logo} 
                          alt={exp.company}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{exp.company.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Experience Details */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {exp.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                        <span className="font-medium text-blue-600">{exp.company}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{exp.location}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 mb-3">Key Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activities & Leadership */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Activities & Leadership</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: (index + 1) * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -3,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300"
                >
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{activity.company.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{activity.title}</h4>
                        <p className="text-blue-600 font-medium">{activity.company}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span>{activity.duration}</span> • <span>{activity.location}</span>
                    </div>
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {activity.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {activity.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
              Career Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
              
              <div className="space-y-8">
                {/* Current Position */}
                <div className="relative flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h4 className="font-semibold text-gray-800">Technical Trainer</h4>
                      <p className="text-blue-600">SwipeGen</p>
                      <p className="text-sm text-gray-600">March 2024 - Present</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>
                
                {/* Education */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-md z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h4 className="font-semibold text-gray-800">B.Tech Student</h4>
                      <p className="text-green-600">Information Science & Engineering</p>
                      <p className="text-sm text-gray-600">Dayananda Sagar College</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience