import styled from "styled-components";

export const ButtonContent = styled.span<{ $isLoading?: boolean }>`
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const InputWrapper = styled.div<{
  $hasError?: boolean;
  $isValid?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1.5px solid
    ${({ $hasError, $isValid, theme }) =>
      $hasError
        ? theme.colors.error.main
        : $isValid
          ? theme.colors.success.main
          : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error.main : theme.colors.primary.main};
    box-shadow: 0 0 0 3px
      ${({ $hasError, theme }) =>
        $hasError
          ? theme.colors.error.main + "15"
          : theme.colors.primary.main + "15"};
  }
`;

export const CardContainer = styled.div`
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`;

export const OptionTitle = styled.h3`
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const VerificationButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary.main}40;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.tertiary};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: ${({theme}) => theme.spacing.xs};
`

export const InputField = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background: transparent;
  border: none;
  outline: none;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;
