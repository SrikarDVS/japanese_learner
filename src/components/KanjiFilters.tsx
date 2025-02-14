// src/components/KanjiFilters.tsx
import { useState } from 'react';
import { KanjiEntry } from '../data/filters/types';
import kanjiData from '../data/dictionary/kanji.json';

interface KanjiFiltersProps {
    onFilterChange: (filters: {
        jlpt: string[];
        grade: string[];
    }) => void;
}

const KanjiFilters = ({ onFilterChange }: KanjiFiltersProps) => {
    const [selectedJLPT, setSelectedJLPT] = useState<string[]>([]);
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

    // Get unique values from data
    const jlptLevels = Array.from(new Set(
        (kanjiData as KanjiEntry[])
            .map(k => k.jlpt)
            .filter(Boolean)
            .sort()
    ));
    
    const grades = Array.from(new Set(
        (kanjiData as KanjiEntry[])
            .map(k => k.grade)
            .filter(Boolean)
            .sort()
    ));

    const handleJLPTChange = (level: string) => {
        const newLevels = selectedJLPT.includes(level)
            ? selectedJLPT.filter(l => l !== level)
            : [...selectedJLPT, level];
        setSelectedJLPT(newLevels);
        onFilterChange({ jlpt: newLevels, grade: selectedGrades });
    };

    const handleGradeChange = (grade: string) => {
        const newGrades = selectedGrades.includes(grade)
            ? selectedGrades.filter(g => g !== grade)
            : [...selectedGrades, grade];
        setSelectedGrades(newGrades);
        onFilterChange({ jlpt: selectedJLPT, grade: newGrades });
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                <span className="text-gray-700 font-medium w-full mb-1">JLPT Level:</span>
                {jlptLevels.map((level) => (
                    <label 
                        key={level}
                        className={`flex items-center px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedJLPT.includes(level)
                                ? 'bg-blue-50 border-blue-300 text-blue-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedJLPT.includes(level)}
                            onChange={() => handleJLPTChange(level)}
                            className="hidden"
                        />
                        N{level}
                    </label>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="text-gray-700 font-medium w-full mb-1">Grade:</span>
                {grades.map((grade) => (
                    <label 
                        key={grade}
                        className={`flex items-center px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedGrades.includes(grade)
                                ? 'bg-green-50 border-green-300 text-green-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedGrades.includes(grade)}
                            onChange={() => handleGradeChange(grade)}
                            className="hidden"
                        />
                        Grade {grade}
                    </label>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => {
                        setSelectedJLPT([]);
                        setSelectedGrades([]);
                        onFilterChange({ jlpt: [], grade: [] });
                    }}
                >
                    Clear Filters
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => {/* Randomize function */}}
                >
                    Randomize
                </button>
            </div>
        </div>
    );
};

export default KanjiFilters;