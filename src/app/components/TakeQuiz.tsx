// // components/TakeQuiz.tsx
// import { useState, useEffect } from 'react';
// import { supabase } from '../config/supabaseClient';

// interface Quiz {
//     id?: string;
//     title: string;
//     questions: Question[];
//     created_at?: string;
//   }

// const TakeQuiz = ({ quizId }) => {
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [answers, setAnswers] = useState<(number | null)[]>([]);
//   const [score, setScore] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const { data, error } = await supabase
//         .from('quizzes')
//         .select('*')
//         .eq('id', quizId)
//         .single();

//       if (error) {
//         console.error('Error fetching quiz:', error);
//       } else {
//         setQuiz(data);
//         setAnswers(new Array(data.questions.length).fill(null));
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   const handleSubmit = () => {
//     let newScore = 0;
//     quiz?.questions.forEach((q, i) => {
//       if (q.answer === answers[i]) {
//         newScore += 1;
//       }
//     });
//     setScore(newScore);
//   };

//   if (!quiz) return <div>Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
//       {quiz.questions.map((q, index) => (
//         <div key={index} className="mb-4 p-4 border rounded">
//           <p className="mb-2">{q.question}</p>
//           {q.options.map((option, i) => (
//             <div key={i} className="mb-2">
//               <input
//                 type="radio"
//                 name={`question-${index}`}
//                 value={i}
//                 checked={answers[index] === i}
//                 onChange={() => {
//                   const newAnswers = [...answers];
//                   newAnswers[index] = i;
//                   setAnswers(newAnswers);
//                 }}
//                 className="mr-2"
//               />
//               {option.text}
//             </div>
//           ))}
//         </div>
//       ))}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-green-500 text-white py-2 px-4 rounded"
//       >
//         Submit
//       </button>
//       {score !== null && (
//         <p className="mt-4 text-lg">
//           Your score: {score}/{quiz.questions.length}
//         </p>
//       )}
//     </div>
//   );
// };

// export default TakeQuiz;
