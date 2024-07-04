'use client';
import { useState } from 'react';

const TelegramMessageSender: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN|| 'YOUR_TELEGRAM_BOT_TOKEN'; // Не рекомендуется хранить здесь токен
  const TELEGRAM_CHAT_ID = 496110483;

  const sendMessage = async () => {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setResponse('Message sent successfully!');
      } else {
        setResponse('Failed to send message.');
      }
    } catch (error) {
      setResponse('Error occurred while sending message.');
    }
  };

  return (
    <div>
      <h1>Send Message to Telegram</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send Message</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default TelegramMessageSender;
