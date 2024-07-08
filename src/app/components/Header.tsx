'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import LinkButton from './LinkButton';
import Script from 'next/script';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b px-4 lg:px-6 h-14 flex items-center justify-between font-serif">
        <div className="flex items-center">
          <Link href="/" passHref>
            <p className="flex items-center">
              <GraduationCapIcon className="h-6 w-6 mr-2" />
              <span className="text-black text-xl md:text-2xl font-bold">StudentClubs.kz</span>
            </p>
          </Link>
        </div>
        <nav className="hidden md:flex ml-auto gap-4 sm:gap-6 items-center">
          <Link href="/event-list" passHref>
            <p className="text-sm font-medium text-gray-700 hover:text-gray-900">События</p>
          </Link>
          <Link href="#" passHref>
            <p className="text-sm font-medium text-gray-700 hover:text-gray-900">Контакты</p>
          </Link>
          <Link href="#" passHref>
            <p className="text-sm font-medium text-gray-700 hover:text-gray-900">FAQ</p>
          </Link>
          <LinkButton href="/login" className="bg-sky-700">Войти</LinkButton>
        </nav>
        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </header>
      {isOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-14 left-0 right-0 bg-white border-b">
          <nav className="flex flex-col items-center p-4 gap-4">
            <Link href="/event-list" passHref>
              <p className="text-sm font-medium text-gray-700 hover:text-gray-900">События</p>
            </Link>
            <Link href="#" passHref>
              <p className="text-sm font-medium text-gray-700 hover:text-gray-900">Контакты</p>
            </Link>
            <Link href="#" passHref>
              <p className="text-sm font-medium text-gray-700 hover:text-gray-900">FAQ</p>
            </Link>
            <LinkButton href="#" className="bg-red-500">Вход</LinkButton>
          </nav>
        </div>
      )}
    </>
  );
}

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M9 21v-2a4 4 0 0 1 3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M8 3.13a4 4 0 0 0 0 7.75" />
      <line x1="12" y1="19" x2="12" y2="19" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function GraduationCapIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}