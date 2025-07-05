import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

// Basic test to ensure app renders without crashing
describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should be able to render the app component
    expect(container).toBeTruthy();
  });
});
