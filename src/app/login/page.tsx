'use client';
import React from 'react';
import Login from '../components/Login';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center ">
      <Head>
        <title>Вход</title>
        <meta name="description" content="Register for an account" />
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
