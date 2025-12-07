import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock, Globe, Eye, EyeOff, Shield } from 'lucide-react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
    noAccount: "Еще нет аккаунта?",
    signUp: "Зарегистрироваться"
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <Select value={language} onValueChange={(value) => onLanguageChange(value as Language)}>
            <SelectTrigger className="w-40 bg-white border-gray-300">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hy">Հայերեն</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 rounded-full bg-[#225b73] flex items-center justify-center flex-shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-[#225b73] text-3xl sm:text-5xl">{t.title}</h1>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div>
              <Input
                id="email"
                type="email"
                placeholder={t.emailLabel}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background border-gray-300"
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
                className="bg-input-background border-gray-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#225b73] hover:underline"
              >
                {t.forgotPassword}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full text-white hover:opacity-90"
              style={{ backgroundColor: '#225b73' }}
            >
              {t.login}
            </Button>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t.or}</span>
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
              className="w-full border-[#225b73] text-[#225b73] hover:bg-[#225b73] hover:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              {t.loginAsAdmin}
            </Button>

            {/* Sign Up Link */}
            <div className="mt-4 mb-4 text-center">
              <p className="text-sm text-gray-600">
                {t.noAccount}{' '}
                <button
                  type="button"
                  onClick={onSignUp}
                  className="text-[#225b73] hover:underline"
                >
                  {t.signUp}
                </button>
              </p>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm text-center">
              <button 
                type="button"
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-gray-600 hover:text-[#225b73] hover:underline"
              >
                {t.privacyPolicy}
              </button>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <button 
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-gray-600 hover:text-[#225b73] hover:underline"
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