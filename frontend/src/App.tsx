import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes@0.4.6';
import { LoginPage } from './components/LoginPage';
import { ForgotPassword } from './components/ForgotPassword';
import { Timetable } from './components/Timetable';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProvider } from './contexts/AdminContext';

type Page = 'login' | 'forgot-password' | 'timetable' | 'admin-dashboard';
type UserRole = 'student' | 'lecturer' | 'admin' | null;
type Language = 'en' | 'hy' | 'ru';

const LANGUAGE_STORAGE_KEY = 'chronocampus_language';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && ['en', 'hy', 'ru'].includes(savedLanguage)) {
          return savedLanguage as Language;
        }
      } catch (error) {
        console.error('Failed to load language from localStorage:', error);
      }
    }
    return 'en';
  });
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Set document charset to UTF-8
    let metaCharset = document.querySelector('meta[charset]');
    if (!metaCharset) {
      metaCharset = document.createElement('meta');
      metaCharset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(metaCharset, document.head.firstChild);
    } else {
      metaCharset.setAttribute('charset', 'UTF-8');
    }

    // Set viewport meta tag for mobile support
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(metaViewport);
    }

    // Set language attribute on html element
    document.documentElement.lang = language === 'hy' ? 'hy' : language === 'ru' ? 'ru' : 'en';
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch (error) {
        console.error('Failed to save language to localStorage:', error);
      }
    }
  }, [language]);

  const getUserName = (email: string): string => {
    if (!email) return 'User';
    const emailPart = email.split('@')[0];
    
    if (emailPart.includes('admin')) {
      return 'Administrator';
    }
    
    // Teacher email pattern (namefirstletter.surname)
    if (/^[a-z]\.[a-z]+$/i.test(emailPart)) {
      const [firstLetter, surname] = emailPart.split('.');
      const firstName = firstLetter.toUpperCase();
      const lastName = surname.charAt(0).toUpperCase() + surname.slice(1);
      return `Prof. ${firstName}. ${lastName}`;
    }
    
    // Student email pattern (namesurname.tt319)
    if (/\.\w+\d{3}$/i.test(emailPart)) {
      const namePart = emailPart.split('.')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    
    return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
  };

  const determineRoleFromEmail = (email: string): 'student' | 'lecturer' => {
    const emailPart = email.split('@')[0];
    
    // Teacher pattern: single letter followed by dot and surname
    if (/^[a-z]\.[a-z]+$/i.test(emailPart)) {
      return 'lecturer';
    }
    
    // Student pattern: has group number at the end
    if (/\.\w+\d{3}$/i.test(emailPart)) {
      return 'student';
    }
    
    return 'student';
  };

  const handleLogin = (isAdmin: boolean, email: string) => {
    setUserEmail(email);
    
    if (isAdmin) {
      setUserRole('admin');
      setCurrentPage('admin-dashboard');
    } else {
      const role = determineRoleFromEmail(email);
      setUserRole(role);
      setCurrentPage('timetable');
    }
  };

  const handleForgotPassword = () => setCurrentPage('forgot-password');
  const handleBackToLogin = () => setCurrentPage('login');
  const handleLogout = () => {
    setCurrentPage('login');
    setUserRole(null);
    setUserEmail('');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen w-full">
        {currentPage === 'login' && (
          <LoginPage 
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}

        {currentPage === 'forgot-password' && (
          <ForgotPassword 
            onBack={handleBackToLogin}
            language={language}
            onLanguageChange={setLanguage}
          />
        )}

        {currentPage === 'timetable' && userRole && (
          <Timetable 
            userRole={userRole} 
            onLogout={handleLogout} 
            language={language}
            onLanguageChange={setLanguage}
            userName={getUserName(userEmail)}
          />
        )}

        {currentPage === 'admin-dashboard' && userRole === 'admin' && (
          <AdminProvider>
            <AdminDashboard 
              onLogout={handleLogout} 
              language={language}
              onLanguageChange={setLanguage}
              userName="Administrator"
            />
          </AdminProvider>
        )}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}