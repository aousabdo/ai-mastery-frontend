// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AIInnovationProgramBrochure from './AIInnovationProgramBrochure';
import InitialSignup from './InitialSignup';
import ProgramFitAssessment from './ProgramFitAssessment';
import ApplyNow from './ApplyNow';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AIInnovationProgramBrochure />} />
      <Route path="/initial-signup" element={<InitialSignup />} />
      <Route path="/assessment" element={<ProgramFitAssessment />} />
      <Route path="/apply" element={<ApplyNow />} />
    </Routes>
  );
}

export default App;