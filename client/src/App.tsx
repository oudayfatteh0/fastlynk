import { useEffect, useState } from "react";
import axios from "axios";
import { Notification } from "./components/Notification";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ProtectedLinkForm } from "./components/ProtectedLinkForm";
import { URLShortenerForm } from "./components/URLShortenerForm";

const App: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [baseURL, setBaseUrl] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [accessPassword, setAccessPassword] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [isOneTime, setIsOneTime] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const origin = window.location.origin;
    const shortId = window.location.pathname.split('/')[1];

    setBaseUrl(origin);

    if (shortId) {
      const redirect = async () => {
        setIsRedirecting(true);
        try {
          const response = await axios.get(`https://fastlynk-server.vercel.app/${shortId}`);
          
          if (response.status === 410) {
            setIsRedirecting(false);
            showNotification("This link has already been used and is no longer available", "error");
            return;
          }

          if (response.data.isProtected) {
            setIsProtected(true);
            setIsRedirecting(false);
          } else {
            window.location.replace(response.data);
          }
        } catch (error: any) {
          console.error("Error fetching long URL:", error);
          setIsRedirecting(false);
          if (error.response?.status === 410) {
            showNotification("This link has already been used and is no longer available", "error");
          } else {
            setError("Failed to redirect to the destination URL");
          }
        }
      };
      redirect();
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAccess = async (shortId: string) => {
    try {
      const response = await axios.post(`https://fastlynk-server.vercel.app/${shortId}/access`, {
        password: accessPassword
      });
      if (response.status === 410) {
        showNotification("This link has already been used and is no longer available", "error");
        return;
      }
      window.location.replace(response.data);
    } catch (error: any) {
      if (error.response?.status === 410) {
        showNotification("This link has already been used and is no longer available", "error");
      } else {
        setError("Invalid password");
      }
    }
  };

  const handleShorten = async () => {
    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post("https://fastlynk-server.vercel.app/shorten", { 
        longUrl,
        password: usePassword ? password : undefined,
        isOneTime
      });
      setShortUrl(`${baseURL}/${response.data.shortId}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      showNotification("Copied to clipboard!", "success");
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Notification 
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />

      {isRedirecting ? (
        <LoadingSpinner />
      ) : isProtected ? (
        <ProtectedLinkForm
          accessPassword={accessPassword}
          setAccessPassword={setAccessPassword}
          error={error}
          onAccess={handleAccess}
        />
      ) : (
        <URLShortenerForm
          longUrl={longUrl}
          setLongUrl={setLongUrl}
          usePassword={usePassword}
          setUsePassword={setUsePassword}
          password={password}
          setPassword={setPassword}
          isOneTime={isOneTime}
          setIsOneTime={setIsOneTime}
          shortUrl={shortUrl}
          error={error}
          isLoading={isLoading}
          onShorten={handleShorten}
          onCopy={copyToClipboard}
        />
      )}
    </div>
  );
};

export default App;

