import { render, screen } from '@testing-library/react';
import NavCard from './NavCard';

describe('NavCard', () => {
  it('renders keyword correctly', () => {
    render(<NavCard keyword="Test Keyword" isSelect={false} />);
    
    expect(screen.getByText('Test Keyword')).toBeDefined();
  });

  it('applies selected styling when isSelect is true', () => {
    const { container } = render(<NavCard keyword="Selected Card" isSelect={true} />);
    
    const cardElement = container.firstElementChild as HTMLElement;
    expect(cardElement.className).toContain('from-blue-50');
    expect(cardElement.className).toContain('ring-blue-500');
  });

  it('applies unselected styling when isSelect is false', () => {
    const { container } = render(<NavCard keyword="Unselected Card" isSelect={false} />);
    
    const cardElement = container.firstElementChild as HTMLElement;
    expect(cardElement.className).toContain('from-gray-50');
    expect(cardElement.className).not.toContain('ring-blue-500');
  });
});
