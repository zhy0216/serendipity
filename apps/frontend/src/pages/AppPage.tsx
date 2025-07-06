import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import NavCard from '../components/NavCard';
import { MindCard } from '../components/MindCard';
import SearchBox from '../components/SearchBox';
import ProgressSteps from '../components/ProgressSteps';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

function AppPage() {
  const [searchParams] = useSearchParams();
  const navRef = useRef<HTMLDivElement>(null);
  const {
    mindMapDataRecord,
    keywordsLoading,
    keywordsStartLoading,
    error,
    selectedKeyword,
    setSelectedKeyword,
    loadMindMapDataStreaming,
    keywords,
    removeKeyword,
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

  // Scroll navigation bar to top when selectedKeyword changes
  useEffect(() => {
    if (selectedKeyword && navRef.current) {
      navRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedKeyword]);

  return (
    <div className="flex h-screen bg-gray-50">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Left Navigation Bar - Card Display */}
      <nav
        ref={navRef}
        className="w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto"
      >
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
          <div className="space-y-3 relative">
            {keywords.map((keyword, index) => (
              <div
                key={`${keyword}-${index}`}
                className="nav-card-item transform transition-all duration-200 ease-out"
                style={{
                  transitionDelay: `${index * 80}ms`,
                  zIndex: keywords.length - index,
                }}
              >
                <NavCard
                  keyword={keyword}
                  isLoading={keywordsLoading[keyword]}
                  isSelect={selectedKeyword === keyword}
                  onClick={() =>
                    navigate(`/app?q=${encodeURIComponent(keyword.trim())}`)
                  }
                  onDelete={() => {
                    removeKeyword(keyword);
                    // If the deleted keyword was selected and there are other keywords, select the first one
                    if (selectedKeyword === keyword && keywords.length > 1) {
                      const remainingKeywords = keywords.filter(
                        (k) => k !== keyword
                      );
                      if (remainingKeywords.length > 0) {
                        navigate(
                          `/app?q=${encodeURIComponent(
                            remainingKeywords[0].trim()
                          )}`
                        );
                      } else {
                        navigate('/app');
                      }
                    } else if (selectedKeyword === keyword) {
                      navigate('/app');
                    }
                  }}
                />
              </div>
            ))}
          </div>

          {/* Add custom CSS for smooth list animations */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .nav-card-item {
                  transform-origin: center;
                  transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
                }
                
                @keyframes slideInFromBottom {
                  0% {
                    transform: translateY(20px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                
                .nav-card-item:first-child {
                  animation: slideInFromBottom 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
                }
              `,
            }}
          />
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
          <ProgressSteps
            keyword={selectedKeyword ?? ''}
            isLoading={keywordsLoading[selectedKeyword ?? ''] || false}
            visible={
              !keywordsStartLoading[selectedKeyword ?? ''] &&
              keywordsLoading[selectedKeyword ?? '']
            }
            // isLoading={keywordsLoading[selectedKeyword] || false}
            onCancel={() => {
              // TODO: Cancel request logic if needed
              console.log('Cancel request');
            }}
            onComplete={() => {
              // Progress completed, component will hide automatically
              console.log('Progress completed');
            }}
          />
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
