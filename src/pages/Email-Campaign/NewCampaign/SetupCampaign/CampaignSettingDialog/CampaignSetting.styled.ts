import { Typography } from "@mui/material";
import { styled } from "styled-components";

export const SettingsContainer = styled.div`
  padding: 32px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  max-height: calc(620px - 120px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;

    &:hover {
      background: #9ca3af;
    }
  }
`;

export const SettingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
`;

export const SectionTitle = styled(Typography)`
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

export const SectionDescription = styled(Typography)`
  color: #6b7280;
  font-size: 13px;
  line-height: 1.4;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;