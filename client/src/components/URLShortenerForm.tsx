import { QRCodeSVG } from 'qrcode.react';

interface URLShortenerFormProps {
  longUrl: string;
  setLongUrl: (value: string) => void;
  usePassword: boolean;
  setUsePassword: (value: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  isOneTime: boolean;
  setIsOneTime: (value: boolean) => void;
  shortUrl: string;
  error: string;
  isLoading: boolean;
  onShorten: () => void;
  onCopy: () => void;
}

export const URLShortenerForm: React.FC<URLShortenerFormProps> = ({
  longUrl,
  setLongUrl,
  usePassword,
  setUsePassword,
  password,
  setPassword,
  isOneTime,
  setIsOneTime,
  shortUrl,
  error,
  isLoading,
  onShorten,
  onCopy
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FastLynk - URL Shortener</h1>
        <p className="text-gray-600">Shorten your links and generate QR codes instantly</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="relative">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL"
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={onShorten}
              disabled={isLoading}
              className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Shorten'
              )}
            </button>
          </div>
          
          <div className="mt-4 space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={usePassword}
                onChange={(e) => setUsePassword(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">Password protect this link</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isOneTime}
                onChange={(e) => setIsOneTime(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">One-time use only</span>
            </label>
            
            {usePassword && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password for protection"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {shortUrl && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <p className="text-sm font-medium text-gray-600">Shortened URL:</p>
              <div className="flex items-center gap-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 break-all flex-1"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={onCopy}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">QR Code:</p>
              <QRCodeSVG
                value={shortUrl}
                size={200}
                level="H"
                marginSize={4}
                className="p-2 bg-white rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 