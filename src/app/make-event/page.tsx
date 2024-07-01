/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WQSWcwTRki1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"

export default function Component() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState(null)
  const [imageprompt, setImagePrompt] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const handlePublish = () => {}
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
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
              placeholder="12:00-14:00, 12 Июня 2024"
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
              placeholder="Город, улица, здание, офис..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handlePublish}
          className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Опубликовать
        </button>
      </div>
    </div>
  )
}