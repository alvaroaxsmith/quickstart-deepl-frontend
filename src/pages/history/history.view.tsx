import AnimatedPage from '../../components/animated-page/animated-page';
import '../../components/animated-page/animated-page.css';
import type { Translation } from './history.controller';
import React from 'react';

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
  const [isExpanded, setIsExpanded] = React.useState(false);

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
  <div className="bg-secondary-background p-6 rounded-lg shadow-lg animate-pulse">
    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
      <div className="h-5 bg-gray-700 rounded w-20"></div>
      <div className="h-4 bg-gray-700 rounded w-16"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-700 rounded w-4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="border-t border-border-color pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-700 rounded w-20"></div>
          <div className="h-4 bg-gray-700 rounded w-4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-4/5"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  </div>
);

interface HistoryViewProps {
  history: Translation[];
  isLoading: boolean;
  error: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleCopy: (text: string, type: 'original' | 'translated') => void;
  handleDeleteItem: (id: number) => void;
  itemToDelete: number | null;
  confirmDelete: () => void;
  cancelDelete: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  isLoading,
  error,
  searchTerm,
  setSearchTerm,
  handleCopy,
  handleDeleteItem,
  itemToDelete,
  confirmDelete,
  cancelDelete
}) => (
  <AnimatedPage>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">
          Histórico de Tradução
        </h1>
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar no histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Search history"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {error && <p className="text-center text-error-text mb-4">{error}</p>}

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="bg-secondary-background p-6 rounded-lg shadow-lg">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <span className="font-bold text-primary-accent">
                  {item.sourceLang.toUpperCase()} → {item.targetLang.toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">
                    {formatDistanceToNow(item.timestamp)}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                    aria-label="Delete item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-secondary">Original</h4>
                    <button
                      onClick={() => handleCopy(item.text, 'original')}
                      className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                      aria-label="Copy original text"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <TruncatedText text={item.text} />
                </div>
                <div className="border-t border-border-color pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-text-secondary">Traduzido</h4>
                    <button
                      onClick={() => handleCopy(item.translatedText, 'translated')}
                      className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                      aria-label="Copy translated text"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <TruncatedText text={item.translatedText} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-text-secondary">
            {searchTerm ? 'Nenhum resultado encontrado para sua busca.' : 'Nenhum histórico de tradução encontrado.'}
          </p>
        )}
      </div>

      {itemToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza de que deseja excluir este item do histórico? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </AnimatedPage>
);

export default HistoryView;
