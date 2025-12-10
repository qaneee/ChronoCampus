import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock, Eye, EyeOff, Shield, Moon, Sun } from 'lucide-react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { LanguageSelector } from './LanguageSelector';
import { useTheme } from 'next-themes@0.4.6';

interface LoginPageProps {
  onLogin: (isAdmin: boolean, email: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

type Language = 'en' | 'hy' | 'ru';

const translations = {
  en: {
    title: 'ChronoCampus',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    forgotPassword: 'Forgot password?',
    login: 'Log in',
    or: 'or',
    loginAsAdmin: 'Login as Administrator',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    emailError: 'Please use a valid @polytechnic.am email address',
    passwordError: 'Password must be more than 8 characters',
    noAccount: "Do not have an account yet?",
    signUp: "Sign up"
  },
  hy: {
    title: 'ChronoCampus',
    emailLabel: 'Էլեկտրոնային Հասցե',
    passwordLabel: 'Գաղտնաբառ',
    forgotPassword: 'Մոռացե՞լ եք գաղտնաբառը',
    login: 'Մուտք',
    or: 'կամ',
    loginAsAdmin: 'Մուտք որպես Ադմինիստրատոր',
    privacyPolicy: 'Գաղտնիության Քաղաքականություն',
    termsOfService: 'Օգտագործման Պայմաններ',
    emailError: 'Խնդրում ենք օգտագործել վավեր @polytechnic.am էլեկտրոնային հասցե',
    passwordError: 'Գաղտնաբառը պետք է լինի 8 նիշից ավել',
    noAccount: "Դեռ չունե՞ք հաշիվ",
    signUp: "Գրանցվել"
  },
  ru: {
    title: 'ChronoCampus',
    emailLabel: 'Адрес Электронной Почты',
    passwordLabel: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    login: 'Войти',
    or: 'или',
    loginAsAdmin: 'Войти как Администратор',
    privacyPolicy: 'Политика Конфиденциальности',
    termsOfService: 'Условия Использования',
    emailError: 'Пожалуйста, используйте действующий адрес @polytechnic.am',
    passwordError: 'Пароль должен быть более 8 символов',
    noAccount: 'Еще нет аккаунта?',
    signUp: 'Зарегистрироваться'
  }
};

export function LoginPage({ onLogin, onForgotPassword, onSignUp, language, onLanguageChange }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent, isAdmin: boolean = false) => {
    e.preventDefault();
    setError('');

    // Validate email domain
    if (!email.endsWith('@polytechnic.am')) {
      setError(t.emailError);
      return;
    }

    // Validate password length
    if (password.length <= 8) {
      setError(t.passwordError);
      return;
    }

    if (email && password) {
      onLogin(isAdmin, email);
    }
  };

  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="outline"
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#225b73] dark:text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#225b73]" />}
        </Button>
        {/* Language Selector */}
        <LanguageSelector language={language} onLanguageChange={onLanguageChange} className="!relative !top-0 !right-0" />
      </div>

      <div className="w-full max-w-md px-2 sm:px-0">
        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800/90 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border border-gray-100 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#225b73] dark:bg-gradient-to-br dark:from-violet-600 dark:to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg dark:shadow-violet-900/50">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h1 className="text-[#225b73] dark:text-violet-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t.title}</h1>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-3 sm:space-y-4">
            <div>
              <Input
                id="email"
                type="email"
                placeholder={t.emailLabel}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 h-11 sm:h-12 text-sm sm:text-base dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
              />
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t.passwordLabel}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input-background dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 pr-10 h-11 sm:h-12 text-sm sm:text-base dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-violet-400 touch-manipulation transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
            )}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs sm:text-sm text-[#225b73] dark:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
              >
                {t.forgotPassword}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
            >
              {t.login}
            </Button>

            {/* OR Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800/90 px-2 text-gray-500 dark:text-gray-400">{t.or}</span>
              </div>
            </div>

            {/* Admin Login Button */}
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e, true);
              }}
              variant="outline"
              className="w-full border-[#225b73] dark:border-violet-500/50 text-[#225b73] dark:text-violet-400 hover:bg-[#225b73] dark:hover:bg-violet-600 hover:text-white dark:hover:border-violet-600 h-11 sm:h-12 text-sm sm:text-base touch-manipulation transition-all dark:bg-gray-900/30"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span className="truncate">{t.loginAsAdmin}</span>
            </Button>

            {/* Sign Up Link */}
            <div className="mt-3 sm:mt-4 mb-2 sm:mb-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {t.noAccount}{' '}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="text-[#225b73] dark:text-violet-400 hover:underline touch-manipulation font-medium"
                >
                  {t.signUp}
                </button>
              </p>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-center">
              <button 
                type="button"
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-[#225b73] dark:hover:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
              >
                {t.privacyPolicy}
              </button>
              <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
              <button 
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-[#225b73] dark:hover:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
              >
                {t.termsOfService}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Dialog */}
      <PrivacyPolicy 
        open={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)}
        language={language}
      />

      {/* Terms of Service Dialog */}
      <TermsOfService 
        open={showTerms} 
        onClose={() => setShowTerms(false)}
        language={language}
      />
    </div>
  );
}