import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Heart, ArrowUp, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vishesh-kumar-9b37382ba',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ItsRacoon',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/XxVISHESHxX',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/xvisheshkumarx/',
      icon: Instagram,
      color: 'hover:text-pink-400'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/90"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Vishesh Kumar
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Full Stack Developer & AI Enthusiast passionate about creating innovative 
                solutions that make a difference. Currently pursuing B.Tech in Information 
                Science & Engineering.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.id}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600/30 transition-colors">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <a 
                    href="mailto:evishesh7@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    evishesh7@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-600/30 transition-colors">
                    <MapPin size={16} className="text-green-400" />
                  </div>
                  <span className="text-gray-400">Bengaluru, Karnataka</span>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-600/30 transition-colors">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-400">Available for opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400">
                © {currentYear} Vishesh Kumar. Made with
              </p>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <p className="text-gray-400">
                using React & Tailwind CSS
              </p>
            </div>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowUp size={16} />
              <span className="text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </footer>
  )
}

export default Footer