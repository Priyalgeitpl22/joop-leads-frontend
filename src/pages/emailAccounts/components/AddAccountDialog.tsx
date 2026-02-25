import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAppSelector } from "../../../store";
import type { RootState } from "../../../store";
import { emailAccountService } from "../../../services/email.account.service";
import { LimitReachedDialog } from "../../../components/common";
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  CloseButton,
  DialogContent,
  MethodTitle,
  MethodButtons,
  MethodButton,
  MethodIcon,
  MethodLabel,
  MethodSubtext,
  RecommendedBadge,
} from "./AddAccountDialog.styled";
import { EmailProvider } from "../../../components/common";

interface AddAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenSmtp: () => void;
  onOpenOutlook: () => void;
}

export const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onClose,
  onOpenSmtp,
  onOpenOutlook,
}) => {
  const navigate = useNavigate();
  const { currentUser, isFetchingCurrentUser } = useAppSelector(
    (state: RootState) => state.user,
  );

  const isLimitReached = useMemo(() => {
    const plan = currentUser?.planDetails?.plan;
    const max = plan?.maxSenderAccounts;
    const count = currentUser?.planDetails?.senderAccountsCount;
    if (max == null || count == null) return false;
    return Number(count) >= Number(max);
  }, [currentUser?.planDetails]);

  const handleGoogleOAuth = async () => {
    if (isFetchingCurrentUser || !currentUser?.orgId) return;
    try {
      const url = await emailAccountService.getGoogleOAuthUrl(
        currentUser.orgId,
      );
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Error fetching Google OAuth URL:", err);
    }
  };

  const handleOutlook = () => {
    onClose();
    onOpenOutlook();
  };

  const handleSmtp = () => {
    onClose();
    onOpenSmtp();
  };

  const handleLimitPrimaryAction = () => {
    onClose();
    navigate("/subscription");
  };

  if (!open) return null;

  if (isLimitReached) {
    return (
      <LimitReachedDialog
        isOpen={true}
        onClose={onClose}
        limitType="sender accounts"
        variant="subscribe"
        onPrimaryAction={handleLimitPrimaryAction}
        primaryActionLabel="View plans"
        secondaryActionLabel="Maybe later"
      />
    );
  }

  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Add Email Account</DialogTitle>
          <CloseButton onClick={onClose} aria-label="Close">
            <X size={20} />
          </CloseButton>
        </DialogHeader>
        <DialogContent>
          <MethodTitle>Choose a Method to Connect Your Email</MethodTitle>
          <MethodButtons>
            <MethodButton
              onClick={handleGoogleOAuth}
              $recommended
              disabled={isFetchingCurrentUser || !currentUser}
            >
              <RecommendedBadge>Fastest</RecommendedBadge>
              <MethodIcon>
                <EmailProvider type="gmail" size={44} height={30} showLabel={false} />
              </MethodIcon>
              <MethodLabel>Google OAuth</MethodLabel>
              <MethodSubtext>
                {isFetchingCurrentUser
                  ? "Loading..."
                  : "One-click secure setup"}
              </MethodSubtext>
            </MethodButton>

            <MethodButton onClick={handleOutlook}>
              <MethodIcon>
                <img
                  src="/Images/outlook.webp"
                  alt="Outlook"
                  width={44}
                  height={44}
                />
              </MethodIcon>
              <MethodLabel>Outlook</MethodLabel>
              <MethodSubtext>Microsoft 365</MethodSubtext>
            </MethodButton>

            <MethodButton onClick={handleSmtp}>
              <MethodIcon>
                <img src="/Images/smtp.png" alt="SMTP" width={44} height={44} />
              </MethodIcon>
              <MethodLabel>SMTP</MethodLabel>
              <MethodSubtext>Custom email server</MethodSubtext>
            </MethodButton>
          </MethodButtons>
        </DialogContent>
      </DialogContainer>
    </>
  );
};

export default AddAccountDialog;
