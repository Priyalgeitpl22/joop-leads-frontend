import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, User, Mail, Lock, CheckCircle, AlertCircle, Sparkles, Building2, Briefcase } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { register } from '../../../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  PageContainer,
  LeftPanel,
  RightPanel,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  BrandSection,
  LogoContainer,
  LogoIcon,
  LogoText,
  Tagline,
  StatsGrid,
  StatItem,
  StatValue,
  StatLabel,
  FormContainer,
  HeaderRight,
  HeaderLink,
  Title,
  Subtitle,
  Form,
  InputRow,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputIcon,
  Input,
  PasswordToggle,
  SelectWrapper,
  Select,
  SelectIcon,
  RegisterButton,
  ButtonContent,
  ButtonLoader,
  ErrorText,
  InputValidationIcon,
  TermsText,
  Divider,
} from './Register.styled';

// Validation helpers
const validateFullName = (name: string) => {
  if (!name.trim()) return { isValid: false, message: 'Full name is required' };
  if (name.trim().length < 2) return { isValid: false, message: 'Name must be at least 2 characters' };
  return { isValid: true, message: '' };
};

const validateEmail = (email: string) => {
  if (!email.trim()) return { isValid: false, message: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email' };
  return { isValid: true, message: '' };
};

const validatePassword = (password: string) => {
  if (!password) return { isValid: false, message: 'Password is required' };
  if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' };
  return { isValid: true, message: '' };
};

const industries = [
  { value: '', label: 'Select your industry' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'saas', label: 'SaaS' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'E-commerce & Retail' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    industry: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if touched
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    let validation = { isValid: true, message: '' };
    
    if (name === 'fullName') validation = validateFullName(value);
    if (name === 'email') validation = validateEmail(value);
    if (name === 'password') validation = validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: validation.message }));
  };

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  }, [formData]);

  const validateForm = (): boolean => {
    const fullNameValidation = validateFullName(formData.fullName);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setErrors({
      fullName: fullNameValidation.message,
      email: emailValidation.message,
      password: passwordValidation.message,
    });

    setTouched({ fullName: true, email: true, password: true });

    return fullNameValidation.isValid && emailValidation.isValid && passwordValidation.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await dispatch(register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        orgName: formData.companyName || undefined,
        industry: formData.industry || undefined,
      })).unwrap();

      toast.success(result.message || 'Account created! Please check your email to verify.');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldValid = (field: keyof typeof touched) => 
    touched[field] && !errors[field] && formData[field].length > 0;

  const preventLeadingSpace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (e.key === ' ' && value.length === 0) {
      e.preventDefault();
    }
  };

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
          <FeatureIcon><Sparkles size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>AI-Powered Warmup</FeatureTitle>
            <FeatureDescription>
              Automatically warm up your email accounts to ensure maximum deliverability
            </FeatureDescription>
          </div>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon><Mail size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>Unlimited Sender Accounts</FeatureTitle>
            <FeatureDescription>
              Connect as many email accounts as you need, no limits
            </FeatureDescription>
          </div>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon><CheckCircle size={24} /></FeatureIcon>
          <div>
            <FeatureTitle>Smart Sequencing</FeatureTitle>
            <FeatureDescription>
              Create personalized multi-step campaigns that convert
            </FeatureDescription>
          </div>
        </FeatureCard>
      </LeftPanel>

      <RightPanel>
        <FormContainer>
          <Title>Start your free trial</Title>
          <Subtitle>No credit card required • 14 days free</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Full Name</InputLabel>
              <InputWrapper $hasError={!!errors.fullName && touched.fullName} $isValid={isFieldValid('fullName')}>
                <InputIcon><User size={18} /></InputIcon>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onKeyDown={(e) => preventLeadingSpace(e, formData.fullName)}
                  onBlur={() => handleBlur('fullName')}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {isFieldValid('fullName') && (
                  <InputValidationIcon $isValid><CheckCircle size={18} /></InputValidationIcon>
                )}
                {errors.fullName && touched.fullName && (
                  <InputValidationIcon $isValid={false}><AlertCircle size={18} /></InputValidationIcon>
                )}
              </InputWrapper>
              {errors.fullName && touched.fullName && <ErrorText>{errors.fullName}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <InputLabel>Work Email</InputLabel>
              <InputWrapper $hasError={!!errors.email && touched.email} $isValid={isFieldValid('email')}>
                <InputIcon><Mail size={18} /></InputIcon>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={(e) => preventLeadingSpace(e, formData.email)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@company.com"
                  disabled={isSubmitting}
                />
                {isFieldValid('email') && (
                  <InputValidationIcon $isValid><CheckCircle size={18} /></InputValidationIcon>
                )}
                {errors.email && touched.email && (
                  <InputValidationIcon $isValid={false}><AlertCircle size={18} /></InputValidationIcon>
                )}
              </InputWrapper>
              {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputWrapper $hasError={!!errors.password && touched.password} $isValid={isFieldValid('password')}>
                <InputIcon><Lock size={18} /></InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={(e) => preventLeadingSpace(e, formData.password)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Minimum 8 characters"
                  disabled={isSubmitting}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
            </InputGroup>

            <InputRow>
              <InputGroup>
                <InputLabel>Company Name</InputLabel>
                <InputWrapper>
                  <InputIcon><Building2 size={18} /></InputIcon>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    onKeyDown={(e) => preventLeadingSpace(e, formData.companyName)}
                    placeholder="Acme Inc."
                    disabled={isSubmitting}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <InputLabel>Industry</InputLabel>
                <SelectWrapper>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </Select>
                  <SelectIcon><Briefcase size={18} /></SelectIcon>
                </SelectWrapper>
              </InputGroup>
            </InputRow>

            {/* <InputRow>
              <InputGroup>
                <InputLabel>Company Website <span>(optional)</span></InputLabel>
                <InputWrapper>
                  <InputIcon><Globe size={18} /></InputIcon>
                  <Input
                    type="text"
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleChange}
                    placeholder="company.com"
                    disabled={isSubmitting}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <InputLabel>Referral <span>(optional)</span></InputLabel>
                <SelectWrapper>
                  <Select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {referralSources.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </Select>
                  <SelectIcon><ChevronDown size={18} /></SelectIcon>
                </SelectWrapper>
              </InputGroup>
            </InputRow> */}

            <RegisterButton type="submit" disabled={isButtonDisabled}>
              <ButtonContent $isLoading={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Get Started Free'}
              </ButtonContent>
              {isSubmitting && (
                <ButtonLoader>
                  <span></span>
                  <span></span>
                  <span></span>
                </ButtonLoader>
              )}
            </RegisterButton>

            <TermsText>
              By signing up, you agree to our{' '}
              <a href="/terms">Terms of Service</a> and{' '}
              <a href="/privacy">Privacy Policy</a>
            </TermsText>
          </Form>

          <Divider>
            <span>or</span>
          </Divider>

          <HeaderRight style={{ justifyContent: 'center', marginBottom: 0 }}>
            <span>Already have an account?</span>
            <HeaderLink to="/login">Sign in</HeaderLink>
          </HeaderRight>
        </FormContainer>
      </RightPanel>
    </PageContainer>
  );
};

export default Register;
