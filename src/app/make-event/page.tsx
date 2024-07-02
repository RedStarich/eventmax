"use client"

import { useState } from "react";
import Toolkit from "../components/Toolkit";
import { generatePost } from "../config/gemini";

export default function Component() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const inputText = `Мероприятие: ${title}\nОписание: ${content}\nДата и время: ${date}\nМесто проведения: ${location}`;
      const result = await generatePost(inputText);
      setOutputText(result);
    } catch (err) {
      setError("Ошибка при генерации поста.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 items-center px-5">
      <Toolkit />
      <div className="grid gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Дата и время
            </label>
            <input
              id="date"
              type="text"
              placeholder="12:00, 12 Июня"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Место проведения
            </label>
            <input
              id="location"
              type="text"
              placeholder="Город, улица, офис..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Генерация...' : 'Опубликовать'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {outputText && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-medium text-gray-700">Сгенерированный пост</h2>
            <div className="whitespace-pre-line text-gray-800">{outputText}</div>
          </div>
        )}
      </div>
    </div>
  );
}
