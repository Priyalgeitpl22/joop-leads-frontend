import styled, { css } from "styled-components";

export type AlertBannerType = "warning" | "error" | "success" | "info";

export interface BannerStyledProps {
  $type: AlertBannerType;
}

const getBannerStyles = ($type: AlertBannerType) => {
  switch ($type) {
    case "success":
      return css`
        background: ${({ theme }) => `${theme.colors.success.main}15`};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      `;
    case "warning":
      return css`
        background: #fcf8f3;
        box-shadow: ${({ theme }) => theme.shadows.sm};
      `;
    case "error":
      return css`
        background: ${({ theme }) => `${theme.colors.error.main}12`};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      `;
    case "info":
      return css`
        background: #e0f2fe22;
        box-shadow: ${({ theme }) => theme.shadows.sm};
      `;
    default:
      return css`
        background: ${({ theme }) => theme.colors.background.secondary};
        box-shadow: ${({ theme }) => theme.shadows.sm};
      `;
  }
};

const getIconColor = ($type: AlertBannerType) => {
  switch ($type) {
    case "success":
      return css`color: ${({ theme }) => theme.colors.success.dark};`;
    case "warning":
      return css`color: ${({ theme }) => theme.colors.warning.dark};`;
    case "error":
      return css`color: ${({ theme }) => theme.colors.error.dark};`;
    case "info":
      return css`color: #0369a1;`;
    default:
      return css`color: ${({ theme }) => theme.colors.text.secondary};`;
  }
};

const getButtonStyles = ($type: AlertBannerType) => {
  switch ($type) {
    case "success":
      return css`
        background: ${({ theme }) => theme.colors.success.main};
        color: ${({ theme }) => theme.colors.success.contrast};
        &:hover {
          background: ${({ theme }) => theme.colors.success.dark};
        }
      `;
    case "warning":
      return css`
        background: ${({ theme }) => theme.colors.warning.main};
        color: ${({ theme }) => theme.colors.warning.contrast};
        &:hover {
          background: ${({ theme }) => theme.colors.warning.dark};
        }
      `;
    case "error":
      return css`
        background: ${({ theme }) => theme.colors.error.main};
        color: ${({ theme }) => theme.colors.error.contrast};
        &:hover {
          background: ${({ theme }) => theme.colors.error.dark};
        }
      `;
    case "info":
      return css`
        background: #0ea5e9;
        color: #fff;
        &:hover {
          background: #0284c7;
        }
      `;
    default:
      return css`
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.contrast};
      `;
  }
};

const getDetailPillStyles = ($type: AlertBannerType) => {
  switch ($type) {
    case "success":
      return css`
        background: ${({ theme }) => `${theme.colors.success.light}33`};
        color: ${({ theme }) => theme.colors.success.dark};
        border: 1px solid ${({ theme }) => theme.colors.success.main};
      `;
    case "warning":
      return css`
        background: ${({ theme }) => `${theme.colors.warning.light}33`};
        color: ${({ theme }) => theme.colors.warning.dark};
        border: 1px solid ${({ theme }) => theme.colors.warning.main};
      `;
    case "error":
      return css`
        background: ${({ theme }) => `${theme.colors.error.light}33`};
        color: ${({ theme }) => theme.colors.error.dark};
        border: 1px solid ${({ theme }) => theme.colors.error.main};
      `;
    case "info":
      return css`
        background: #e0f2fe;
        color: #0369a1;
        border: 1px solid #0ea5e9;
      `;
    default:
      return css`
        background: ${({ theme }) => theme.colors.background.tertiary};
        color: ${({ theme }) => theme.colors.text.secondary};
        border: 1px solid ${({ theme }) => theme.colors.border.main};
      `;
  }
};

export const Banner = styled.div<BannerStyledProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  ${({ $type }) => getBannerStyles($type)}
`;

export const NavButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const IconWrap = styled.div<BannerStyledProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  ${({ $type }) => getIconColor($type)}
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DetailPill = styled.span<BannerStyledProps>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 500;
  ${({ $type }) => getDetailPillStyles($type)}
`;

export const Actions = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ActionButton = styled.button<BannerStyledProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  ${({ $type }) => getButtonStyles($type)}

  &:hover {
    opacity: 0.95;
  }
  &:active {
    opacity: 0.9;
  }
`;
