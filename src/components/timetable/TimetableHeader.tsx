import { GraduationCap, Shield, Users } from 'lucide-react';
import { UserRole, Language, Translations } from '../../types';
import { BurgerMenu } from '../BurgerMenu';

interface TimetableHeaderProps {
  userRole: UserRole;
  onLogout: () => void;
  translations: Translations;
  onLanguageChange: (language: Language) => void;
  language: Language;
  userName?: string;
}

export function TimetableHeader({ userRole, onLogout, translations, onLanguageChange, language, userName }: TimetableHeaderProps) {
  const getRoleIcon = () => {
    const iconClasses = "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white";
    
    switch (userRole) {
      case 'admin':
        return <Shield className={iconClasses} />;
      case 'student':
        return <GraduationCap className={iconClasses} />;
      case 'lecturer':
        return <Users className={iconClasses} />;
    }
  };

  const getDashboardTitle = () => {
    switch (userRole) {
      case 'admin':
        return translations.adminDashboard;
      case 'student':
        return translations.studentDashboard;
      case 'lecturer':
        return translations.lecturerDashboard;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#225b73] dark:bg-gradient-to-br dark:from-violet-600 dark:to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg dark:shadow-violet-900/30">
            {getRoleIcon()}
          </div>
          <div className="min-w-0">
            <h2 className="text-[#225b73] dark:text-violet-300 text-sm sm:text-base md:text-lg lg:text-xl truncate">
              {translations.universityPortal}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">
              {getDashboardTitle()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <BurgerMenu
            language={language}
            onLanguageChange={onLanguageChange}
            onLogout={onLogout}
            userName={userName}
            userRole={userRole}
            translations={translations}
          />
        </div>
      </div>
    </header>
  );
}