import { useState, useEffect } from 'react';
import { KanjiEntry, VocabEntry } from '../data/filters/types';
import KanjiFilters from '../components/KanjiFilters';
import VocabFilters from '../components/VocabFilters';
import HistoryList from '../components/HistoryList';
import KanjiList from '../components/KanjiList';
import VocabList from '../components/VocabList';
import KanjiModal from '../components/KanjiModal';
import VocabModal from '../components/VocabModal';
import kanjiData from '../data/dictionary/kanji.json';

const DictionaryApp = () => {
   const [mode, setMode] = useState<'kanji' | 'vocabulary'>('kanji');
   const [history, setHistory] = useState<(KanjiEntry | VocabEntry)[]>([]);
   const [selectedKanji, setSelectedKanji] = useState<KanjiEntry | null>(null);
   const [selectedVocab, setSelectedVocab] = useState<VocabEntry | null>(null);
   
   const [kanjiFilters, setKanjiFilters] = useState({
       jlpt: [] as string[],
       grade: [] as string[],
       page: 1,
       itemsPerPage: 10,
       isRandom: false
   });

   const [vocabFilters, setVocabFilters] = useState({
       wordLengths: [] as string[],
       writingSystem: 'all',
       page: 1,
       itemsPerPage: 10,
       isRandom: false
   });

   // Load history from localStorage on mount
   useEffect(() => {
       const savedHistory = localStorage.getItem('dictionaryHistory');
       if (savedHistory) {
           setHistory(JSON.parse(savedHistory));
       }
   }, []);

   // Save history to localStorage when it changes
   useEffect(() => {
       localStorage.setItem('dictionaryHistory', JSON.stringify(history));
   }, [history]);

   const handleKanjiFilterChange = (newFilters: { jlpt: string[]; grade: string[]; }) => {
       setKanjiFilters(prev => ({
           ...prev,
           ...newFilters,
           page: 1
       }));
   };

   const handleVocabFilterChange = (newFilters: { wordLengths: string[]; writingSystem: string; }) => {
       setVocabFilters(prev => ({
           ...prev,
           ...newFilters,
           page: 1
       }));
   };

   const handlePageChange = (newPage: number) => {
       if (mode === 'kanji') {
           setKanjiFilters(prev => ({ ...prev, page: newPage }));
       } else {
           setVocabFilters(prev => ({ ...prev, page: newPage }));
       }
   };

   const handleItemsPerPageChange = (count: number) => {
       if (mode === 'kanji') {
           setKanjiFilters(prev => ({ ...prev, itemsPerPage: count, page: 1 }));
       } else {
           setVocabFilters(prev => ({ ...prev, itemsPerPage: count, page: 1 }));
       }
   };

   const toggleRandom = () => {
       if (mode === 'kanji') {
           setKanjiFilters(prev => ({ ...prev, isRandom: !prev.isRandom, page: 1 }));
       } else {
           setVocabFilters(prev => ({ ...prev, isRandom: !prev.isRandom, page: 1 }));
       }
   };

   const handleKanjiClick = (kanji: KanjiEntry) => {
       setSelectedKanji(kanji);
       addToHistory(kanji);
   };

   const handleVocabClick = (vocab: VocabEntry) => {
       setSelectedVocab(vocab);
       addToHistory(vocab);
   };

   const handleKanjiInVocabClick = (kanjiChar: string) => {
       const kanjiEntry = (kanjiData as KanjiEntry[]).find(k => k.kanji === kanjiChar);
       if (kanjiEntry) {
           setSelectedVocab(null);
           setSelectedKanji(kanjiEntry);
           addToHistory(kanjiEntry);
       }
   };

   const addToHistory = (item: KanjiEntry | VocabEntry) => {
       setHistory(prev => {
           const newHistory = [item, ...prev.filter(h => 
               'kanji' in h && !Array.isArray(h.kanji) 
                   ? h.kanji !== (item as KanjiEntry).kanji
                   : h !== item
           )].slice(0, 50); // Keep last 50 items
           return newHistory;
       });
   };

    return (
        <main className="min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-center gap-2">
                    <button 
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            mode === 'kanji' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => setMode('kanji')}
                    >
                        Kanji
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            mode === 'vocabulary' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => setMode('vocabulary')}
                    >
                        Vocabulary
                    </button>
                </div>

                <div className="bg-gray-100 rounded-lg shadow-lg mb-6">
                    {mode === 'kanji' ? (
                        <KanjiFilters onFilterChange={handleKanjiFilterChange} />
                    ) : (
                        <VocabFilters onFilterChange={handleVocabFilterChange} />
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
                    <div>
                        {mode === 'kanji' ? (
                            <KanjiList
                                filters={kanjiFilters}
                                onPageChange={handlePageChange}
                                onItemsPerPageChange={handleItemsPerPageChange}
                                onRandomToggle={toggleRandom}
                                onKanjiClick={handleKanjiClick}
                            />
                        ) : (
                            <VocabList
                                filters={vocabFilters}
                                onPageChange={handlePageChange}
                                onItemsPerPageChange={handleItemsPerPageChange}
                                onRandomToggle={toggleRandom}
                                onVocabClick={handleVocabClick}
                            />
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
                        <h2 className="text-xl font-bold p-4 border-b-2 border-gray-200">History</h2>
                        <div className="p-4">
                            <HistoryList 
                                items={history}
                                onKanjiClick={handleKanjiClick}
                                onVocabClick={handleVocabClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <KanjiModal
                kanji={selectedKanji}
                isOpen={selectedKanji !== null}
                onClose={() => setSelectedKanji(null)}
            />

            <VocabModal
                vocab={selectedVocab}
                isOpen={selectedVocab !== null}
                onClose={() => setSelectedVocab(null)}
                onKanjiClick={handleKanjiInVocabClick}
            />
        </main>
    );
};

export default DictionaryApp;