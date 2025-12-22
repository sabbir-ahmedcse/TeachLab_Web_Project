// src/Pages/Gallery.jsx
import React from 'react'
import { useLoaderData } from 'react-router'
import { motion } from 'framer-motion'
import { 
  FaRobot,
  FaSearch,
  FaFilter,
  FaSortAmountDown
} from 'react-icons/fa'
import ProjectCard from '../Components/ProjectCard'

const Gallery = () => {
  const dataPromise = useLoaderData()
  
  // যদি কোনো ডাটা না থাকে
  if (!dataPromise || dataPromise.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">কোনো প্রজেক্ট পাওয়া যায়নি</h2>
          <p className="text-gray-500">দুঃখিত, এই মুহূর্তে কোনো রোবোটিক প্রজেক্ট উপলব্ধ নেই।</p>
        </div>
      </div>
    )
  }

  // Difficulty counts
  const beginnerCount = dataPromise.filter(d => d.difficulty === 'Beginner').length
  const intermediateCount = dataPromise.filter(d => d.difficulty === 'Intermediate').length
  const advancedCount = dataPromise.filter(d => d.difficulty === 'Advanced').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 max-w-6xl mx-auto bg-blue-100 ">
      <div className="container mx-auto px-4">
        {/* Gallery Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
              <FaRobot className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              রোবোটিক <span className="text-blue-600">প্রজেক্ট গ্যালারি</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            আমাদের বিশেষভাবে ডিজাইনকৃত {dataPromise.length}টি রোবোটিক প্রজেক্ট এক্সপ্লোর করুন। প্রতিটি প্রজেক্ট সম্পূর্ণ ডকুমেন্টেড এবং শেখার উপযোগী।
          </p>
        </motion.div>

        {/* Stats and Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{dataPromise.length}</div>
                <div className="text-sm text-gray-500">মোট প্রজেক্ট</div>
              </div>
              
              <div className="hidden md:block h-10 w-px bg-gray-200"></div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                  Beginner: {beginnerCount}
                </span>
                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                  Intermediate: {intermediateCount}
                </span>
                <span className="px-3 py-1.5 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                  Advanced: {advancedCount}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="প্রজেক্ট খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <FaFilter />
                <span className="hidden md:inline">ফিল্টার</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <FaSortAmountDown />
                <span className="hidden md:inline">সাজান</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {dataPromise.map((data, index) => (
            <ProjectCard
              key={data.id} 
              data={data} 
              index={index % 8}
            />
          ))}
        </motion.div>

        {/* Gallery Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-2xl">
            <FaRobot className="text-blue-500" />
            <span className="text-gray-700 font-medium">
              মোট <span className="text-blue-600 font-bold">{dataPromise.length}টি</span> রোবোটিক প্রজেক্ট
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            প্রজেক্টগুলো নিয়মিত আপডেট করা হয়। নতুন প্রজেক্ট যুক্ত হওয়ার সাথে সাথে গ্যালারি আপডেট হবে।
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Gallery