import { useState } from 'react';
import { Globe } from 'lucide-react';

type Language = 'en' | 'hy' | 'ru';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

const languageLabels = {
  en: { short: 'EN', full: 'English' },
  hy: { short: 'ՀԱՅ', full: 'Հայերեն' },
  ru: { short: 'РУ', full: 'Русский' }
};

export function LanguageSelector({ language, onLanguageChange, className }: LanguageSelectorProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <div className={`${className}`}>
      <div className="relative group">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 ease-out"
        >
          <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#225b73] dark:text-violet-400" />
        </button>

        {/* Dropdown Menu */}
        {showLanguageMenu && (
          <>
            {/* Backdrop to close menu when clicking outside */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowLanguageMenu(false)}
            />
            
            <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-1.5">
                {(Object.keys(languageLabels) as Language[]).map((lang, index) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      language === lang
                        ? 'bg-gradient-to-r from-[#225b73] to-[#2a6d87] dark:from-violet-600 dark:to-purple-600 text-white shadow-sm'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    } ${index !== 0 ? 'mt-0.5' : ''}`}
                  >
                    <span className="font-medium">{languageLabels[lang].full}</span>
                    {language === lang && (
                      <svg className="w-3.5 h-3.5 ml-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}