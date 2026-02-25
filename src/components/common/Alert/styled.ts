import styled from "styled-components";

export type AlertChipVariant = "alert" | "error" | "success" | "warning" | "info";

export interface ChipStyledProps {
  $variant: AlertChipVariant;
}

export const Chip = styled.span<ChipStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 500;
  width: fit-content;
  min-width: 50px;

  ${(props) => {
    const v = props.$variant;
    const { theme } = props;
    /* alert uses same palette as warning (amber) */
    if (v === "success")
      return `
        background: ${theme.colors.success.light}22;
        color: ${theme.colors.success.dark};
        border: 1px solid ${theme.colors.success.main};
      `;
    if (v === "warning" || v === "alert")
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
`;

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
