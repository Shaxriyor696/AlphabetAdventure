export const ActionButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        bg-emerald-500
        text-white font-medium
        rounded-full
        hover:bg-emerald-600
        transition-colors
        flex items-center gap-2
      `}
    >
      {children}
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}; 