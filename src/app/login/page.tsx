'use client';
import React from 'react';
import Login from '../components/Login';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <Head>
      <title>Login</title>
      <meta name="description" content="Register for an account" />
    </Head>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <Login />
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
