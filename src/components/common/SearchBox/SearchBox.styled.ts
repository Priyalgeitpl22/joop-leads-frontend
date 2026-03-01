import styled from "styled-components";

export const SearchWrapper = styled.div<{ $width?: string; $minWidth?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ $width }) => $width ?? "100%"};
  min-width: ${({ $minWidth }) => $minWidth ?? "250px"};
`;

export const SearchIconWrap = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 36px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
