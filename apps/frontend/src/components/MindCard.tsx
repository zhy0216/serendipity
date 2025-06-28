import React from 'react';
import { Connection } from '@serendipity/types';

interface MindCardProps {
  connection: Connection;
}

export const MindCard: React.FC<MindCardProps> = ({ connection }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-blue-100 hover:border-blue-200 group">
      {/* Node Name Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
          {connection.nodeName}
        </h3>
      </div>

      {/* Connection Description */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          连接描述
        </h4>
        <p className="text-gray-700 leading-relaxed text-sm">
          {connection.connection}
        </p>
      </div>

      {/* Insight Highlight */}
      <div className="mb-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
          洞察
        </h4>
        <p className="text-amber-900 text-sm italic leading-relaxed">
          {connection.insight}
        </p>
      </div>

      {/* Exploration Method */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          探索方法
        </h4>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-purple-800 text-sm font-medium">
            {connection.explorationMethod}
          </p>
        </div>
      </div>

      {/* References */}
      {connection.references && connection.references.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            参考资料
          </h4>
          <div className="space-y-2">
            {connection.references.map((ref, index) => (
              <a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-50 hover:bg-green-100 border border-green-200 rounded-md p-3 transition-colors duration-200 group/ref"
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium text-sm group-hover/ref:text-green-800">
                    {ref.name}
                  </span>
                  <svg className="w-4 h-4 text-green-600 group-hover/ref:text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
