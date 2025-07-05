interface KeywordMarqueeProps {
  keywords: string[];
  onKeywordClick?: (keyword: string) => void;
}

const colorSchemes = [
  'bg-blue-50 text-blue-700 hover:bg-blue-100',
  'bg-green-50 text-green-700 hover:bg-green-100',
  'bg-purple-50 text-purple-700 hover:bg-purple-100',
  'bg-orange-50 text-orange-700 hover:bg-orange-100',
  'bg-red-50 text-red-700 hover:bg-red-100',
  'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  'bg-pink-50 text-pink-700 hover:bg-pink-100',
  'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
  'bg-teal-50 text-teal-700 hover:bg-teal-100',
  'bg-gray-50 text-gray-700 hover:bg-gray-100',
];

function KeywordMarquee({ keywords, onKeywordClick }: KeywordMarqueeProps) {
  const handleKeywordClick = (keyword: string) => {
    if (onKeywordClick) {
      onKeywordClick(keyword);
    }
  };

  const renderKeywordGroup = (groupId: string) => (
    <div key={groupId} className="flex space-x-6 mr-6">
      {keywords.map((keyword, index) => (
        <span
          key={`${groupId}-${index}`}
          className={`inline-block px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
            colorSchemes[index % colorSchemes.length]
          }`}
          onClick={() => handleKeywordClick(keyword)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {renderKeywordGroup('group-1')}
        {renderKeywordGroup('group-2')}
      </div>
    </div>
  );
}

export default KeywordMarquee;
