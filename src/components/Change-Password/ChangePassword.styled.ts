import { Box, Card, Button } from "@mui/material";
import styled  from "@emotion/styled";

export const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ChangePasswordCard = styled(Card)`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--border-dark);
  width: 80%;
  max-width: 800px;
  padding: 16px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const IllustrationSection = styled(Box)`
  flex: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormSection = styled(Box)`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 8px;
  font-weight: bold;
  text-transform: none;
  transition: all 0.3s ease-in-out;
  background: var(--theme-color);
  color: white;
  width: 100%;

  &:hover {
    background: var(--theme-color);
    opacity: 0.9;
  }
`;
