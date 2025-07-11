import AnimatedPage from '../../components/animated-page/animated-page';
import '../../components/animated-page/animated-page.css';
import { type Language } from './translate.controller';
import React from 'react';

interface TranslateViewProps {
  text: string;
  setText: (value: string) => void;
  targetLang: string;
  setTargetLang: (value: string) => void;
  languages: Language[];
  translatedText: string;
  isLoading: boolean;
  copied: boolean;
  handleTranslate: () => void;
  handleClearText: () => void;
  handleCopy: () => void;
  getCharacterCountColor: () => string;
}

const TranslateView: React.FC<TranslateViewProps> = ({
  text,
  setText,
  targetLang,
  setTargetLang,
  languages,
  translatedText,
  isLoading,
  copied,
  handleTranslate,
  handleClearText,
  handleCopy,
  getCharacterCountColor
}) => (
  <AnimatedPage>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full min-h-[200px] p-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate"
              maxLength={5000}
              aria-label="Text to translate"
            />
            {text && (
              <button
                onClick={handleClearText}
                className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Clear text"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className={`text-right text-sm ${getCharacterCountColor()}`}>
            {text.length} / 5000
          </div>
        </div>

        {/* Output Column */}
        <div className="relative">
          <div className="w-full min-h-[200px] p-4 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="text-gray-400">Traduzindo...</span>
              </div>
            ) : translatedText ? (
              <p className="text-gray-200 w-full">{translatedText}</p>
            ) : (
              <p className="text-gray-400">Aguardando tradução...</p>
            )}
          </div>
          {translatedText && !isLoading && (
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-all duration-300"
              aria-label="Copy translated text"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Language Selection and Translate Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="flex-1 p-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            aria-label="Select target language"
          >
            {languages.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300 flex items-center justify-center"
            disabled={isLoading}
            aria-label="Translate text"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Translate'
            )}
          </button>
        </div>
      </div>
    </div>
  </AnimatedPage>
);

export default TranslateView;
