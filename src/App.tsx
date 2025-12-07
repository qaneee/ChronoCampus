import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { ForgotPassword } from './components/ForgotPassword';
import { SignUp } from './components/SignUp';
import { Timetable } from './components/Timetable';
import { AdminDashboard } from './components/admin/AdminDashboard';

type Page = 'login' | 'forgot-password' | 'signup' | 'timetable' | 'admin-dashboard';
type UserRole = 'student' | 'lecturer' | 'admin' | null;
type Language = 'en' | 'hy' | 'ru';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [userEmail, setUserEmail] = useState<string>('');

  // Function to determine role based on email format
  const determineRoleFromEmail = (email: string): 'student' | 'lecturer' => {
    const emailPart = email.split('@')[0]; // Get part before @
    
    // Check if email starts with letter.letter pattern (e.g., p.johnson, s.smith)
    // This indicates a teacher/lecturer
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
      // Auto-assign role based on email format
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

  const handleSignUpComplete = () => {
    setCurrentPage('timetable');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setUserRole(null);
  };

  return (
    <div className="size-full">
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
        />
      )}
      {currentPage === 'signup' && (
        <SignUp 
          onBack={handleBackToLogin}
          onSignUpComplete={handleSignUpComplete}
          language={language}
        />
      )}
      {currentPage === 'timetable' && userRole && (
        <Timetable userRole={userRole} onLogout={handleLogout} language={language} />
      )}
      {currentPage === 'admin-dashboard' && userRole === 'admin' && (
        <AdminDashboard onLogout={handleLogout} language={language} />
      )}
    </div>
  );
}