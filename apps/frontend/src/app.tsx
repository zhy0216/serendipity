import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';
import AboutPage from './pages/AboutPage';

// Main application component with React Router setup
function App() {
  return (
    <Routes>
      {/* Homepage route */}
      <Route path="/" element={<HomePage />} />
      {/* Main application route */}
      <Route path="/app" element={<AppPage />} />
      {/* About page route */}
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
