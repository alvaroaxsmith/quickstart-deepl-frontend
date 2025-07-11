import { useState, useEffect } from 'react';
import { getHistory } from '../api/translationService';
import { useAuth } from '../context/AuthContext';

interface Translation {
  id: number;
  text: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: string;
}

const formatDistanceToNow = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `há ${Math.floor(interval)} anos`;
  interval = seconds / 2592000;
  if (interval > 1) return `há ${Math.floor(interval)} meses`;
  interval = seconds / 86400;
  if (interval > 1) return `há ${Math.floor(interval)} dias`;
  interval = seconds / 3600;
  if (interval > 1) return `há ${Math.floor(interval)} horas`;
  interval = seconds / 60;
  if (interval > 1) return `há ${Math.floor(interval)} minutos`;
  return "agora mesmo";
};

const TruncatedText = ({ text, limit = 100 }: { text: string; limit?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= limit) {
    return <p className="text-text-primary">{text}</p>;
  }

  return (
    <div>
      <p className="text-text-primary">
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </p>
      <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-primary-accent hover:underline mt-1">
        {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
      </button>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-secondary-background p-4 rounded-lg shadow-lg animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

const History = () => {
  const [history, setHistory] = useState<Translation[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getHistory();
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch history.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchHistory();
    }
  }, [isAuthenticated]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-text-primary mb-8">Histórico de Tradução</h2>
      {error && <p className="text-center text-error-text">{error}</p>}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="bg-secondary-background p-6 rounded-lg shadow-lg">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <span className="font-bold text-primary-accent">{item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}</span>
                <span className="text-sm text-text-secondary">{formatDistanceToNow(item.timestamp)}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-4">
                <div>
                  <h4 className="font-semibold text-text-secondary mb-2">Original</h4>
                  <TruncatedText text={item.text} />
                </div>
                <div className="border-t border-border-color pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                  <h4 className="font-semibold text-text-secondary mb-2">Traduzido</h4>
                  <TruncatedText text={item.translatedText} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-text-secondary">Nenhum histórico de tradução encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default History;
