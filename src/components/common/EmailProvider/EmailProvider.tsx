import React from "react";
import { EmailProviderWrap, EmailProviderIcon } from "./EmailProvider.styled";

export type EmailProviderType = "gmail" | "outlook" | "imap" | "smtp";

const PROVIDER_CONFIG: Record<
  EmailProviderType,
  { src: string; alt: string; label: string }
> = {
  gmail: { src: "/Images/mail.png", alt: "Gmail", label: "Gmail" },
  outlook: { src: "/Images/outlook.webp", alt: "Outlook", label: "Outlook" },
  imap: { src: "/Images/imap.png", alt: "IMAP", label: "IMAP" },
  smtp: { src: "/Images/smtp.png", alt: "SMTP", label: "SMTP" },
};

export interface EmailProviderProps {
  type: EmailProviderType | string;
  size?: number;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

export const EmailProvider: React.FC<EmailProviderProps> = ({
  type,
  size = 18,
  height = 13,
  showLabel = true,
  className,
}) => {
  const key = type?.toLowerCase() as EmailProviderType;
  const config = key && PROVIDER_CONFIG[key];

  if (!config) {
    return <span className={className}>{type ?? "—"}</span>;
  }

  return (
    <EmailProviderWrap $size={size} className={className}>
      <EmailProviderIcon
        src={config.src}
        alt={config.alt}
        width={size}
        height={height}
      />
      {showLabel && <span>{config.label}</span>}
    </EmailProviderWrap>
  );
};

export default EmailProvider;
