import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink, Calendar, Building, X, Eye } from 'lucide-react';

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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

  const certificates = [
    {
      title: "Data Mining",
      issuer: "NPTEL",
      description: "A strong academic credential showing core knowledge in data science.",
      category: "Data Science",
      color: "from-blue-500 to-cyan-500",
      icon: "📊",
      image: "/images/certificates/Data Mining_page-0001.jpg",
      skills: ["Data Mining", "Machine Learning", "Statistical Analysis"]
    },
    {
      title: "Data Analysis",
      issuer: "Deloitte",
      description: "Industry-backed certification demonstrating analytical thinking and business data understanding.",
      category: "Analytics",
      color: "from-green-500 to-emerald-500",
      icon: "📈",
      image: "/images/certificates/Data Analysis_page-0001.jpg",
      skills: ["Business Analytics", "Data Visualization", "Strategic Thinking"]
    },
    {
      title: "Explore Generative AI with the Gemini API in Vertex AI",
      issuer: "Google Cloud",
      description: "Highlights cutting-edge skills in GenAI and the Gemini ecosystem (very current and in-demand).",
      category: "AI/ML",
      color: "from-purple-500 to-pink-500",
      icon: "🤖",
      image: "/images/certificates/explore-generative-ai-with-the-vertex-ai-gemini-api.png",
      skills: ["Generative AI", "Gemini API", "Vertex AI", "Google Cloud"]
    },
    {
      title: "Perform Predictive Data Analysis in BigQuery",
      issuer: "Google Cloud",
      description: "Data science on GCP - Advanced analytics and machine learning on cloud platform.",
      category: "Cloud & Data Science",
      color: "from-orange-500 to-red-500",
      icon: "☁️",
      image: "/images/certificates/perform-predictive-data-analysis-in-bigquery-skill-.png",
      skills: ["BigQuery", "Predictive Analytics", "GCP", "SQL"]
    },
    {
      title: "Build Infrastructure with Terraform on Google Cloud",
      issuer: "Google Cloud",
      description: "Adds DevOps and cloud automation expertise — impressive for full-stack or backend roles.",
      category: "DevOps",
      color: "from-indigo-500 to-blue-500",
      icon: "🏗️",
      image: "/images/certificates/build-infrastructure-with-terraform-on-google-cloud.png",
      skills: ["Terraform", "Infrastructure as Code", "DevOps", "Cloud Architecture"]
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Professional{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Certificates
                </span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Industry-recognized certifications showcasing expertise in data science, AI, cloud computing, and DevOps
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 h-full">
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cert.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {cert.icon}
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${cert.color} text-white`}>
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <Building className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {cert.issuer}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>

                  {/* Certificate Image Preview */}
                  <div className="mb-4">
                    <div className="relative group/image">
                      <img
                        src={cert.image}
                        alt={`${cert.title} Certificate`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-transform duration-300 group-hover/image:scale-105"
                        onClick={() => setSelectedCertificate(cert)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 rounded-lg transition-colors duration-300 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Certificate Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      Certified
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCertificate(cert)}
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      View Certificate
                      <Eye className="w-3 h-3 ml-1" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Continuous Learning Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                These certifications represent my commitment to staying current with industry trends and 
                continuously expanding my technical expertise across multiple domains.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Data Science & Analytics
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Artificial Intelligence
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Cloud Computing
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  DevOps & Infrastructure
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Issued by {selectedCertificate.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="mb-6">
                <img
                  src={selectedCertificate.image}
                  alt={`${selectedCertificate.title} Certificate`}
                  className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* Certificate Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;