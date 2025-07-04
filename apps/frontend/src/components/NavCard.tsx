interface NavCardProps {
  keyword: string;
  isSelect: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const NavCard = ({ keyword, isSelect, isLoading = false, onClick }: NavCardProps) => {
  // Define styles for different states
  const selectedStyle = {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
    title: 'text-blue-800',
    cursor: 'cursor-pointer'
  };
  
  const unselectedStyle = {
    gradient: 'from-gray-50 to-gray-100',
    border: 'border-gray-200', 
    hover: 'hover:bg-gray-100',
    title: 'text-gray-800',
    cursor: 'cursor-pointer'
  };
  
  const loadingStyle = {
    gradient: '', // Will be overridden by inline style
    border: 'border-gray-300',
    hover: '',
    title: 'text-gray-400 animate-pulse',
    cursor: 'cursor-default'
  };
  
  const style = isLoading ? loadingStyle : (isSelect ? selectedStyle : unselectedStyle);
  
  // Inline styles for loading animation
  const loadingInlineStyle = isLoading ? {
    background: 'linear-gradient(90deg, #e5e7eb, #f3f4f6, #e5e7eb, #f3f4f6)',
    backgroundSize: '200% 100%',
    animation: 'flowingGradient 2s ease-in-out infinite'
  } : {};
  
  return (
    <>
      {/* Add custom keyframes for flowing gradient */}
      {isLoading && (
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes flowingGradient {
              0% {
                background-position: 200% 0;
              }
              100% {
                background-position: -200% 0;
              }
            }
          `
        }} />
      )}
      
      <div 
        className={`
          ${isLoading ? '' : `bg-gradient-to-r ${style.gradient}`} 
          rounded-lg p-4 border ${style.border} 
          ${isLoading ? '' : 'hover:shadow-md transition-shadow duration-200'}
          ${isSelect && !isLoading ? 'ring-2 ring-blue-500 shadow-lg' : ''}
          ${style.hover} ${style.cursor} overflow-hidden
        `}
        style={loadingInlineStyle}
        onClick={isLoading ? undefined : onClick}
      >
        <h3 className={`font-semibold ${style.title} text-center`}>
          {keyword}
        </h3>
      </div>
    </>
  );
};

export default NavCard;
