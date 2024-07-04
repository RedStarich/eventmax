// pages/register.tsx
'use client';
import { NextPage } from 'next';
import Head from 'next/head';
import Register from '../components/Register'; // adjust the import path as needed

const RegisterPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Register</title>
        <meta name="description" content="Register for an account" />
      </Head>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
