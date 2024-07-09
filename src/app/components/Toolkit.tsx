import React from 'react'
import Link from 'next/link'

export default function Toolkit() {
    return (
        <header className="bg-primary text-primary-foreground py-4">
            <div className="container mx-auto flex justify-center">
                <nav className="flex items-center gap-10">
                    <Link href="/make-event" className="hover:underline" prefetch={false}>
                        Создать событие
                    </Link>
                    <Link href="/make-bot" className="hover:underline" prefetch={false}>
                        Создать контент
                    </Link>
                </nav>
            </div>
        </header>

    )
}
