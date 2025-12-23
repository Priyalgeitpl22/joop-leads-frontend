import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const InputContainer = styled.div<{ $hasError: boolean; $size: string; $focused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ $hasError, $focused, theme }) =>
    $hasError
      ? theme.colors.error.main
      : $focused
      ? theme.colors.primary.main
      : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return css`
          height: 36px;
          padding: 0 10px;
        `;
      case 'lg':
        return css`
          height: 48px;
          padding: 0 16px;
        `;
      default:
        return css`
          height: 42px;
          padding: 0 14px;
        `;
    }
  }}

  ${({ $focused, theme }) =>
    $focused &&
    css`
      box-shadow: 0 0 0 3px ${theme.colors.primary.main}20;
    `}

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error.main : theme.colors.primary.main};
  }
`;

const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  ${({ $position }) => ($position === 'left' ? 'margin-right: 10px;' : 'margin-left: 10px;')}
`;

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const PasswordToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const HelperText = styled.span<{ $isError: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.error.main : theme.colors.text.tertiary};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      fullWidth = true,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <InputContainer $hasError={!!error} $size={size} $focused={focused}>
          {leftIcon && <IconWrapper $position="left">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            type={inputType}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {isPassword && (
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          )}
          {rightIcon && !isPassword && (
            <IconWrapper $position="right">{rightIcon}</IconWrapper>
          )}
        </InputContainer>
        {(error || helperText) && (
          <HelperText $isError={!!error}>{error || helperText}</HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
export default Input;

