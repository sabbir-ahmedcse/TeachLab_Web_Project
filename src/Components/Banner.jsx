import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaSearch, FaBookOpen, FaUsers, FaChartLine, FaArrowRight } from 'react-icons/fa';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Banner slides data
  const slides = [
    {
      title: "Unlock Your Learning Potential",
      subtitle: "Interactive courses tailored for modern learners",
      bgColor: "from-blue-600 to-purple-600",
      icon: <FaBookOpen className="text-4xl" />,
      ctaText: "Start Learning"
    },
    {
      title: "Join Our Growing Community",
      subtitle: "Connect with 50,000+ students worldwide",
      bgColor: "from-teal-500 to-emerald-600",
      icon: <FaUsers className="text-4xl" />,
      ctaText: "Join Community"
    },
    {
      title: "Track Your Progress",
      subtitle: "Advanced analytics to monitor your learning journey",
      bgColor: "from-orange-500 to-pink-600",
      icon: <FaChartLine className="text-4xl" />,
      ctaText: "View Dashboard"
    }
  ];

  // Auto slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Floating elements animation positions
  const floatingElements = [
    { top: '15%', left: '10%', delay: 0, size: 'w-8 h-8' },
    { top: '25%', left: '85%', delay: 0.5, size: 'w-6 h-6' },
    { top: '70%', left: '15%', delay: 1, size: 'w-10 h-10' },
    { top: '80%', left: '80%', delay: 1.5, size: 'w-12 h-12' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  return (
    <div className=" relative max-w-[1160px] mx-auto overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900 text-white min-h-[85vh] flex items-center rounded-2xl mt-1 shadow-md">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl`}
            style={{ top: element.top, left: element.left }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">🌟 Trusted by 500+ Students</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Learning Experience
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Discover interactive courses, hands-on projects, and a vibrant community 
              that accelerates your learning journey. From beginner to advanced levels.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { value: "500+", label: "Courses" },
                { value: "50K+", label: "Students" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onSubmit={handleSearch}
              className="relative max-w-xl mb-8"
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn today?"
                  className="w-full pl-12 pr-32 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  Explore <FaArrowRight />
                </button>
              </div>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                Start Free Trial <FaArrowRight />
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <FaPlay /> Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
            >
              {/* Current Slide Content */}
              <div className="text-center">
                <div className="inline-block p-4 bg-white/10 rounded-2xl mb-6">
                  {slides[currentSlide].icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{slides[currentSlide].title}</h3>
                <p className="text-gray-300 mb-6">{slides[currentSlide].subtitle}</p>
                <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  {slides[currentSlide].ctaText}
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-8 bg-gradient-to-r from-blue-400 to-teal-400' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute -top-4 -right-4 w-64 bg-gradient-to-br from-teal-500/30 to-emerald-600/30 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <FaUsers />
                </div>
                <div>
                  <div className="font-bold">Live Sessions</div>
                  <div className="text-sm text-gray-300">Join now!</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-6 -left-4 w-56 bg-gradient-to-br from-orange-500/30 to-pink-600/30 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <FaChartLine />
                </div>
                <div>
                  <div className="font-bold">Progress</div>
                  <div className="text-sm text-gray-300">+25% this week</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-teal-400 rounded-full mx-auto mt-2"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;