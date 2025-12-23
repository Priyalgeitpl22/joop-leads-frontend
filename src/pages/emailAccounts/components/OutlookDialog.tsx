import React from 'react';
import { X } from 'lucide-react';
import { useAppSelector } from '../../../store';
import { emailAccountService } from '../../../services/email.account.service';
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  CloseButton,
  DialogContent,
  StepText,
  AddButton,
} from './OutlookDialog.styled';

interface OutlookDialogProps {
  open: boolean;
  onClose: () => void;
}

export const OutlookDialog: React.FC<OutlookDialogProps> = ({
  open,
  onClose,
}) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const handleConnectOutlook = async () => {
    if (!currentUser?.orgId) {
      console.error('Organization ID is missing');
      return;
    }

    try {
      const response = await emailAccountService.getOutlookOAuthUrl(currentUser.orgId);
      if (response) {
        window.location.href = response;
      }
    } catch (error) {
      console.error('Error fetching Outlook OAuth URL:', error);
    }
  };

  if (!open) return null;

  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContainer>
        <DialogHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flex: 1 }}>
            <img src="/Images/campaign2.png" alt="campaign Icon" width={45} height={45} />
            <img src="/Images/compare.png" alt="compare Icon" width={25} height={25} />
            <img src="/Images/outlook.webp" alt="OAuth Icon" width={50} height={50} />
          </div>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogTitle>Connect your Outlook account</DialogTitle>

        <DialogContent>
          <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '16px' }}>
            Follow the given steps to connect your account:
          </p>

          <StepText>
            1. Login to your <b>Microsoft 365 Admin Center</b>
          </StepText>
          <StepText>
            2. Click on your <b>Active Users</b>
          </StepText>
          <StepText>3. Click onto the user you want to connect</StepText>
          <StepText>
            4. A fly out will appear, click on the <b>Mail Tab</b> and then click
            on <b>Manage Email Apps</b>
          </StepText>
          <StepText>
            5. Make sure the <b>Authenticated SMTP</b> and <b>IMAP</b> options are
            enabled
          </StepText>
          <StepText>
            6. Click on <b>Save Changes</b> and you are done (give it 30 mins,
            then connect to Smartlead)
          </StepText>

          <AddButton onClick={handleConnectOutlook}>
            Connect Outlook Account
          </AddButton>
        </DialogContent>
      </DialogContainer>
    </>
  );
};

export default OutlookDialog;

