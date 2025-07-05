import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        // Default behavior: navigate to app page with query parameter
        navigate(`/app?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full ${sizeStyles[size].input} border border-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Search Icon */}
          <div className={`absolute ${sizeStyles[size].iconLeft} top-1/2 transform -translate-y-1/2 text-gray-400`}>
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
