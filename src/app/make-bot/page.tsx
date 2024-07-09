'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import { generateTask } from '../config/gemini';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 'your-telegram-bot-token';
const TELEGRAM_CHAT_ID = '-4129462967';

export default function ContentSeriesGenerator() {
  const [chatId, setChatId] = useState(TELEGRAM_CHAT_ID);
  const [prompt, setPrompt] = useState('');
  const [numMessages, setNumMessages] = useState(1);
  const [interval, setInterval] = useState(60); // in minutes
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const generateMessages = async () => {
    const generatedMessages = [];
    for (let i = 0; i < numMessages; i++) {
      const content = await generateTask(`${prompt} ${i + 1}`);
      generatedMessages.push(content);
    }
    return generatedMessages;
  };

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const generatedMessages = await generateMessages();
      setMessages(generatedMessages);
      setPreviewMode(true);
    } catch (err) {
      console.error('Error occurred while generating messages:', err);
      setResponse('Error occurred while generating messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessages = async () => {
    setLoading(true);
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error('Error getting session:', authError);
        setResponse('Error getting session');
        return;
      }

      const user = session?.user;
      if (!user) {
        console.error('User not authenticated');
        setResponse('User not authenticated');
        return;
      }

      console.log('Authenticated user:', user);

      const now = new Date();
      for (let i = 0; i < messages.length; i++) {
        const scheduledAt = new Date(now.getTime() + i * interval * 60000); // Calculate the scheduled time
        const { data, error } = await supabase
          .from('scheduled_texts')
          .insert([
            {
              chat_id: chatId,
              text: messages[i],
              scheduled_at: scheduledAt.toISOString(),
              time: scheduledAt.toTimeString().slice(0, 5), // HH:mm format
              user_id: user.id,
            },
          ]);

        if (error) {
          console.error('Error inserting task:', error);
          setResponse(`Error occurred while scheduling messages: ${error.message}`);
          return;
        } else {
          console.log('Task inserted successfully:', data);
        }
      }
      setResponse('All messages scheduled successfully!');
    } catch (err) {
      console.error('Error during scheduling:', err);
      setResponse(`Error occurred while scheduling messages: ${(err as Error).message}`);
    } finally {
      setLoading(false);
      setPreviewMode(false);
    }
  };

  const handleSendNow = async () => {
    setLoading(true);
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error('Error getting session:', authError);
        setResponse('Error getting session');
        return;
      }

      const user = session?.user;
      if (!user) {
        console.error('User not authenticated');
        setResponse('User not authenticated');
        return;
      }

      console.log('Authenticated user:', user);

      for (let i = 0; i < messages.length; i++) {
        const now = new Date();
        const { data, error } = await supabase
          .from('scheduled_texts')
          .insert([
            {
              chat_id: chatId,
              text: messages[i],
              scheduled_at: now.toISOString(), // Schedule immediately
              time: now.toTimeString().slice(0, 5), // HH:mm format
              user_id: user.id,
            },
          ]);

        if (error) {
          console.error('Error inserting task:', error);
          setResponse(`Error occurred while scheduling messages: ${error.message}`);
          return;
        } else {
          console.log('Task inserted successfully:', data);
        }
      }
      setResponse('All messages sent successfully!');
    } catch (err) {
      console.error('Error during scheduling:', err);
      setResponse(`Error occurred while sending messages: ${(err as Error).message}`);
    } finally {
      setLoading(false);
      setPreviewMode(false);
    }
  };

  const handleEditMessage = (index: number, newContent: string) => {
    const updatedMessages = [...messages];
    updatedMessages[index] = newContent;
    setMessages(updatedMessages);
  };

  const handleNumMessagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
    setNumMessages(Number(value));
  };

  const handleNumMessagesBlur = () => {
    if (numMessages < 1) {
      setNumMessages(1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
      <form onSubmit={handleGenerate} className="grid gap-4">
        <div className="space-y-1">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
            Тема контента
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="numMessages" className="block text-sm font-medium text-gray-700">
            Количество сообщений
          </label>
          <input
            id="numMessages"
            type="number"
            value={numMessages}
            onChange={handleNumMessagesChange}
            onBlur={handleNumMessagesBlur}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="1"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="interval" className="block text-sm font-medium text-gray-700">
            Интервал (в минутах)
          </label>
          <input
            id="interval"
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {loading ? 'Создание...' : 'Создать сообщения'}
        </button>
        {response && <p>{response}</p>}
      </form>

      {previewMode && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Предпросмотр сообщений</h2>
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <textarea
                value={message}
                onChange={(e) => handleEditMessage(index, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={4}
              />
            </div>
          ))}
          <button
            onClick={handleSendMessages}
            className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Отправка...' : 'Запланировать сообщения'}
          </button>
          <button
            onClick={handleSendNow}
            className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Отправка...' : 'Отправить сейчас'}
          </button>
        </div>
      )}
    </div>
  );
}
