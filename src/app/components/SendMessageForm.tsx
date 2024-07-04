// src/app/components/SendMessageForm.tsx
'use client';
import { useState } from 'react';
import axios from 'axios';

const SendMessageForm = () => {
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      await axios.post('/api/sendMessage', { message, chatId });
      setStatus('Message sent successfully!');
      setMessage('');
      setChatId('');
    } catch (error) {
      const errorMessage = (error as any).response?.data?.error || (error as any).message || 'Unknown error';
      setStatus(`Failed to send message: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="chatId">Chat ID:</label>
        <input
          type="text"
          id="chatId"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default SendMessageForm;
