import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaHeart, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRss } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer sections data
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", url: "/" },
        { name: "All Courses", url: "/courses" },
        { name: "Pricing", url: "/pricing" },
        { name: "Instructors", url: "/instructors" },
        { name: "Success Stories", url: "/success" },
        { name: "Blog", url: "/blog" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", url: "/docs" },
        { name: "Tutorials", url: "/tutorials" },
        { name: "Webinars", url: "/webinars" },
        { name: "Cheat Sheets", url: "/cheatsheets" },
        { name: "Community Forum", url: "/forum" },
        { name: "Help Center", url: "/help" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Press", url: "/press" },
        { name: "Partners", url: "/partners" },
        { name: "Legal", url: "/legal" },
        { name: "Contact", url: "/contact" },
      ]
    },
    {
      title: "Popular Courses",
      links: [
        { name: "Web Development", url: "/courses/web-dev" },
        { name: "Data Science", url: "/courses/data-science" },
        { name: "UI/UX Design", url: "/courses/ui-ux" },
        { name: "Mobile Development", url: "/courses/mobile" },
        { name: "Digital Marketing", url: "/courses/marketing" },
        { name: "AI & ML", url: "/courses/ai-ml" },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
    { icon: <SiDiscord />, url: "https://discord.com", label: "Discord" },
    { icon: <FaRss />, url: "/rss", label: "RSS Feed" },
  ];

  // App download links
  const appStores = [
    { name: "App Store", icon: "🍏", url: "#" },
    { name: "Google Play", icon: "📱", url: "#" },
    { name: "Microsoft Store", icon: "🪟", url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left Column - Brand & Newsletter */}
          <div className="space-y-8">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">TL</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  TeachLab
                </h2>
                <p className="text-gray-400 text-sm">Empowering Learners Worldwide</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 max-w-md text-lg leading-relaxed">
              Transform your career with our cutting-edge courses. Join 50,000+ learners 
              accelerating their growth with hands-on projects and expert guidance.
            </p>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-blue-900/30 to-teal-900/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-4">
                Subscribe to get the latest course updates and learning tips.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-1.5 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    Subscribe <FaArrowRight />
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            </div>

            {/* App Download */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get Our App</h4>
              <div className="flex flex-wrap gap-3">
                {appStores.map((store, index) => (
                  <a
                    key={index}
                    href={store.url}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <span className="text-xl">{store.icon}</span>
                    <span>{store.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-bold text-white border-l-4 border-blue-500 pl-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright & Links */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {currentYear} TeachLab. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Cookie Policy
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 rounded-lg text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500 animate-pulse" /> for learners worldwide
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-400/20 rounded-full flex items-center justify-center mb-3">
                <FaEnvelope className="text-blue-400 text-xl" />
              </div>
              <h4 className="font-semibold mb-1">Email Us</h4>
              <a href="mailto:support@teachlab.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                mdsabbirahmedcst@gmail.com
              </a>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-400/20 rounded-full flex items-center justify-center mb-3">
                <FaPhone className="text-blue-400 text-xl" />
              </div>
              <h4 className="font-semibold mb-1">Call Us</h4>
              <a href="tel:+18005551234" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                +1(800) 01785-525461
              </a>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-800/30 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-400/20 rounded-full flex items-center justify-center mb-3">
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
              </div>
              <h4 className="font-semibold mb-1">Visit Us</h4>
              <p className="text-gray-300">
                123 Learning Street,<br />
                Education City, EC 10101
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">⭐ 4.9/5</div>
            <div className="text-sm text-gray-400">Student Rating</div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden md:block"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">🏆 50+</div>
            <div className="text-sm text-gray-400">Industry Awards</div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden md:block"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">🔒 SSL</div>
            <div className="text-sm text-gray-400">Secure Learning</div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden md:block"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">🌍 120+</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Top
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;