interface NavCardProps {
  keyword: string;
  isSelect: boolean;
}

const NavCard = ({ keyword, isSelect }: NavCardProps) => {
  // Use blue style when selected, gray style when not selected
  const selectedStyle = {
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
    title: 'text-blue-800',
    description: 'text-blue-600'
  };
  
  const unselectedStyle = {
    gradient: 'from-gray-50 to-gray-100',
    border: 'border-gray-200', 
    hover: 'hover:bg-gray-100',
    title: 'text-gray-800',
    description: 'text-gray-600'
  };
  
  const style = isSelect ? selectedStyle : unselectedStyle;
  
  return (
    <div 
      className={`
        bg-gradient-to-r ${style.gradient} rounded-lg p-4 border ${style.border} 
        hover:shadow-md transition-shadow duration-200 cursor-pointer
        ${isSelect ? 'ring-2 ring-blue-500 shadow-lg' : ''}
        ${style.hover}
      `}
    >
      <h3 className={`font-semibold ${style.title} text-center`}>
        {keyword}
      </h3>
    </div>
  );
};

export default NavCard;
