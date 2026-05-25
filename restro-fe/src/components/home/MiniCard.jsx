const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <button className="mt-4 text-sm text-blue-500">{icon}</button>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{number}</h2>
        <h2 className="text-xs text-gray-500">`{footerNum}% than yesterday`</h2>
      </div>
    </div>
  );
};

export default MiniCard;
