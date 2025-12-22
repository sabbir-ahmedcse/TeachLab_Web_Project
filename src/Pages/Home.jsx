import React from 'react'
import Banner from '../Components/Banner'
import { NavLink, useLoaderData } from 'react-router'
import CardData from '../Components/CardData'
import TeachLabHome from '../Components/TeachLabHome'

const Home = () => {
  const dataPromise = useLoaderData()
  
  // শুধুমাত্র প্রথম ৬টি আইটেম নিন
  const firstSixData = dataPromise.slice(0, 6)
  
  return (
    <div className="min-h-screen">
      <Banner />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl mx-auto bg-blue-100 my-10 rounded-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            রোবোটিক <span className="text-blue-600">প্রজেক্টস</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আমাদের বিশেষভাবে নির্বাচিত ৬টি রোবোটিক প্রজেক্ট এক্সপ্লোর করুন
          </p>
        </div>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {firstSixData.map((data) => (
            <div key={data.id}>
              <CardData data={data} />
            </div>
          ))}
        </div>

        {/* View All Button (Optional) */}
        {dataPromise.length > 6 && (
          <div className="text-center mt-12">
            <NavLink to='/gallery' className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300">
              View All Projects ({dataPromise.length})
            </NavLink>
          </div>
        )}
      </div>
      <TeachLabHome></TeachLabHome>
    </div>
  )
}

export default Home