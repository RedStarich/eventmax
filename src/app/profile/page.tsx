'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { useRouter } from 'next/navigation';
import Toolkit from '../components/Toolkit';

interface User {
  id: string;
  email: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [chatId, setChatId] = useState('');
  const [currentChatId, setCurrentChatId] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data.session?.user as User || null);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as User || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchChatId = async () => {
      if (user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('chatId')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching chatId:', error);
        } else {
          setCurrentChatId(userData.chatId);
          setChatId(userData.chatId);
        }
      }
    };

    fetchChatId();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ chatId })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating chatId:', error);
      } else {
        setCurrentChatId(chatId);
        console.log('ChatId updated successfully');
      }
    } catch (error) {
      console.error('Error updating chatId:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 font-mono">
      <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 text-base mb-4">Email: {user?.email}</p>
        <p className="text-gray-700 text-base mb-4">Current Chat ID: {currentChatId}</p>
        <label className="block text-gray-700 text-sm font-bold mb-2">Вставьте Chat ID телеграмма</label>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            className="text-sm custom-input w-full sm:w-[45%] px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            id="chatId"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
          />
          <div className="flex sm:ml-auto">
            <button
              className="cursor-pointer inline-flex items-center rounded-full px-4 py-3 font-mono font-semibold text-rose-600 border-2 border-rose-600 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-60 duration-300 focus:bg-transparent"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'сохранить'}
            </button>
          </div>
        </div>
      </div>
      <Toolkit />
    </div>
  );
}

export default Profile;
