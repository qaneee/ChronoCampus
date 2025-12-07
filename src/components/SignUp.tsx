import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { TermsOfService } from './TermsOfService';
import { Checkbox } from './ui/checkbox';

interface SignUpProps {
  onBack: () => void;
  onSignUpComplete: () => void;
  language: 'en' | 'hy' | 'ru';
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

export function SignUp({ onBack, onSignUpComplete, language }: SignUpProps) {
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

    //send the verification email
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

    // verify the code
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

    // create the account
    console.log('Creating account for:', email);
    onSignUpComplete();
  };

  const handleResendCode = () => {
    console.log('Resending verification code to:', email);
    // In a real app, this would resend the verification email
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#225b73] hover:underline mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>

          <h2 className="text-[#225b73] mb-6 sm:mb-8 text-center">{t.signUp}</h2>

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
              >
                {t.next}
              </Button>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 text-center">
                  {t.verificationCode}
                </p>
                <p className="text-sm text-gray-600 text-center mb-4">{t.verificationSent}</p>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  maxLength={6}
                  className="bg-input-background border-gray-300 text-center tracking-widest"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
              >
                {t.verify}
              </Button>

              <button
                type="button"
                onClick={handleResendCode}
                className="w-full text-sm text-[#225b73] hover:underline"
              >
                {t.resendCode}
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
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

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPasswordLabel}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-input-background border-gray-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
              >
                {t.next}
              </Button>
            </form>
          )}

          {step === 'terms' && (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {t.agreeToTerms}
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-sm text-[#225b73] hover:underline"
                >
                  {t.viewTerms}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button 
                onClick={handleFinalSubmit}
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
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
