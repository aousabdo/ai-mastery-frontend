// src/ProgramFitAssessment.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 'technical',
    text: 'Rate your technical background in programming, math, and statistics:',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  {
    id: 'aiml',
    text: 'How would you describe your current AI/ML knowledge level?',
    options: ['No knowledge', 'Basic understanding', 'Practical experience', 'Advanced expertise'],
  },
  {
    id: 'goals',
    text: 'What are your primary career goals related to AI?',
    options: ['Research', 'Industry application', 'Entrepreneurship', 'Undecided'],
  },
  {
    id: 'time',
    text: 'How much time can you commit to this program weekly?',
    options: ['0-5 hours', '5-10 hours', '10-20 hours', '20+ hours'],
  },
  {
    id: 'style',
    text: 'What is your preferred learning style?',
    options: ['Self-paced online', 'Structured online courses', 'In-person workshops', 'Hands-on projects'],
  },
];

const ProgramFitAssessment = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [initialSignup, setInitialSignup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('initialSignup');
    if (!storedData) {
      // Redirect to initial signup if data is not available
      navigate('/initial-signup');
    } else {
      setInitialSignup(JSON.parse(storedData));
    }
  }, [navigate]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateFit = () => {
    let score = 0;
    if (answers.technical === 'Advanced' || answers.technical === 'Expert') score += 2;
    if (answers.aiml === 'Practical experience' || answers.aiml === 'Advanced expertise') score += 2;
    if (answers.time === '10-20 hours' || answers.time === '20+ hours') score += 2;
    
    if (score >= 5) return 'High';
    if (score >= 3) return 'Medium';
    return 'Low';
  };

  const getFeedback = () => {
    const fit = calculateFit();
    switch (fit) {
      case 'High':
        return "Based on your responses, you seem to be an excellent fit for our AI Innovation Program! Your technical background and commitment level align well with the program's requirements.";
      case 'Medium':
        return "You show potential for our AI Innovation Program. While you may face some challenges, with dedication and hard work, you could benefit greatly from the program.";
      case 'Low':
        return "Our AI Innovation Program might be challenging for you at this stage. We recommend building more foundational knowledge in programming and AI before applying. Consider our introductory courses first.";
      default:
        return "Thank you for completing the assessment. Please contact us for a personalized evaluation.";
    }
  };

  const handleComplete = async () => {
    const applicantId = localStorage.getItem('applicantId');
    console.log('Applicant ID:', applicantId);
    if (!applicantId) {
      console.error('No applicant ID found');
      alert('Error: No applicant ID found. Please start from the initial signup page.');
      navigate('/initial-signup');
      return;
    }

    const assessmentData = {
      applicant_id: parseInt(applicantId, 10), // Ensure it's a number
      technical_background: answers.technical,
      aiml_knowledge: answers.aiml,
      career_goals: answers.goals,
      time_commitment: answers.time,
      learning_style: answers.style,
      fit_score: calculateFit(),
      feedback: getFeedback()
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submit-assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData)
      });
      const data = await response.json();
      console.log('Assessment submission response:', data);
      
      if (response.ok) {
        console.log('Assessment submitted successfully');
        navigate('/apply');
      } else {
        throw new Error(data.error || 'Failed to submit assessment');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white bg-opacity-10 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-center text-3xl font-extrabold text-white mb-8">
            Program Fit Assessment
          </h2>
          {!showResults ? (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <p className="text-lg text-white mb-4">{questions[currentQuestion].text}</p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Assessment Results</h3>
              <p className="text-lg text-white mb-4">{getFeedback()}</p>
              <p className="text-md text-indigo-300 mb-4">
                Program Fit: <span className="font-bold">{calculateFit()}</span>
              </p>
              <button
                onClick={handleComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Continue to Full Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramFitAssessment;