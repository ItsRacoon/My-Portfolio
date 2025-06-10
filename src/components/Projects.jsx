import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, X, Calendar, Tag, Code, Layers } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 'summarease',
      title: 'SummarEase – AI-Based Text & PDF Summarizer',
      image: '/images/project/Summerease.png',
      description: 'An AI-powered summarization tool using the MERN stack and Google\'s Gemini API, enabling users to generate customized text and PDF summaries.',
      fullDescription: `SummarEase is an AI-powered summarization tool built with the MERN stack and Google’s Gemini API. It lets users instantly generate smart summaries from text or PDF files — as bullet points or custom-length overviews. With its sleek, responsive design, SummarEase is perfect for students, professionals, and anyone looking to quickly extract key insights from lengthy content.`,
      technologies: ['React.js', 'Node.js', 'Express.js', 'Google Gemini API', 'MERN Stack'],
      category: 'AI/ML Development',
      date: 'Jan 2025',
      githubLink: 'https://github.com/ItsRacoon/SummarEase.git'
    },
    {
      id: 'calorie-tracker',
      title: 'Calorie Tracker Android App',
      image: '/images/project/calorie tracker.png',
      description: 'An Android app using Java and Firebase to help users track daily calorie intake and nutritional needs with intelligent calculations.',
      fullDescription: `Calorie Tracker is a smart Android app built with Java and Firebase to help users monitor their daily calorie intake and nutrition. It calculates personalized goals based on fitness level, logs meals with ease, and tracks progress using intuitive charts. With secure cloud sync, it’s a perfect tool for anyone focused on health and fitness.`,
      technologies: ['Java', 'Android Studio', 'Mobile Development'],
      category: 'Mobile Development',
      date: 'Dec 2024',
      githubLink: 'https://github.com/ItsRacoon/Calorie_Tracker.git'
    },
    {
      id: 'attendance-system',
      title: 'Attendance System Using Facial Recognition',
      image: '/images/IOT.jpg',
      description: 'An AI-powered attendance system using Python, OpenCV, and face recognition to automate student check-ins with high accuracy.',
      fullDescription: `AI-Powered Attendance System uses Python, OpenCV, and facial recognition to automate student check-ins with high accuracy. It handles varying lighting and image quality using advanced preprocessing and deep-learning encoders. With real-time detection, secure biometric logging, and an intuitive admin dashboard, it eliminates proxy attendance and streamlines record-keeping — a smart step toward modernizing education with AI.`,
      technologies: ['Python', 'OpenCV', 'Face Recognition', 'Deep Learning', 'AI/ML'],
      category: 'AI/ML Development',
      date: 'Aug 2024',
      githubLink: 'https://github.com/ItsRacoon/Facial-Recognition-Attendance-System.git'
    },

    {
      id: 'smart-parking',
      title: 'Smart Parking System',
      image: '/images/project/smartparking.png',
      description: 'A vision-based solution using Python and OpenCV to automate parking space monitoring and management.',
      fullDescription: `The Smart Parking System is an innovative vision-based solution designed to automate the monitoring of parking spaces using Python and OpenCV. This system addresses the growing challenge of limited parking infrastructure by providing real-time status updates of parking slots through video analysis. The system employs sophisticated image processing techniques including grayscale conversion, Gaussian blur, adaptive thresholding, and dilation to enhance image clarity and accurately detect vehicles. It features a user-friendly interface that displays color-coded parking slots (green for available, red for occupied) and maintains a real-time counter of free spaces. The solution eliminates the need for expensive sensor installations, making it a cost-effective and scalable option for various parking facilities including malls, residential complexes, and campuses.`,
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'Image Processing', 'Real-time Analysis'],
      category: 'AI/ML Development',
      date: 'Mar 2024',
      githubLink: 'https://github.com/ItsRacoon/Smart-Parking-System.git'
    },
    {
      id: 'pdf-converter',
      title: 'PDF Converter Web Application',
      image: '/images/project/pdf convertor.png',
      description: 'A full-stack web application for converting PDF files into various editable formats with real-time preview.',
      fullDescription: `The PDF Converter is a comprehensive full-stack web application developed to transform PDF files into multiple editable formats including DOCX, CSV, and XLSX. Built with Flask backend and React frontend, the application offers an intuitive user interface with drag-and-drop functionality and real-time preview capabilities. The system implements a sophisticated cascading fallback mechanism that employs multiple conversion methods to ensure high reliability and quality output. Key features include format selection, real-time previews, and robust error handling. The application is particularly effective in handling complex or unstructured PDFs, making it a versatile tool for various document conversion needs.`,
      technologies: ['React', 'Flask', 'Python', 'Bootstrap'],
      category: 'Web Development',
      date: 'Feb 2024',
      githubLink: 'https://github.com/ItsRacoon/PDF-Convertor.git',
      liveLink: 'https://pdf-convertor-1xj6.onrender.com/'
    },
    {
      id: 'employee-dashboard',
      title: 'Employee Leave Management System',
      image: '/images/project/employee dashboard.png',
      description: 'A secure and efficient leave management system with role-based access control and comprehensive tracking features.',
      fullDescription: `The Employee Leave Management System is a robust full-stack application built with Spring Boot and React, designed to streamline the process of managing employee leave applications. The system implements secure authentication using JWT tokens and features role-based access control with distinct interfaces for Employees, Managers, and Administrators. Employees can submit leave requests and track their leave history, while managers and administrators have comprehensive oversight capabilities including request approval/rejection and leave balance tracking. The application includes thorough input validation and is built with a fully separated frontend and backend architecture for optimal scalability and deployment flexibility.`,
      technologies: ['Spring Boot', 'React', 'JWT', 'Role-Based Access Control', 'Full Stack Development'],
      category: 'Web Development',
      date: 'Jan 2024',
      githubLink: 'https://github.com/Sachika18/Workline-.git'
    },
    {
      id: 'simon-game',
      title: 'Simon Memory Game',
      image: '/images/project/simongame.png',
      description: 'An interactive implementation of the classic Simon memory game with modern UI and sound effects.',
      fullDescription: `The Simon Memory Game is a modern web-based implementation of the classic memory game. Players must repeat increasingly complex sequences of colors and sounds, testing their memory and concentration. The game features smooth animations, responsive design, and engaging sound effects to enhance the gaming experience. Built with modern web technologies, it offers multiple difficulty levels and tracks high scores to encourage replayability.`,
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
      category: 'Games',
      date: 'Dec 2023',
      githubLink: 'https://github.com/ItsRacoon/Simon-Game.git',
      liveLink: 'https://itsracoon.github.io/Simon-Game/'
    },
    {
      id: 'virtual-drum',
      title: 'Virtual Drum Kit',
      image: '/images/todo.png',
      description: 'An interactive web-based drum kit that responds to keyboard inputs and mouse clicks with realistic sound effects.',
      fullDescription: `The Virtual Drum Kit is an interactive web application that simulates a complete drum set. Users can play the drums using either keyboard keys or mouse clicks, with each interaction triggering high-quality drum sounds. The application features responsive design, visual feedback for each hit, and supports multiple drum types. It's perfect for practice sessions or casual drumming without the need for physical equipment.`,
      technologies: ['JavaScript', 'HTML5', 'CSS3'],
      category: 'Games',
      date: 'Nov 2023',
      githubLink: 'https://github.com/ItsRacoon/Virtual-Drum-Kit.git',
      liveLink: 'https://itsracoon.github.io/Virtual-Drum-Kit/'
    },
    {
      id: 'password-checker',
      title: 'Advanced Password Strength Analyzer',
      image: '/images/webscrap.png',
      description: 'A comprehensive password security tool that evaluates password strength and provides real-time feedback for enhanced security.',
      fullDescription: `The Advanced Password Strength Analyzer is a sophisticated security tool designed to help users create and maintain strong passwords. The system implements multiple security checks including length validation, character diversity analysis, common password detection, and pattern recognition. It provides real-time feedback with a visual strength indicator and detailed suggestions for improvement. The tool also includes features like password history checking, breach database verification, and secure password generation. Built with modern security practices, it helps users understand password security best practices while ensuring their credentials meet industry standards.`,
      technologies: ['Python', 'Regular Expressions', 'Security Analysis', 'Web Security', 'Data Validation'],
      category: 'Security Development',
      date: 'Oct 2023',
      githubLink: 'https://github.com/ItsRacoon/Password-Check.git',
      liveLink: 'https://itsracoon.github.io/Password-Check/'
    },
    {
      id: 'bill-generator',
      title: 'Automated Bill Generation System',
      image: '/images/todo.png',
      description: 'A comprehensive billing solution that automates invoice generation, payment tracking, and financial reporting.',
      fullDescription: `The Automated Bill Generation System is a full-featured billing solution designed to streamline the process of creating and managing invoices. The system features a user-friendly interface for inputting customer details, product information, and pricing data. It automatically calculates taxes, discounts, and totals while generating professional PDF invoices. The application includes features like recurring billing, payment tracking, customer management, and comprehensive financial reporting. With its automated email notifications and payment reminders, it helps businesses maintain consistent cash flow and reduce administrative overhead. The system also includes data export capabilities and integration with popular accounting software.`,
      technologies: ['React', 'Node.js', 'PDF Generation', 'Email Integration', 'Database Management'],
      category: 'Web Development',
      date: 'Sep 2023',
      githubLink: 'https://github.com/ItsRacoon/Bill-Generator.git',
      liveLink: 'https://itsracoon.github.io/Bill-Generator/'
    }
  ];

  const categories = ['All', 'AI/ML Development', 'Web Development', 'Mobile Development', 'Security Development'];

  // Define key technologies to show (simplified list)
  const keyTechnologies = [
    'React', 'React.js', 'Node.js', 'Python', 'Java', 'JavaScript', 
    'Spring Boot', 'Express.js', 'MongoDB', 'AI/ML', 'OpenCV'
  ];
  
  // Filter to show only key technologies that exist in projects
  const availableTechnologies = keyTechnologies.filter(tech => 
    projects.some(project => 
      project.technologies.some(projectTech => 
        projectTech.toLowerCase().includes(tech.toLowerCase()) || 
        tech.toLowerCase().includes(projectTech.toLowerCase())
      )
    )
  );

  // Handle technology filter toggle
  const toggleTechnology = (tech) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  // Clear all technology filters
  const clearTechnologyFilters = () => {
    setSelectedTechnologies([]);
  };

  // Reset technology filters and show all state when category changes
  useEffect(() => {
    setSelectedTechnologies([]);
    setShowAllProjects(false);
  }, [activeFilter]);

  // Reset show all state when technology filters change
  useEffect(() => {
    setShowAllProjects(false);
  }, [selectedTechnologies]);

  // Smart filtering logic
  const filteredProjects = projects.filter(project => {
    // First filter by category
    const categoryMatch = activeFilter === 'All' || project.category === activeFilter;
    
    // Then filter by technologies (if any are selected)
    const technologyMatch = selectedTechnologies.length === 0 || 
      selectedTechnologies.every(selectedTech => 
        project.technologies.some(projectTech => 
          projectTech.toLowerCase().includes(selectedTech.toLowerCase()) || 
          selectedTech.toLowerCase().includes(projectTech.toLowerCase())
        )
      );
    
    return categoryMatch && technologyMatch;
  });

  // Determine which projects to display
  const isDefaultView = activeFilter === 'All' && selectedTechnologies.length === 0;
  const displayedProjects = isDefaultView && !showAllProjects 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects;
  
  const hasMoreProjects = isDefaultView && filteredProjects.length > 3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger for smoother animation
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y movement for smoother effect
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster animation
        ease: "easeOut",
      },
    },
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -2, // Reduced hover movement
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
    >


      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors"
              title="View Details"
            >
              <Eye size={20} />
            </motion.button>
            {project.githubLink && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors"
                title="View Code"
              >
                <Github size={20} />
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{project.date}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Category and Links */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium text-sm">
            {project.category}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(project)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
          >
            View Details →
          </motion.button>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          {project.githubLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors"
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
          {project.liveLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my technical projects and innovations
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Technology Filters */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filter by Technologies
              </h3>
              {selectedTechnologies.length > 0 && (
                <button
                  onClick={clearTechnologyFilters}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 transition-colors mx-auto mb-4"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {availableTechnologies.map((tech) => {
                const isSelected = selectedTechnologies.includes(tech);
                const projectCount = projects.filter(project => 
                  project.technologies.some(projectTech => 
                    projectTech.toLowerCase().includes(tech.toLowerCase()) || 
                    tech.toLowerCase().includes(projectTech.toLowerCase())
                  ) && 
                  (activeFilter === 'All' || project.category === activeFilter)
                ).length;
                
                return (
                  <motion.button
                    key={tech}
                    onClick={() => toggleTechnology(tech)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{tech}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    }`}>
                      {projectCount}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Results Count */}
            <div className="text-center mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isDefaultView && !showAllProjects ? (
                  <>
                    Showing {displayedProjects.length} of {filteredProjects.length} projects
                  </>
                ) : (
                  <>
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                    {selectedTechnologies.length > 0 && (
                      <span className="ml-2 text-blue-600 dark:text-blue-400">
                        with {selectedTechnologies.join(' + ')}
                      </span>
                    )}
                  </>
                )}
              </span>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <>
              <motion.div 
                key={showAllProjects ? 'all-projects' : 'limited-projects'}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>

              {/* View All Button */}
              {hasMoreProjects && !showAllProjects && (
                <motion.div 
                  variants={itemVariants}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={() => setShowAllProjects(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span>View All Projects</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({filteredProjects.length - 3} more)
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {/* Show Less Button */}
              {hasMoreProjects && showAllProjects && (
                <motion.div 
                  variants={itemVariants}
                  className="text-center mt-12"
                >
                  <motion.button
                    onClick={() => setShowAllProjects(false)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Show Less
                  </motion.button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Filter size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  No projects match your current filters. Try adjusting your selection.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setActiveFilter('All')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show All Categories
                  </button>
                  {selectedTechnologies.length > 0 && (
                    <button
                      onClick={clearTechnologyFilters}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Clear Technology Filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg sm:max-w-2xl w-full max-h-[65vh] sm:max-h-[70vh] my-4 sm:my-8 overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative flex-shrink-0">
                <div className="w-full h-32 sm:h-40 bg-gray-200 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl"></div>
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 p-1.5 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-3 left-4 text-white">
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              
              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                    {selectedProject.fullDescription}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-medium text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {selectedProject.liveLink && (
                      <a 
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium text-sm"
                      >
                        <ExternalLink size={16} />
                        View Live Project
                      </a>
                    )}
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium text-sm">
                      <Github size={16} />
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects