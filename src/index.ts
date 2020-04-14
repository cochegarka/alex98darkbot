import Telegraf from 'telegraf';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || '';

const app = express();

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${TELEGRAM_BOT_TOKEN}`);
app.use(bot.webhookCallback(`/bot${TELEGRAM_BOT_TOKEN}`));

bot.start(ctx => ctx.reply('Welcome'));
bot.help(ctx => ctx.reply('Send me a sticker!'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`professional it english`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
