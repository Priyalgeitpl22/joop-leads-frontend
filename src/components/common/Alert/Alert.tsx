import React from 'react';
import styled from 'styled-components';
import {
  AlertTriangle,
  Info,
  CheckCircle,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';

export type AlertType = 'warning' | 'info' | 'success' | 'error';

export interface AlertAction {
  label: string;
  onClick?: () => void;
}

export interface AlertProps {
  /** Visual type: warning (amber), info (blue), success (green), error (red) */
  type?: AlertType;
  /** Main message. Can be string or ReactNode. */
  message: React.ReactNode;
  /** Optional action buttons shown below the message */
  actions?: AlertAction[];
  /** Optional custom icon (overrides type default) */
  icon?: React.ReactNode;
  /** Optional override for container background */
  backgroundColor?: string;
  /** Optional override for message text color */
  textColor?: string;
  /** Optional className */
  className?: string;
}

const TYPE_CONFIG: Record<
  AlertType,
  { bg: string; icon: LucideIcon; iconColor: string; buttonBg: string }
> = {
  warning: {
    bg: '#FEF3C7',
    icon: AlertTriangle,
    iconColor: '#D97706',
    buttonBg: '#D97706',
  },
  info: {
    bg: '#DBEAFE',
    icon: Info,
    iconColor: '#2563EB',
    buttonBg: '#2563EB',
  },
  success: {
    bg: '#D1FAE5',
    icon: CheckCircle,
    iconColor: '#059669',
    buttonBg: '#059669',
  },
  error: {
    bg: '#FEE2E2',
    icon: AlertCircle,
    iconColor: '#DC2626',
    buttonBg: '#DC2626',
  },
};

export const Alert: React.FC<AlertProps> = ({
  type = 'warning',
  message,
  actions = [],
  icon,
  backgroundColor,
  textColor,
  className,
}) => {
  const config = TYPE_CONFIG[type];
  const IconComponent = config.icon;

  return (
    <AlertContainer
      $bg={backgroundColor ?? config.bg}
      $textColor={textColor ?? '#374151'}
      className={className}
    >
      <IconWrap $color={config.iconColor}>
        {icon ?? <IconComponent size={22} strokeWidth={2.25} />}
      </IconWrap>
      <Content>
        <Message>{message}</Message>
        {actions.length > 0 && (
          <Actions>
            {actions.map((action, index) => (
              <ActionButton
                key={index}
                $bg={config.buttonBg}
                onClick={action.onClick ?? undefined}
                type="button"
              >
                {action.label}
              </ActionButton>
            ))}
          </Actions>
        )}
      </Content>
    </AlertContainer>
  );
};

const AlertContainer = styled.div<{ $bg: string; $textColor: string }>`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ $bg }) => $bg};
  color: ${({ $textColor }) => $textColor};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const IconWrap = styled.div<{ $color: string }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  margin-top: 2px;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Message = styled.div`
  color: inherit;
  word-break: break-word;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button<{ $bg: string }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ $bg }) => $bg};
  color: #ffffff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.85;
  }
`;

export default Alert;
