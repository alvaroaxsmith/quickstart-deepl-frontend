import { useState, useEffect } from 'react';
import { getLanguages, translateText } from '../../api/translationService';
import { useAuth } from '../../context/AuthContext';
import { useToastContext } from '../../context/ToastContext';
import TranslateView from './translate.view';

export interface Language {
  language: string;
  name: string;
}

const TranslateController = () => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('EN-US');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguages();
        const languagesData = Array.isArray(response.data.languages) ? response.data.languages : [];
        setLanguages(languagesData.map((lang: any) => ({
          language: lang.language_code,
          name: lang.language_name
        })));
        if (languagesData.length > 0 && !targetLang) {
          setTargetLang('EN-US');
        }
      } catch (err) {
        showToast('Failed to fetch languages.', 'error');
        console.error(err);
      }
    };
    if (isAuthenticated) {
      fetchLanguages();
    }
  }, [isAuthenticated, showToast, targetLang]);

  const handleTranslate = async () => {
    if (!text.trim() || !targetLang) return;
    setIsLoading(true);
    setTranslatedText('');
    try {
      const response = await translateText(text, targetLang);
      setTranslatedText(response.data.translation);
    } catch (err) {
      showToast('Translation failed.', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearText = () => {
    setText('');
    setTranslatedText('');
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const getCharacterCountColor = () => {
    const percentage = (text.length / 5000) * 100;
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 80) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <TranslateView
      text={text}
      setText={setText}
      targetLang={targetLang}
      setTargetLang={setTargetLang}
      languages={languages}
      translatedText={translatedText}
      isLoading={isLoading}
      copied={copied}
      handleTranslate={handleTranslate}
      handleClearText={handleClearText}
      handleCopy={handleCopy}
      getCharacterCountColor={getCharacterCountColor}
    />
  );
};

export default TranslateController;
