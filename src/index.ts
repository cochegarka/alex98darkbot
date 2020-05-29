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

  let opinion = '';

  if (estimation <= 0.25) {
    opinion = 'По-моему, текст написан человеком';
  } else if (estimation <= 0.5) {
    opinion = 'Мне кажется, текст достачно человекочитаемый';
  } else if (estimation <= 1) {
    opinion = 'Скорее всего написан человеком, но есть небольшие сомнения';
  } else if (estimation <= 10) {
    opinion = 'Мне кажется, текст достаточно человеконечитаемый';
  } else if (isNaN(estimation)) {
    opinion = 'По-моему, текст ДАННЫЕ УДАЛЕНЫ!';
  }

  await ctx.reply(`Оценка текста: ${estimation}\n${opinion}`);
});

app.get('/', (_, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`cloud technologies`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
