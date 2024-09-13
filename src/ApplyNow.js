// src/ApplyNow.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    experience: '',
    motivation: '',
  });
  const [assessmentResults, setAssessmentResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('completeSignup');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(prevState => ({
        ...prevState,
        name: parsedData.name,
        email: parsedData.email,
      }));
      setAssessmentResults(parsedData.assessmentResults);
    } else {
      // Redirect to initial signup if data is not available
      navigate('/initial-signup');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicantId = localStorage.getItem('applicantId');
    if (!applicantId) {
      console.error('No applicant ID found');
      return;
    }

    const applicationData = {
      applicant_id: applicantId,
      education: formData.education,
      experience: formData.experience,
      motivation: formData.motivation
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submit-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      const data = await response.json();
      console.log('Application submitted:', data);
      // Clear stored data
      localStorage.removeItem('applicantId');
      // Show success message or redirect
      alert('Application submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-center text-3xl font-extrabold text-white mb-8">
            Complete Your Application
          </h2>
          {assessmentResults && (
            <div className="mb-6 p-4 bg-indigo-800 bg-opacity-50 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">Your Assessment Results</h3>
              <p className="text-indigo-200">Program Fit: {assessmentResults.fit}</p>
              <p className="text-indigo-200">{assessmentResults.feedback}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="education"
                  name="education"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Educational Background"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Professional Experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Motivation for joining the program"
                  rows="4"
                  value={formData.motivation}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;