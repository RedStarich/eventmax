import React from 'react'
import Link from 'next/link'

export default function Toolkit() {
    const currentPage = '/make-event';

    return (
        <header className="bg-primary text-primary-foreground py-4 font-mono ">
            <div className="container mx-auto flex justify-center">
                <nav className="flex items-center gap-10">
                    <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-event"
                                className="peer hidden"
                            />
                            <a href="/make-event">
                            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                                Событие
                            </span>
                            </a>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-content"
                                className="peer hidden"
                            />
                            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                                <a href='/make-content'>Контент</a>
                            </span>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-survey"
                                className="peer hidden"
                            />
                            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                                Опрос
                            </span>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-content"
                                className="peer hidden"
                            />
                            <a href="/make-bot">
                                <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                                    Заявление
                                </span>
                            </a>
                        </label>
                    </div>
                </nav>
            </div>
        </header>
    )
}
