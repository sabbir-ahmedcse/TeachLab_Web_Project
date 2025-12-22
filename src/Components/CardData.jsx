// src/components/CardData.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
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

const CardData = ({ data }) => {
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
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.3)",
    },
    tap: { scale: 0.95 }
  };

  // Handle View Details click
  const handleViewDetails = () => {
    navigate(`/details?id=${id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-blue-200 transition-all duration-300"
    >
      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden group">
        <motion.img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[difficulty] || 'bg-gray-100 text-gray-800'}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>

        {/* Quick Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaLayerGroup className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-700">{application}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <FaBolt className="text-green-600" />
            </div>
            <span className="text-sm font-semibold">{voltage}</span>
          </div>
        </div>

        {/* Components Preview */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FaTools className="text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">কম্পোনেন্টস:</h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {components.slice(0, 3).map((component, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {component}
              </span>
            ))}
            {components.length > 3 && (
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                +{components.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          onClick={handleViewDetails}
        >
          <span>View Details</span>
          <FaExternalLinkAlt className="text-sm" />
        </motion.button>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            <span>Click for Details</span>
          </div>
          <div className="text-blue-600 font-medium">#{id.replace('robot_', '')}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default CardData