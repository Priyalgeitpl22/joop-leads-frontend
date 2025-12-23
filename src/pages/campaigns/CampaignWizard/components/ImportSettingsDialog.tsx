import React, { useState } from 'react';
import { X, Info, Upload } from 'lucide-react';
import styled from 'styled-components';

interface CsvSettings {
  ignoreCommunityBounceList: boolean;
  ignoreDuplicateLeadsInOtherCampaign: boolean;
  ignoreGlobalBlockList: boolean;
  ignoreUnsubscribeList: boolean;
}

interface ImportSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: CsvSettings) => void;
}

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  .title-section {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  .icon-box {
    width: 36px;
    height: 36px;
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const DialogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

const SettingItem = styled.div<{ $isOn: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ $isOn, theme }) => 
    $isOn ? theme.colors.primary.light : theme.colors.background.secondary};
  border: 1px solid ${({ $isOn, theme }) => 
    $isOn ? theme.colors.primary.main : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .info-icon {
    color: ${({ theme }) => theme.colors.text.tertiary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.neutral[300]};
    transition: 0.3s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const ProceedButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const SETTINGS_OPTIONS = [
  {
    key: 'ignoreGlobalBlockList',
    label: 'Import Leads Even If They Are In The Global Block List',
  },
  {
    key: 'ignoreUnsubscribeList',
    label: 'Import Leads Even If They Are In The Unsubscribe List',
  },
  {
    key: 'ignoreCommunityBounceList',
    label: 'Import Leads Even If They Bounced Across Our Entire Userbase',
  },
  {
    key: 'ignoreDuplicateLeadsInOtherCampaign',
    label: 'Ignore The Leads That Exist In Another Campaign',
  },
];

export const ImportSettingsDialog: React.FC<ImportSettingsDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [settings, setSettings] = useState<CsvSettings>({
    ignoreCommunityBounceList: false,
    ignoreDuplicateLeadsInOtherCampaign: false,
    ignoreGlobalBlockList: false,
    ignoreUnsubscribeList: false,
  });

  const handleToggle = (key: keyof CsvSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProceed = () => {
    onSave(settings);
  };

  if (!open) return null;

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <div className="title-section">
            <div className="icon-box">
              <Upload size={20} />
            </div>
            <h3>Import Settings</h3>
          </div>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>
          <SectionTitle>General Preferences</SectionTitle>

          {SETTINGS_OPTIONS.map((item) => {
            const isOn = settings[item.key as keyof CsvSettings];
            return (
              <SettingItem key={item.key} $isOn={isOn}>
                <SettingLabel>
                  <span>{item.label}</span>
                  <Info size={16} className="info-icon" />
                </SettingLabel>
                <Toggle>
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => handleToggle(item.key as keyof CsvSettings)}
                  />
                  <span />
                </Toggle>
              </SettingItem>
            );
          })}
        </DialogContent>

        <DialogFooter>
          <ProceedButton onClick={handleProceed}>Proceed</ProceedButton>
        </DialogFooter>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default ImportSettingsDialog;

