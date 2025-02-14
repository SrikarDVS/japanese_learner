import { useState, useMemo } from 'react';
import { VocabEntry } from '../data/filters/types';
import vocabData from '../data/dictionary/vocabulary.json';

interface VocabListProps {
    filters: {
        wordLengths: string[];
        writingSystem: string;
        page: number;
        itemsPerPage: number;
        isRandom: boolean;
    };
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (count: number) => void;
    onRandomToggle: () => void;
    onVocabClick: (vocab: VocabEntry) => void;
}

const VocabList = ({ 
    filters, 
    onPageChange, 
    onItemsPerPageChange, 
    onRandomToggle,
    onVocabClick 
}: VocabListProps) => {
    const [totalItems, setTotalItems] = useState(0);

    const filteredData = useMemo(() => {
        let filtered = vocabData as VocabEntry[];

        if (filters.wordLengths.length > 0) {
            filtered = filtered.filter(vocab => {
                const length = vocab.kana[0].length;
                return filters.wordLengths.some(filter => 
                    filter === '5+' ? length >= 5 : length === parseInt(filter)
                );
            });
        }

        if (filters.writingSystem !== 'all') {
            filtered = filtered.filter(vocab => {
                const hasKanji = vocab.kanji.length > 0;
                switch (filters.writingSystem) {
                    case 'hiragana':
                        return !hasKanji && /^[ぁ-んー]*$/.test(vocab.kana[0]);
                    case 'katakana':
                        return !hasKanji && /^[ァ-ンー]*$/.test(vocab.kana[0]);
                    case 'mixed':
                        return hasKanji;
                    default:
                        return true;
                }
            });
        }

        setTotalItems(filtered.length);

        if (filters.isRandom) {
            filtered = [...filtered].sort(() => Math.random() - 0.5);
        }

        const start = (filters.page - 1) * filters.itemsPerPage;
        return filtered.slice(start, start + filters.itemsPerPage);
    }, [filters]);

    const totalPages = Math.ceil(totalItems / filters.itemsPerPage);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <select 
                    className="px-3 py-2 rounded-lg bg-white border-2 border-gray-200"
                    value={filters.itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                    <option value="250">250 per page</option>
                </select>

                <button
                    className={`px-4 py-2 rounded-lg ${
                        filters.isRandom 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-700 border-2 border-gray-200'
                    }`}
                    onClick={onRandomToggle}
                >
                    {filters.isRandom ? 'Random On' : 'Random Off'}
                </button>
            </div>

            <div className="space-y-4">
                {filteredData.map((vocab: VocabEntry, index: number) => (
                    <div 
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
                        onClick={() => onVocabClick(vocab)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-3xl font-bold text-gray-800">
                                {vocab.kanji[0] || vocab.kana[0]}
                            </div>
                            <div className="flex-1">
                                <div className="text-xl text-blue-600">{vocab.kana[0]}</div>
                                <div className="text-sm text-gray-500">{vocab.romaji[0]}</div>
                                <div className="mt-2 text-gray-700 font-medium">
                                    {vocab.meanings.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 border-2 border-gray-200 disabled:opacity-50"
                    disabled={filters.page === 1}
                    onClick={() => onPageChange(filters.page - 1)}
                >
                    Previous
                </button>

                <span className="text-white">
                    Page {filters.page} of {totalPages}
                </span>

                <button
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 border-2 border-gray-200 disabled:opacity-50"
                    disabled={filters.page === totalPages}
                    onClick={() => onPageChange(filters.page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VocabList;