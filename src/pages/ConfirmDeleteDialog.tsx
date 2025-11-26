import React from "react";
import { Dialog } from "@mui/material";
import {
  StyledDialogTitle,
  StyledDialogContent,
  Text,
  DialogFooter,
} from "./ConfirmDeleteDialog.styled";
import { Button2 } from "../styles/layout.styled";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Item?",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: { xs: "12px", sm: "12px" },
        },
      }}
    >
      <StyledDialogContent>
        <Trash2 style={{ color: "var(--error-color)" }} />
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <Text>{message}</Text>
        <DialogFooter>
          <Button2
            onClick={onClose}
            color={""}
            background={"var(--background-slate)"}
          >
            {cancelText}
          </Button2>
          <Button2
            onClick={onConfirm}
            color={"var(--text-white)"}
            background={"var(--error-color)"}
          >
            {confirmText}
          </Button2>
        </DialogFooter>
      </StyledDialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
