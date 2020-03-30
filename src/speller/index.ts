import axios from 'axios';

export interface SpellError {
  code: number,
  pos: number,
  row: number,
  col: number,
  len: number,
  word: string,
  s: string[]
}

export type SpellResult = SpellError[];

export enum Options {
  IGNORE_DIGITS = 2,
  IGNORE_URLS = 4,
  FIND_REPEAT_WORDS = 8,
  IGNORE_CAPITALIZATION = 512
}

export type Format = 'plain' | 'html';

export function checkText(text: string,
                          lang: string = 'ru,en',
                          options: number = 0,
                          format: Format = 'plain'): Promise<SpellResult> {
  const requestUrl = `https://speller.yandex.net/services/spellservice.json/checkText`;

  return axios.get(requestUrl, {
    params: {
      text: text,
      lang: lang,
      options: options,
      format: format
    }
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
}