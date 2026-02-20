import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { authService } from '../../../services/auth.service';
import { useAppDispatch } from '../../../store';
import { setAuthenticated } from '../../../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  PageContainer,
  LeftPanel,
  RightPanel,
  IllustrationContainer,
  IllustrationWrapper,
  FormContainer,
  Title,
  Subtitle,
  EmailHighlight,
  OTPInputContainer,
  OTPInput,
  VerifyButton,
  ButtonContent,
  ButtonLoader,
  Timer,
  ResendContainer,
  ResendButton,
  BackLink,
} from './VerifyOTP.styled';

const OTP_LENGTH = 6;
const TIMER_DURATION = 60; // seconds

// Illustration component for the left panel
const TeamIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background blob */}
    <ellipse cx="200" cy="180" rx="150" ry="100" fill="#e2e8f0" />
    
    {/* Desk */}
    <rect x="60" y="200" width="280" height="8" rx="4" fill="#94a3b8" />
    <rect x="80" y="208" width="8" height="50" fill="#64748b" />
    <rect x="312" y="208" width="8" height="50" fill="#64748b" />
    
    {/* Person 1 - Left */}
    <circle cx="100" cy="150" r="25" fill="#fbbf24" />
    <rect x="85" y="175" width="30" height="40" rx="8" fill="#f97316" />
    <circle cx="100" cy="145" r="15" fill="#fed7aa" />
    <ellipse cx="100" cy="138" rx="12" ry="8" fill="#1e293b" />
    
    {/* Person 2 - Center */}
    <circle cx="200" cy="140" r="28" fill="#3b82f6" />
    <rect x="182" y="168" width="36" height="45" rx="8" fill="#1e40af" />
    <circle cx="200" cy="135" r="16" fill="#fcd9bd" />
    <ellipse cx="200" cy="128" rx="14" ry="9" fill="#1e293b" />
    <rect x="188" y="185" width="24" height="8" fill="#fcd9bd" />
    
    {/* Person 3 - Right */}
    <circle cx="300" cy="150" r="25" fill="#a855f7" />
    <rect x="285" y="175" width="30" height="40" rx="8" fill="#7c3aed" />
    <circle cx="300" cy="145" r="15" fill="#fed7aa" />
    <ellipse cx="300" cy="138" rx="12" ry="8" fill="#1e293b" />
    
    {/* Laptop center */}
    <rect x="175" y="188" width="50" height="12" rx="2" fill="#ef4444" />
    <rect x="180" y="178" width="40" height="10" rx="1" fill="#fca5a5" />
    
    {/* Floating elements */}
    <rect x="70" y="80" width="50" height="40" rx="4" fill="#60a5fa" opacity="0.8" />
    <circle cx="85" cy="95" r="8" fill="#93c5fd" />
    <rect x="78" y="108" width="30" height="3" rx="1" fill="#93c5fd" />
    
    <rect x="280" y="70" width="45" height="55" rx="4" fill="#f472b6" opacity="0.8" />
    <rect x="288" y="80" width="30" height="3" rx="1" fill="#fbcfe8" />
    <rect x="288" y="88" width="25" height="3" rx="1" fill="#fbcfe8" />
    <rect x="288" y="96" width="28" height="3" rx="1" fill="#fbcfe8" />
    
    {/* Books on desk */}
    <rect x="120" y="185" width="20" height="15" rx="2" fill="#f87171" />
    <rect x="125" y="180" width="20" height="15" rx="2" fill="#60a5fa" />
    <rect x="130" y="175" width="20" height="15" rx="2" fill="#4ade80" />
  </svg>
);

export const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle input change
  const handleChange = useCallback((index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle paste of full OTP
    if (value.length > 1) {
      const pastedValues = value.slice(0, OTP_LENGTH).split('');
      pastedValues.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the last filled input or the next empty one
      const lastIndex = Math.min(index + pastedValues.length, OTP_LENGTH - 1);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [otp]);

  // Handle key down for backspace navigation
  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [otp]);

  // Handle paste
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    
    if (pastedData.length > 0) {
      const newOtp = [...otp];
      pastedData.slice(0, OTP_LENGTH).split('').forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      
      const lastIndex = Math.min(pastedData.length - 1, OTP_LENGTH - 1);
      inputRefs.current[lastIndex]?.focus();
    }
  }, [otp]);

  // Submit OTP
  const handleSubmit = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== OTP_LENGTH) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await authService.verifyOtp({ email, otp: otpValue });
      
      if (response.token) {
        dispatch(setAuthenticated(true));
        toast.success('Email verified successfully!');
        navigate('/');
      } else {
        toast.success(response.message || 'Email verified! Please login.');
        navigate('/login');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error.response?.data?.message || 'Invalid OTP. Please try again.';
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const response = await authService.resendOtp({ email });
      if (response.message) {
        toast.success(response.message);
      } else {
        toast.error('Failed to resend OTP. Please try again.');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <PageContainer>
      <LeftPanel>
        <IllustrationContainer>
          <IllustrationWrapper>
            <TeamIllustration />
          </IllustrationWrapper>
        </IllustrationContainer>
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <Title>Verify OTP</Title>
          <Subtitle>
            Enter the OTP sent to{' '}
            {email && <EmailHighlight>{email}</EmailHighlight>}
          </Subtitle>

          <OTPInputContainer onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                  return undefined;
                }}
                type="text"
                inputMode="numeric"
                maxLength={OTP_LENGTH}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isSubmitting}
                $hasValue={!!digit}
                $hasError={!!error}
                autoFocus={index === 0}
              />
            ))}
          </OTPInputContainer>

          <VerifyButton
            onClick={handleSubmit}
            disabled={isSubmitting || !isOtpComplete}
          >
            <ButtonContent $isLoading={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'VERIFY OTP'}
            </ButtonContent>
            {isSubmitting && (
              <ButtonLoader>
                <span></span>
                <span></span>
                <span></span>
              </ButtonLoader>
            )}
          </VerifyButton>
          
          <Timer $isExpired={timeLeft <= 0}>
            {timeLeft > 0 ? `Time remaining: ${formatTime(timeLeft)}` : 'OTP expired'}
          </Timer>

          <ResendContainer>
            <span>Didn't receive the code?</span>
            <ResendButton onClick={handleResend} disabled={!canResend}>
              Resend OTP
            </ResendButton>
          </ResendContainer>

          <BackLink to="/register">
            <ArrowLeft size={16} />
            Back to registration
          </BackLink>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default VerifyOTP;

