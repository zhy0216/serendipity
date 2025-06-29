import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavCard from '../components/NavCard';
import SearchResultItem from '../components/SearchResultItem';
import CodePreview from '../components/CodePreview';
import { MindCard } from '../components/MindCard';
import { useAppStore } from '../store/useAppStore';

function AppPage() {
  const { 
    mindMapData, 
    isLoading, 
    error, 
    searchQuery,
    selectedKeyword,
    loadMindMapData,
    setSelectedKeyword 
  } = useAppStore();

  useEffect(() => {
    loadMindMapData();
  }, [loadMindMapData]);

  return (
    <div className="flex h-screen bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">Loading mind map data...</div>
        </div>
      )}
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
          {mindMapData && mindMapData.nodes && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mindMapData.nodes.map((node, index) => (
                <MindCard key={index} node={node} />
              ))}
            </div>
          )}
          {!mindMapData && !isLoading && !error && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No mind connection data available</div>
            </div>
          )}
        </div>
      </main>

      {/* Right Information Panel - Search Results */}
      <aside className="w-80 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-4">Found 8 results</div>
          
          <div className="space-y-0">
            <SearchResultItem
              title="App.tsx"
              description="Main application component with three-column layout"
              url="/src/app.tsx"
              type="Component"
              lineNumber={15}
              preview={
                <CodePreview 
                  code={`const App = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Navigation Bar */}
      <nav className="w-64 bg-white shadow-lg">
        ...
      </nav>
    </div>
  );
};`}
                  language="typescript"
                />
              }
            />
            
            <SearchResultItem
              title="API Interface"
              description="User data fetching interface"
              url="/src/api/user.ts"
              type="Function"
              lineNumber={42}
              preview={
                <CodePreview 
                  code={`export async function getUserData(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`}
                  language="typescript"
                />
              }
            />
            
            <SearchResultItem
              title="Data Model"
              description="Project data structure definition"
              url="/src/types/project.ts"
              type="Type"
              lineNumber={8}
              preview={
                <CodePreview 
                  code={`interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  progress: number;
}`}
                  language="typescript"
                />
              }
            />
            
            <SearchResultItem
              title="Style Config"
              description="Tailwind custom configuration"
              url="/tailwind.config.js"
              type="CSS"
              lineNumber={23}
              preview={
                <CodePreview 
                  code={`module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6'
      }
    }
  }
}`}
                  language="javascript"
                />
              }
            />
            
            <SearchResultItem
              title="Error Handling"
              description="Global error capture mechanism"
              url="/src/utils/error.ts"
              type="Utility"
              lineNumber={18}
              preview={
                <CodePreview 
                  code={`export function handleError(error: Error) {
  console.error('Application Error:', error);
  // Send to error tracking service
  sendToErrorService(error);
}`}
                  language="typescript"
                />
              }
            />
            
            <SearchResultItem
              title="Config File"
              description="Environment variable configuration"
              url=".env.example"
              type="Config"
              lineNumber={5}
              preview={
                <CodePreview 
                  code={`# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development

# Database
DB_HOST=localhost`}
                  language="bash"
                />
              }
            />
          </div>
          
        </div>
      </aside>
    </div>
  );
}

export default AppPage;
