// src/data/filters/jlpt.ts
import { KanjiEntry } from './types';
import kanjiData from '../dictionary/kanji.json';

const typedKanjiData = kanjiData as KanjiEntry[];

export const kanjiByJLPT = (level: string): KanjiEntry[] => {
    return typedKanjiData.filter((kanji: KanjiEntry) => kanji.jlpt === level);
};

export const getJLPTLevels = (): string[] => {
    const levels = new Set(typedKanjiData.map((kanji: KanjiEntry) => kanji.jlpt));
    return Array.from(levels).sort();
};