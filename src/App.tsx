import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes@0.4.6';
import { LoginPage } from './components/LoginPage';
import { ForgotPassword } from './components/ForgotPassword';
import { SignUp } from './components/SignUp';
import { Timetable } from './components/Timetable';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProvider } from './contexts/AdminContext';

type Page = 'login' | 'forgot-password' | 'signup' | 'timetable' | 'admin-dashboard';

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

  const getUserName = (email: string): string => {
    if (!email) return 'User';
    const emailPart = email.split('@')[0];
    
    // Check if it's a teacher email pattern 
    if (emailPart.includes('.')) {
      const [first, last] = emailPart.split('.');
      const firstName = first.charAt(0).toUpperCase() + first.slice(1);
      const lastName = last.charAt(0).toUpperCase() + last.slice(1);
      return `${firstName} ${lastName}`;
    }
    
    // For student emails, just capitalize
    return emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } catch (error) {
        console.error('Failed to save language to localStorage:', error);
      }
    }
  }, [language]);

  const determineRoleFromEmail = (email: string): 'student' | 'lecturer' => {
    const emailPart = email.split('@')[0];
    const teacherPattern = /^[a-zA-Z]\.[a-zA-Z]/;
    
    if (teacherPattern.test(emailPart)) {
      return 'lecturer';
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

  const handleForgotPassword = () => {
    setCurrentPage('forgot-password');
  };

  const handleSignUp = () => {
    setCurrentPage('signup');
  };

  const handleSignUpComplete = (email: string) => {
    setUserEmail(email);
    const role = determineRoleFromEmail(email);
    setUserRole(role);
    setCurrentPage('timetable');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

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
            onSignUp={handleSignUp}
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

        {currentPage === 'signup' && (
          <SignUp 
            onBack={handleBackToLogin}
            onSignUpComplete={handleSignUpComplete}
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