import { computeMetric, englishFrequencies, russianFrequencies } from '../../frequencies';
import { checkText } from '../../speller';

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const russianAlphabet = 'абвгдеёжзиклмнопрстуфхцчшщъыьэюя';

export class PlaintTextFrequency {
  private text: string;
  private readonly totalLetterCount: number;

  private _russianFrequencyTable: ReadonlyMap<string, number> | null = null;
  private _englishFrequencyTable: ReadonlyMap<string, number> | null = null;

  constructor(text: string) {
    this.text = text.toLowerCase();

    const nonAlphaLetterCount = (this.text.match(/[^a-zA-Zа-яА-Я]/g) || []).length;
    this.totalLetterCount = this.text.length - nonAlphaLetterCount;
  }

  get russianFrequencyTable(): ReadonlyMap<string, number> {
    if (this._russianFrequencyTable != null) {
      return this.russianFrequencyTable;
    }

    const table = new Map<string, number>();

    for (let i = 0; i < russianAlphabet.length; ++i) {
      const character = russianAlphabet[i];
      const count = (this.text.match(new RegExp(`${character}`, 'g')) || []).length;

      table.set(character, count / this.totalLetterCount);
    }

    return this._russianFrequencyTable = table;
  }

  get englishFrequencyTable(): ReadonlyMap<string, number> {
    if (this._englishFrequencyTable != null) {
      return this._englishFrequencyTable;
    }

    const table = new Map<string, number>();

    for (let i = 0; i < englishAlphabet.length; ++i) {
      const character = englishAlphabet[i];
      const count = (this.text.match(new RegExp(`${character}`, 'g')) || []).length;

      table.set(character, count / this.totalLetterCount);
    }

    return this._englishFrequencyTable = table;
  }

  get measure(): number {
    return computeMetric(this.russianFrequencyTable, russianFrequencies) +
      computeMetric(this.englishFrequencyTable, englishFrequencies);
  }
}

export class PlainTextEstimation {
  private text: string;
  private readonly frequency: PlaintTextFrequency;

  constructor(text: string) {
    this.text = text;
    this.frequency = new PlaintTextFrequency(text);
  }

  async measure(): Promise<number> {
    /*(const frequencyMeasure = this.frequency.measure;

    const spellErrorsCount = (await checkText(this.text)).length;
    const wordsCount = this.text.split(' ').filter(v => v.length > 0).length;

    const spellErrorsProbability = wordsCount == 0 ? 0 : (wordsCount - spellErrorsCount) / wordsCount;*/

    return Math.random() * 20;
  }
}
