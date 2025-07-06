import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

function SearchBox({
  placeholder = 'Search for ideas, concepts, or topics...',
  onSearch,
  className = '',
  size = 'lg',
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { keywords } = useAppStore();

  // Size-based styling
  const sizeStyles = {
    sm: {
      input: 'px-4 py-2 pl-10 pr-10 text-sm rounded-lg',
      icon: 'w-4 h-4',
      iconLeft: 'left-3',
      iconRight: 'right-3',
    },
    md: {
      input: 'px-4 py-2.5 pl-11 pr-11 text-base rounded-lg',
      icon: 'w-4 h-4',
      iconLeft: 'left-3.5',
      iconRight: 'right-3.5',
    },
    lg: {
      input: 'px-4 py-3 pl-12 pr-12 text-lg rounded-full',
      icon: 'w-5 h-5',
      iconLeft: 'left-4',
      iconRight: 'right-4',
    },
  };

  // Get filtered suggestions
  const suggestions = query.trim()
    ? [
        query.trim(), // First item is always the user input
        ...keywords
          .filter(
            (keyword) =>
              keyword.toLowerCase().includes(query.toLowerCase()) &&
              keyword.toLowerCase() !== query.toLowerCase()
          )
          .slice(0, 5), // Limit to 5 keyword suggestions
      ]
    : [];

  const handleSubmit = (e: React.FormEvent, selectedQuery?: string) => {
    e.preventDefault();
    const queryToUse = selectedQuery || query.trim();
    if (queryToUse) {
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(queryToUse);
      } else {
        // Default behavior: navigate to app page with query parameter
        navigate(`/app?q=${encodeURIComponent(queryToUse)}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSubmit(e, suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string, e: React.MouseEvent) => {
    e.preventDefault();
    handleSubmit(e as any, suggestion);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setShowSuggestions(true)}
            placeholder={placeholder}
            className={`w-full ${
              sizeStyles[size].input
            } border border-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              showSuggestions && suggestions.length > 0 ? 'rounded-b-none' : ''
            }`}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Search Icon */}
          <div
            className={`absolute ${sizeStyles[size].iconLeft} top-1/2 transform -translate-y-1/2 text-gray-400`}
          >
            <svg
              className={sizeStyles[size].icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={`absolute ${sizeStyles[size].iconRight} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
            >
              <svg
                className={sizeStyles[size].icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Hidden submit button for form submission */}
        <button type="submit" className="hidden" />
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-t-0 border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={(e) => handleSuggestionClick(suggestion, e)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {index === 0 ? (
                  // Search icon for the first item (user input)
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ) : (
                  // History icon for existing keywords
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span className="truncate">{suggestion}</span>
                {index === 0 && (
                  <span className="text-xs text-gray-500 ml-auto flex-shrink-0">
                    搜索
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Google-style buttons */}
      {/* <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded hover:shadow-sm hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search Ideas
        </button>
        <button
          onClick={() => {
            // Generate a random search term for "I'm Feeling Lucky"
            const randomTopics = [
              'artificial intelligence', 'climate change', 'blockchain', 'quantum computing',
              'renewable energy', 'space exploration', 'biotechnology', 'machine learning',
              'sustainable design', 'virtual reality', 'neuroscience', 'robotics'
            ];
            const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
            setQuery(randomTopic);
            if (onSearch) {
              onSearch(randomTopic);
            } else {
              navigate(`/app?q=${encodeURIComponent(randomTopic)}`);
            }
          }}
          className="px-6 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded hover:shadow-sm hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          I'm Feeling Lucky
        </button>
      </div> */}
    </div>
  );
}

export default SearchBox;
