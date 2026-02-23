import React from 'react';
import styled from 'styled-components';
import { CreditCard } from 'lucide-react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';

export interface LimitReachedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  /** Dialog title. Defaults to "Limit Reached". */
  title?: string;
  /** Short description of which limit was reached (e.g. "email sends", "contact storage"). Used in default message. */
  limitType?: string;
  /** Override the full message. If not set, a default message is shown using limitType. */
  message?: React.ReactNode;
  /** Label for the primary action. Defaults to "Subscribe" (or "Renew" when variant is "renew"). */
  primaryActionLabel?: string;
  /** "subscribe" = suggest upgrading; "renew" = suggest renewing current plan. Affects default message and optional label. */
  variant?: 'subscribe' | 'renew';
  /** Called when user clicks Subscribe/Renew. Typically navigate to /subscription or open upgrade flow. */
  onPrimaryAction: () => void;
  /** Label for the secondary button. Defaults to "Maybe later". */
  secondaryActionLabel?: string;
}

const defaultMessage = (
  limitType?: string,
  variant?: 'subscribe' | 'renew'
): string => {
  const limit = limitType ? ` (${limitType})` : '';
  if (variant === 'renew') {
    return `You've reached your plan limit${limit}. Renew your subscription to continue using this feature.`;
  }
  return `You've reached your plan limit${limit}. Upgrade your subscription or renew to continue.`;
};

/**
 * Dialog shown when a subscription/plan limit is reached.
 * Suggests the user to subscribe (upgrade) or renew, with a primary action (e.g. go to Subscription page).
 */
export const LimitReachedDialog: React.FC<LimitReachedDialogProps> = ({
  isOpen,
  onClose,
  title = 'Limit Reached',
  limitType,
  message,
  primaryActionLabel,
  variant = 'subscribe',
  onPrimaryAction,
  secondaryActionLabel = 'Maybe later',
}) => {
  const displayMessage = message ?? defaultMessage(limitType, variant);
  const primaryLabel =
    primaryActionLabel ?? (variant === 'renew' ? 'Renew' : 'Subscribe');

  const handlePrimary = () => {
    onPrimaryAction();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      showCloseButton={true}
      closeOnBackdrop={true}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {secondaryActionLabel}
          </Button>
          <Button variant="primary" onClick={handlePrimary}>
            {primaryLabel}
          </Button>
        </>
      }
    >
      <Content>
        <IconWrap>
          <CreditCard size={32} />
        </IconWrap>
        <Message>{displayMessage}</Message>
      </Content>
    </Dialog>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary.main}18;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Message = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export default LimitReachedDialog;
