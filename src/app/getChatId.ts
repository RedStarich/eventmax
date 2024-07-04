import TelegramBot from 'node-telegram-bot-api';

const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(`Chat ID: ${chatId}`);
  bot.sendMessage(chatId, `Your chat ID is ${chatId}`);
});


setTimeout(() => {
  bot.stopPolling();
}, 30000);
