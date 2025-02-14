// src/data/filters/types.ts
export interface KanjiEntry {
    kanji: string;
    readings: {
        onyomi: string[];
        kunyomi: string[];
        nanori: string[];
    };
    meanings: string[];
    grade: string;
    stroke_count: string;
    jlpt: string;
}

export interface VocabEntry {
    kanji: string[];
    kana: string[];
    meanings: string[];
    romaji: string[];
}