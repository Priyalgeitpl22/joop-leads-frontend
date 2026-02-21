import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../../store';
import { emailAccountService } from '../../../services/email.account.service';
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  HeaderContent,
  DialogTitle,
  DialogSubtitle,
  CloseButton,
  DialogContent,
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
  SaveButton,
  VerifyButton,
  SuccessMessage,
  ErrorMessage,
  SignatureSection,
  SignatureTitle,
  SignatureDescription,
  SignatureEditor,
  Spinner,
} from './SmtpDialog.styled';
import senderAccountService from '../../../services/sender.account.service';
import { EmailAccountState, EmailAccountType, type Account } from '../../../types/emailAccount.types';
import ErrorDialog from '../../../components/common/ErrorDialog';

interface SmtpDialogProps {
  open: boolean;
  onClose: () => void;
  onAccountCreated?: (account: Account) => void;
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

const initialFormData: FormData = {
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
};

export const SmtpDialog: React.FC<SmtpDialogProps> = ({ open, onClose, onAccountCreated }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isVerified, setIsVerified] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [verificationFailedMessage, setVerificationFailedMessage] = useState<string | null>(null);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(initialFormData);
      setErrors({});
      setIsVerified(false);
      setVerificationFailed(false);
    }
  }, [open]);

  // Sync IMAP credentials with SMTP when not using different accounts
  useEffect(() => {
    if (!formData.useDifferentImap) {
      setFormData((prev) => ({
        ...prev,
        imapUserName: prev.userName,
        imapPassword: prev.password,
      }));
    }
  }, [formData.useDifferentImap, formData.userName, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    // Reset verification status when credentials change
    if (['userName', 'password', 'smtpHost', 'smtpPort', 'imapHost', 'imapPort'].includes(name)) {
      setIsVerified(false);
      setVerificationFailed(false);
    }
  };

  const handleSecurityChange = (field: 'smtpSecurity' | 'imapSecurity', value: 'ssl' | 'tls') => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'smtpSecurity') {
        updated.smtpPort = value === 'ssl' ? '465' : '587';
      }
      if (field === 'imapSecurity') {
        updated.imapPort = '993';
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
    if (!formData.userName.trim()) newErrors.userName = 'User Name is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.smtpHost.trim()) newErrors.smtpHost = 'SMTP Host is required';
    if (!formData.smtpPort.trim()) newErrors.smtpPort = 'SMTP Port is required';
    if (!formData.limit || Number(formData.limit) <= 0) {
      newErrors.limit = 'Message per day must be a positive number';
    }
    if (!formData.timeGap || Number(formData.timeGap) <= 0) {
      newErrors.timeGap = 'Minimum time gap must be a positive number';
    }
    if (!formData.imapHost.trim()) newErrors.imapHost = 'IMAP Host is required';
    if (!formData.imapPort.trim()) newErrors.imapPort = 'IMAP Port is required';

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
        ...(formData.replyToAddressChecked &&
          formData.replyToAddress.trim() && {
          replyTo: formData.replyToAddress.trim(),
        }),

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
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || 'Verification failed. Please check your credentials.';

      if (message.length > 100) {
        setVerificationFailedMessage(message);
        setShowErrorDialog(true);
      } else {
        toast.error(message);
        setVerificationFailed(true);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    if (!isVerified) {
      toast.error('Please verify the email account first');
      return;
    }
    if (!currentUser?.orgId) {
      toast.error('Organization ID not found');
      return;
    }

    setIsSaving(true);

    try {
      const response = await emailAccountService.createSmtpAccount({
        account: EmailAccountType.SMTP,
        name: formData.fromName,
        state: EmailAccountState.ACTIVE,
        type: EmailAccountType.SMTP,

        ...(formData.replyToAddressChecked &&
          formData.replyToAddress.trim() && {
          replyTo: formData.replyToAddress.trim(),
        }),

        orgId: currentUser.orgId,
        email: formData.fromEmail,
        limit: Number(formData.limit),
        time_gap: Number(formData.timeGap),
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
        signature: formData.signature,
      });
      await senderAccountService.createSenderAccount(response.data as Account);
      toast.success('Email account created successfully!');
      onAccountCreated?.(response.data as Account);
      onClose();
    } catch (error) {
      console.error('Failed to create account:', error);
      toast.error('Failed to create email account');
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

  const dialogContent = (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <HeaderContent>
            <DialogTitle>Add Email</DialogTitle>
            <DialogSubtitle>
              Read the full tutorial on setting up your email account here
            </DialogSubtitle>
          </HeaderContent>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>
          <FormSection>
            <SectionTitle>SMTP Settings (sending emails)</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>From Name</Label>
                <Input
                  name="fromName"
                  placeholder="John Doe"
                  value={formData.fromName}
                  onChange={handleChange}
                  $hasError={!!errors.fromName}
                />
                {errors.fromName && <ErrorText>{errors.fromName}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>From Email</Label>
                <Input
                  name="fromEmail"
                  placeholder="johndoe@jooper.ai"
                  value={formData.fromEmail}
                  onChange={handleChange}
                  $hasError={!!errors.fromEmail}
                />
                {errors.fromEmail && <ErrorText>{errors.fromEmail}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>User Name</Label>
                <Input
                  name="userName"
                  placeholder="johndoe"
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
                  placeholder="••••••••"
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
                  placeholder="smtp.jooper.ai"
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
                    placeholder="587"
                    value={formData.smtpPort}
                    onChange={handleChange}
                    $hasError={!!errors.smtpPort}
                    style={{ width: '100px' }}
                  />
                  <RadioGroupWrapper>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="smtpSecurity"
                        checked={formData.smtpSecurity === 'ssl'}
                        onChange={() => handleSecurityChange('smtpSecurity', 'ssl')}
                      />
                      SSL
                    </RadioLabel>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="smtpSecurity"
                        checked={formData.smtpSecurity === 'tls'}
                        onChange={() => handleSecurityChange('smtpSecurity', 'tls')}
                      />
                      TLS
                    </RadioLabel>
                  </RadioGroupWrapper>
                </div>
                {errors.smtpPort && <ErrorText>{errors.smtpPort}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Message Per Day (Warmups not included)</Label>
                <Input
                  name="limit"
                  placeholder="20"
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
                  placeholder="20"
                  value={formData.timeGap}
                  onChange={handleChange}
                  $hasError={!!errors.timeGap}
                />
                {errors.timeGap && <ErrorText>{errors.timeGap}</ErrorText>}
              </FormGroup>

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
                    placeholder="reply@jooper.ai"
                    value={formData.replyToAddress}
                    onChange={handleChange}
                    style={{ marginTop: '8px', maxWidth: '300px' }}
                  />
                )}
              </FormGroup>
            </FormGrid>
          </FormSection>

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
                    placeholder="johndoe"
                    value={formData.imapUserName}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>IMAP Password</Label>
                  <Input
                    type="password"
                    name="imapPassword"
                    placeholder="••••••••"
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
                  placeholder="imap.jooper.ai"
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
                    placeholder="993"
                    value={formData.imapPort}
                    onChange={handleChange}
                    $hasError={!!errors.imapPort}
                    style={{ width: '100px' }}
                  />
                  <RadioGroupWrapper>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="imapSecurity"
                        checked={formData.imapSecurity === 'ssl'}
                        onChange={() => handleSecurityChange('imapSecurity', 'ssl')}
                      />
                      SSL
                    </RadioLabel>
                    <RadioLabel>
                      <RadioInput
                        type="radio"
                        name="imapSecurity"
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
              <VerifyButton onClick={handleVerify} disabled={isVerifying}>
                {isVerifying && <Spinner />}
                {isVerifying ? 'Verifying...' : 'Verify Email Account'}
              </VerifyButton>
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
          </FormSection>

          <SignatureSection>
            <SignatureTitle>Signature</SignatureTitle>
            <SignatureDescription>
              Enter your email signature below (manually or by copy-pasting it from your email client).
            </SignatureDescription>
            <SignatureEditor>
              <textarea
                value={formData.signature}
                onChange={(e) => setFormData((prev) => ({ ...prev, signature: e.target.value }))}
                placeholder="Enter your email signature..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  border: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                }}
              />
            </SignatureEditor>
          </SignatureSection>

          <ButtonRow style={{ marginTop: '24px' }}>
            <SaveButton onClick={handleSave} disabled={!isVerified || isSaving}>
              {isSaving && <Spinner />}
              {isSaving ? 'Saving...' : 'Save'}
            </SaveButton>
          </ButtonRow>
        </DialogContent>
      </DialogContainer>

      {showErrorDialog && (
        <ErrorDialog
          isOpen={showErrorDialog}
          onClose={() => setShowErrorDialog(false)}
          title="Verification Failed"
          message={verificationFailedMessage || 'Verification failed. Please check your credentials and try again.'}
          okLabel="OK"
        />
      )}
    </>
  );

  return createPortal(dialogContent, document.body);
};

export default SmtpDialog;
