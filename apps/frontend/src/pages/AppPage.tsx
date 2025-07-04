import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import NavCard from '../components/NavCard';
import { MindCard } from '../components/MindCard';
import { useAppStore } from '../store/useAppStore';

function AppPage() {
  const [searchParams] = useSearchParams();
  const { 
    mindMapData, 
    streamingNodes,
    isLoading, 
    error, 
    searchQuery,
    selectedKeyword,
    setSelectedKeyword,
    loadMindMapDataStreaming
  } = useAppStore();

  // Handle URL query parameter on initial load
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam && !selectedKeyword) {
      setSelectedKeyword(queryParam);
    }
  }, [searchParams, selectedKeyword, setSelectedKeyword]);

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
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            title="Back to Home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
        <div className="p-4 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchQuery}
              // onChange={(e) => searchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <NavCard 
            keyword="serendipity" 
            isSelect={selectedKeyword === 'serendipity'}
            onClick={() => setSelectedKeyword('serendipity')}
          />
          <NavCard 
            keyword="ai" 
            isSelect={selectedKeyword === 'ai'}
            onClick={() => setSelectedKeyword('ai')}
          />
          <NavCard 
            keyword="data" 
            isSelect={selectedKeyword === 'data'}
            onClick={() => setSelectedKeyword('data')}
          />
          <NavCard 
            keyword="api" 
            isSelect={selectedKeyword === 'api'}
            onClick={() => setSelectedKeyword('api')}
          />
          <NavCard 
            keyword="test" 
            isSelect={selectedKeyword === 'test'}
            onClick={() => setSelectedKeyword('test')}
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Mind Connection Cards
          </h1>
          <p className="text-gray-600 mt-2">Explore deep connections between thoughts</p>
        </header>
        <div className="p-8">
          {/* Show streaming nodes first, then final data */}
          {(streamingNodes.size > 0 || (mindMapData && mindMapData.nodes)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Streaming nodes */}
              {Array.from(streamingNodes.entries()).map(([index, { node, isComplete }]) => (
                node.nodeName ? (
                  <MindCard 
                    key={`streaming-${index}`} 
                    node={node as any} 
                    isLoading={!isComplete}
                  />
                ) : null
              ))}
              
              {/* Final nodes (only show if streaming is complete) */}
              {mindMapData && mindMapData.nodes && streamingNodes.size === 0 && mindMapData.nodes.map((node, index) => (
                <MindCard key={`final-${index}`} node={node} />
              ))}
            </div>
          )}
          {!mindMapData && !isLoading && !error && streamingNodes.size === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No mind connection data available</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AppPage;
