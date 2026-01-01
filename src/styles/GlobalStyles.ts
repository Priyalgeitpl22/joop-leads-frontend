import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.secondary};
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[400]};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.neutral[500]};
    }
  }

  /* Selection styles */
  ::selection {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;

  ${({ $status, theme }) => {
    switch ($status?.toLowerCase()) {
      case "active":
        return `
        background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
        color: #1b5e20;
        border: 1px solid #66bb6a;
        box-shadow: inset 0 0 0 1px rgba(76, 175, 80, 0.15);
      `;
      case "inprogress":
        return `
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          color: #0d47a1;
          border: 1px solid #64b5f6;
          box-shadow: inset 0 0 0 1px rgba(33, 150, 243, 0.15);
        `;
      case "replied":
        return `
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          color: #1b5e20;
          border: 1px solid #66bb6a;
          box-shadow: inset 0 0 0 1px rgba(76, 175, 80, 0.15);
        `;
      case "success":
        return `
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          color: #1b5e20;
          border: 1px solid #66bb6a;
          box-shadow: inset 0 0 0 1px rgba(76, 175, 80, 0.15);
        `;
      case "completed":
        return `
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          color: #1b5e20;
          border: 1px solid #66bb6a;
          box-shadow: inset 0 0 0 1px rgba(76, 175, 80, 0.15);
        `;
      case "blocked":
        return `
          background: linear-gradient(135deg, #ffebee, #ffcdd2);
          color: #b71c1c;
          border: 1px solid #ef5350;
          box-shadow: inset 0 0 0 1px rgba(244, 67, 54, 0.15);
        `;
      case "bounced":
        return `
          background: linear-gradient(135deg, #ffebee, #ffcdd2);
          color: #b71c1c;
          border: 1px solid #ef5350;
          box-shadow: inset 0 0 0 1px rgba(244, 67, 54, 0.15);
        `;
      case "unsubscribed":
        return `
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          color: #e65100;
          border: 1px solid #ffa726;
          box-shadow: inset 0 0 0 1px rgba(255, 152, 0, 0.15);
        `;
      default:
        return `
          background: ${theme.colors.background.secondary};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border.main};
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

export const SectionHeaderTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0; 
`;



