const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Engineering',
      field: 'Information Science & Engineering',
      institution: 'Dayananda Sagar College of Engineering',
      location: 'Bengaluru, Karnataka',
      duration: 'Expected June 2026',
      status: 'In Progress',
      
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      field: 'Science Stream',
      institution: 'Aklank Public School',
      location: 'Kota, Rajasthan',
      duration: 'Completed July 2021',
      status: 'Completed',
      
    }
  ]

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Education
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Academic journey and qualifications
          </p>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Institution Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Education Details */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {edu.degree}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          edu.status === 'In Progress' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                      <p className="text-lg text-blue-600 font-medium mb-1">
                        {edu.field}
                      </p>
                      <p className="text-gray-700 font-medium mb-1">
                        {edu.institution}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                        <span>{edu.location}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{edu.duration}</span>
                      </div>
                    </div>
 
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Academic Achievements */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Academic Focus Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Data Structures & Algorithms',
                'Software Engineering',
                'Database Management',
                'Web Development',
                'Mobile App Development',
                'Artificial Intelligence',
                'Machine Learning',
                'Computer Vision',
                'System Design',
                'Problem Solving'
              ].map((area, index) => (
                <span 
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education