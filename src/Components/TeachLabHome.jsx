import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Star,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  MessageSquare,
  BarChart,
  Zap,
  Globe,
  Sparkles
} from 'lucide-react';

const TeachLabHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
     

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A comprehensive suite of tools designed specifically for modern educators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-white to-blue-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive Content</h3>
              <p className="text-gray-600 mb-6">Create engaging lessons with multimedia, quizzes, and interactive elements that keep students focused and motivated.</p>
              <ul className="space-y-3">
                {['Drag & Drop Builder', 'Multimedia Integration', 'Templates Library', 'Real-time Updates'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-white to-indigo-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Collaborative Learning</h3>
              <p className="text-gray-600 mb-6">Foster teamwork with group projects, peer reviews, and real-time collaboration tools that build community.</p>
              <ul className="space-y-3">
                {['Group Projects', 'Peer Review System', 'Discussion Forums', 'Team Analytics'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-white to-purple-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Progress Analytics</h3>
              <p className="text-gray-600 mb-6">Track student performance with detailed insights, predictive analytics, and personalized recommendations.</p>
              <ul className="space-y-3">
                {['Performance Dashboards', 'Predictive Analytics', 'Custom Reports', 'Automated Alerts'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    
    
    </div>
  );
};

export default TeachLabHome;