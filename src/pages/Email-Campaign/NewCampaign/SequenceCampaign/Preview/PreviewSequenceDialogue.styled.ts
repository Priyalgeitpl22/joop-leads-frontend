import styled from "@emotion/styled";
import {
  DialogTitle,
  IconButton,
  FormControl,
  Typography,
  Box,
  Select,
  Button,
} from "@mui/material";

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: 600;
  font-size: 18px;
  background: #ffffff;
  padding: 16px 24px;
  color: #1f2937;
  border-bottom: 1px solid rgb(229, 231, 235);
`;

export const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 2px;
  color: #6b7280;

  &:hover {
    color: #1f2937;
    background-color: #f3f4f6;
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin-top: 16px;
  width: 300px;
`;

export const StyledSelectTypography = styled(Typography)`
  margin-bottom: 8px;
  margin-top: 16px;
  color: #1f2937;
  font-weight: 600;
  font-size: 14px;
`;

export const StyledHelpTypography = styled(Typography)`
  margin-top: 12px;
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 13px;

  .help-icon {
    margin-right: 6px;
    font-size: 18px;
    color: #3b82f6;
  }
`;

export const EmailPreviewBox = styled(Box)`
  margin-top: 24px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`;

export const PreviewRow = styled(Box)`
  display: flex;
  margin-top: 12px;
  gap: 16px;
  align-items: flex-start;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const PreviewLabel = styled(Typography)`
  width: 100px;
  color: #6b7280;
  font-weight: 500;
  font-size: 13px;
  flex-shrink: 0;
`;

export const FooterBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  width: 100%;
  gap: 24px;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 16px 24px;
`;

export const FooterTextBox = styled(Box)`
  flex: 1;
  gap: 4px;
  min-width: 0;
`;

export const ClippedText = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6b7280;
  font-size: 13px;
`;

export const StyledSelect = styled(Select)`
  background-color: white !important;
  height: 40px;
  border-radius: 6px;
  color: #1f2937;
  font-size: 14px;

  .MuiSelect-icon {
    color: #3b82f6;
  }

  fieldset {
    border-color: #e5e7eb !important;
  }

  &:hover fieldset {
    border-color: #3b82f6 !important;
  }

  &.Mui-focused fieldset {
    border-color: #3b82f6 !important;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  padding: 8px 24px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: none;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background-color: #d1d5db;
    color: #9ca3af;
  }

  .spinner {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
