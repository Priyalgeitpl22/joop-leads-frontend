import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { emailAccountService } from '../../../services/email.account.service';
import {
  WarmupContainer,
  InfoText,
  SettingCard,
  SettingHeader,
  SettingRow,
  SettingInfo,
  ToggleSwitch,
  Input,
  SliderInput,
  TagInputContainer,
  TagInput,
  TagPreview,
  CheckboxRow,
  CheckboxInfo,
  ButtonRow,
  Button,
  Spinner,
  LoadingContainer,
  ErrorText,
} from './WarmupTab.styled';

interface WarmupSettings {
  enabled?: boolean;
  maxPerDay?: number;
  dailyRampup?: boolean;
  rampupIncrement?: number;
  replyRate?: number;
  dailyReplyTarget?: number;
  identifierTag?: string;
  autoAdjust?: boolean;
  customDomainTracking?: boolean;
  weekdaysOnly?: boolean;
  reputation?: number;
}

interface EmailAccountWithWarmup {
  warmup?: WarmupSettings;
  [key: string]: unknown;
}

interface WarmupTabProps {
  accountId: string;
  emailAccount: EmailAccountWithWarmup;
  onUpdate?: () => void;
}

interface WarmupFormData {
  enabled: boolean;
  maxPerDay: number;
  dailyRampup: boolean;
  rampupIncrement: number;
  replyRate: number;
  dailyReplyTarget: number;
  identifierTagFirst: string;
  identifierTagSecond: string;
  autoAdjust: boolean;
  customDomainTracking: boolean;
  weekdaysOnly: boolean;
}

interface FormErrors {
  maxPerDay?: string;
  rampupIncrement?: string;
  replyRate?: string;
  dailyReplyTarget?: string;
  identifierTagFirst?: string;
  identifierTagSecond?: string;
}

const defaultValues: WarmupFormData = {
  enabled: false,
  maxPerDay: 20,
  dailyRampup: false,
  rampupIncrement: 5,
  replyRate: 20,
  dailyReplyTarget: 10,
  identifierTagFirst: '',
  identifierTagSecond: '',
  autoAdjust: false,
  customDomainTracking: false,
  weekdaysOnly: false,
};

