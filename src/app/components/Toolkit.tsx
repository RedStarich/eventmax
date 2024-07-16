import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Toolkit() {
    const pathname = usePathname();

    return (
        <header className="bg-primary py-4 text-primary-foreground font-mono">
            <div className="container mx-auto flex justify-center">
                <nav className="flex items-center gap-10">
                    <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-event"
                                className="peer hidden"
                                checked={pathname === '/make-event'}
                                readOnly
                            />
                            <Link href="/make-event">
                                <span className={`tracking-widest text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${pathname === '/make-event' ? 'bg-gradient-to-r from-[blueviolet] to-[violet] text-white' : ''}`}>
                                    Событие
                                </span>
                            </Link>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-content"
                                className="peer hidden"
                                checked={pathname === '/make-content'}
                                readOnly
                            />
                            <Link href="/make-content">
                                <span className={`tracking-widest text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${pathname === '/make-content' ? 'bg-gradient-to-r from-[blueviolet] to-[violet] text-white' : ''}`}>
                                    Контент
                                </span>
                            </Link>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-survey"
                                className="peer hidden"
                                checked={pathname === '/make-survey'}
                                readOnly
                            />
                            <Link href="/make-survey">
                                <span className={`tracking-widest text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${pathname === '/make-survey' ? 'bg-gradient-to-r from-[blueviolet] to-[violet] text-white' : ''}`}>
                                    Опрос
                                </span>
                            </Link>
                        </label>

                        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                            <input
                                type="radio"
                                name="radio"
                                value="/make-bot"
                                className="peer hidden"
                                checked={pathname === '/make-bot'}
                                readOnly
                            />
                            <Link href="/make-bot">
                                <span className={`tracking-widest text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out ${pathname === '/make-bot' ? 'bg-gradient-to-r from-[blueviolet] to-[violet] text-white' : ''}`}>
                                    Заявление
                                </span>
                            </Link>
                        </label>
                    </div>
                </nav>
            </div>
        </header>
    )
}
