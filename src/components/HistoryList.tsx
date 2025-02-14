import { KanjiEntry, VocabEntry } from '../data/filters/types';

interface HistoryListProps {
    items: (KanjiEntry | VocabEntry)[];
    onKanjiClick: (kanji: KanjiEntry) => void;
    onVocabClick: (vocab: VocabEntry) => void;
}

const HistoryList = ({ items, onKanjiClick, onVocabClick }: HistoryListProps) => {
    const isKanjiEntry = (item: KanjiEntry | VocabEntry): item is KanjiEntry => {
        return 'kanji' in item && !Array.isArray(item.kanji);
    };

    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className="p-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => isKanjiEntry(item) ? onKanjiClick(item) : onVocabClick(item)}
                >
                    {isKanjiEntry(item) ? (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-800">{item.kanji}</span>
                            <span className="text-sm text-gray-600">{item.meanings[0]}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-800">
                                {item.kanji[0] || item.kana[0]}
                            </span>
                            <span className="text-blue-600">
                                {item.kana[0]}
                            </span>
                        </div>
                    )}
                </div>
            ))}
            {items.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                    No history yet
                </div>
            )}
        </div>
    );
};

export default HistoryList;