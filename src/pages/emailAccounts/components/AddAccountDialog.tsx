import React from "react";
import { X } from "lucide-react";
import { useAppSelector } from "../../../store";
import { emailAccountService } from "../../../services/email.account.service";
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
import type { RootState } from "../../../store";

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
  const { currentUser, isFetchingCurrentUser } = useAppSelector(
    (state: RootState) => state.user
  );

  const handleGoogleOAuth = async () => {
    if (isFetchingCurrentUser) {
      return;
    }

    if (!currentUser?.orgId) {
      console.error("Organization ID is missing");
      return;
    }

    try {
      const response = await emailAccountService.getGoogleOAuthUrl(
        currentUser.orgId
      );
      if (response) {
        window.location.href = response;
      }
    } catch (error) {
      console.error("Error fetching Google OAuth URL:", error);
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

  if (!open) return null;

  return (
    <>
      <DialogOverlay onClick={onClose} />
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Add Email Account</DialogTitle>
          <CloseButton onClick={onClose}>
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
                <img
                  src="/Images/mail.png"
                  alt="Gmail Icon"
                  width={44}
                  height={36}
                />
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
                  alt="Outlook Icon"
                  width={44}
                  height={44}
                />
              </MethodIcon>
              <MethodLabel>Outlook</MethodLabel>
              <MethodSubtext>Microsoft 365</MethodSubtext>
            </MethodButton>

            <MethodButton onClick={handleSmtp}>
              <MethodIcon>
                <img
                  src="/Images/smtp.png"
                  alt="SMTP Icon"
                  width={44}
                  height={44}
                />
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
