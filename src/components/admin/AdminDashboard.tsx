import { useState } from 'react';
import { Users, BookOpen, Calendar, Building2, BarChart3, Shield, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { UserManagement } from './UserManagement';
import { SubjectsManagement } from './SubjectsManagement';
import { GroupsManagement } from './GroupsManagement';
import { PlaceManagement } from './PlaceManagement';
import { Reports } from './Reports';

const translations = {
  en: {
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    userManagement: 'User Management',
    subjects: 'Subjects',
    groupsClassrooms: 'Groups & Classrooms',
    placeManagement: 'Schedule & Place Management',
    reports: 'Reports & Analytics',
    logout: 'Logout',
    welcome: 'Welcome to Admin Dashboard',
    manageUniversity: 'Manage all aspects of the university system'
  },
  hy: {
    adminPanel: 'Ադմինի Վահանակ',
    dashboard: 'Վահանակ',
    userManagement: 'Օգտատերերի Կառավարում',
    subjects: 'Առարկաներ',
    groupsClassrooms: 'Խմբեր և Լսարաններ',
    placeManagement: 'Ժամանակացույցի և Տեղանքի Կառավարում',
    reports: 'Հաշվետվություններ և Վերլուծություն',
    logout: 'Ելք',
    welcome: 'Բարի գալուստ Ադմինի Վահանակ',
    manageUniversity: 'Կառավարեք համալսարանի համակարգի բոլոր ասպեկտները'
  },
  ru: {
    adminPanel: 'Панель Администратора',
    dashboard: 'Панель управления',
    userManagement: 'Управление Пользователями',
    subjects: 'Предметы',
    groupsClassrooms: 'Группы и Аудитории',
    placeManagement: 'Управление Расписанием и Местами',
    reports: 'Отчеты и Аналитика',
    logout: 'Выйти',
    welcome: 'Добро пожаловать в Панель Администратора',
    manageUniversity: 'Управляйте всеми аспектами университетской системы'
  }
};

interface AdminDashboardProps {
  onLogout: () => void;
  language: 'en' | 'hy' | 'ru';
}

type ActiveTab = 'dashboard' | 'users' | 'subjects' | 'groups' | 'place' | 'reports';

export function AdminDashboard({ onLogout, language }: AdminDashboardProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as const, label: t.dashboard, icon: Shield },
    { id: 'users' as const, label: t.userManagement, icon: Users },
    { id: 'subjects' as const, label: t.subjects, icon: BookOpen },
    { id: 'groups' as const, label: t.groupsClassrooms, icon: Building2 },
    { id: 'place' as const, label: t.placeManagement, icon: Calendar },
    { id: 'reports' as const, label: t.reports, icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300`}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#225b73] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#225b73]">{t.adminPanel}</h2>
              <p className="text-xs text-gray-500">ChronoCampus</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#225b73] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header Bar with Logout */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#225b73] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-[#225b73]">{t.adminPanel}</h2>
                <p className="text-xs text-gray-500">ChronoCampus</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="flex items-center space-x-2 border-[#225b73] text-[#225b73] hover:bg-[#225b73] hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </Button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-8">
            <div className="max-w-4xl lg:ml-0 ml-0 sm:ml-0">
              <h1 className="mb-2">{t.welcome}</h1>
              <p className="text-gray-600 mb-8">{t.manageUniversity}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {menuItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow text-left group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#225b73]/10 flex items-center justify-center mb-4 group-hover:bg-[#225b73] transition-colors">
                        <Icon className="w-6 h-6 text-[#225b73] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="mb-2 text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-600">
                        {item.id === 'users' && 'Manage students, teachers, and administrators'}
                        {item.id === 'subjects' && 'Add and manage subjects and assign teachers'}
                        {item.id === 'groups' && 'Manage student groups and classrooms'}
                        {item.id === 'place' && 'Create and edit class schedules and places'}
                        {item.id === 'reports' && 'View analytics and utilization reports'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'users' && <UserManagement language={language} />}
        {activeTab === 'subjects' && <SubjectsManagement language={language} />}
        {activeTab === 'groups' && <GroupsManagement language={language} />}
        {activeTab === 'place' && <PlaceManagement language={language} />}
        {activeTab === 'reports' && <Reports language={language} />}
      </main>
    </div>
  );
}