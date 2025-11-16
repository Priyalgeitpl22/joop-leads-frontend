import styled from "@emotion/styled";
import { DialogTitle, IconButton} from "@mui/material";

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: bold;
  font-size: 18px;
  // background: #f1f2fb;
  padding: 12px 24px;
  color: var(--text-secondary);
`;

export const CloseIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 2px;
`;


