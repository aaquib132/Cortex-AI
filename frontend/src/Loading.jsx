const Loading = () => {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
      <span className="ml-2 text-sm">Thinking...</span>
    </div>
  );
};

export default Loading;
