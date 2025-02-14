import React from 'react';
import { KanjiEntry } from '../data/filters/types';

interface KanjiModalProps {
    kanji: KanjiEntry | null;
    isOpen: boolean;
    onClose: () => void;
}

const KanjiModal = ({ kanji, isOpen, onClose }: KanjiModalProps) => {
    if (!isOpen || !kanji) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Kanji Details</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start gap-6">
                        <div className="text-7xl font-bold text-gray-800">{kanji.kanji}</div>
                        <div className="flex-1">
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-bold text-gray-700">Meanings</h3>
                                    <p className="text-gray-600">{kanji.meanings.join(', ')}</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-gray-700">On'yomi Readings</h3>
                                    <p className="text-blue-600">{kanji.readings.onyomi.join('、 ')}</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-gray-700">Kun'yomi Readings</h3>
                                    <p className="text-green-600">{kanji.readings.kunyomi.join('、 ')}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
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
            </div>
        </div>
    );
};

export default KanjiModal;