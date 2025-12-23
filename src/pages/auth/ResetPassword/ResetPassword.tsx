import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, Zap, ShieldCheck, KeyRound, CheckCircle, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetPassword } from '../../../store/slices/authSlice';
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
  PasswordToggle,
  SubmitButton,
  ButtonContent,
  ButtonLoader,
  ErrorText,
  BackToLogin,
  PasswordRequirements,
} from './ResetPassword.styled';

// Password validation helper
const validatePassword = (password: string) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isValid = Object.values(requirements).every(Boolean);
  
  return {
    isValid,
    requirements,
    message: isValid ? '' : 'Password does not meet all requirements',
  };
};

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const searchToken = searchParams.get('token');

    if (searchToken) {
      setToken(searchToken);
    } else {
      toast.error('Invalid reset link. Please request a new one.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (touched.password) {
      const validation = validatePassword(value);
      setErrors(prev => ({ ...prev, password: validation.message }));
    }

    // Also validate confirm password if it's been touched
    if (touched.confirmPassword && confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== confirmPassword ? 'Passwords do not match' : '',
      }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (touched.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== password ? 'Passwords do not match' : '',
      }));
    }
  };

  const handlePasswordBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, password: true }));
    const validation = validatePassword(password);
    setErrors(prev => ({ ...prev, password: validation.message }));
  }, [password]);

  const handleConfirmPasswordBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, confirmPassword: true }));
    setErrors(prev => ({
      ...prev,
      confirmPassword: confirmPassword !== password ? 'Passwords do not match' : '',
    }));
  }, [confirmPassword, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const passwordValidation = validatePassword(password);
    const confirmMatch = password === confirmPassword;

    setTouched({ password: true, confirmPassword: true });
    setErrors({
      password: passwordValidation.message,
      confirmPassword: confirmMatch ? '' : 'Passwords do not match',
    });

    if (!passwordValidation.isValid || !confirmMatch || !token) {
      return;
    }

    setIsSubmitting(true);
    const email = searchParams.get('email') || '';
    if (!email) {
      toast.error('Email is required');
      return;
    }
    try {
      const result = await dispatch(resetPassword({ token, password, email })).unwrap();
      toast.success(result.message || 'Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = touched.password && passwordValidation.isValid;
  const isConfirmValid = touched.confirmPassword && !errors.confirmPassword && confirmPassword.length > 0;
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
            Create a strong password to keep your account secure.
          </IllustrationText>
          <SecurityBadge>
            <ShieldCheck size={18} />
            <span>Your password is encrypted and secure</span>
          </SecurityBadge>
        </IllustrationSection>
      </LeftPanel>

      <RightPanel>
        <HeaderRight>
          <span>Remember your password?</span>
          <HeaderLink to="/login">Log in</HeaderLink>
        </HeaderRight>

        <FormContainer>
          <Title>Reset Password</Title>
          <Subtitle>
            Your identity has been verified. Set your new password below.
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>New Password</InputLabel>
              <InputWrapper $hasError={!!errors.password && touched.password} $isValid={isPasswordValid}>
                <InputIcon><Lock size={18} /></InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter your new password"
                  disabled={isSubmitting}
                  autoFocus
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
                {isPasswordValid && (
                  <InputValidationIcon $isValid><CheckCircle size={18} /></InputValidationIcon>
                )}
                {errors.password && touched.password && (
                  <InputValidationIcon $isValid={false}><AlertCircle size={18} /></InputValidationIcon>
                )}
              </InputWrapper>
              {touched.password && (
                <PasswordRequirements>
                  <li className={passwordValidation.requirements.minLength ? 'valid' : 'invalid'}>
                    At least 8 characters
                  </li>
                  <li className={passwordValidation.requirements.hasUppercase ? 'valid' : 'invalid'}>
                    One uppercase letter
                  </li>
                  <li className={passwordValidation.requirements.hasLowercase ? 'valid' : 'invalid'}>
                    One lowercase letter
                  </li>
                  <li className={passwordValidation.requirements.hasNumber ? 'valid' : 'invalid'}>
                    One number
                  </li>
                  <li className={passwordValidation.requirements.hasSpecial ? 'valid' : 'invalid'}>
                    One special character
                  </li>
                </PasswordRequirements>
              )}
            </InputGroup>

            <InputGroup>
              <InputLabel>Confirm Password</InputLabel>
              <InputWrapper $hasError={!!errors.confirmPassword && touched.confirmPassword} $isValid={isConfirmValid}>
                <InputIcon><Lock size={18} /></InputIcon>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="Confirm your new password"
                  disabled={isSubmitting}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
                {isConfirmValid && (
                  <InputValidationIcon $isValid><CheckCircle size={18} /></InputValidationIcon>
                )}
                {errors.confirmPassword && touched.confirmPassword && (
                  <InputValidationIcon $isValid={false}><AlertCircle size={18} /></InputValidationIcon>
                )}
              </InputWrapper>
              {errors.confirmPassword && touched.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}
            </InputGroup>

            <SubmitButton type="submit" disabled={isButtonDisabled}>
              <ButtonContent $isLoading={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
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
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default ResetPassword;

