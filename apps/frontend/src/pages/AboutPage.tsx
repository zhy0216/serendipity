import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-gray-700 mb-6">
              <span className="text-blue-500">Serendipity</span>
            </h1>
            <p className="text-2xl text-gray-600 font-light">
              探索无限可能的知识世界
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-800 mb-6">
              什么是 Serendipity？
            </h2>
            <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
              <p>
                Serendipity
                是一个基于人工智能的知识探索平台，旨在帮助用户发现意外的知识连接和深层洞察。
                通过智能思维导图生成技术，我们将复杂的概念转化为直观、易理解的可视化结构。
              </p>
              <p>
                名字来源于英文单词 "Serendipity"，意为"意外发现珍贵事物的能力"。
                我们相信，最有价值的学习往往来自于那些意想不到的知识碰撞和跨领域的思维连接。
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-800 mb-8">主要功能</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    智能思维导图
                  </h3>
                </div>
                <p className="text-gray-600">
                  输入任何关键词，AI
                  会自动生成结构化的思维导图，展示相关概念、关联性和深层见解。
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    实时流式加载
                  </h3>
                </div>
                <p className="text-gray-600">
                  采用流式处理技术，让你能够实时看到思维导图的生成过程，获得更好的用户体验。
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800">
                    智能缓存
                  </h3>
                </div>
                <p className="text-gray-600">
                  自动缓存已生成的思维导图，让你能够快速回顾之前探索的主题，节省时间和资源。
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-orange-600"
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
                  <h3 className="text-xl font-medium text-gray-800">
                    智能搜索建议
                  </h3>
                </div>
                <p className="text-gray-600">
                  基于历史搜索记录提供智能自动完成建议，帮助你快速找到感兴趣的主题。
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-800 mb-8">如何使用</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    输入关键词
                  </h3>
                  <p className="text-gray-600">
                    在搜索框里输入任何你感兴趣的概念、主题或想法，比如"人工智能"、"量子物理"、"存在主义"等。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    AI 分析生成
                  </h3>
                  <p className="text-gray-600">
                    我们的 AI
                    助手会分析你的关键词，生成相关的思维导图结构，包括核心概念、关联主题和深层洞察。
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    探索发现
                  </h3>
                  <p className="text-gray-600">
                    浏览生成的思维导图，发现意想不到的知识连接，点击感兴趣的节点可以进一步探索。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-800 mb-6">
              我们的愿景
            </h2>
            <div className="bg-blue-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                我们希望 Serendipity
                能够成为知识探索者的得力助手，帮助每个人突破传统学习的局限，
                发现知识之间隐藏的美妙连接。在这个信息爆炸的时代，我们相信真正的智慧来自于
                跨领域的思维碰撞和意外的洞察发现。
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-6">
              开始你的知识探索之旅
            </h2>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
            >
              立即开始探索
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
