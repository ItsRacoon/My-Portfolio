import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, X, Calendar, Tag } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
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
      image: '/images/webscrap.png',
      description: 'An AI-powered summarization tool using the MERN stack and Google\'s Gemini API, enabling users to generate customized text and PDF summaries.',
      fullDescription: `SummarEase is a cutting-edge AI-powered summarization tool built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Google's Gemini API. This innovative application enables users to generate customized summaries from both text input and PDF documents. Users can choose their preferred summary format - either bullet points for quick scanning or a specified length for detailed overviews. The application features a modern, responsive interface that makes document summarization accessible and efficient. Whether you're a student processing research papers, a professional handling lengthy reports, or anyone dealing with information overload, SummarEase streamlines the process of extracting key insights from large volumes of text.`,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Gemini API', 'MERN Stack'],
      category: 'AI/ML Development',
      date: 'Jan 2025',
      featured: true,
      status: 'Completed'
    },
    {
      id: 'calorie-tracker',
      title: 'Calorie Tracker Android App',
      image: '/images/todo.png', // Using existing image as placeholder
      description: 'An Android app using Java and Firebase to help users track daily calorie intake and nutritional needs with intelligent calculations.',
      fullDescription: `The Calorie Tracker is a comprehensive Android application developed using Java and Firebase that empowers users to monitor their daily calorie intake and nutritional requirements effectively. The app features an intelligent caloric needs calculator that considers individual activity levels, age, weight, and fitness goals to provide personalized recommendations. Users can easily input food quantities and types, with the app automatically calculating nutritional values and tracking progress toward daily goals. The application includes a user-friendly interface for logging meals, viewing nutritional breakdowns, and monitoring long-term trends. With Firebase integration, users can securely store their data and access it across multiple devices, making it a reliable companion for anyone committed to maintaining a healthy lifestyle and achieving their fitness objectives.`,
      technologies: ['Java', 'Android Studio', 'Firebase', 'Mobile Development'],
      category: 'Mobile Development',
      date: 'Dec 2024'
    },
    {
      id: 'attendance-system',
      title: 'Attendance System Using Facial Recognition',
      image: '/images/IOT.jpg', // Using existing image as placeholder
      description: 'An AI-powered attendance system using Python, OpenCV, and face recognition to automate student check-ins with high accuracy.',
      fullDescription: `This innovative attendance system leverages artificial intelligence and computer vision to revolutionize traditional attendance tracking. Built using Python, OpenCV, and advanced face recognition libraries, the system automates student check-ins with remarkable accuracy and efficiency. The application incorporates sophisticated preprocessing pipelines to handle various lighting conditions and image qualities, ensuring reliable recognition even in challenging environments. A deep-learning-based encoder processes facial features to create unique biometric signatures for each student. The system significantly reduces administrative overhead while eliminating common issues like proxy attendance. It features real-time processing capabilities, comprehensive logging, and an intuitive interface for administrators to manage student records and generate attendance reports. This solution demonstrates the practical application of AI in educational technology, enhancing both security and efficiency in academic institutions.`,
      technologies: ['Python', 'OpenCV', 'Face Recognition', 'Deep Learning', 'AI/ML'],
      category: 'AI/ML Development',
      date: 'Aug 2024'
    },
    {
      id: 'checklist',
      title: 'Interactive Checklist Website',
      image: '/images/todo.png',
      description: 'A dynamic to-do list application with customizable backgrounds and responsive design for enhanced user experience.',
      fullDescription: `The checklist website project offers users a convenient platform to create and manage their to-do lists efficiently. With a user-friendly interface, it allows users to add, edit, and mark tasks as completed. Moreover, the website features a unique functionality where users can dynamically change the background of the website by clicking a button. This feature enhances user experience by allowing them to personalize their workspace according to their preferences. Additionally, the website incorporates responsive design principles, ensuring seamless accessibility across various devices. With its intuitive interface and customizable features, the checklist website project aims to streamline task management and improve user productivity.`,
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      category: 'Web Development',
      liveLink: 'https://itsracoon.github.io/checklist/',
      date: 'Earlier Project'
    },
    {
      id: 'smart-parking',
      title: 'Smart Parking System',
      image: '/images/IOT.jpg',
      description: 'A vision-based solution using Python and OpenCV to automate parking space monitoring and management.',
      fullDescription: `The Smart Parking System is an innovative vision-based solution designed to automate the monitoring of parking spaces using Python and OpenCV. This system addresses the growing challenge of limited parking infrastructure by providing real-time status updates of parking slots through video analysis. The system employs sophisticated image processing techniques including grayscale conversion, Gaussian blur, adaptive thresholding, and dilation to enhance image clarity and accurately detect vehicles. It features a user-friendly interface that displays color-coded parking slots (green for available, red for occupied) and maintains a real-time counter of free spaces. The solution eliminates the need for expensive sensor installations, making it a cost-effective and scalable option for various parking facilities including malls, residential complexes, and campuses.`,
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'Image Processing', 'Real-time Analysis'],
      category: 'AI/ML Development',
      date: 'Mar 2024'
    },
    {
      id: 'pdf-converter',
      title: 'PDF Converter Web Application',
      image: '/images/webscrap.png',
      description: 'A full-stack web application for converting PDF files into various editable formats with real-time preview.',
      fullDescription: `The PDF Converter is a comprehensive full-stack web application developed to transform PDF files into multiple editable formats including DOCX, CSV, and XLSX. Built with Flask backend and React frontend, the application offers an intuitive user interface with drag-and-drop functionality and real-time preview capabilities. The system implements a sophisticated cascading fallback mechanism that employs multiple conversion methods to ensure high reliability and quality output. Key features include format selection, real-time previews, and robust error handling. The application is particularly effective in handling complex or unstructured PDFs, making it a versatile tool for various document conversion needs.`,
      technologies: ['React', 'Flask', 'Python', 'Bootstrap', 'PDF Processing'],
      category: 'Web Development',
      date: 'Feb 2024'
    },
    {
      id: 'employee-dashboard',
      title: 'Employee Leave Management System',
      image: '/images/todo.png',
      description: 'A secure and efficient leave management system with role-based access control and comprehensive tracking features.',
      fullDescription: `The Employee Leave Management System is a robust full-stack application built with Spring Boot and React, designed to streamline the process of managing employee leave applications. The system implements secure authentication using JWT tokens and features role-based access control with distinct interfaces for Employees, Managers, and Administrators. Employees can submit leave requests and track their leave history, while managers and administrators have comprehensive oversight capabilities including request approval/rejection and leave balance tracking. The application includes thorough input validation and is built with a fully separated frontend and backend architecture for optimal scalability and deployment flexibility.`,
      technologies: ['Spring Boot', 'React', 'JWT', 'Role-Based Access Control', 'Full Stack Development'],
      category: 'Web Development',
      date: 'Jan 2024'
    },
    {
      id: 'simon-game',
      title: 'Simon Memory Game',
      image: '/images/todo.png',
      description: 'An interactive implementation of the classic Simon memory game with modern UI and sound effects.',
      fullDescription: `The Simon Memory Game is a modern web-based implementation of the classic memory game. Players must repeat increasingly complex sequences of colors and sounds, testing their memory and concentration. The game features smooth animations, responsive design, and engaging sound effects to enhance the gaming experience. Built with modern web technologies, it offers multiple difficulty levels and tracks high scores to encourage replayability.`,
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
      category: 'Web Development',
      date: 'Dec 2023'
    },
    {
      id: 'virtual-drum',
      title: 'Virtual Drum Kit',
      image: '/images/todo.png',
      description: 'An interactive web-based drum kit that responds to keyboard inputs and mouse clicks with realistic sound effects.',
      fullDescription: `The Virtual Drum Kit is an interactive web application that simulates a complete drum set. Users can play the drums using either keyboard keys or mouse clicks, with each interaction triggering high-quality drum sounds. The application features responsive design, visual feedback for each hit, and supports multiple drum types. It's perfect for practice sessions or casual drumming without the need for physical equipment.`,
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API'],
      category: 'Web Development',
      date: 'Nov 2023'
    },
    {
      id: 'password-checker',
      title: 'Advanced Password Strength Analyzer',
      image: '/images/webscrap.png',
      description: 'A comprehensive password security tool that evaluates password strength and provides real-time feedback for enhanced security.',
      fullDescription: `The Advanced Password Strength Analyzer is a sophisticated security tool designed to help users create and maintain strong passwords. The system implements multiple security checks including length validation, character diversity analysis, common password detection, and pattern recognition. It provides real-time feedback with a visual strength indicator and detailed suggestions for improvement. The tool also includes features like password history checking, breach database verification, and secure password generation. Built with modern security practices, it helps users understand password security best practices while ensuring their credentials meet industry standards.`,
      technologies: ['Python', 'Regular Expressions', 'Security Analysis', 'Web Security', 'Data Validation'],
      category: 'Security Development',
      date: 'Oct 2023'
    },
    {
      id: 'bill-generator',
      title: 'Automated Bill Generation System',
      image: '/images/todo.png',
      description: 'A comprehensive billing solution that automates invoice generation, payment tracking, and financial reporting.',
      fullDescription: `The Automated Bill Generation System is a full-featured billing solution designed to streamline the process of creating and managing invoices. The system features a user-friendly interface for inputting customer details, product information, and pricing data. It automatically calculates taxes, discounts, and totals while generating professional PDF invoices. The application includes features like recurring billing, payment tracking, customer management, and comprehensive financial reporting. With its automated email notifications and payment reminders, it helps businesses maintain consistent cash flow and reduce administrative overhead. The system also includes data export capabilities and integration with popular accounting software.`,
      technologies: ['React', 'Node.js', 'PDF Generation', 'Email Integration', 'Database Management'],
      category: 'Web Development',
      date: 'Sep 2023'
    }
  ];

  const categories = ['All', 'AI/ML Development', 'Web Development', 'Mobile Development', 'Security Development'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Tag size={12} />
            Featured
          </span>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Live' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
            >
              <Eye size={20} />
            </motion.button>
            {project.liveLink && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors"
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

        {/* Category */}
        <div className="flex items-center justify-between">
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

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
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

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
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
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 p-1.5 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                      selectedProject.status === 'Live' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {selectedProject.status}
                    </span>
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