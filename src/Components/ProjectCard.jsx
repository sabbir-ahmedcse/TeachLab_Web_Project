// src/components/ProjectCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaMicrochip, 
  FaCode, 
  FaBolt, 
  FaTools, 
  FaRobot,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaLayerGroup
} from 'react-icons/fa'
import { useNavigate } from 'react-router';

const ProjectCard = ({ data, index }) => {
  const navigate = useNavigate()
  
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
    features
  } = data;

  // Difficulty color mapping
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800 border-green-200',
    'Intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Advanced': 'bg-red-100 text-red-800 border-red-200'
  };

  // Application category colors
  const appColors = {
    'রোবোটিক আর্ম': 'bg-blue-50 text-blue-700',
    'অটোনোমাস নেভিগেশন': 'bg-purple-50 text-purple-700',
    'হিউম্যান-মেশিন ইন্টারঅ্যাকশন': 'bg-teal-50 text-teal-700',
    'লাইন ফলোয়িং': 'bg-orange-50 text-orange-700',
    'ভয়েস কন্ট্রোল': 'bg-pink-50 text-pink-700',
    'বায়োমেডিকেল': 'bg-indigo-50 text-indigo-700',
    'সৌরশক্তি সংগ্রহ': 'bg-amber-50 text-amber-700',
    'সার্ভেইল্যান্স': 'bg-gray-50 text-gray-700',
    'এন্টারটেইনমেন্ট': 'bg-rose-50 text-rose-700'
  };

  // Handle view details click
  const handleViewDetails = () => {
    navigate(`/details?id=${id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Card Header with Image */}
      <div className="relative h-56 overflow-hidden group">
        <motion.img 
          src={imageUrl || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Difficulty badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-sm font-bold border ${difficultyColors[difficulty] || 'bg-gray-100 text-gray-800'}`}>
            {difficulty}
          </span>
        </div>
        
        {/* Project ID */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-mono">
            #{id.replace('robot_', '')}
          </div>
        </div>
        
        {/* Application Category */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${appColors[application] || 'bg-gray-100 text-gray-700'}`}>
            {application}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="flex justify-center mb-1">
              <FaBolt className="text-blue-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{voltage}</div>
            <div className="text-xs text-gray-500">ভোল্টেজ</div>
          </div>
          
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="flex justify-center mb-1">
              <FaCode className="text-green-500" />
            </div>
            <div className="text-sm font-bold text-gray-900 truncate">{programmingLanguage?.split(' ')[0] || 'C++'}</div>
            <div className="text-xs text-gray-500">ল্যাঙ্গুয়েজ</div>
          </div>
          
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="flex justify-center mb-1">
              <FaTools className="text-purple-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{components?.length || 0}</div>
            <div className="text-xs text-gray-500">পার্টস</div>
          </div>
        </div>

        {/* Key Components */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaMicrochip className="text-gray-500 text-sm" />
            <h4 className="text-sm font-semibold text-gray-700">মূল কম্পোনেন্টস:</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {components?.slice(0, 3).map((component, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default"
              >
                {component}
              </motion.span>
            ))}
            {components?.length > 3 && (
              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                +{components.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FaLayerGroup className="text-gray-500 text-sm" />
              <h4 className="text-sm font-semibold text-gray-700">বিশেষ ফিচার:</h4>
            </div>
            <div className="space-y-1">
              {features.slice(0, 2).map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600 line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
            onClick={(e) => {
              e.stopPropagation() // কার্ড ক্লিক থেকে আলাদা রাখা
              handleViewDetails()
            }}
          >
            <FaExternalLinkAlt className="text-xs" />
            বিস্তারিত দেখুন
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="সেভ করুন"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-xs" />
            <span>ক্লিক করে বিস্তারিত দেখুন</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <FaRobot className="text-blue-500" />
              <span className="font-medium">রোবোটিক</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard