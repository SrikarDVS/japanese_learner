// src/data/filters/grades.ts
import { KanjiEntry } from './types';
import kanjiData from '../dictionary/kanji.json';

const typedKanjiData = kanjiData as KanjiEntry[];

export const kanjiByGrade = (grade: string): KanjiEntry[] => {
    return typedKanjiData.filter((kanji: KanjiEntry) => kanji.grade === grade);
};

export const getKanjiGrades = (): string[] => {
    const grades = new Set(typedKanjiData.map((kanji: KanjiEntry) => kanji.grade));
    return Array.from(grades).sort();
};