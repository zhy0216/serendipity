import React from 'react';
import { MapNode } from '@serendipity/types';

interface MindCardProps {
  node: MapNode;
}

export const MindCard: React.FC<MindCardProps> = ({ node }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-gray-300 group ">
      {/* Node Name Header */}
      <div className="mb-4 cursor-pointer">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
          {node.nodeName}
        </h3>
      </div>

      {/* Connection Description */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed text-sm">
          {node.connection}
        </p>
      </div>

      {/* Insight Highlight */}
      <div className="mb-4 bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
        <p className="text-gray-700 text-sm italic leading-relaxed">
          {node.insight}
        </p>
      </div>

      {/* Exploration Method */}
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center text-sm font-semibold text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            探索方法:
          </div>
          <div className="flex-1 flex gap-1">
            {node.explorationMethods.map((method, index) => (
              <div key={index} className="text-gray-700 text-sm font-medium underline cursor-pointer">
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* References */}
      {node.references && node.references.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            参考资料
          </h4>
          <div className="space-y-2">
            {node.references.map((ref, index) => (
              <button
                key={index}
                className="w-full text-left pl-3 py-2 transition-all duration-200 group/ref cursor-pointer relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-4 before:bg-gray-200 hover:before:bg-blue-500 before:transition-colors before:duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 group-hover/ref:text-blue-600 transition-colors duration-200 flex-1 pr-2">
                    {ref}
                  </span>
                  <svg className="w-3 h-3 text-gray-400 group-hover/ref:text-blue-500 transition-colors duration-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
