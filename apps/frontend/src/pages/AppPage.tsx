import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import NavCard from '../components/NavCard';
import { MindCard } from '../components/MindCard';
import SearchBox from '../components/SearchBox';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

function AppPage() {
  const [searchParams] = useSearchParams();
  const {
    mindMapDataRecord,
    keywordsLoading,
    error,
    selectedKeyword,
    setSelectedKeyword,
    loadMindMapDataStreaming,
    keywords,
  } = useAppStore();
  const mindMapData = mindMapDataRecord[selectedKeyword ?? ''];
  const navigate = useNavigate();

  // Handle URL query parameter on initial load
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSelectedKeyword(queryParam);
    }
  }, [searchParams, setSelectedKeyword]);

  // Load mind map data when selectedKeyword changes
  useEffect(() => {
    if (selectedKeyword) {
      loadMindMapDataStreaming(selectedKeyword);
    }
  }, [selectedKeyword, loadMindMapDataStreaming]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">Loading mind map data...</div>
        </div>
      )} */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Left Navigation Bar - Card Display */}
      <nav className="w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Serendipity</h2>
          <Link
            to="/"
            className="text-sm text-blue-500 hover:text-blue-800 transition-colors"
            title="Back to Home"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
        <div className="p-4 space-y-3">
          {/* Search Box */}
          <SearchBox placeholder="输入关键字..." size="sm" />
          {keywords.map((keyword) => (
            <NavCard
              key={keyword}
              keyword={keyword}
              isLoading={keywordsLoading[keyword]}
              isSelect={selectedKeyword === keyword}
              onClick={() =>
                navigate(`/app?q=${encodeURIComponent(keyword.trim())}`)
              }
            />
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white text-center shadow-sm border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedKeyword ? selectedKeyword : '思维连接卡片'}
          </h1>
          {!selectedKeyword && (
            <p className="text-gray-600 mt-2">探索思想之间的深层连接</p>
          )}
        </header>
        <div className="p-8">
          {/* Show streaming nodes first, then final data */}
          {mindMapData && mindMapData.nodes && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Streaming nodes */}
              {Array.from(mindMapData.nodes.entries()).map(([index, node]) =>
                node.nodeName ? (
                  <MindCard key={`streaming-${index}`} node={node} />
                ) : null
              )}
            </div>
          )}
          {keywordsLoading[selectedKeyword ?? ''] && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!mindMapData &&
            !keywordsLoading[selectedKeyword ?? ''] &&
            !error && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {selectedKeyword ? '没有相关数据' : '请选择一个主题'}
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default AppPage;
