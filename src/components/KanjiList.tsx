import { useState, useEffect, useMemo } from 'react';
import { KanjiEntry } from '../data/filters/types';
import kanjiData from '../data/dictionary/kanji.json';

interface KanjiListProps {
    filters: {
        jlpt: string[];
        grade: string[];
        page: number;
        itemsPerPage: number;
        isRandom: boolean;
    };
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (count: number) => void;
    onRandomToggle: () => void;
    onKanjiClick: (kanji: KanjiEntry) => void;
}

const KanjiList = ({ 
    filters, 
    onPageChange, 
    onItemsPerPageChange, 
    onRandomToggle,
    onKanjiClick 
}: KanjiListProps) => {
    const [totalItems, setTotalItems] = useState(0);

    const filteredData = useMemo(() => {
        let filtered = kanjiData as KanjiEntry[];

        if (filters.jlpt.length > 0) {
            filtered = filtered.filter(kanji => filters.jlpt.includes(kanji.jlpt));
        }

        if (filters.grade.length > 0) {
            filtered = filtered.filter(kanji => filters.grade.includes(kanji.grade));
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
                {filteredData.map((kanji: KanjiEntry) => (
                    <div 
                        key={kanji.kanji} 
                        className="p-4 bg-white rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
                        onClick={() => onKanjiClick(kanji)}
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-5xl font-bold text-gray-800">{kanji.kanji}</span>
                            <div className="flex-1">
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-bold text-gray-700">On:</span>{' '}
                                        <span className="text-blue-600">{kanji.readings.onyomi.join('、 ')}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-gray-700">Kun:</span>{' '}
                                        <span className="text-green-600">{kanji.readings.kunyomi.join('、 ')}</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-gray-700 font-medium">
                                    {kanji.meanings.join(', ')}
                                </div>
                                <div className="mt-3 flex gap-2">
                                    {kanji.grade && (
                                        <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200">
                                            Grade {kanji.grade}
                                        </span>
                                    )}
                                    {kanji.jlpt && (
                                        <span className="text-sm bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200">
                                            JLPT N{kanji.jlpt}
                                        </span>
                                    )}
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

export default KanjiList;