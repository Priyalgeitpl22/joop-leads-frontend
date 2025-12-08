import React from "react";
import {
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CustomDialogHeader,
  CustomDialogContainer,
  CustomDialogBody,
  SecondaryButton,
} from "../../styles/global.styled";

interface CustomDialogProps {
  title: string;
  description?: string;
  buttonText?: string;
  open: boolean;
  onClose: () => void;
  handleSave?: () => void;
  loading?: boolean;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  showOkButton?: boolean;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  description,
  buttonText,
  open,
  onClose,
  handleSave,
  loading,
  showCancelButton = true,
  cancelButtonText = "Cancel",
  showOkButton = true,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <CustomDialogContainer>
        <CustomDialogHeader>
          <p>{title}</p>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </CustomDialogHeader>

        <CustomDialogBody>
          <p>{description}</p>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              color: "var(--text-white)",
            }}
          >
            {showCancelButton && (
              <SecondaryButton onClick={onClose}>
                <p>{cancelButtonText}</p>
              </SecondaryButton>
            )}
            {showOkButton && (
              <Button
                style={{
                  minWidth: "122px",
                }}
                onClick={handleSave}
                disabled={loading}
              >
                {!loading && <p>{buttonText}</p>}
                {loading && (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                )}
              </Button>
            )}
          </div>
        </CustomDialogBody>

        {/* <CustomDialogFooter>
        </CustomDialogFooter> */}
      </CustomDialogContainer>
    </Dialog>
  );
};
