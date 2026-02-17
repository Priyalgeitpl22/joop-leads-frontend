import React from 'react';
import styled from 'styled-components';
import { Dialog } from './Dialog';
import { Button } from './Button';

export interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  /** Dialog title. Defaults to "Failure". */
  title?: string;
  /** Error message. Can be a string or ReactNode (e.g. JSX with links). */
  message: React.ReactNode;
  /** Label for the dismiss button. Defaults to "OK". */
  okLabel?: string;
}

/**
 * A simple dialog for displaying an error/failure message with a single OK button.
 * Use for SMTP/IMAP connection errors, validation failures, etc.
 * Message can include links: pass JSX with <a href="...">...</a> for "Learn more" / "Click here" style content.
 */
export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  title = 'Failure',
  message,
  okLabel = 'OK',
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      showCloseButton={false}
      closeOnBackdrop={false}
      footer={
        <Button variant="primary" onClick={onClose}>
          {okLabel}
        </Button>
      }
    >
      <ErrorDialogMessage>{message}</ErrorDialogMessage>
    </Dialog>
  );
};

/** Styled wrapper so message body and links look correct. */
const ErrorDialogMessage = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export default ErrorDialog;
