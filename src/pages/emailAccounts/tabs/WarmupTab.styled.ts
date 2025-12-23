import styled from 'styled-components';

export const WarmupContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const InfoText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const SettingCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingInfo = styled.div`
  flex: 1;

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.neutral[300]};
    transition: 0.3s;
    border-radius: 26px;

    &:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  input:checked + span:before {
    transform: translateX(22px);
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme, $hasError }) => $hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => $hasError ? theme.colors.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => $hasError ? theme.colors.error.main : theme.colors.primary.main}20;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

export const SliderTrack = styled.div`
  position: relative;
  height: 6px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: 3px;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const SliderFill = styled.div<{ $percentage: number }>`
  position: absolute;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 3px;
  width: ${({ $percentage }) => $percentage}%;
`;

export const SliderInput = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing.md} 0;

  &::-webkit-slider-runnable-track {
    height: 6px;
    background: ${({ theme }) => theme.colors.neutral[200]};
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    margin-top: -7px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-track {
    height: 6px;
    background: ${({ theme }) => theme.colors.neutral[200]};
    border-radius: 3px;
  }

  &::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const TagInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

export const TagInput = styled.input<{ $hasError?: boolean }>`
  width: 120px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme, $hasError }) => $hasError ? theme.colors.error.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => $hasError ? theme.colors.error.main : theme.colors.primary.main};
  }
`;

export const TagPreview = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

  input {
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.colors.primary.main};
    margin-top: 2px;
  }
`;

export const CheckboxInfo = styled.div`
  flex: 1;

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const ErrorText = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error.main};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

