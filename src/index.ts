import Telegraf from 'telegraf';
import dotenv from 'dotenv';
import express from 'express';
import { PlainTextEstimation } from './cryptanalysis/plaintext';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || '';

const app = express();

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${TELEGRAM_BOT_TOKEN}`);
app.use(bot.webhookCallback(`/bot${TELEGRAM_BOT_TOKEN}`));

bot.command('plain', async ctx => {
  const text = (ctx.message?.text || '').substr('/plain'.length);
  const estimation = await new PlainTextEstimation(text).measure();

  await ctx.reply(estimation.toString());
});

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`cloud technologies`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
