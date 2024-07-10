// pages/api/generateQuiz.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../src/app/config/supabaseClient';
import axios from 'axios';

const generateQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
  const { topic, questions } = req.body;

  // Call Gemini API to generate questions based on the topic
  const response = await axios.post('https://api.gemini.com/v1/generate', { topic });

  // Save generated quiz to Supabase
  const { data, error } = await supabase
    .from('quizzes')
    .insert([{ topic, questions: response.data.questions }])
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ quizId: data.id });
  }
};

export default generateQuiz;
