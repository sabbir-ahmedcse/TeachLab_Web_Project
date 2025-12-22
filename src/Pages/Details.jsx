// src/Pages/Details.jsx
import React, { useState, useEffect } from 'react'
import { useLoaderData, useNavigate, useLocation } from 'react-router'
import { 
  FaArrowLeft, 
  FaBolt, 
  FaCode, 
  FaTools, 
  FaRobot,
  FaCalendarAlt,
  FaDownload,
  FaShareAlt,
  FaBook,
  FaMicrochip,
  FaCogs,
  FaPlug,
  FaWifi,
  FaCaretRight,
  FaCheckCircle,
  FaStar
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const Details = () => {
  const allProjects = useLoaderData()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  // URL থেকে project ID বের করা
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const projectId = searchParams.get('id')
    
    if (projectId) {
      const project = allProjects.find(p => p.id === projectId)
      setSelectedProject(project)
    } else {
      // যদি কোনো ID না থাকে, প্রথম প্রজেক্ট দেখাবে
      setSelectedProject(allProjects[0])
    }
  }, [location.search, allProjects])

  // Difficulty color mapping
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800 border-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Advanced': 'bg-red-100 text-red-800 border-red-300'
  }

  // যদি কোনো প্রজেক্ট না থাকে
  if (!selectedProject) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">প্রজেক্ট পাওয়া যায়নি</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            হোমে ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  const {
    id,
    title,
    description,
    imageUrl,
    difficulty,
    application,
    components,
    voltage,
    programmingLanguage,
    features = []
  } = selectedProject

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 }
  }

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5 }
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft />
          <span>ফিরে যান</span>
        </motion.button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Project Header */}
        <motion.div 
          variants={contentVariants}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-8 border border-blue-100"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Project Image */}
            <div className="lg:w-2/5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={imageUrl || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop'} 
                  alt={title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full font-bold ${difficultyColors[difficulty]}`}>
                    {difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg">
                  <span className="font-mono">#{id.replace('robot_', '')}</span>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="lg:w-3/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <FaRobot className="text-blue-500" />
                    <span className="text-lg text-gray-600">{application}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg"
                    title="ডাউনলোড"
                  >
                    <FaDownload className="text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg"
                    title="শেয়ার"
                  >
                    <FaShareAlt className="text-gray-600" />
                  </motion.button>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBolt className="text-yellow-500" />
                    <span className="font-semibold text-gray-700">ভোল্টেজ</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{voltage}</div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCode className="text-green-500" />
                    <span className="font-semibold text-gray-700">ল্যাঙ্গুয়েজ</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 truncate">{programmingLanguage}</div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTools className="text-purple-500" />
                    <span className="font-semibold text-gray-700">কম্পোনেন্ট</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{components.length}</div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="font-semibold text-gray-700">স্ট্যাটাস</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">Active</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <FaBook />
                  ডকুমেন্টেশন পড়ুন
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold flex items-center gap-2"
                >
                  <FaDownload />
                  কোড ডাউনলোড
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {['overview', 'components', 'features', 'code'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && 'ওভারভিউ'}
                {tab === 'components' && 'কম্পোনেন্টস'}
                {tab === 'features' && 'ফিচারস'}
                {tab === 'code' && 'কোড স্নিপেট'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-b-2xl rounded-r-2xl shadow-lg p-8"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">প্রজেক্ট ওভারভিউ</h3>
                <p className="text-gray-700 leading-relaxed">
                  এই রোবোটিক প্রজেক্টটি {application} এর জন্য ডিজাইন করা হয়েছে। এটি {difficulty.toLowerCase()} লেভেলের একটি প্রজেক্ট যা {programmingLanguage} ব্যবহার করে তৈরি করা হয়েছে।
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      কী শিখবেন
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <FaCaretRight className="text-blue-500 mt-1" />
                        <span>রোবট কন্ট্রোল সিস্টেম ডিজাইন</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCaretRight className="text-blue-500 mt-1" />
                        <span>{programmingLanguage} প্রোগ্রামিং</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCaretRight className="text-blue-500 mt-1" />
                        <span>সেন্সর ইন্টিগ্রেশন</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      প্রজেক্ট হাইলাইটস
                    </h4>
                    <ul className="space-y-2">
                      {features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'components' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">প্রয়োজনীয় কম্পোনেন্টস</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {components.map((component, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <FaMicrochip className="text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{component}</h4>
                          <p className="text-sm text-gray-500">কম্পোনেন্ট #{index + 1}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">প্রজেক্ট ফিচারস</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-lg">
                          {index % 3 === 0 && <FaCogs className="text-blue-600" />}
                          {index % 3 === 1 && <FaPlug className="text-green-600" />}
                          {index % 3 === 2 && <FaWifi className="text-purple-600" />}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">ফিচার #{index + 1}</h4>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">কোড স্নিপেট</h3>
                <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-gray-100 font-mono text-sm">
{`// ${title} - Main Control Code
// Programming Language: ${programmingLanguage}

#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println("${title} Initialized");
}

void loop() {
  // Main control logic for ${application}
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
  
  // Sensor reading example
  int sensorValue = analogRead(A0);
  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
}

// Additional functions for ${components[0]?.split(' ')[0] || 'component'} control
void controlMotor(int speed, int direction) {
  // Motor control implementation
}`}
                  </pre>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Full Code Download
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Copy Code
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Projects */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">সম্পর্কিত প্রজেক্ট</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {allProjects
              .filter(p => p.id !== id && p.difficulty === difficulty)
              .slice(0, 3)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                  onClick={() => navigate(`/details?id=${project.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.title}</h4>
                      <p className="text-sm text-gray-500">{project.application}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Details