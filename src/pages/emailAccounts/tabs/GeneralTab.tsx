import React, { useState, useEffect, useMemo } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { emailAccountService } from '../../../services/email.account.service';
import {
  GeneralContainer,
  FormSection,
  SectionTitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  ErrorText,
  RadioGroupWrapper,
  RadioLabel,
  RadioInput,
  CheckboxWrapper,
  CheckboxInput,
  ButtonRow,
  Button,
  SuccessMessage,
  ErrorMessage,
  SignatureSection,
  SignatureTitle,
  SignatureDescription,
  SignatureEditor,
  Spinner,
  LoadingContainer,
} from './GeneralTab.styled';
import type { Account } from '../../../types';
import senderAccountService from '../../../services/sender.account.service';
import { EmailAccountType } from '../../../types/emailAccount.types';

interface GeneralTabProps {
  accountId: string;
  emailAccount: Account;
  onUpdate?: (data?: Account) => void;
}

interface FormData {
  fromName: string;
  fromEmail: string;
  userName: string;
  password: string;
  smtpHost: string;
  smtpPort: string;
  smtpSecurity: 'ssl' | 'tls';
  limit: string;
  timeGap: string;
  replyToAddressChecked: boolean;
  replyToAddress: string;
  useDifferentImap: boolean;
  imapUserName: string;
  imapPassword: string;
  imapHost: string;
  imapPort: string;
  imapSecurity: 'ssl' | 'tls';
  signature: string;
}

