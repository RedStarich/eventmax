import { NowRequest, NowResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Я ваш бот.');
});

bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase() !== '/start') {
    bot.sendMessage(msg.chat.id, msg.text);
  }
});

export default (req = NowRequest, res = NowResponse) => {
  res.status(200).send('Bot is running');
};
