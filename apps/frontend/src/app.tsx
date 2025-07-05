import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';

// Main application component with React Router setup
function App() {
  return (
    <Routes>
      {/* Homepage route */}
      <Route path="/" element={<HomePage />} />
      {/* Main application route */}
      <Route path="/app" element={<AppPage />} />
    </Routes>
  );
}

export default App;
