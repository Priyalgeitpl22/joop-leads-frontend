import React from 'react';
import styled, { css } from 'styled-components';
import { lightTheme } from '../../styles';

type Theme = typeof lightTheme;
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant, theme: Theme) => {
  const variants = {
    primary: css`
      background: ${theme.colors.primary.main};
      color: ${theme.colors.primary.contrast};
      border: 1px solid ${theme.colors.primary.main};

      &:hover:not(:disabled) {
        background: ${theme.colors.primary.dark};
        border-color: ${theme.colors.primary.dark};
      }
    `,
    secondary: css`
      background: ${theme.colors.secondary.main};
      color: ${theme.colors.secondary.contrast};
      border: 1px solid ${theme.colors.secondary.main};

      &:hover:not(:disabled) {
        background: ${theme.colors.secondary.dark};
        border-color: ${theme.colors.secondary.dark};
      }
    `,
    outline: css`
      background: transparent;
      color: ${theme.colors.primary.main};
      border: 1px solid ${theme.colors.border.main};

      &:hover:not(:disabled) {
        background: ${theme.colors.background.tertiary};
        border-color: ${theme.colors.primary.main};
      }
    `,
    ghost: css`
      background: transparent;
      color: ${theme.colors.text.primary};
      border: 1px solid transparent;

      &:hover:not(:disabled) {
        background: ${theme.colors.background.tertiary};
      }
    `,
    danger: css`
      background: ${theme.colors.error.main};
      color: ${theme.colors.error.contrast};
      border: 1px solid ${theme.colors.error.main};

      &:hover:not(:disabled) {
        background: ${theme.colors.error.dark};
        border-color: ${theme.colors.error.dark};
      }
    `,
  };

  return variants[variant];
};

const getSizeStyles = (size: ButtonSize, theme: Theme) => {
  const sizes = {
    sm: css`
      padding: 6px 12px;
      font-size: ${theme.typography.fontSize.sm};
      border-radius: ${theme.borderRadius.sm};
    `,
    md: css`
      padding: 10px 20px;
      font-size: ${theme.typography.fontSize.md};
      border-radius: ${theme.borderRadius.md};
    `,
    lg: css`
      padding: 14px 28px;
      font-size: ${theme.typography.fontSize.lg};
      border-radius: ${theme.borderRadius.md};
    `,
  };

  return sizes[size];
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant, theme }) => getVariantStyles($variant, theme)}
  ${({ $size, theme }) => getSizeStyles($size, theme)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </StyledButton>
  );
};

export default Button;

