import styled, { css, keyframes } from 'styled-components';

// ============================================================================
// Page Layout
// ============================================================================

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `0 ${theme.spacing.xl}`};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

export const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

// ============================================================================
// Billing Toggle
// ============================================================================

export const GeneralPlanCardWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ComparisonTableWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BillingToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BillingToggle = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const BillingOption = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.grey};

  &:hover {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.text.primary : theme.colors.text.grey};
  }
`;

export const SaveBadge = styled.span`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: 600;
`;

// ============================================================================
// Plans Grid
// ============================================================================

export const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ============================================================================
// Plan Card
// ============================================================================

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const PlanCard = styled.div<{ $selected?: boolean; $featured?: boolean }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  position: relative;
  min-width: 0;
  border: 2px solid ${({ $selected, $featured, theme }) =>
    $selected
      ? theme.colors.primary
      : $featured
      ? theme.colors.primary + '40'
      : theme.colors.border.light};
  
  ${({ $selected }) =>
    $selected &&
    css`
      transform: scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
    `}

  ${({ $featured }) =>
    $featured &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, 
          ${({ theme }) => theme.colors.primary}, 
          #8b5cf6, 
          ${({ theme }) => theme.colors.primary}
        );
        background-size: 200% 100%;
        animation: ${shimmer} 3s linear infinite;
      }
    `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const PlanHeader = styled.div<{ $planType?: string }>`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ $planType, theme }) => {
    switch ($planType) {
      case 'FREE':
        return `linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main})`;
      default:
        return `linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main})`;
    }
  }};
  text-align: center;
`;

export const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const PlanBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const PlanDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
  min-height: 40px;
`;

export const PlanPriceContainer = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const PlanPriceFree = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// ============================================================================
// Features List
// ============================================================================

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FeatureItem = styled.li<{ $included?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $included, theme }) =>
    $included ? theme.colors.text.primary : theme.colors.text.tertiary};
  
  svg {
    flex-shrink: 0;
    color: ${({ $included, theme }) =>
      $included ? '#10b981' : theme.colors.text.tertiary};
  }
`;

export const FeatureValue = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: auto;
  font-weight: 500;
`;

// ============================================================================
// Selection Indicator
// ============================================================================

export const SelectionIndicator = styled.div<{ $selected?: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.border.main};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    color: white;
  }
`;

// ============================================================================
// Get Started Button
// ============================================================================

export const GetStartedContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const GetStartedButton = styled.button<{ disabled?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 600;
  color: white;
  background: ${({ disabled }) =>
    disabled
      ? ({ theme }) => theme.colors.background.tertiary
      : ({ theme }) => theme.colors.success?.main ?? "#22c55e"};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.transitions.normal};
  min-width: 300px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// ============================================================================
// Dialog/Modal
// ============================================================================

export const DialogOverlay = styled.div<{ $open?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const DialogContent = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const DialogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const DialogDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

export const DialogActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

export const DialogButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  background: ${({ theme }) => theme.colors.background.tertiary};

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? css`
          background: ${({ theme }) => theme.colors.primary.main};
          color: white;
          border: none;

          &:hover {
            background: ${({ theme }) => theme.colors.primary.dark};
          }
        `
      : css`
          background: transparent;
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border.main};

          &:hover {
            background: ${theme.colors.background.tertiary};
          }
        `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ============================================================================
// Success Icon Animation
// ============================================================================

const successPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  animation: ${successPulse} 2s ease-in-out infinite;

  svg {
    color: white;
    width: 40px;
    height: 40px;
  }
`;

// ============================================================================
// Loading State
// ============================================================================

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// ============================================================================
// Current Plan Badge
// ============================================================================

export const CurrentPlanBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

