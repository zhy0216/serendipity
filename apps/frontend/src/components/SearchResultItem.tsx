import React, { useState, ReactNode, useRef } from 'react';
import Popover from './Popover';

interface SearchResultItemProps {
  title: string;
  description: string;
  url: string;
  type?: string;
  lineNumber?: number;
  preview?: ReactNode;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  title,
  description,
  url,
  type = 'file',
  lineNumber,
  preview,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className="relative group"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Main search result item - Google-like styling */}
      <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
        {/* Title and type badge */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg text-blue-700 hover:text-blue-800 hover:underline leading-tight">
            {title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full text-blue-600 bg-blue-100 ml-2 flex-shrink-0`}
          >
            {type}
          </span>
        </div>

        {/* URL path */}
        <div className="text-sm text-green-700 mb-1">
          {url}
          {lineNumber && ` · 第 ${lineNumber} 行`}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Preview popup on hover */}
      <Popover
        isVisible={showPreview && !!preview}
        position="left"
        triggerRef={itemRef}
      >
        {preview}
      </Popover>
    </div>
  );
};

export default SearchResultItem;
