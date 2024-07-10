// pages/generate.tsx
import React from 'react';
import { supabase } from '../config/supabaseClient';
import QuizGenerator from '../components/QuizGenerator';

const GenerateQuizPage: React.FC = () => {
  return (
    <div>
      <h1>Generate Quiz</h1>
      <QuizGenerator />
    </div>
  );
};

export default GenerateQuizPage;
