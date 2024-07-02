// // pages/test-supabase.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import { supabase } from '../config/supabase';

// interface Event {
//   id: number;
//   title: string;
//   content: string;
//   date: string;
//   location: string;
// }

// const TestSupabase = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const { data, error } = await supabase.from('events').select('*');
//       if (error) {
//         setError('Ошибка при загрузке мероприятий.');
//       } else {
//         setEvents(data as Event[]);
//       }
//       setLoading(false);
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div>Загрузка...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
//       <h1 className="text-2xl font-bold">Список мероприятий</h1>
//       <div className="grid gap-4">
//         {events.map(event => (
//           <div key={event.id} className="p-4 border border-gray-300 rounded-md bg-gray-50">
//             <h2 className="text-lg font-medium text-gray-700">{event.title}</h2>
//             <p className="text-gray-800 whitespace-pre-line">{event.content}</p>
//             <p className="text-gray-600">Дата и время: {event.date}</p>
//             <p className="text-gray-600">Место проведения: {event.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestSupabase;
