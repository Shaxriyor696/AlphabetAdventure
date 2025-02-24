export const ImageCard = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-32 h-32 overflow-hidden rounded-[20px]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xl font-bold text-gray-800">{name}</span>
    </div>
  );
}; 