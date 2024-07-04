"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Toolkit from "../components/Toolkit";
import { generateContent } from "../config/gemini";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 'your-telegram-bot-token';
// const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || 'your-telegram-chat-id';
const TELEGRAM_CHAT_ID = "-4129462967";


export default function Component() {
  const [chatId, setChatId] = useState("-4129462967");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [outputText, setOutputText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async (outputText: string, chatId: string) => {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
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
      setResponse('Error occurred while sending message.');
    }
  };


  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const inputText = `Мероприятие: ${title}\nОписание: ${content}`;
      const result = await generateContent(inputText);
      setOutputText(result);
    } catch (err) {
      setError("Ошибка при генерации поста.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send the outputText to Telegram
      await sendMessage(outputText, chatId);
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
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="space-y-1 py-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Имя события
          </label>
          <input
            id="title"
            type="text"
            placeholder="Введите заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Содержание
          </label>
          <textarea
            id="content"
            placeholder="Введите подробное описание вашего мероприятия"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1 py-5">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Загрузить изображение (опционально)
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Генерация...' : 'Генерировать пост'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {status && <p>{status}</p>}
        {outputText && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-medium text-gray-700">Сгенерированный пост</h2>
            <div className="whitespace-pre-line text-gray-800">{outputText}</div>
          </div>
        )}
        <label>Вставьте Chat ID телеграмма</label>
        <input id="chatId" value={chatId} onChange={(e)=>setChatId(e.target.value)}></input>
        <button
          type="submit"
          className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {loading ? 'Сохранение...' : 'Подтвердить и отправить в чат'}
        </button>
      </form>
    </div>
  );
}
