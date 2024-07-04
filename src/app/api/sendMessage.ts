// src/app/api/sendMessage.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN || '';

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN must be provided');
}

const bot = new TelegramBot(token, { polling: false });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { message, chatId } = req.body;

  if (!message) {
    return res.status(400).send({ message: 'Message is required' });
  }

  if (!chatId) {
    return res.status(400).send({ message: 'Chat ID is required' });
  }

  try {
    await bot.sendMessage(chatId, message);
    res.status(200).send({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', (error as any).response?.data || (error as any).message);
    res.status(500).send({ message: 'Failed to send message', error: (error as any).response?.data || (error as any).message });
  }
};
