import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.background.secondary} 0%,
    ${({ theme }) => theme.colors.background.tertiary} 100%
  );
`;

export const AuthCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 480px;
  }
`;

export const IllustrationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.sidebar.background} 0%,
    #1a1a3e 100%
  );
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
    min-height: 200px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.primary.main} 0%,
    ${({ theme }) => theme.colors.primary.dark} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: 0.5px;
`;

export const IllustrationImage = styled.div`
  max-width: 320px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media (max-width: 768px) {
    max-width: 200px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const IllustrationTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: white;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const IllustrationSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: rgba(255, 255, 255, 0.7);
  max-width: 280px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

