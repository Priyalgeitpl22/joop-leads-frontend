import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Zap, ShieldCheck, KeyRound, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { forgotPassword } from '../../../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  PageContainer,
  LeftPanel,
  RightPanel,
  BrandSection,
  LogoContainer,
  LogoIcon,
  LogoText,
  Tagline,
  IllustrationSection,
  IllustrationIcon,
  IllustrationText,
  SecurityBadge,
  HeaderRight,
  HeaderLink,
  FormContainer,
  Title,
  Subtitle,
  Form,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputIcon,
  Input,
  InputValidationIcon,
  SubmitButton,
  ButtonContent,
  ButtonLoader,
  ErrorText,
  BackToLogin,
  SuccessMessage,
  SuccessIcon,
  SuccessTitle,
  SuccessText,
  ResendLink,
} from './ForgotPassword.styled';

// Validation helper
const validateEmail = (email: string) => {
  if (!email.trim()) return { isValid: false, message: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
  return { isValid: true, message: '' };
};

export const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      const validation = validateEmail(value);
      setError(validation.message);
    }
  };

  const handleBlur = useCallback(() => {
    setTouched(true);
    const validation = validateEmail(email);
    setError(validation.message);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEmail(email);
    setError(validation.message);
    setTouched(true);

    if (!validation.isValid) return;

    setIsSubmitting(true);

    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      toast.success(result.message || 'Reset link sent successfully!');
      setIsSuccess(true);
      startResendCooldown();
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsSubmitting(true);
    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      toast.success(result.message || 'Reset link sent again!');
      startResendCooldown();
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to resend. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldValid = touched && !error && email.length > 0;
  const isButtonDisabled = isSubmitting || isLoading;

  return (
    <PageContainer>
      <LeftPanel>
        <BrandSection>
          <LogoContainer>
            <LogoIcon>
              <Zap size={28} />
            </LogoIcon>
            <LogoText>Jooper Leads</LogoText>
          </LogoContainer>
          <Tagline>Supercharge your outreach with AI-powered email automation</Tagline>
        </BrandSection>

        <IllustrationSection>
          <IllustrationIcon>
            <KeyRound />
          </IllustrationIcon>
          <IllustrationText>
            Forgot your password? No worries! We'll send you a secure link to reset it in seconds.
          </IllustrationText>
          <SecurityBadge>
            <ShieldCheck size={18} />
            <span>Secure password reset via email</span>
          </SecurityBadge>
        </IllustrationSection>
      </LeftPanel>

      <RightPanel>
        <HeaderRight>
          <span>Remember your password?</span>
          <HeaderLink to="/login">Log in</HeaderLink>
        </HeaderRight>

        <FormContainer>
          {!isSuccess ? (
            <>
              <Title>Forgot Password?</Title>
              <Subtitle>
                Enter your email address and we'll send you a link to reset your password.
              </Subtitle>

              <Form onSubmit={handleSubmit}>
                <InputGroup>
                  <InputLabel>Email Address</InputLabel>
                  <InputWrapper $hasError={!!error && touched} $isValid={isFieldValid}>
                    <InputIcon><Mail size={18} /></InputIcon>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@company.com"
                      disabled={isSubmitting}
                      autoFocus
                    />
                    {isFieldValid && (
                      <InputValidationIcon $isValid><CheckCircle size={18} /></InputValidationIcon>
                    )}
                    {error && touched && (
                      <InputValidationIcon $isValid={false}><AlertCircle size={18} /></InputValidationIcon>
                    )}
                  </InputWrapper>
                  {error && touched && <ErrorText>{error}</ErrorText>}
                </InputGroup>

                <SubmitButton type="submit" disabled={isButtonDisabled}>
                  <ButtonContent $isLoading={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </ButtonContent>
                  {isSubmitting && (
                    <ButtonLoader>
                      <span></span>
                      <span></span>
                      <span></span>
                    </ButtonLoader>
                  )}
                </SubmitButton>

                <BackToLogin>
                  <Link to="/login">
                    <ArrowLeft size={16} />
                    Back to Login
                  </Link>
                </BackToLogin>
              </Form>
            </>
          ) : (
            <SuccessMessage>
              <SuccessIcon>
                <Mail />
              </SuccessIcon>
              <SuccessTitle>Check your email</SuccessTitle>
              <SuccessText>
                We've sent a password reset link to <strong>{email}</strong>. 
                Click the link in the email to reset your password.
              </SuccessText>
              
              <ResendLink 
                onClick={handleResend} 
                disabled={resendCooldown > 0 || isSubmitting}
              >
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : "Didn't receive the email? Resend"
                }
              </ResendLink>

              <BackToLogin>
                <Link to="/login">
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </BackToLogin>
            </SuccessMessage>
          )}
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default ForgotPassword;
