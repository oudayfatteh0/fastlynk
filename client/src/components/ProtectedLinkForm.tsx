interface ProtectedLinkFormProps {
  accessPassword: string;
  setAccessPassword: (value: string) => void;
  error: string;
  onAccess: (shortId: string) => void;
}

export const ProtectedLinkForm: React.FC<ProtectedLinkFormProps> = ({
  accessPassword,
  setAccessPassword,
  error,
  onAccess
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">FastLynk - URL Shortener</h2>
      <p className="text-gray-600 text-center">This link is password protected</p>
      <div className="space-y-4">
        <input
          type="password"
          value={accessPassword}
          onChange={(e) => setAccessPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={() => onAccess(window.location.pathname.split('/')[1])}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Access Link
        </button>
      </div>
    </div>
  );
}; 