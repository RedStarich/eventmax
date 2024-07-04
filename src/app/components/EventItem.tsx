// components/EventComponent.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  outputText: string;
  image_url: string;
}

const EventComponent: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query; // Получение eventId из query параметров

  const [event, setEvent] = useState<Event | null>(null); // Состояние для хранения данных о событии

  useEffect(() => {
    // Функция для загрузки данных о событии по его ID
    const fetchEvent = async () => {
      if (typeof eventId === 'string') {
        try {
          const response = await fetch(`/api/events/${eventId}`); // Замените на ваш реальный API endpoint
          const eventData = await response.json();
          setEvent(eventData);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      }
    };

    fetchEvent(); // Вызов функции загрузки данных
  }, [eventId]);

  // Возвращение компонента
  return (
    <div>
      {event ? (
        <div>
          <h2>{event.title}</h2>
          <p>{event.location}</p>
          <p>Date: {event.date}</p>
          <img src={event.image_url} alt={event.title} />
          <p>{event.outputText}</p>
          {/* Дополнительные элементы или стили могут быть добавлены сюда */}
        </div>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventComponent;
