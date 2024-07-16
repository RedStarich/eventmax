'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Toolkit from "../components/Toolkit";
import { generatePost, validateContent, validateFinalContent } from "../config/gemini";
import { supabase } from '../config/supabaseClient';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 'your-telegram-bot-token';

export default function Component() {
  const [chatId, setChatId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [editedText, setEditedText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const sendMessage = async (outputText: string, chatId: string) => {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: outputText,
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setResponse('Message sent successfully!');
      } else {
        setResponse('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Error occurred while sending message.');
    }
  };

  const handleGenerate = async () => {
    if (!title || !content || !date || !location) {
      setError("Пожалуйста, заполните все поля перед генерацией поста.");
      return;
    }

    const inputText = `Мероприятие: ${title}\nОписание: ${content}\nДата и время: ${date}\nМесто проведения: ${location}`;

    try {
      setLoading(true);
      setError(null);

      const isValid = await validateContent(inputText);
      if (!isValid) {
        setError("Содержимое содержит запрещенные слова или фразы.");
        setLoading(false);
        return;
      }

      const result = await generatePost(inputText);
      setOutputText(result);
      setEditedText(result);
    } catch (err) {
      console.error('Error generating post:', err);
      setError("Ошибка при генерации поста.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!editedText) {
      setError("Пожалуйста, отредактируйте и подтвердите пост перед отправкой.");
      setLoading(false);
      return;
    }

    try {
      const isValid = await validateFinalContent(editedText);
      if (!isValid) {
        setError("Содержимое содержит ошибки или placeholders.");
        setLoading(false);
        return;
      }

      let image_url = null;
      const { data, error } = await supabase
        .from('events')
        .insert([{ title, content, date, location, outputText: editedText, image_url }]);

      if (error) {
        throw error;
      }

      console.log('Event data:', data);
      setTitle("");
      setContent("");
      setDate("");
      setLocation("");
      setOutputText("");
      setEditedText("");
      setImage(null);
      setStatus('Текст успешно отправлен!');

      await sendMessage(editedText, chatId);
    } catch (err: any) {
      console.error('Ошибка при отправке текста:', err.message);
      setStatus(`Ошибка при отправке текста: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
      <Toolkit />
      <form onSubmit={handleSubmit} className="grid gap-1">
        <div className="w-full p-5 bg-white rounded-lg font-mono">
          <div className='py-2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">Имя события</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Название мероприятия"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className='px-5'>
          <div className="w-full bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Содержание</label>
            <textarea
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Описание мероприятия"
              id="content"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2 px-5 py-2 bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Дата и время</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="w-1/2 px-5 py-2 bg-white rounded-lg font-mono">
            <label className="block text-gray-700 text-sm font-bold mb-2">Место проведения</label>
            <input
              className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
              placeholder="Точный адрес"
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className='px-5 py-2 bg-white rounded-lg font-mono'>
          <label className="block text-gray-700 text-sm font-bold mb-2">Chat ID</label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Chat ID"
            type="text"
            id="chatId"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-indigo-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-indigo-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
        >
          {loading ? 'Генерация...' : 'Генерировать пост'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {status && <p>{status}</p>}
        {outputText && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-medium text-gray-700">Сгенерированный пост</h2>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 bg-white"
              rows={16}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </div>
        )}
        <button
          type="submit"
          className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
        >
          {loading ? 'Сохранение...' : 'Подтвердить и отправить в чат'}
        </button>
      </form>
    </div>
  );
}
