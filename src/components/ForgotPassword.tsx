import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface ForgotPasswordProps {
  onBack: () => void;
  language: 'en' | 'hy' | 'ru';
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

export function ForgotPassword({ onBack, language }: ForgotPasswordProps) {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-10">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 h-12 rounded-full bg-[#225b73] flex items-center justify-center flex-shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-[#225b73] text-3xl sm:text-5xl">ChronoCampus</h1>
          </div>
          
          <p className="text-center text-gray-600 text-sm mb-6">
            {t.title}
          </p>

          {/* Email Step */}
          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder={t.emailStep}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern=".*@polytechnic\.am$"
                  className="bg-input-background border-gray-300"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
              >
                {t.sendCode}
              </Button>
            </form>
          )}

          {/* Verify Code Step */}
          {step === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 text-center">
                  {t.verifyStep}
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">{t.verifyDesc}</p>
                <div className="flex justify-center">
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

              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: '#225b73' }}
                disabled={code.length !== 6}
              >
                {t.verify}
              </Button>
            </form>
          )}

          {/* Reset Password Step */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.newPassword}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPassword}
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
                {t.resetPassword}
              </Button>
            </form>
          )}

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full mt-4 sm:mt-6 flex items-center justify-center gap-2 text-sm text-[#225b73] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}
