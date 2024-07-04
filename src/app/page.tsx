// components/LandingPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from './config/supabaseClient';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const LandingPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        console.error(error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="text-center py-16 bg-gray-100">
        <h1 className="text-4xl font-bold">Найди и Посети Лучшие IT Мероприятия в Казахстане</h1>
        <p className="text-xl mt-4">Объединяем Студентов и Мир IT</p>
      </header>

      {/* About Us */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">О нас</h2>
        <p className="max-w-4xl mx-auto text-lg text-center">
          Мы помогаем студентам Казахстана находить и посещать самые интересные и полезные IT мероприятия. Наша цель — повысить вовлеченность студентов в мир IT и предоставить платформу для обмена знаниями и опытом.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Как это работает</h2>
        <ol className="list-decimal max-w-4xl mx-auto text-lg space-y-4">
          <li>
            <strong>Поиск Мероприятий:</strong> Найди мероприятия, которые проходят рядом с тобой.
          </li>
          <li>
            <strong>Участвуй и Получай Токены:</strong> Участвуй в мероприятиях, делай фото и получай токены.
          </li>
          <li>
            <strong>Обменивай Токены:</strong> Обменивай свои токены на мерч или скидки на платные мероприятия.
          </li>
        </ol>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Преимущества</h2>
        <ul className="max-w-4xl mx-auto text-lg space-y-4">
          <li>Вовлеченность: Участвуй и получай бонусы за активное участие.</li>
          <li>Реферальная Система: Приглашай друзей и получай дополнительные токены.</li>
          <li>Полезные Контакты: Знакомься с профессионалами IT и расширяй свою сеть контактов.</li>
        </ul>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Предстоящие мероприятия</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {events.length === 0 ? (
            <p className="text-center">Нет предстоящих мероприятий</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.location}</p>
                <p className="mt-2">{event.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Фотогалерея</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Здесь будут фотографии мероприятий */}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Отзывы участников</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Здесь будут отзывы участников */}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Подпишись на рассылку</h2>
        <form className="max-w-md mx-auto flex flex-col items-center">
          <input 
            type="email" 
            placeholder="Введите ваш email" 
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Подписаться
          </button>
        </form>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Свяжись с нами</h2>
        <p className="text-lg text-center">Email: example@example.com</p>
        <p className="text-lg text-center">Телефон: +7 (123) 456-78-90</p>
        <p className="text-lg text-center">Социальные сети: [Ссылки на социальные сети]</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-200">
        <p className="text-lg">Все права защищены © 2024 IT Events Kazakhstan</p>
        <p className="text-lg">
          <a href="#" className="text-blue-500">Политика конфиденциальности   |   </a>  
          <a href="#" className="text-blue-500">Условия использования</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
