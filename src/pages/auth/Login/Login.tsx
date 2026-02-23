import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, Mail, Lock, AlertCircle, CheckCircle, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { login } from '../../../store/slices/authSlice';
import { fetchCurrentUser } from '../../../store/slices/userSlice';
import {
  PageContainer,
  LeftPanel,
  RightPanel,
  BrandSection,
  LogoContainer,
  LogoIcon,
  LogoText,
  Tagline,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  FormContainer,
  HeaderRight,
  HeaderLink,
  Title,
  Subtitle,
  Form,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputIcon,
  Input,
  PasswordToggle,
  ForgotPasswordRow,
  ForgotPasswordLink,
  LoginButton,
  ButtonContent,
  ButtonLoader,
  ErrorText,
  InputValidationIcon,
  FormError,
  Divider,
} from './Login.styled';

// Validation helpers
const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  return { isValid: true, message: '' };
};

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password.trim()) {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  return { isValid: true, message: '' };
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  
  // Form submission state
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input blur for validation
  const handleBlur = useCallback((field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      const validation = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: validation.message }));
    } else {
      const validation = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: validation.message }));
    }
  }, [email, password]);

  const preventLeadingSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (e.key === ' ' && value.length === 0) {
      e.preventDefault();
    }
  };

  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setFormError('');
    
    if (touched.email) {
      const validation = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: validation.message }));
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setFormError('');
    
    if (touched.password) {
      const validation = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: validation.message }));
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setErrors({
      email: emailValidation.message,
      password: passwordValidation.message,
    });

    setTouched({ email: true, password: true });

    return emailValidation.isValid && passwordValidation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await dispatch(login({ email: email.toLowerCase(), password })).unwrap();
      
      if (result.code === 200) {
        await dispatch(fetchCurrentUser()).unwrap();
        navigate('/');
      } else {
        setFormError(result.message || 'Login failed. Please try again.');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const message =
        err?.response?.data?.message ?? err?.message ?? 'Login failed. Please check your credentials.';
      setFormError(typeof message === 'string' ? message : 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit(e);
    }
  };

  // Check if field is valid (for showing success icon)
  const isEmailValid = touched.email && !errors.email && email.length > 0;
  const isPasswordValid = touched.password && !errors.password && password.length > 0;

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
          <Tagline>Welcome back! Sign in to continue your email automation journey.</Tagline>
        </BrandSection>

        <StatsGrid>
          <StatItem>
            <StatValue>10M+</StatValue>
            <StatLabel>Emails Sent</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>98%</StatValue>
            <StatLabel>Deliverability</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>5x</StatValue>
            <StatLabel>More Replies</StatLabel>
          </StatItem>
        </StatsGrid>

        <FeatureCard>
          <FeatureIcon><TrendingUp size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>Track Performance</FeatureTitle>
            <FeatureDescription>
              Real-time analytics to measure opens, clicks, and conversions
            </FeatureDescription>
          </div>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon><Sparkles size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>AI-Powered Writing</FeatureTitle>
            <FeatureDescription>
              Let AI help you craft compelling email copy that converts
            </FeatureDescription>
          </div>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon><Shield size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>Enterprise Security</FeatureTitle>
            <FeatureDescription>
              Your data is protected with bank-level encryption
            </FeatureDescription>
          </div>
        </FeatureCard>
      </LeftPanel>

      <RightPanel>
        {/* <HeaderRight>
          <span>New to Jooper Leads?</span>
          <HeaderLink to="/register">Sign up</HeaderLink>
        </HeaderRight> */}

        <FormContainer>
          <Title>Sign in to your account</Title>
          <Subtitle>Enter your credentials to continue</Subtitle>

          {/* Form-level error */}
          {formError && (
            <FormError>
              <AlertCircle size={18} />
              <span>{formError}</span>
            </FormError>
          )}

          <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
            {/* Email Input */}
            <InputGroup>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <InputWrapper $hasError={!!errors.email && touched.email} $isValid={isEmailValid}>
                <InputIcon>
                  <Mail size={18} />
                </InputIcon>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={(e) => preventLeadingSpace(e, email)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {isEmailValid && (
                  <InputValidationIcon $isValid>
                    <CheckCircle size={18} />
                  </InputValidationIcon>
                )}
                {errors.email && touched.email && (
                  <InputValidationIcon $isValid={false}>
                    <AlertCircle size={18} />
                  </InputValidationIcon>
                )}
              </InputWrapper>
              {errors.email && touched.email && (
                <ErrorText id="email-error">{errors.email}</ErrorText>
              )}
            </InputGroup>

            {/* Forgot Password Link */}
            <ForgotPasswordRow>
              <ForgotPasswordLink to="/forgot-password">
                Forgot Password?
              </ForgotPasswordLink>
            </ForgotPasswordRow>

            {/* Password Input */}
            <InputGroup>
              <InputLabel htmlFor="password">Password</InputLabel>
              <InputWrapper $hasError={!!errors.password && touched.password} $isValid={isPasswordValid}>
                <InputIcon>
                  <Lock size={18} />
                </InputIcon>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={(e) => preventLeadingSpace(e, password)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && touched.password && (
                <ErrorText id="password-error">{errors.password}</ErrorText>
              )}
            </InputGroup>

            {/* Submit Button */}
            <LoginButton type="submit" disabled={isButtonDisabled}>
              <ButtonContent $isLoading={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </ButtonContent>
              {isSubmitting && (
                <ButtonLoader>
                  <span></span>
                  <span></span>
                  <span></span>
                </ButtonLoader>
              )}
            </LoginButton>
          </Form>

          <Divider>
            <span>or</span>
          </Divider>

          <HeaderRight style={{ justifyContent: 'center', marginBottom: 0 }}>
            <span>Don't have an account?</span>
            <HeaderLink to="/register">Sign up</HeaderLink>
          </HeaderRight>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default Login;
