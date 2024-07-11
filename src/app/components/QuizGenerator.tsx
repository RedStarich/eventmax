// // components/QuizGenerator.tsx
// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import axios from 'axios';

// interface QuizFormInput {
//   topic: string;
//   questions: { question: string; answer: string }[];
// }

// const QuizGenerator: React.FC = () => {
//   const { register, handleSubmit, control, reset } = useForm<QuizFormInput>();
//   const [quizId, setQuizId] = useState<string | null>(null);

//   const onSubmit: SubmitHandler<QuizFormInput> = async (data) => {
//     try {
//       const response = await axios.post('/api/generateQuiz', data);
//       setQuizId(response.data.quizId);
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Generate Quiz</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register('topic', { required: true })} placeholder="Topic" />
//         {/* Add UI for dynamically adding questions and answers */}
//         <button type="submit">Generate Quiz</button>
//       </form>
//       {quizId && <p>Quiz generated! Share this link: /quiz/{quizId}</p>}
//     </div>
//   );
// };

// export default QuizGenerator;

import React from 'react'

export default function QuizGenerator() {
  return (
    <div>QuizGenerator</div>
  )
}
