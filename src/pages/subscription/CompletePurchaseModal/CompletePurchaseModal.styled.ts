import styled from "styled-components";

const primaryMain = ({ theme }: { theme: { colors: { primary: { main: string } | string } } }) =>
  typeof theme.colors.primary === "object" ? theme.colors.primary.main : theme.colors.primary;

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 520px;
  width: 100%;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PlanCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const PlanName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PlanPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 600;
  color: ${primaryMain};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const AddonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const AddonRow = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? primaryMain({ theme }) : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: border-color 0.2s ease;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: ${primaryMain};
  cursor: pointer;
`;

export const AddonContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AddonTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

export const AddonDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const AddonPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  color: ${primaryMain};
  white-space: nowrap;
`;

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuantityValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 500;
`;

export const SummarySection = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SummaryTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TotalAmount = styled.span`
  color: ${({ theme }) => theme.colors.error?.main ?? "#dc2626"};
`;

export const Footer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const CancelButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const SubmitButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  background: ${({ theme }) => theme.colors.success?.main ?? "#22c55e"};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    filter: brightness(1.05);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
