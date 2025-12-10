import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { LanguageSelector } from './LanguageSelector';
import { DarkModeToggle } from './DarkModeToggle';

interface ForgotPasswordProps {
  onBack: () => void;
  language: 'en' | 'hy' | 'ru';
  onLanguageChange: (lang: 'en' | 'hy' | 'ru') => void;
}

type Step = 'email' | 'verify' | 'reset';

const translations = {
  en: {
    title: 'Reset Password',
    emailStep: 'Enter your email address',
    emailPlaceholder: '',
    sendCode: 'Send Verification Code',
    verifyStep: 'Enter 6-digit code',
    verifyDesc: 'We sent a verification code to your email',
    verify: 'Verify Code',
    resetStep: 'Set New Password',
    newPassword: 'New Password',
    confirmPassword: 'Repeat Password',
    resetPassword: 'Reset Password',
    back: 'Back to Login',
    passwordMismatch: 'Passwords do not match',
    success: 'Password reset successful!'
  },
  hy: {
    title: 'Վերականգնել Գաղտնաբառը',
    emailStep: 'Մուտքագրեք ձեր էլ․ հասցեն',
    emailPlaceholder: '',
    sendCode: 'Ուղարկել Ստուգման Կոդը',
    verifyStep: 'Մուտքագրեք 6-նիշ կոդը',
    verifyDesc: 'Մենք ուղարկել ենք ստուգման կոդ ձեր էլ․ հասցեին',
    verify: 'Ստուգել Կոդը',
    resetStep: 'Սահմանել Նոր Գաղտնաբառ',
    newPassword: 'Նոր Գաղտնաբառ',
    confirmPassword: 'Կրկնել Գաղտնաբառը',
    resetPassword: 'Վերականգնել Գաղտնաբառը',
    back: 'Վերադառնալ Մուտքի Էջ',
    passwordMismatch: 'Գաղտնաբառերը չեն համընկնում',
    success: 'Գաղտնաբառը հաջողությամբ վերականգնվել է!'
  },
  ru: {
    title: 'Сброс Пароля',
    emailStep: 'Введите ваш email адрес',
    emailPlaceholder: '',
    sendCode: 'Отправить Код Подтверждения',
    verifyStep: 'Введите 6-значный код',
    verifyDesc: 'Мы отправили код подтверждения на вашу почту',
    verify: 'Проверить Код',
    resetStep: 'Установить Новый Пароль',
    newPassword: 'Новый Пароль',
    confirmPassword: 'Повторите Пароль',
    resetPassword: 'Сбросить Пароль',
    back: 'Вернуться к Входу',
    passwordMismatch: 'Пароли не совпадают',
    success: 'Пароль успешно сброшен!'
  }
};

export function ForgotPassword({ onBack, language, onLanguageChange }: ForgotPasswordProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const t = translations[language];

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate @polytechnic.am email
    if (!email.endsWith('@polytechnic.am')) {
      setError(language === 'en' ? 'Email must end with @polytechnic.am' : 
               language === 'hy' ? 'Էլ․ հասցեն պետք է ավարտվի @polytechnic.am-ով' :
               'Email должен заканчиваться на @polytechnic.am');
      return;
    }
    
    // Simulate sending code
    setStep('verify');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (code.length === 6) {
      setStep('reset');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (newPassword.length <= 8) {
      setError(language === 'en' ? 'Password must be more than 8 characters' : 
               language === 'hy' ? 'Գաղտնաբառը պետք է լինի 8 նիշից ավել' :
               'Пароль должен быть более 8 символов');
      return;
    }

    // Success - go back to login
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2">
        <DarkModeToggle />
        <LanguageSelector language={language} onLanguageChange={onLanguageChange} className="!relative !top-0 !right-0" />
      </div>
      
      <div className="w-full max-w-md px-2 sm:px-0">
        <div className="bg-white dark:bg-gray-800/90 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border border-gray-100 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#225b73] dark:bg-gradient-to-br dark:from-violet-600 dark:to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg dark:shadow-violet-900/50">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h1 className="text-[#225b73] dark:text-violet-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">ChronoCampus</h1>
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
            {t.title}
          </p>

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-3 sm:space-y-4">
              <div>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder={t.emailStep}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input-background dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 h-11 sm:h-12 text-sm sm:text-base dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
                />
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
              >
                {t.sendCode}
              </Button>
            </form>
          )}

          {/* Verify Code Step */}
          {step === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
                  {t.verifyStep}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3 sm:mb-4">{t.verifyDesc}</p>
                <div className="flex justify-center scale-90 sm:scale-100">
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
                disabled={code.length !== 6}
              >
                {t.verify}
              </Button>
            </form>
          )}

          {/* Reset Password Step */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.newPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-input-background dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 pr-10 h-11 sm:h-12 text-sm sm:text-base dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-violet-400 touch-manipulation transition-colors"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
              >
                {t.resetPassword}
              </Button>
            </form>
          )}

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full mt-3 sm:mt-4 md:mt-6 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#225b73] dark:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}