import { Delete } from "@mui/icons-material";
import { DialogContent, DialogTitle } from "@mui/material";
import styled from "styled-components";

export const StyledDialogContent = styled(DialogContent)`
  max-width: 400px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Text = styled.div`
  color: #4b5563;
  margin-top: 8px;
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

export const DeleteIcon = styled(Delete)({
  height: "10%",
  width: "10%",
});