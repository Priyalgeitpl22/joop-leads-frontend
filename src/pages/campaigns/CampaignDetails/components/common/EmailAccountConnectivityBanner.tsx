import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Banner,
  IconWrap,
  Content,
  Message,
  Actions,
  ReactivateButton,
} from "./styled";

export interface AccountNeedingReauth {
  email: string;
  accountId?: string;
}

export interface EmailAccountConnectivityBannerProps {
  accounts: AccountNeedingReauth[];
  onReactivate?: (email: string, accountId?: string) => void;
}

const MESSAGE =
  "Email account(s) are no longer being used in this campaign for sending emails due to connectivity issues with your email provider. Please review/reauthenticate your account so you can reuse it.";

export const EmailAccountConnectivityBanner: React.FC<
  EmailAccountConnectivityBannerProps
> = ({ accounts, onReactivate }) => {
  if (!accounts.length) return null;

  return (
    <Banner>
      <IconWrap>
        <AlertTriangle size={24} strokeWidth={2} />
      </IconWrap>
      <Content>
        <Message>{MESSAGE}</Message>
        <Actions>
          {accounts.map((acc) => (
            <ReactivateButton
              key={acc.email}
              type="button"
              onClick={() => onReactivate?.(acc.email, acc.accountId)}
            >
              Reactivate {acc.email}
            </ReactivateButton>
          ))}
        </Actions>
      </Content>
    </Banner>
  );
};

export default EmailAccountConnectivityBanner;
