import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  AttentionRequiredContainer,
  IntroText,
  Section,
  SectionHeading,
  DisconnectErrorBlock,
  ErrorIconWrap,
  ErrorMessage,
  StepCard,
  PasswordUpdateSection,
  PasswordUpdateHeading,
  PasswordUpdateDescription,
  ButtonRow,
  UpdatePasswordButton,
  SectionCard,
} from "./AttentionRequiredTab.styled";
import type { Account } from "../../../types/emailAccount.types";
import {
  EmailAccountState,
  EmailAccountType,
} from "../../../types/emailAccount.types";

const DEFAULT_SMTP_ERROR = "Refresh token expired or revoked";

interface AttentionRequiredTabProps {
  accountId: string;
  emailAccount: Account;
  onUpdatePassword?: () => void;
  onReactivateAccount?: () => void;
}

export const AttentionRequiredTab: React.FC<AttentionRequiredTabProps> = ({
  emailAccount,
  onUpdatePassword,
  onReactivateAccount,
}) => {
  const showDisconnect =
    emailAccount.state === EmailAccountState.REAUTH_REQUIRED;
  const accountWithError = emailAccount as Account & {
    errorDetails?: { message?: string };
  };
  const errorMessage =
    accountWithError.errorDetails?.message || DEFAULT_SMTP_ERROR;

  return (
    <AttentionRequiredContainer>
      <SectionCard>
      <IntroText>Resolve the following to start sending again.</IntroText>

      <Section>
        <SectionHeading>Your account got disconnected</SectionHeading>
        <DisconnectErrorBlock>
          <ErrorIconWrap>
            <AlertTriangle size={22} strokeWidth={2} />
          </ErrorIconWrap>
          <ErrorMessage>
            {showDisconnect
              ? errorMessage
              : "Connection or authentication issue detected."}
            {emailAccount.name && emailAccount.email && (
              <>
                {" "}
                Mailbox used: &quot;{emailAccount.name}&quot; &lt;
                {emailAccount.email}&gt;
              </>
            )}
          </ErrorMessage>
        </DisconnectErrorBlock>
      </Section>

      <Section>
        <StepCard>
          <PasswordUpdateSection>

            <PasswordUpdateHeading>
              Password was updated
              <PasswordUpdateDescription>
                Your app password or main account password was updated.
              </PasswordUpdateDescription>
            </PasswordUpdateHeading>

            <ButtonRow>
              {(emailAccount.type === EmailAccountType.SMTP ||
                emailAccount.type === EmailAccountType.IMAP) && (
                <UpdatePasswordButton type="button" onClick={onUpdatePassword}>
                  Update Password
                </UpdatePasswordButton>
              )}
              {(emailAccount.type === EmailAccountType.GMAIL ||
                emailAccount.type === EmailAccountType.OUTLOOK) && (
                <UpdatePasswordButton
                  type="button"
                  onClick={onReactivateAccount}
                >
                  Reactivate Account
                </UpdatePasswordButton>
              )}
            </ButtonRow>
          </PasswordUpdateSection>
        </StepCard>
      </Section>
      </SectionCard>
    </AttentionRequiredContainer>
  );
};

export default AttentionRequiredTab;
