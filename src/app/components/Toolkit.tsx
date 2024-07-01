import React from 'react'
import Link from 'next/link'

export default function Toolkit() {
    return (
        <header className="bg-primary text-primary-foreground py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <nav className="flex items-center gap-10">
                    <Link href="/make-event" className="hover:underline" prefetch={false}>
                        Создать текст
                    </Link>
                    <Link href="/make-image" className="hover:underline" prefetch={false}>
                        Создать изображение
                    </Link>
                    <Link href="/make-bot" className="hover:underline" prefetch={false}>
                        Создать бота
                    </Link>
                </nav>
            </div>
        </header>
    )
}
