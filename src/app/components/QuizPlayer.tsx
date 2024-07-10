// components/QuizPlayer.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const QuizPlayer: React.FC = () => {
  const router = useRouter();
  const { quizId } = router.query;
  const [quiz, setQuiz] = useState<any>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', quizId);
        if (error) console.error(error);
        else setQuiz(data[0]);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.topic}</h1>
      {quiz.questions.map((question: any, index: number) => (
        <div key={index}>
          <p>{question.question}</p>
          {question.answers.map((answer: any, idx: number) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer.isCorrect)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      ))}
      <p>Your score: {score}</p>
    </div>
  );
};

export default QuizPlayer;