interface FormErrors {
  fromName?: string;
  fromEmail?: string;
  userName?: string;
  password?: string;
  smtpHost?: string;
  smtpPort?: string;
  limit?: string;
  timeGap?: string;
  imapHost?: string;
  imapPort?: string;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({ accountId, emailAccount, onUpdate }) => {
  const [formData, setFormData] = useState<FormData>({
    fromName: '',
    fromEmail: '',
    userName: '',
    password: '',
    smtpHost: '',
    smtpPort: '587',
    smtpSecurity: 'tls',
    limit: '20',
    timeGap: '20',
    replyToAddressChecked: false,
    replyToAddress: '',
    useDifferentImap: false,
    imapUserName: '',
    imapPassword: '',
    imapHost: '',
    imapPort: '993',
    imapSecurity: 'tls',
    signature: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isVerified, setIsVerified] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);

  const isGmailOrOutlook = emailAccount?.type === 'gmail' || emailAccount?.type === 'outlook';

  useEffect(() => {
    if (emailAccount) {
      const loaded: FormData = {
        fromName: emailAccount.name || '',
        fromEmail: emailAccount.email || '',
        userName: emailAccount.smtp?.auth?.user || '',
        password: emailAccount.smtp?.auth?.pass || '',
        smtpHost: emailAccount.smtp?.host || '',
        smtpPort: emailAccount.smtp?.port?.toString() || '587',
        smtpSecurity: emailAccount.smtp?.secure ? 'ssl' : 'tls',
        limit: emailAccount.limit?.toString() || '20',
        timeGap: emailAccount.time_gap?.toString() || '20',
        replyToAddressChecked: !!emailAccount.replyTo,
        replyToAddress: emailAccount.replyTo || '',
        useDifferentImap: false,
        imapUserName: emailAccount.imap?.auth?.user || '',
        imapPassword: emailAccount.imap?.auth?.pass || '',
        imapHost: emailAccount.imap?.host || '',
        imapPort: emailAccount.imap?.port?.toString() || '993',
        imapSecurity: emailAccount.imap?.secure ? 'ssl' : 'tls',
        signature: emailAccount.signature || '',
      };
      setFormData(loaded);
      setInitialFormData(loaded);
      setIsLoading(false);
    }
  }, [emailAccount]);

  const hasChanges = useMemo(() => {
    if (initialFormData == null) return false;
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }, [formData, initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSecurityChange = (field: 'smtpSecurity' | 'imapSecurity', value: 'ssl' | 'tls') => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'smtpSecurity') {
        updated.smtpPort = value === 'ssl' ? '465' : '587';
      }
      return updated;
    });
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateFields = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fromName.trim()) newErrors.fromName = 'From Name is required';
    if (!formData.fromEmail.trim()) {
      newErrors.fromEmail = 'From Email is required';
    } else if (!validateEmail(formData.fromEmail)) {
      newErrors.fromEmail = 'Enter a valid email address';
    }

    if (!isGmailOrOutlook) {
      if (!formData.userName.trim()) newErrors.userName = 'User Name is required';
      if (!formData.password.trim()) newErrors.password = 'Password is required';
      if (!formData.smtpHost.trim()) newErrors.smtpHost = 'SMTP Host is required';
      if (!formData.smtpPort.trim()) newErrors.smtpPort = 'SMTP Port is required';
      if (!formData.imapHost.trim()) newErrors.imapHost = 'IMAP Host is required';
      if (!formData.imapPort.trim()) newErrors.imapPort = 'IMAP Port is required';
    }

    if (!formData.limit || Number(formData.limit) <= 0) {
      newErrors.limit = 'Message per day must be a positive number';
    }
    if (!formData.timeGap || Number(formData.timeGap) <= 0) {
      newErrors.timeGap = 'Minimum time gap must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = async () => {
    if (!validateFields()) return;

    setIsVerifying(true);
    setVerificationFailed(false);

    try {
      await emailAccountService.verifySmtpAccount({
        type: EmailAccountType.SMTP,
        replyTo: formData.replyToAddressChecked
          ? formData.replyToAddress
          : "",
        imap: {
          host: formData.imapHost,
          port: formData.imapPort,
          secure: formData.imapSecurity === 'ssl',
          auth: {
            user: formData.useDifferentImap ? formData.imapUserName : formData.userName,
            pass: formData.useDifferentImap ? formData.imapPassword : formData.password,
          },
        },
        smtp: {
          host: formData.smtpHost,
          port: formData.smtpPort,
          secure: formData.smtpSecurity === 'ssl',
          auth: {
            user: formData.userName,
            pass: formData.password,
          },
        },
        proxy: null,
        smtpEhloName: 'localhost',
      });
      setIsVerified(true);
      toast.success('Email account verified successfully!');
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationFailed(true);
      toast.error('Verification failed. Please check your credentials.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    setIsSaving(true);

    try {
      let payload: Partial<Account>;

      if (isGmailOrOutlook) {
        payload = {
          name: formData.fromName,
          email: formData.fromEmail,
          limit: Number(formData.limit),
          time_gap: Number(formData.timeGap),
          type: emailAccount.type,
        };
      } else {
        payload = {
          name: formData.fromName || '',
          email: formData.fromEmail,
          replyTo: formData.replyToAddressChecked
            ? formData.replyToAddress
            : "",   
          smtp: {
            host: formData.smtpHost,
            port: Number(formData.smtpPort),
            secure: formData.smtpSecurity === 'ssl',
            auth: {
              user: formData.userName,
              pass: formData.password,
            },
          },
          imap: {
            host: formData.imapHost,
            port: Number(formData.imapPort),
            secure: formData.imapSecurity === 'ssl',
            auth: {
              user: formData.useDifferentImap ? formData.imapUserName : formData.userName,
              pass: formData.useDifferentImap ? formData.imapPassword : formData.password,
            },
          },
          signature: formData.signature,
          limit: Number(formData.limit),
          time_gap: Number(formData.timeGap),
          type: emailAccount.type,
        };
      }

      const response = await emailAccountService.updateEmailAccount(accountId, payload);
      if (response.code === 200 && response.data) {
        await senderAccountService.updateSenderAccount(accountId, payload as Account);
        toast.success('Email account updated successfully!');
        setInitialFormData(formData);
        onUpdate?.(response.data as Account);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Failed to update account:', error);
      toast.error('Failed to update email account');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <GeneralContainer>
      <FormSection>
        <SectionTitle>SMTP Settings (sending emails)</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label>From Name</Label>
            <Input
              name="fromName"
              value={formData.fromName}
              onChange={handleChange}
              $hasError={!!errors.fromName}
              $readOnly={isGmailOrOutlook}
              readOnly={isGmailOrOutlook}
            />
            {errors.fromName && <ErrorText>{errors.fromName}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>From Email</Label>
            <Input
              name="fromEmail"
              value={formData.fromEmail}
              onChange={handleChange}
              $hasError={!!errors.fromEmail}
              $readOnly={isGmailOrOutlook}
              readOnly={isGmailOrOutlook}
            />
            {errors.fromEmail && <ErrorText>{errors.fromEmail}</ErrorText>}
          </FormGroup>

          {!isGmailOrOutlook && (
            <>
              <FormGroup>
                <Label>User Name</Label>
                <Input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  $hasError={!!errors.userName}
                />
                {errors.userName && <ErrorText>{errors.userName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  $hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>SMTP Host</Label>
                <Input
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleChange}
                  $hasError={!!errors.smtpHost}
                />
                {errors.smtpHost && <ErrorText>{errors.smtpHost}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>SMTP Port</Label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <Input
                    name="smtpPort"
                    value={formData.smtpPort}
                    onChange={handleChange}
                    $hasError={!!errors.smtpPort}
                    style={{ width: '100px' }}
                  />
                  <RadioGroupWrapper>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        checked={formData.smtpSecurity === 'ssl'}
                        onChange={() => handleSecurityChange('smtpSecurity', 'ssl')}
                      />
                      SSL
                    </RadioLabel>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        checked={formData.smtpSecurity === 'tls'}
                        onChange={() => handleSecurityChange('smtpSecurity', 'tls')}
                      />
                      TLS
                    </RadioLabel>
                  </RadioGroupWrapper>
                </div>
                {errors.smtpPort && <ErrorText>{errors.smtpPort}</ErrorText>}
              </FormGroup>
            </>
          )}

          <FormGroup>
            <Label>Message Per Day (Warmups not included)</Label>
            <Input
              name="limit"
              type="number"
              value={formData.limit}
              onChange={handleChange}
              $hasError={!!errors.limit}
            />
            {errors.limit && <ErrorText>{errors.limit}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Minimum time gap (min)</Label>
            <Input
              name="timeGap"
              type="number"
              value={formData.timeGap}
              onChange={handleChange}
              $hasError={!!errors.timeGap}
            />
            {errors.timeGap && <ErrorText>{errors.timeGap}</ErrorText>}
          </FormGroup>

          {!isGmailOrOutlook && (
            <FormGroup $fullWidth>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  name="replyToAddressChecked"
                  checked={formData.replyToAddressChecked}
                  onChange={handleChange}
                />
                Set a different reply to address
              </CheckboxWrapper>
              {formData.replyToAddressChecked && (
                <Input
                  name="replyToAddress"
                  placeholder="reply@example.com"
                  value={formData.replyToAddress}
                  onChange={handleChange}
                  style={{ marginTop: '8px', maxWidth: '300px' }}
                />
              )}
            </FormGroup>
          )}
        </FormGrid>
      </FormSection>

      {!isGmailOrOutlook && (
        <FormSection>
          <SectionTitle>IMAP Settings (receives emails)</SectionTitle>

          <CheckboxWrapper style={{ marginBottom: '16px', marginTop: 0 }}>
            <CheckboxInput
              type="checkbox"
              name="useDifferentImap"
              checked={formData.useDifferentImap}
              onChange={handleChange}
            />
            Use different email accounts for receiving emails
          </CheckboxWrapper>

          {formData.useDifferentImap && (
            <FormGrid style={{ marginBottom: '16px' }}>
              <FormGroup>
                <Label>IMAP User Name</Label>
                <Input
                  name="imapUserName"
                  value={formData.imapUserName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>IMAP Password</Label>
                <Input
                  type="password"
                  name="imapPassword"
                  value={formData.imapPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormGrid>
          )}

          <FormGrid>
            <FormGroup>
              <Label>IMAP Host</Label>
              <Input
                name="imapHost"
                value={formData.imapHost}
                onChange={handleChange}
                $hasError={!!errors.imapHost}
              />
              {errors.imapHost && <ErrorText>{errors.imapHost}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>IMAP Port</Label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Input
                  name="imapPort"
                  value={formData.imapPort}
                  onChange={handleChange}
                  $hasError={!!errors.imapPort}
                  style={{ width: '100px' }}
                />
                <RadioGroupWrapper>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      checked={formData.imapSecurity === 'ssl'}
                      onChange={() => handleSecurityChange('imapSecurity', 'ssl')}
                    />
                    SSL
                  </RadioLabel>
                  <RadioLabel>
                    <RadioInput
                      type="radio"
                      checked={formData.imapSecurity === 'tls'}
                      onChange={() => handleSecurityChange('imapSecurity', 'tls')}
                    />
                    TLS
                  </RadioLabel>
                </RadioGroupWrapper>
              </div>
              {errors.imapPort && <ErrorText>{errors.imapPort}</ErrorText>}
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <Button onClick={handleVerify} disabled={isVerifying}>
              {isVerifying && <Spinner />}
              {isVerifying ? 'Verifying...' : 'Verify Email Account'}
            </Button>
          </ButtonRow>

          {isVerified && (
            <SuccessMessage>
              <Check size={20} />
              Email account verified successfully!
            </SuccessMessage>
          )}

          {verificationFailed && (
            <ErrorMessage>
              <AlertCircle size={20} />
              Verification failed. Please check your credentials and try again.
            </ErrorMessage>
          )}

          <SignatureSection>
            <SignatureTitle>Signature</SignatureTitle>
            <SignatureDescription>
              Enter your email signature below (manually or by copy-pasting it from your email client).
            </SignatureDescription>
            <SignatureEditor
              value={formData.signature}
              onChange={handleChange}
              name="signature"
              placeholder="Enter your email signature..."
            />
          </SignatureSection>
        </FormSection>
      )}

      <ButtonRow>
        <Button $variant="success" onClick={handleSave} disabled={isSaving || !hasChanges || formData.fromName === '' || formData.fromEmail === ''}>
          {isSaving && <Spinner />}
          {isSaving ? 'Updating...' : 'Update'}
        </Button>
      </ButtonRow>
    </GeneralContainer>
  );
};

export default GeneralTab;

