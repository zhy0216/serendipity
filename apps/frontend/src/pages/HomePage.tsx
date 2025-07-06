import SearchBox from '../components/SearchBox';
import KeywordMarquee from '../components/KeywordMarquee';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      {/* <header className="flex justify-end p-4">
        <div className="flex items-center space-x-4 text-sm">
          <button className="text-gray-700 hover:underline">
            About
          </button>
          <button className="text-gray-700 hover:underline">
            Store
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100" title="Search">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"/>
              </svg>
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              S
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-light text-gray-700 mb-4 text-center">
            <span className="text-blue-500">Serendipity</span>
          </h1>
          <p className="text-xl text-gray-600 text-center mt-4">
            探索未知的知识领域
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-xl">
          <SearchBox placeholder="搜索想法、概念或主题..." />
        </div>

        {/* What Others Are Exploring */}
        <div className="mt-16 w-full max-w-4xl">
          <h2 className="text-2xl font-light text-gray-700 text-center mb-8">
            其他人正在探索
          </h2>

          {/* Scrolling Keywords */}
          <KeywordMarquee
            keywords={[
              '人工智能',
              '量子计算',
              '存在主义',
              '区块链技术',
              '神经科学',
              '可持续发展',
              '心理学',
              '生物技术',
              '太空探索',
              '文学理论',
            ]}
            onKeywordClick={(keyword) =>
              navigate(`/app?q=${encodeURIComponent(keyword.trim())}`)
            }
          />
        </div>

        {/* Additional Options */}
        {/* <div className="mt-8 text-sm text-gray-600">
          Serendipity offered in: 
          <a href="#" className="text-blue-600 hover:underline ml-1">English</a>
        </div> */}
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-100 border-t border-gray-200">
        <div className="px-6 py-3 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-2 md:space-y-0">
          <div className="flex space-x-6">
            <button className="hover:underline">Advertising</button>
            <button className="hover:underline">Business</button>
            <button className="hover:underline">How Search works</button>
          </div>
          <div className="flex space-x-6">
            <button className="hover:underline">Privacy</button>
            <button className="hover:underline">Terms</button>
            <button className="hover:underline">Settings</button>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default HomePage;
