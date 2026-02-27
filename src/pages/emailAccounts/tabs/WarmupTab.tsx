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
import type { Account } from '../../../types/emailAccount.types';
import { Slider } from '@mui/material';

// interface WarmupSettings {
//   enabled?: boolean;
//   maxPerDay?: number;
//   dailyRampup?: boolean;
//   rampupIncrement?: number;
//   replyRate?: number;
//   dailyReplyTarget?: number;
//   identifierTag?: string;
//   autoAdjust?: boolean;
//   customDomainTracking?: boolean;
//   weekdaysOnly?: boolean;
//   reputation?: number;
// }

interface WarmupTabProps {
  accountId: string;
  emailAccount: Account;
  onUpdate?: (data?: Account) => void;
}

interface WarmupFormData {
  enabled: boolean;
  maxEmailPerDay: number;
  warmupMaxCount: number;
  warmupMinCount: number;
  isRampupEnabled: boolean;
  rampupIncrement: number;
  startDate: Date | null;
  replyRate: number;
  dailyReplyTarget: number;
  identifierTagFirst: string;
  identifierTagSecond: string;
  autoAdjust: boolean;
  customDomainTracking: boolean;
  weekdaysOnly: boolean;
}

interface FormErrors {
  maxEmailPerDay?: string;
  warmupMaxCount?: string;
  warmupMinCount?: string;
  isRampupEnabled?: string;
  rampupIncrement?: string;
  startDate?: string;
  replyRate?: string;
  dailyReplyTarget?: string;
  identifierTagFirst?: string;
  identifierTagSecond?: string;
}

const defaultValues: WarmupFormData = {
  enabled: false,
  maxEmailPerDay: 20,
  warmupMaxCount: 20, // Default to maxEmailPerDay
  warmupMinCount: 1,
  isRampupEnabled: false,
  rampupIncrement: 5,
  startDate: null,
  replyRate: 20,
  dailyReplyTarget: 0,
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
      const maxEmailPerDay = warmup.maxEmailPerDay || 20;

      setFormData({
        enabled: warmup.enabled ?? false,
        maxEmailPerDay,
        warmupMaxCount: warmup.warmupMaxCount || maxEmailPerDay, // Default to maxEmailPerDay
        warmupMinCount: warmup.warmupMinCount || 1,
        isRampupEnabled: warmup.isRampupEnabled ?? false,
        rampupIncrement: warmup.rampupIncrement ?? 5,
        startDate: warmup.startDate ?? null,
        replyRate: warmup.replyRate ?? 20,
        dailyReplyTarget: warmup.dailyReplyTarget ?? 0,
        identifierTagFirst: identifierTagParts[0] ?? '',
        identifierTagSecond: identifierTagParts[1] ?? '',
        autoAdjust: warmup.autoAdjust ?? false,
        customDomainTracking: warmup.customDomainTracking ?? false,
        weekdaysOnly: warmup.weekdaysOnly ?? false,
      });
    }
    setIsLoading(false);
  }, [emailAccount]);

  // Ensure warmupMaxCount doesn't exceed maxEmailPerDay when maxEmailPerDay changes
  useEffect(() => {
    setFormData((prev) => {
      const updates: Partial<WarmupFormData> = {};
      if (prev.warmupMaxCount > prev.maxEmailPerDay) {
        updates.warmupMaxCount = prev.maxEmailPerDay;
      }
      if (prev.warmupMinCount > prev.maxEmailPerDay) {
        updates.warmupMinCount = Math.min(prev.warmupMinCount, prev.maxEmailPerDay);
      }
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.maxEmailPerDay]);

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
      if (!formData.maxEmailPerDay) {
        newErrors.maxEmailPerDay = 'This field is required';
      } else if (formData.maxEmailPerDay < 1) {
        newErrors.maxEmailPerDay = 'Minimum value is 1';
      } else if (formData.maxEmailPerDay > 50) {
        newErrors.maxEmailPerDay = 'Maximum value is 50';
      }

      if (formData.isRampupEnabled) {
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
          maxEmailPerDay: formData.maxEmailPerDay,
          warmupMaxCount: formData.warmupMaxCount,
          warmupMinCount: formData.warmupMinCount,
          isRampupEnabled: formData.isRampupEnabled,
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
                  // type="number"
                  value={formData.maxEmailPerDay}
                  onChange={(e) => handleChange('maxEmailPerDay', Number(e.target.value))}
                  min={1}
                  max={50}
                  $hasError={!!errors.maxEmailPerDay}
                />
                {errors.maxEmailPerDay && <ErrorText>{errors.maxEmailPerDay}</ErrorText>}
              </div>
            </SettingRow>
          </SettingCard>

          <SettingCard>
            <SettingHeader>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={formData.isRampupEnabled}
                  onChange={(e) => handleChange('isRampupEnabled', e.target.checked)}
                />
                <span />
              </ToggleSwitch>
              <SettingInfo>
                <h4>Daily Rampup</h4>
              </SettingInfo>
            </SettingHeader>
          </SettingCard>

          {formData.isRampupEnabled && (
            <>
              <SettingCard>
                <SettingRow>
                  <SettingInfo>
                    <h4>Rampup increment value per day</h4>
                    <p>(suggested 5 per day)</p>
                  </SettingInfo>
                  <div>
                    <Input
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
                  <h4>Randomise number of warm up emails per day</h4>
                  <p>Set the minimum and maximum range for warmup emails per day</p>
                </SettingInfo>
                <div style={{ width: "100%", padding: "20px 12px" }}>
                  <Slider
                    value={[formData.warmupMinCount, formData.warmupMaxCount || formData.maxEmailPerDay]}
                    min={1}
                    max={formData.maxEmailPerDay}
                    onChange={(_e, newValue) => {
                      const [min, max] = newValue as number[];
                      handleChange('warmupMinCount', min);
                      handleChange('warmupMaxCount', max);
                    }}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '14px', color: '#666' }}>
                    <span>Min: {formData.warmupMinCount}</span>
                    <span>Max: {formData.warmupMaxCount || formData.maxEmailPerDay} (max: {formData.maxEmailPerDay})</span>
                  </div>
                  {errors.warmupMinCount && <ErrorText>{errors.warmupMinCount}</ErrorText>}
                  {errors.warmupMaxCount && <ErrorText>{errors.warmupMaxCount}</ErrorText>}
                </div>
              </SettingCard>

              <SettingCard>
                <SettingInfo>
                  <h4>Reply Rate (%)</h4>
                  <p>Suggested - 20, Maximum - 100</p>
                </SettingInfo>
                <Input
                  // type="number"
                  value={formData.warmupMaxCount}
                  onChange={(e) => handleChange('warmupMaxCount', Number(e.target.value))}
                  min={1}
                  max={100}
                  $hasError={!!errors.warmupMaxCount}
                />
                {errors.warmupMaxCount && <ErrorText>{errors.warmupMaxCount}</ErrorText>}
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
        <Button onClick={handleSave} disabled={isSaving || !formData.enabled}>
          {isSaving && <Spinner />}
          {isSaving ? 'Updating...' : 'Update'}
        </Button>
      </ButtonRow>
    </WarmupContainer>
  );
};

export default WarmupTab;
