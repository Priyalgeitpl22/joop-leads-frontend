import styled from "styled-components";

export const CardContainer = styled.div`
  height: 90%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
`;

export const UploadIcon = styled.img`
  display: block;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
`;

export const OptionTitle = styled.h3`
  text-align: center;
  text-decoration: underline;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: ${({ theme }) => theme.spacing.lg} 0px;
  line-height: 1.6;
`;

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
`;

export const FileUploadContainer = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ChooseFileButton = styled.label`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.border.main};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const FileName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StartButton = styled.button`
  padding: 0 ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: 0.2s;
`;

export const VerifyButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: background 0.2s ease;
`;

export const VerifyInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const VerifyInputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 45px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme }) => theme.colors.background.primary};
`;

