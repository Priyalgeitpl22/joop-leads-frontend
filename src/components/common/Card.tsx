import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const CardContainer = styled.div<{ $variant: string; $padding: string }>`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.border.main};
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.lg};
        `;
      default:
        return css`
          border: 1px solid ${theme.colors.border.light};
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}

  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return '';
      case 'sm':
        return css`
          padding: ${theme.spacing.sm};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.xl};
        `;
      default:
        return css`
          padding: ${theme.spacing.lg};
        `;
    }
  }}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
}) => {
  return (
    <CardContainer $variant={variant} $padding={padding} className={className}>
      {children}
    </CardContainer>
  );
};

// Card Header
export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 4px 0 0 0;
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export default Card;
