import React from 'react';
import { VocabEntry } from '../data/filters/types';

interface VocabModalProps {
    vocab: VocabEntry | null;
    isOpen: boolean;
    onClose: () => void;
    onKanjiClick?: (kanji: string) => void;
}

const VocabModal = ({ vocab, isOpen, onClose, onKanjiClick }: VocabModalProps) => {
    if (!isOpen || !vocab) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden shadow-xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Vocabulary Details</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-gray-800">
                                {vocab.kanji[0] ? (
                                    vocab.kanji[0].split('').map((char, i) => (
                                        <span
                                            key={i}
                                            onClick={() => onKanjiClick?.(char)}
                                            className={char.match(/[\u4e00-\u9faf]/) ? "cursor-pointer hover:text-blue-600" : ""}
                                        >
                                            {char}
                                        </span>
                                    ))
                                ) : (
                                    vocab.kana[0]
                                )}
                            </div>
                            <div className="text-2xl text-blue-600">{vocab.kana[0]}</div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-700 mb-1">Readings</h3>
                            <div className="text-gray-600">{vocab.romaji[0]}</div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-700 mb-1">Meanings</h3>
                            <div className="text-gray-600">{vocab.meanings.join(', ')}</div>
                        </div>

                        {vocab.kanji[0] && (
                            <div>
                                <h3 className="font-bold text-gray-700 mb-1">Kanji Used</h3>
                                <div className="flex gap-2">
                                    {vocab.kanji[0].split('').map((char, i) => (
                                        char.match(/[\u4e00-\u9faf]/) && (
                                            <span
                                                key={i}
                                                onClick={() => onKanjiClick?.(char)}
                                                className="text-2xl cursor-pointer hover:text-blue-600 bg-gray-50 p-2 rounded-lg"
                                            >
                                                {char}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VocabModal;