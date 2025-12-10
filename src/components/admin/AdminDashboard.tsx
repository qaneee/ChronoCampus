import { useState } from 'react';
import { Users, BookOpen, UsersRound, MapPin, MessageSquare, BarChart3, Calendar, ArrowLeft } from 'lucide-react';
import { BurgerMenu } from '../BurgerMenu';
import { UserManagement } from './UserManagement';
import { SubjectsManagement } from './SubjectsManagement';
import { GroupsManagement } from './GroupsManagement';
import { PlaceManagement } from './PlaceManagement';
import { FeedbackManagement } from './FeedbackManagement';
import { SemesterManagement } from './SemesterManagement';

const translations = {
  en: {
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    userManagement: 'User Management',
    subjects: 'Subjects',
    semesters: 'Semesters',
    groupsClassrooms: 'Groups & Classrooms',
    placeManagement: 'Schedule & Place Management',
    feedbackManagement: 'Feedback Management',
    logout: 'Logout',
    language: 'Language',
    welcome: 'Welcome to Admin Dashboard',
    manageUniversity: 'Manage all aspects of the university system',
    darkMode: 'Dark',
    lightMode: 'Light',
    backToDashboard: 'Back to Dashboard',
    logoutConfirmTitle: 'Confirm Logout',
    logoutConfirmMessage: 'Are you sure you want to log out?',
    cancel: 'Cancel',
    confirmLogout: 'Yes, Logout'
  },
  hy: {
    adminPanel: 'Ադմինի Վահանակ',
    dashboard: 'Վահանակ',
    userManagement: 'Օգտատերերի Կառավարում',
    subjects: 'Առարկաներ',
    semesters: 'Կիսամյակներ',
    groupsClassrooms: 'Խմբեր և Լսարաններ',
    placeManagement: 'Ժամանակացույցի և Տեղանքի Կառավարում',
    feedbackManagement: 'Մեկնաբանությունների Կառավարում',
    logout: 'Ելք',
    language: 'Լեզու',
    welcome: 'Բարի գալուստ Ադմինի Վահանակ',
    manageUniversity: 'Կառավարեք համալսարանի համակարգի բոլոր ասպեկտները',
    darkMode: 'Մութ',
    lightMode: 'Լուսավոր',
    backToDashboard: 'Վերադառնալ Վահանակ',
    logoutConfirmTitle: 'Հաստատել Ելքը',
    logoutConfirmMessage: 'Համոզվա՞ծ եք, որ ուզում եք դուրս գալ:',
    cancel: 'Չեղարկել',
    confirmLogout: 'Այո, Դուրս Գալ'
  },
  ru: {
    adminPanel: 'Панель Администратора',
    dashboard: 'Панель управления',
    userManagement: 'Управление Пользователями',
    subjects: 'Предметы',
    semesters: 'Семестры',
    groupsClassrooms: 'Группы и Аудитории',
    placeManagement: 'Управление Расписанием и Местами',
    feedbackManagement: 'Управление Отзывами',
    logout: 'Выйти',
    language: 'Язык',
    welcome: 'Добро пожаловать в Панель Администратора',
    manageUniversity: 'Управляйте всеми аспектами университетской системы',
    darkMode: 'Темная',
    lightMode: 'Светлая',
    backToDashboard: 'Назад к Панели',
    logoutConfirmTitle: 'Подтверждение Выхода',
    logoutConfirmMessage: 'Вы уверены, что хотите выйти?',
    cancel: 'Отмена',
    confirmLogout: 'Да, Выйти'
  }
};

interface AdminDashboardProps {
  onLogout: () => void;
  language: 'en' | 'hy' | 'ru';
  onLanguageChange: (language: 'en' | 'hy' | 'ru') => void;
  userName?: string;
}

type ActiveTab = 'dashboard' | 'users' | 'subjects' | 'groups' | 'place' | 'feedback';

export function AdminDashboard({ onLogout, language, onLanguageChange, userName }: AdminDashboardProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const menuItems = [
    { id: 'dashboard' as const, label: t.dashboard, icon: BarChart3 },
    { id: 'users' as const, label: t.userManagement, icon: Users },
    { id: 'subjects' as const, label: t.subjects, icon: BookOpen },
    { id: 'groups' as const, label: t.groupsClassrooms, icon: UsersRound },
    { id: 'place' as const, label: t.placeManagement, icon: MapPin },
    { id: 'feedback' as const, label: t.feedbackManagement, icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Top Header Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 lg:hidden">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#225b73] dark:bg-gradient-to-br dark:from-violet-600 dark:to-purple-700 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[#225b73] dark:text-violet-300 text-sm sm:text-base truncate">{t.adminPanel}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">ChronoCampus</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block min-w-0 flex-1">
              <h2 className="text-[#225b73] dark:text-violet-300 text-base lg:text-lg truncate">{t.adminPanel}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <BurgerMenu
                language={language}
                onLanguageChange={onLanguageChange}
                onLogout={onLogout}
                userName={userName}
                userRole="admin"
                translations={t}
              />
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl dark:text-gray-100">{t.welcome}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">{t.manageUniversity}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {menuItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-left group touch-manipulation"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#225b73]/10 dark:bg-violet-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#225b73] dark:group-hover:bg-gradient-to-br dark:group-hover:from-violet-600 dark:group-hover:to-purple-700 transition-colors">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#225b73] dark:text-violet-300 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="mb-1 sm:mb-2 text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">{item.label}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.id === 'users' && 'Manage students, teachers, and administrators'}
                        {item.id === 'subjects' && 'Add and manage subjects and assign teachers'}
                        {item.id === 'groups' && 'Manage student groups and classrooms'}
                        {item.id === 'place' && 'Create and edit class schedules and places'}
                        {item.id === 'feedback' && 'Manage user feedback and suggestions'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'users' && (
          <div>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-violet-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToDashboard}</span>
              </button>
            </div>
            <UserManagement language={language} />
          </div>
        )}
        {activeTab === 'subjects' && (
          <div>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-violet-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToDashboard}</span>
              </button>
            </div>
            <SubjectsManagement language={language} />
          </div>
        )}
        {activeTab === 'groups' && (
          <div>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-violet-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToDashboard}</span>
              </button>
            </div>
            <GroupsManagement language={language} />
          </div>
        )}
        {activeTab === 'place' && (
          <div>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-violet-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToDashboard}</span>
              </button>
            </div>
            <PlaceManagement language={language} />
          </div>
        )}
        {activeTab === 'feedback' && (
          <div>
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                variant="outline"
                className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-violet-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToDashboard}</span>
              </button>
            </div>
            <FeedbackManagement language={language} />
          </div>
        )}
      </main>
    </div>
  );
}