export const WarmupTab: React.FC<WarmupTabProps> = ({ accountId, emailAccount, onUpdate }) => {
  const [formData, setFormData] = useState<WarmupFormData>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (emailAccount?.warmup) {
      const warmup = emailAccount.warmup;
      const identifierTagParts = warmup.identifierTag?.split('-') || ['', ''];

      setFormData({
        enabled: warmup.enabled ?? false,
        maxPerDay: warmup.maxPerDay || 20,
        dailyRampup: warmup.dailyRampup ?? false,
        rampupIncrement: warmup.rampupIncrement ?? 5,
        replyRate: warmup.replyRate ?? 20,
        dailyReplyTarget: warmup.dailyReplyTarget ?? 10,
        identifierTagFirst: identifierTagParts[0] || '',
        identifierTagSecond: identifierTagParts[1] || '',
        autoAdjust: warmup.autoAdjust ?? false,
        customDomainTracking: warmup.customDomainTracking ?? false,
        weekdaysOnly: warmup.weekdaysOnly ?? false,
      });
    }
    setIsLoading(false);
  }, [emailAccount]);

  const handleChange = (field: keyof WarmupFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field changes
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.enabled) {
      // Validate maxPerDay
      if (!formData.maxPerDay) {
        newErrors.maxPerDay = 'This field is required';
      } else if (formData.maxPerDay < 1) {
        newErrors.maxPerDay = 'Minimum value is 1';
      } else if (formData.maxPerDay > 50) {
        newErrors.maxPerDay = 'Maximum value is 50';
      }

      if (formData.dailyRampup) {
        // Validate rampupIncrement
        if (!formData.rampupIncrement) {
          newErrors.rampupIncrement = 'This field is required';
        } else if (formData.rampupIncrement < 1) {
          newErrors.rampupIncrement = 'Minimum value is 1';
        } else if (formData.rampupIncrement > 100) {
          newErrors.rampupIncrement = 'Maximum value is 100';
        }

        // Validate replyRate
        if (formData.replyRate < 1) {
          newErrors.replyRate = 'Minimum value is 1%';
        } else if (formData.replyRate > 100) {
          newErrors.replyRate = 'Maximum value is 100%';
        }

        // Validate dailyReplyTarget
        if (formData.dailyReplyTarget < 1) {
          newErrors.dailyReplyTarget = 'Minimum value is 1';
        } else if (formData.dailyReplyTarget > 50) {
          newErrors.dailyReplyTarget = 'Maximum value is 50';
        }

        // Validate identifierTagFirst
        if (!formData.identifierTagFirst.trim()) {
          newErrors.identifierTagFirst = 'First tag is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.identifierTagFirst)) {
          newErrors.identifierTagFirst = 'Only alphanumeric characters allowed';
        } else if (formData.identifierTagFirst.length < 2) {
          newErrors.identifierTagFirst = 'Minimum 2 characters';
        } else if (formData.identifierTagFirst.length > 20) {
          newErrors.identifierTagFirst = 'Maximum 20 characters';
        }

        // Validate identifierTagSecond
        if (!formData.identifierTagSecond.trim()) {
          newErrors.identifierTagSecond = 'Second tag is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.identifierTagSecond)) {
          newErrors.identifierTagSecond = 'Only alphanumeric characters allowed';
        } else if (formData.identifierTagSecond.length < 2) {
          newErrors.identifierTagSecond = 'Minimum 2 characters';
        } else if (formData.identifierTagSecond.length > 20) {
          newErrors.identifierTagSecond = 'Maximum 20 characters';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        warmup: {
          enabled: formData.enabled,
          maxPerDay: formData.maxPerDay,
          dailyRampup: formData.dailyRampup,
          rampupIncrement: formData.rampupIncrement,
          startDate: new Date(),
          replyRate: formData.replyRate,
          dailyReplyTarget: formData.dailyReplyTarget,
          identifierTag: `${formData.identifierTagFirst}-${formData.identifierTagSecond}`,
          autoAdjust: formData.autoAdjust,
          customDomainTracking: formData.customDomainTracking,
          weekdaysOnly: formData.weekdaysOnly,
          reputation: emailAccount?.warmup?.reputation || 100,
          reputationLastCalculated: new Date(),
        },
      };

      await emailAccountService.updateEmailAccount(accountId, payload);
      toast.success('Warmup settings updated successfully!');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update warmup settings:', error);
      toast.error('Failed to update warmup settings');
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
    <WarmupContainer>
      <InfoText>
        Warming up an IP address involves sending low volumes of email on your dedicated IP and then
        systematically increasing your email volume over a period of time.
      </InfoText>

      <SettingCard>
        <SettingHeader>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => handleChange('enabled', e.target.checked)}
            />
            <span />
          </ToggleSwitch>
          <SettingInfo>
            <h4>Email Warmup Enabled</h4>
          </SettingInfo>
        </SettingHeader>
      </SettingCard>

      {formData.enabled && (
        <>
          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <h4>Total number of warm-up emails per day</h4>
                <p>Maximum number of warm-up emails that could be sent via this email account per day</p>
              </SettingInfo>
              <div>
                <Input
                  type="number"
                  value={formData.maxPerDay}
                  onChange={(e) => handleChange('maxPerDay', Number(e.target.value))}
                  min={1}
                  max={50}
                  $hasError={!!errors.maxPerDay}
                />
                {errors.maxPerDay && <ErrorText>{errors.maxPerDay}</ErrorText>}
              </div>
            </SettingRow>
          </SettingCard>

          <SettingCard>
            <SettingHeader>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={formData.dailyRampup}
                  onChange={(e) => handleChange('dailyRampup', e.target.checked)}
                />
                <span />
              </ToggleSwitch>
              <SettingInfo>
                <h4>Daily Rampup</h4>
              </SettingInfo>
            </SettingHeader>
          </SettingCard>

          {formData.dailyRampup && (
            <>
              <SettingCard>
                <SettingRow>
                  <SettingInfo>
                    <h4>Rampup increment value per day</h4>
                    <p>(suggested 5 per day)</p>
                  </SettingInfo>
                  <div>
                    <Input
                      type="number"
                      value={formData.rampupIncrement}
                      onChange={(e) => handleChange('rampupIncrement', Number(e.target.value))}
                      min={1}
                      max={100}
                      $hasError={!!errors.rampupIncrement}
                    />
                    {errors.rampupIncrement && <ErrorText>{errors.rampupIncrement}</ErrorText>}
                  </div>
                </SettingRow>
              </SettingCard>

              <SettingCard>
                <SettingInfo>
                  <h4>Reply Rate (%)</h4>
                  <p>Suggested - 20, Maximum - 100</p>
                </SettingInfo>
                <SliderInput
                  type="range"
                  min={1}
                  max={100}
                  value={formData.replyRate}
                  onChange={(e) => handleChange('replyRate', Number(e.target.value))}
                />
                <div style={{ textAlign: 'right', fontSize: '14px', color: '#666' }}>
                  {formData.replyRate}%
                </div>
                {errors.replyRate && <ErrorText>{errors.replyRate}</ErrorText>}
              </SettingCard>

              <SettingCard>
                <SettingInfo>
                  <h4>Daily Target for Replies to Inbound Warmup Emails</h4>
                  <p>Set how many replies this mailbox will send to inbound warmup emails each day.</p>
                </SettingInfo>
                <SliderInput
                  type="range"
                  min={1}
                  max={50}
                  value={formData.dailyReplyTarget}
                  onChange={(e) => handleChange('dailyReplyTarget', Number(e.target.value))}
                />
                <div style={{ textAlign: 'right', fontSize: '14px', color: '#666' }}>
                  {formData.dailyReplyTarget} replies/day
                </div>
                {errors.dailyReplyTarget && <ErrorText>{errors.dailyReplyTarget}</ErrorText>}
              </SettingCard>

              <SettingCard>
                <SettingInfo>
                  <h4>Custom Warmup Identifier Tag</h4>
                  <p>Use this two-worded tag to filter out any warmup emails from your inbox.</p>
                </SettingInfo>
                <TagInputContainer>
                  <div>
                    <TagInput
                      type="text"
                      value={formData.identifierTagFirst}
                      onChange={(e) => handleChange('identifierTagFirst', e.target.value)}
                      placeholder="Tag1"
                      $hasError={!!errors.identifierTagFirst}
                    />
                    {errors.identifierTagFirst && <ErrorText>{errors.identifierTagFirst}</ErrorText>}
                  </div>
                  <span>-</span>
                  <div>
                    <TagInput
                      type="text"
                      value={formData.identifierTagSecond}
                      onChange={(e) => handleChange('identifierTagSecond', e.target.value)}
                      placeholder="Tag2"
                      $hasError={!!errors.identifierTagSecond}
                    />
                    {errors.identifierTagSecond && <ErrorText>{errors.identifierTagSecond}</ErrorText>}
                  </div>
                  <TagPreview>
                    = {formData.identifierTagFirst}-{formData.identifierTagSecond}
                  </TagPreview>
                </TagInputContainer>
              </SettingCard>

              <CheckboxRow>
                <input
                  type="checkbox"
                  checked={formData.customDomainTracking}
                  onChange={(e) => handleChange('customDomainTracking', e.target.checked)}
                />
                <CheckboxInfo>
                  <h4>Warmup the Custom Domain tracking Link</h4>
                  <p>We will warmup your custom domain tracking link for better deliverability.</p>
                </CheckboxInfo>
              </CheckboxRow>

              <CheckboxRow>
                <input
                  type="checkbox"
                  checked={formData.weekdaysOnly}
                  onChange={(e) => handleChange('weekdaysOnly', e.target.checked)}
                />
                <CheckboxInfo>
                  <h4>Send warmup emails only on weekdays</h4>
                  <p>
                    To emulate human sending patterns, Jooper AI will automatically pause sending warmup
                    emails on weekends.
                  </p>
                </CheckboxInfo>
              </CheckboxRow>
            </>
          )}
        </>
      )}

      <ButtonRow>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Spinner />}
          {isSaving ? 'Updating...' : 'Update'}
        </Button>
      </ButtonRow>
    </WarmupContainer>
  );
};

export default WarmupTab;
