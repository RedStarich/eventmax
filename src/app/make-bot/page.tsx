import React from 'react'
import Toolkit from "../components/Toolkit"

export default function page() {
  return (
    <div  className="w-full max-w-2xl mx-auto space-y-6">
        <Toolkit/>
        <div>
            <label>Напишите подробности о событии</label>
            <textarea className="w-full h-64 border-2 border-black" placeholder='Введите информацию про приглашенных гостей, о правилах и других данных'></textarea>
            <button
            type="button"
            className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Опубликовать
            </button>
        </div>
    </div>
  )
}
