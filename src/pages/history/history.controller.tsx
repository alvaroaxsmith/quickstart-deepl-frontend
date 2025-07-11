import { useState, useEffect } from 'react';
import { getHistory } from '../../api/translationService';
import { useAuth } from '../../context/auth-context';
import { useToastContext } from '../../context/toast-context';
import HistoryView from './history.view';

export interface Translation {
  id: number;
  text: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: string;
}

const HistoryController = () => {
  const [history, setHistory] = useState<Translation[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<Translation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getHistory();
        const historyData = response.data.history.map((item: any) => ({
          id: item.id,
          text: item.original_text,
          translatedText: item.translated_text,
          sourceLang: item.source_language,
          targetLang: item.target_language,
          timestamp: item.timestamp
        }));
        setHistory(historyData);
        setFilteredHistory(historyData);
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

  useEffect(() => {
    if (searchTerm) {
      const filtered = history.filter(item =>
        item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translatedText.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(history);
    }
  }, [searchTerm, history]);

  const handleCopy = (text: string, type: 'original' | 'translated') => {
    navigator.clipboard.writeText(text);
    showToast(`${type === 'original' ? 'Original' : 'Translated'} text copied to clipboard!`, 'success');
  };

  const handleDeleteItem = (id: number) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedHistory = history.filter(item => item.id !== itemToDelete);
      setHistory(updatedHistory);
      setFilteredHistory(updatedHistory);
      showToast('Item deleted successfully!', 'success');
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  return (
    <HistoryView
      history={filteredHistory}
      isLoading={isLoading}
      error={error}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleCopy={handleCopy}
      handleDeleteItem={handleDeleteItem}
      itemToDelete={itemToDelete}
      confirmDelete={confirmDelete}
      cancelDelete={cancelDelete}
    />
  );
};

export default HistoryController;
