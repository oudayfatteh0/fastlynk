export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Redirecting to your destination..." }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}; 