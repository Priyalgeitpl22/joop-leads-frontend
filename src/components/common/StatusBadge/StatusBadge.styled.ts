import styled from "styled-components";

export type StatusBadgeVariant = "success" | "warning" | "error" | "info" | "pending";

export interface StatusBadgeStyledProps {
  $variant?: StatusBadgeVariant;
  $status?: string;
}

const STATUS_TO_VARIANT: Record<string, StatusBadgeVariant> = {
  sent: "success",
  replied: "success",
  success: "success",
  completed: "success",
  active: "success",
  scheduled: "success",
  paused: "success",
  queued: "info",
  pending: "info",
  draft: "info",
  blocked: "error",
  bounced: "error",
  stopped: "warning",
  failed: "error",
  error: "error",
  unsubscribed: "warning",
};

function getVariant(props: StatusBadgeStyledProps): StatusBadgeVariant | null {
  if (props.$variant) return props.$variant;
  if (props.$status) return STATUS_TO_VARIANT[props.$status?.toLowerCase()] ?? null;
  return null;
}

export const StatusBadge = styled.span<StatusBadgeStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;

  ${(props) => {
    const v = getVariant(props);
    const { theme } = props;
    if (v === "success")
      return `
        background: ${theme.colors.success.light}22;
        color: ${theme.colors.success.dark};
        border: 1px solid ${theme.colors.success.main};
      `;
    if (v === "warning")
      return `
        background: ${theme.colors.warning.light}22;
        color: ${theme.colors.warning.dark};
        border: 1px solid ${theme.colors.warning.main};
      `;
    if (v === "error")
      return `
        background: ${theme.colors.error.light}22;
        color: ${theme.colors.error.dark};
        border: 1px solid ${theme.colors.error.main};
      `;
    if (v === "info")
      return `
        background: #e0f2fe;
        color: #0369a1;
        border: 1px solid #0ea5e9;
      `;
    return `
      background: ${theme.colors.background.secondary};
      color: ${theme.colors.text.secondary};
      border: 1px solid ${theme.colors.border.main};
    `;
  }}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;
