import React from 'react'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-primary text-primary-foreground py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <span className="text-xl font-bold">Eventmax.KZ</span>
                </Link>
                <nav className="flex items-center gap-10">
                    <Link href="/make-event" className="hover:underline" prefetch={false}>
                        Создать объявление
                    </Link>
                    <Link href="/event-list" className="hover:underline" prefetch={false}>
                        Список событий
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Найти мероприятие..."
                        className="bg-primary-foreground/20 px-3 py-2 rounded-md text-sm"
                    />
                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Поиск
                    </button>
                </div>
            </div>
        </header>
    )
}
