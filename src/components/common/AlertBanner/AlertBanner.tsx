import React from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  MonitorCheck,
} from "lucide-react";
import {
  Banner,
  NavButton,
  IconWrap,
  Content,
  Title,
  DetailPill,
  Actions,
  ActionButton,
} from "./AlertBanner.styled";
import type { AlertBannerType } from "./AlertBanner.styled";

export type { AlertBannerType } from "./AlertBanner.styled";

export interface AlertBannerProps {
  /** Banner variant: warning | error | success | info */
  type: AlertBannerType;
  /** Main title text */
  title: string;
  /** Optional secondary detail (e.g. "1 account needs attention") shown as a pill */
  detail?: string;
  /** Button label (e.g. "Fix now"). If not provided, no button is shown. */
  buttonText?: string;
  /** Called when the action button is clicked */
  onButtonClick?: () => void;
  /** Optional icon to show to the right of the button text */
  buttonRightIcon?: React.ReactNode;
  /** Show previous/next nav arrows (e.g. for multiple banners) */
  showNavArrows?: boolean;
  /** Called when previous arrow is clicked */
  onPrev?: () => void;
  /** Called when next arrow is clicked */
  onNext?: () => void;
  className?: string;
}

const TYPE_ICONS: Record<AlertBannerType, React.ReactNode> = {
  warning: <AlertTriangle size={24} strokeWidth={2} />,
  error: <XCircle size={24} strokeWidth={2} />,
  success: <CheckCircle size={24} strokeWidth={2} />,
  info: <Info size={24} strokeWidth={2} />,
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  title,
  detail,
  buttonText,
  onButtonClick,
  buttonRightIcon,
  showNavArrows = false,
  onPrev,
  onNext,
  className,
}) => {
  const hasButton = Boolean(buttonText);

  return (
    <Banner $type={type} className={className}>
      {showNavArrows && (
        <NavButton type="button" onClick={onPrev} aria-label="Previous">
          <ChevronLeft size={18} />
        </NavButton>
      )}
      <IconWrap $type={type}>{TYPE_ICONS[type]}</IconWrap>
      <Content>
        <Title>{title}</Title>
        {detail != null && detail !== "" && (
          <DetailPill $type={type}>{detail}</DetailPill>
        )}
      </Content>
      <Actions>
        {hasButton && (
          <ActionButton
            $type={type}
            type="button"
            onClick={onButtonClick}
            aria-label={buttonText}
          >
            {buttonText}
            {buttonRightIcon ?? <MonitorCheck size={16} />}
          </ActionButton>
        )}
        {showNavArrows && (
          <NavButton type="button" onClick={onNext} aria-label="Next">
            <ChevronRight size={18} />
          </NavButton>
        )}
      </Actions>
    </Banner>
  );
};

export default AlertBanner;
