'use client';
import React from 'react';
import Register from '../components/Register';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center ">
      <Head>
        <title>Регистрация</title>
        <meta name="description" content="Register for an account" />
      </Head>
      <Register />
    </div>
  );
};

export default LoginPage;
