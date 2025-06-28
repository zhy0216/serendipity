
import NavCard from './components/NavCard';
import SearchResultItem from './components/SearchResultItem';
import CodePreview from './components/CodePreview';

const App = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Navigation Bar - Card Display */}
      <nav className="w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">项目卡片</h2>
        </div>
        <div className="p-4 space-y-3">
          <NavCard keyword="serendipity" isSelect={true} />
          <NavCard keyword="ai" isSelect={false} />
          <NavCard keyword="data" isSelect={false} />
          <NavCard keyword="api" isSelect={false} />
          <NavCard keyword="test" isSelect={false} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">主要内容区域</h1>
        </header>
        <div className="p-8">
          <section className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">欢迎使用 Serendipity</h3>
            <p className="text-gray-600 leading-relaxed">这是主要的内容展示区域。您可以在这里添加各种内容，如文章、项目展示、数据图表等。</p>
          </section>
          <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">功能特性</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                响应式三栏布局
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                现代化的用户界面
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                灵活的内容管理
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                高性能的前端架构
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Right Information Panel - Search Results */}
      <aside className="w-80 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-4">找到 8 个结果</div>
          
          <div className="space-y-0">
            <SearchResultItem
              title="App.tsx"
              description="主应用组件，包含三栏布局"
              url="/src/app.tsx"
              type="组件"
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
              title="API 接口"
              description="用户数据获取接口"
              url="/src/api/user.ts"
              type="函数"
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
              title="数据模型"
              description="项目数据结构定义"
              url="/src/types/project.ts"
              type="类型"
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
              title="样式配置"
              description="Tailwind 自定义配置"
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
              title="错误处理"
              description="全局错误捕获机制"
              url="/src/utils/error.ts"
              type="工具"
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
              title="配置文件"
              description="环境变量配置"
              url=".env.example"
              type="配置"
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
};

export default App;