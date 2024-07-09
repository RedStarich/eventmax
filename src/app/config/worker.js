// worker.js

self.onmessage = async function (e) {
    const { messages, interval, chatId, TELEGRAM_BOT_TOKEN } = e.data;
  
    const sendMessage = async (message, chatId) => {
      const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });
  
        const data = await response.json();
        return data.ok;
      } catch (error) {
        return false;
      }
    };
  
    for (const message of messages) {
      const result = await sendMessage(message, chatId);
      if (!result) {
        self.postMessage('Error occurred while sending messages.');
        break;
      }
      self.postMessage(`Message sent: ${message}`);
      await new Promise(resolve => setTimeout(resolve, interval * 60 * 1000)); // convert minutes to milliseconds
    }
  
    self.postMessage('All messages sent successfully!');
  };
  