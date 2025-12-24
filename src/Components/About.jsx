import React from 'react';
import { 
  FaLaptopCode, FaUsers, FaGraduationCap, FaBriefcase, FaCode, 
  FaDatabase, FaNetworkWired, FaRobot, FaChartLine, FaAward, 
  FaHandsHelping, FaLightbulb, FaUserTie, FaPaintBrush, 
  FaFilePowerpoint, FaVideo, FaFileAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import sabbir from '../assets/sabbir.jpg';
import naim from '../assets/naim.gif';
import sajib from '../assets/sajib.png';
import akhi from '../assets/akhi.png';
import borsha from '../assets/borsa.jpeg';

const About = () => {
  // Updated Team members data with your actual team
  const teamMembers = [
    {
      id: 1,
      name: "MD. SABBIR AHMED",
      role: "Team Leader, Frontend Developer",
      responsibility: "Architecture & Core UI",
      rollNumber: "717565",
      image: sabbir,
      imageClass: "object-cover", // ছবির জন্য ক্লাস
      skills: ["React Architecture", "UI/UX Design", "Project Management"],
      icon: <FaUserTie className="text-blue-600" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "MD. NAIM MAHMUD",
      role: "UI Design Specialist",
      responsibility: "Design Conceptualization & Workflow",
      rollNumber: "717526",
      image: naim,
      imageClass: "object-contain bg-gray-100", // GIF জন্য আলাদা স্টাইল
      skills: ["Figma", "UI Design", "Workflow Planning"],
      icon: <FaPaintBrush className="text-purple-600" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "AKHI KHATUN",
      role: "Content Strategist",
      responsibility: "Presentation Idea & Content Structuring",
      rollNumber: "717570",
      image: akhi,
      imageClass: "object-cover",
      skills: ["Content Strategy", "Presentation", "Documentation"],
      icon: <FaFilePowerpoint className="text-green-600" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "ARGINA AKTER BORSHA",
      role: "Visual Design Specialist",
      responsibility: "Animation & Visual Implementation",
      rollNumber: "717534",
      image: borsha,
      imageClass: "object-cover",
      skills: ["Animation", "Visual Design", "UI Support"],
      icon: <FaVideo className="text-orange-600" />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "MD. SAJIB UDDIN CHOWDHURY",
      role: "Support & Documentation",
      responsibility: "Supportive Tasks & Documentation",
      rollNumber: "717568",
      image: sajib,
      imageClass: "object-cover",
      skills: ["Documentation", "Testing", "Technical Support"],
      icon: <FaFileAlt className="text-teal-600" />,
      color: "from-teal-500 to-blue-500"
    }
  ];

  // Core subjects
  const subjects = [
    { name: "Programming Fundamentals", icon: <FaCode />, color: "from-blue-500 to-cyan-500" },
    { name: "Database Management", icon: <FaDatabase />, color: "from-green-500 to-emerald-500" },
    { name: "Computer Networks", icon: <FaNetworkWired />, color: "from-purple-500 to-pink-500" },
    { name: "Web Development", icon: <FaLaptopCode />, color: "from-orange-500 to-red-500" },
    { name: "Software Engineering", icon: <FaBriefcase />, color: "from-indigo-500 to-blue-500" },
    { name: "AI & Machine Learning", icon: <FaRobot />, color: "from-teal-500 to-green-500" }
  ];

  // Achievements
  const achievements = [
    { number: "5", label: "Team Members", icon: <FaUsers /> },
    { number: "100%", label: "Project Completion", icon: <FaChartLine /> },
    { number: "4+", label: "Key Roles", icon: <FaHandsHelping /> },
    { number: "7175-", label: "Roll Series", icon: <FaGraduationCap /> }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 my-10 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <section className="relative shadow-md rounded-md overflow-hidden bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaGraduationCap className="text-blue-300" />
              <span className="text-sm font-semibold">CST Department - Team 4</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meet Our
              <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Dream Team
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of Computer Science & Technology students from the Diploma Engineering program, 
              working together to build innovative solutions and master cutting-edge technologies.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
                Our Projects
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Contact Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section with Beautiful Circular Images */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Dream Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented CST students behind our innovative projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  {/* Top colored bar based on member role */}
                  <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
                  
                  <div className="p-6">
                    {/* Circular Image Container */}
                    <div className="relative flex flex-col items-center mb-6">
                      <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 ${member.id === 2 ? 'bg-gray-100' : ''}`}>
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className={`w-full h-full ${member.imageClass} transition-transform duration-500 group-hover:scale-110`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=random&color=fff&size=128`;
                          }}
                        />
                      </div>
                      
                      {/* Online Status Indicator */}
                      <div className="absolute bottom-8 right-1/4 transform translate-x-1/2">
                        {/* <div className="w-4 h-4 rounded-full border-2 border-white"></div> */}
                      </div>
                      
                      {/* Name and Roll Number */}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-900">{member.name}</h3>
                        <div className="mt-1">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-semibold">
                            Roll: {member.rollNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">Role</div>
                        <div className="font-semibold text-blue-600">{member.role}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">Responsibility</div>
                        <div className="text-gray-700">{member.responsibility}</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 font-medium mb-2">Skills & Expertise</div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-500 text-center">
                        Computer Science & Technology
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Team <span className="text-blue-600">Statistics</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our collaborative strength and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl text-white mb-4 text-2xl">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Subjects Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-blue-600">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technical domains we specialize in as CST students
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${subject.color} rounded-xl text-white mb-4 text-2xl`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{subject.name}</h3>
                  <p className="text-gray-600">
                    Hands-on practical sessions with industry-relevant projects and assignments.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our <span className="text-blue-300">Collaborative Vision</span>
                </h2>
                <p className="text-blue-200 text-lg">
                  Leveraging diverse skills to build innovative solutions
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mb-4 text-xl">
                    <FaUserTie />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Leadership & Strategy</h4>
                  <p className="text-blue-200">Guiding the team with clear vision and technical direction</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mb-4 text-xl">
                    <FaPaintBrush />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Design Excellence</h4>
                  <p className="text-blue-200">Creating intuitive and beautiful user experiences</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-400 rounded-full flex items-center justify-center mb-4 text-xl">
                    <FaHandsHelping />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Team Collaboration</h4>
                  <p className="text-blue-200">Working together to achieve common goals</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Interested in Our Work?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team of dedicated CST students is ready to take on challenging projects 
                and create innovative solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  View Portfolio
                </button>
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                  Contact Team 7175
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;