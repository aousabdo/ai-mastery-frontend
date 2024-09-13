import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Globe, UserCheck, Lightbulb, Code, ChartBar } from 'lucide-react';

const GradientText = ({ children, className }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 ${className}`}>
    {children}
  </span>
);

const AnimatedIcon = ({ icon: Icon, className }) => (
  <div className={`transform transition-all duration-300 hover:scale-110 ${className}`}>
    <Icon size={40} strokeWidth={1.5} />
  </div>
);

const Section = ({ title, icon: Icon, children, className }) => (
  <div className={`mb-8 ${className}`}>
    <h3 className="text-2xl font-bold mb-4 flex items-center">
      <AnimatedIcon icon={Icon} className="mr-3 text-indigo-600" />
      <GradientText>{title}</GradientText>
    </h3>
    {children}
  </div>
);

export default function AIInnovationProgramBrochure() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-10">
          <h1 className="text-6xl font-extrabold mb-4">
            <GradientText>AI Mastery Accelerator</GradientText>
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-indigo-300">Revolutionizing Jordan's Digital Landscape</h2>
        </div>

        {/* Dr. Abdo's Profile */}
        <div className="bg-white bg-opacity-10 rounded-lg shadow-2xl p-8 mb-16 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src={process.env.PUBLIC_URL + '/Aous_Abdo_headshot.jpeg'} 
                  alt="Dr. Aous A. Abdo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-3xl font-bold mb-4 text-white">Led by AI Visionary</h3>
              <h4 className="text-2xl font-semibold mb-4 text-indigo-300">Dr. Aous A. Abdo</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Founder and CEO of Analytica Data Science Solutions</li>
                <li>• Fellow of the US National Academy of Sciences</li>
                <li>• Strategic advisor to several agencies in the US Federal government and Fortune 500 companies</li>
                <li>• Former lead scientist at NASA and Naval Research Laboratory</li>
                <li>• Author of 3 groundbreaking books on Machine Learning and AI</li>
                <li>• 24+ publications in international journals including Nature and Science</li>
                <li>• International AI educator and AI thought leader</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <Section title="Program Highlights" icon={Brain} className="text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="font-bold text-xl mb-3">Foundations of AI</h4>
              <ul className="list-disc list-inside">
                <li>Advanced Python for AI</li>
                <li>Data Science Mastery</li>
                <li>Machine Learning Fundamentals</li>
                <li>AI Ethics & Innovation</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="font-bold text-xl mb-3">AI Specializations</h4>
              <ul className="list-disc list-inside">
                <li>Computer Vision</li>
                <li>Natural Language Processing</li>
                <li>Reinforcement Learning</li>
                <li>Generative AI</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h4 className="font-bold text-xl mb-3">Applied AI Projects</h4>
              <ul className="list-disc list-inside">
                <li>Healthcare AI Solutions</li>
                <li>AI in Finance and Economics</li>
                <li>AI for Government and Public Policy</li>
                <li>AI Applications in Energy Sector</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Why Choose & Ideal Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Section title="Why Choose Us" icon={Lightbulb} className="text-white">
            <ul className="space-y-2">
              <li className="flex items-center"><ChartBar className="mr-2 text-yellow-400" size={20} /> Cutting-edge AI expertise</li>
              <li className="flex items-center"><Globe className="mr-2 text-green-400" size={20} /> Global perspective, local impact</li>
              <li className="flex items-center"><Rocket className="mr-2 text-red-400" size={20} /> Career-propelling skills</li>
              <li className="flex items-center"><Code className="mr-2 text-purple-400" size={20} /> Hands-on, real-world projects</li>
            </ul>
          </Section>
          <Section title="Ideal Candidates" icon={UserCheck} className="text-white">
            <ul className="space-y-2">
              <li>• AI-curious professionals</li>
              <li>• Tech-savvy recent graduates</li>
              <li>• Visionary entrepreneurs</li>
              <li>• Forward-thinking government officials</li>
            </ul>
          </Section>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">Ready to Shape the Future?</h3>
          <div className="space-x-4">
            <Link 
              to="/initial-signup" 
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Apply Now
            </Link>
            <Link 
              to="/assessment" 
              className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Take Fit Assessment
            </Link>
          </div>
          <p className="mt-4 text-indigo-300">
            For more information, visit <a href="https://www.analyticadss.com/" className="text-indigo-200 hover:text-white underline">www.analyticadss.com</a> or contact us at <a href="mailto:AI_mastery_accelerator@analyticadss.com" className="text-indigo-200 hover:text-white underline">AI_mastery_accelerator@analyticadss.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}