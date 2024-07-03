'use client';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Создание клиента Supabase
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const TextSubmitter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('test') // Убедитесь, что это название вашей таблицы
        .insert([{ text }]);

      if (error) {
        throw error;
      }

      setStatus('Текст успешно отправлен!');
      setText('');
    } catch (error: any) {
      console.error('Ошибка при отправке текста:', error.message);
      setStatus(`Ошибка при отправке текста: ${error.message}`);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text}
          onChange={handleChange}
          placeholder="Введите текст"
          required
        />
        <button type="submit">Отправить</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TextSubmitter;
