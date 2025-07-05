interface NavCardProps {
  keyword: string;
  isSelect: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const NavCard = ({
  keyword,
  isSelect,
  isLoading = false,
  onClick,
}: NavCardProps) => {
  // Define styles for different states
  const selectedStyle = {
    gradient: 'from-blue-100 via-blue-200 to-blue-100',
    border: 'border-blue-300',
    hover: 'hover:from-blue-200 hover:via-blue-300 hover:to-blue-200',
    title: 'text-blue-900 font-bold',
    cursor: 'cursor-pointer',
    shadow: 'shadow-lg ring-2 ring-blue-400',
  };

  const unselectedStyle = {
    gradient: 'from-gray-50 via-gray-100 to-gray-50',
    border: 'border-gray-200',
    hover: 'hover:from-gray-100 hover:via-gray-200 hover:to-gray-100',
    title: 'text-gray-700',
    cursor: 'cursor-pointer',
    shadow: 'shadow-sm hover:shadow-md',
  };

  const baseStyle = isSelect ? selectedStyle : unselectedStyle;

  // Inline styles for loading animation - respects selected state
  const loadingInlineStyle = isLoading
    ? {
        background:
          'linear-gradient(90deg, #dbeafe, #bfdbfe, #93c5fd, #bfdbfe, #dbeafe)',
        backgroundSize: '200% 100%',
        animation: 'flowingGradient 2.5s ease-in-out infinite',
      }
    : {};

  return (
    <>
      {/* Add custom keyframes for flowing gradient */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes flowingGradient {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `,
        }}
      />

      <div
        className={`
          ${isLoading ? '' : `bg-gradient-to-r ${baseStyle.gradient}`} 
          rounded-lg p-4 border ${baseStyle.border} 
          ${isLoading ? '' : `transition-all duration-300 ${baseStyle.shadow}`}
          ${isLoading ? '' : baseStyle.hover}
          ${baseStyle.cursor} overflow-hidden
        `}
        style={loadingInlineStyle}
        onClick={onClick}
      >
        <h3
          className={`font-semibold ${
            isLoading ? 'text-gray-400 animate-pulse' : baseStyle.title
          } text-center`}
        >
          {keyword}
        </h3>
      </div>
    </>
  );
};

export default NavCard;
