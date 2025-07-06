import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 py-8 ${className}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-600 mb-4">
          © 2025 Serendipity. 探索无限可能的知识世界
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700 transition-colors">
            首页
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-gray-700 transition-colors">
            关于我们
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
