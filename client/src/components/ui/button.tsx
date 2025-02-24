export const Button = ({ children, onClick, direction = 'right' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2
        bg-emerald-100 
        text-emerald-700
        rounded-full
        flex items-center gap-2
        hover:bg-emerald-200
        transition-colors
      `}
    >
      {direction === 'left' && <ChevronLeft className="w-4 h-4" />}
      {children}
      {direction === 'right' && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}; 