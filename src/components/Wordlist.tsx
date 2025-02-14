import React, { useState } from 'react';

const JapaneseWord = ({ kana, romaji, kanji, meaning }: {
  kana: string;
  romaji: string;
  kanji: string;
  meaning: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="p-4 mb-2 border rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="text-2xl font-bold">{kana}</div>
        <div className={`text-lg transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {romaji}
        </div>
        <div className="text-2xl">{kanji}</div>
        <div className="text-lg">{meaning}</div>
      </div>
    </div>
  );
};

const WordList = () => {
  const words = [
    { kana: 'あめ', romaji: 'ame', kanji: '雨', meaning: 'rain' },
    { kana: 'いえ', romaji: 'ie', kanji: '家', meaning: 'house' },
    { kana: 'うみ', romaji: 'umi', kanji: '海', meaning: 'sea' },
    { kana: 'おと', romaji: 'oto', kanji: '音', meaning: 'sound' },
    { kana: 'かお', romaji: 'kao', kanji: '顔', meaning: 'face' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4 mb-4 font-bold text-lg">
        <div>Kana</div>
        <div>Romaji</div>
        <div>Kanji</div>
        <div>Meaning</div>
      </div>
      {words.map((word, index) => (
        <JapaneseWord key={index} {...word} />
      ))}
    </div>
  );
};

export default WordList;