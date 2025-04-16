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
  font-weight: bold;
  font-size: 18px;
  background: #f1f2fb;
  padding: 12px 24px;
`;

export const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 2px;
`;

export const StyledFormControl = styled(FormControl)`
  margin-top: 16px;
  width: 300px;
`;

export const StyledSelectTypography = styled(Typography)`
  margin-bottom: -13px;
  margin-top: 16px;
`;

export const StyledHelpTypography = styled(Typography)`
  margin-top: 17px;
  display: flex;
  align-items: center;

  .help-icon {
    margin-right: 4px;
    font-size: 18px;
  }
`;

export const EmailPreviewBox = styled(Box)`
  margin-top: 24px;
`;

export const PreviewRow = styled(Box)`
  display: flex;
  margin-top: 16px;
  gap: 8px;
`;

export const PreviewLabel = styled(Typography)`
  width: 100px;
  color: gray;
`;

export const FooterBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  width: 100%;
  gap: 45px;
  background: #f1f2fb;
  padding: 12px 24px;
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
`;

export const StyledSelect = styled(Select)`
  background-color: white !important;
  height: 40px;
  border-radius: 6px;
  color: black;
  .MuiSelect-icon {
    color: black;
  }
  fieldset {
    border-color: rgba(0, 0, 0, 0.23); // lighter border
  }
`;

export const StyledButton = styled(Button)`
  background-color: var(--theme-color);
  color: white;
  padding: 8px 24px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: none;

  &:disabled {
    background-color: gray;
    color: #ccc;
  }

  .spinner {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    width: 20px;
    height: 20px;
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
