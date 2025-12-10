import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { TermsOfService } from './TermsOfService';
import { Checkbox } from './ui/checkbox';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { LanguageSelector } from './LanguageSelector';
import { DarkModeToggle } from './DarkModeToggle';

interface SignUpProps {
  onBack: () => void;
  onSignUpComplete: (email: string) => void;
  language: 'en' | 'hy' | 'ru';
  onLanguageChange: (lang: 'en' | 'hy' | 'ru') => void;
}

type SignUpStep = 'email' | 'verify' | 'password' | 'terms';

const translations = {
  en: {
    signUp: 'Sign Up',
    emailLabel: 'Email Address',
    verificationCode: 'Verification Code',
    verificationSent: 'A 6-digit verification code has been sent to your email',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    next: 'Next',
    verify: 'Verify',
    createAccount: 'Create Account',
    back: 'Back',
    emailError: 'Please use a valid @polytechnic.am email address',
    verificationError: 'Please enter a valid 6-digit code',
    passwordError: 'Password must be more than 8 characters',
    passwordMismatch: 'Passwords do not match',
    agreeToTerms: 'I agree to the Terms of Service',
    mustAgreeToTerms: 'You must agree to the Terms of Service to continue',
    viewTerms: 'View Terms of Service',
    resendCode: 'Resend Code'
  },
  hy: {
    signUp: 'Գրանցվել',
    emailLabel: 'Էլեկտրոնային Հասցե',
    verificationCode: 'Ստուգիչ Կոդ',
    verificationSent: '6 նիշանոց ստուգիչ կոդը ուղարկվել է ձեր էլ. հասցեին',
    passwordLabel: 'Գաղտնաբառ',
    confirmPasswordLabel: 'Հաստատել Գաղտնաբառը',
    next: 'Հաջորդ',
    verify: 'Ստուգել',
    createAccount: 'Ստեղծել Հաշիվ',
    back: 'Հետ',
    emailError: 'Խնդրում ենք օգտագործել վավեր @polytechnic.am էլեկտրոնային հասցե',
    verificationError: 'Խնդրում ենք մուտքագրել վավեր 6 նիշանոց կոդ',
    passwordError: 'Գաղտնաբառը պետք է լինի 8 նիշից ավել',
    passwordMismatch: 'Գաղտնաբառերը չեն համընկնում',
    agreeToTerms: 'Համաձայն եմ Օգտագործման Պայմաններին',
    mustAgreeToTerms: 'Շարունակելու համար պետք է համաձայնվեք Օգտագործման Պայմաններին',
    viewTerms: 'Դիտել Օգտագործման Պայմանները',
    resendCode: 'Կրկին Ուղարկել Կոդը'
  },
  ru: {
    signUp: 'Регистрация',
    emailLabel: 'Адрес Электронной Почты',
    verificationCode: 'Код Подтверждения',
    verificationSent: '6-значный код подтверждения отправлен на вашу почту',
    passwordLabel: 'Пароль',
    confirmPasswordLabel: 'Подтвердите Пароль',
    next: 'Далее',
    verify: 'Подтвердить',
    createAccount: 'Создать Аккаунт',
    back: 'Назад',
    emailError: 'Пожалуйста, используйте действующий адрес @polytechnic.am',
    verificationError: 'Пожалуйста, введите действительный 6-значный код',
    passwordError: 'Пароль должен быть более 8 символов',
    passwordMismatch: 'Пароли не совпадают',
    agreeToTerms: 'Я согласен с Условиями Использования',
    mustAgreeToTerms: 'Вы должны согласиться с Условиями Использования, чтобы продолжить',
    viewTerms: 'Просмотреть Условия Использования',
    resendCode: 'Отправить Код Повторно'
  }
};

export function SignUp({ onBack, onSignUpComplete, language, onLanguageChange }: SignUpProps) {
  const [step, setStep] = useState<SignUpStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');

  const t = translations[language];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@polytechnic.am')) {
      setError(t.emailError);
      return;
    }

    // In a real app, this would send the verification email
    console.log('Sending verification code to:', email);
    setStep('verify');
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      setError(t.verificationError);
      return;
    }

    // In a real app, this would verify the code
    console.log('Verifying code:', verificationCode);
    setStep('password');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length <= 8) {
      setError(t.passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setStep('terms');
  };

  const handleFinalSubmit = () => {
    setError('');

    if (!agreedToTerms) {
      setError(t.mustAgreeToTerms);
      return;
    }

    // In a real app, this would create the account
    console.log('Creating account for:', email);
    onSignUpComplete(email);
  };

  const handleResendCode = () => {
    console.log('Resending verification code to:', email);
    // In a real app, this would resend the verification email
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
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 text-[#225b73] dark:text-violet-400 hover:underline mb-3 sm:mb-4 touch-manipulation py-1 text-sm sm:text-base transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {t.back}
          </button>

          <h2 className="text-[#225b73] dark:text-violet-300 mb-4 sm:mb-6 md:mb-8 text-center text-xl sm:text-2xl md:text-3xl">{t.signUp}</h2>

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">
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

              {error && (
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
              >
                {t.next}
              </Button>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifySubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
                  {t.verificationCode}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mb-3 sm:mb-4">{t.verificationSent}</p>
                <div className="flex justify-center scale-90 sm:scale-100">
                  <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
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
                disabled={verificationCode.length !== 6}
              >
                {t.verify}
              </Button>

              <button
                type="button"
                onClick={handleResendCode}
                className="w-full text-xs sm:text-sm text-[#225b73] dark:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
              >
                {t.resendCode}
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3 sm:space-y-4">
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

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPasswordLabel}
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
                {t.next}
              </Button>
            </form>
          )}

          {step === 'terms' && (
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5 sm:mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-relaxed"
                  >
                    {t.agreeToTerms}
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-xs sm:text-sm text-[#225b73] dark:text-violet-400 hover:underline touch-manipulation py-1 transition-colors"
                >
                  {t.viewTerms}
                </button>
              </div>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-800/50">{error}</p>
              )}

              <Button 
                onClick={handleFinalSubmit}
                className="w-full text-white hover:opacity-90 h-11 sm:h-12 text-sm sm:text-base touch-manipulation disabled:opacity-50 bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:hover:from-violet-500 dark:hover:to-purple-500 shadow-md dark:shadow-violet-900/30 transition-all"
                disabled={!agreedToTerms}
              >
                {t.createAccount}
              </Button>
            </div>
          )}
        </div>
      </div>

      <TermsOfService 
        open={showTerms} 
        onClose={() => setShowTerms(false)}
        language={language}
      />
    </div>
  );
}