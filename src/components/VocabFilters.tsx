// src/components/VocabFilters.tsx
import { useState } from 'react';

interface VocabFiltersProps {
    onFilterChange: (filters: {
        wordLengths: string[];
        writingSystem: string;
    }) => void;
}

const VocabFilters = ({ onFilterChange }: VocabFiltersProps) => {
    const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
    
    const handleLengthChange = (length: string) => {
        const newLengths = selectedLengths.includes(length)
            ? selectedLengths.filter(l => l !== length)
            : [...selectedLengths, length];
        setSelectedLengths(newLengths);
        onFilterChange({ wordLengths: newLengths, writingSystem: '' });
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                <span className="text-gray-700 font-medium w-full mb-1">Word Length:</span>
                {['2', '3', '4', '5+'].map((length) => (
                    <label 
                        key={length} 
                        className={`flex items-center px-3 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedLengths.includes(length)
                                ? 'bg-blue-50 border-blue-300 text-blue-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedLengths.includes(length)}
                            onChange={() => handleLengthChange(length)}
                            className="hidden"
                        />
                        {length} Characters
                    </label>
                ))}
            </div>

            <div>
                <span className="text-gray-700 font-medium block mb-1">Writing System:</span>
                <select 
                    className="px-3 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-medium 
                              focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none w-full md:w-auto"
                    onChange={(e) => onFilterChange({ wordLengths: selectedLengths, writingSystem: e.target.value })}
                >
                    <option value="all">All Writing Systems</option>
                    <option value="hiragana">Hiragana Only</option>
                    <option value="katakana">Katakana Only</option>
                    <option value="mixed">Mixed/Kanji</option>
                </select>
            </div>
        </div>
    );
};

export default VocabFilters;