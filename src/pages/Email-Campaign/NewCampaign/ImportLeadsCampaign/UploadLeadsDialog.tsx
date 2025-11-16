import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import BlockIcon from "@mui/icons-material/Block";
import MailIcon from "@mui/icons-material/Mail";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import { ILeadsCounts } from "../interfaces";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UploadCsvDialogProps {
  open: boolean;
  uploadCounts?: ILeadsCounts;
  onClose: () => void;
  setIsNextDisabled?: (status: boolean) => void;
}

const statusItems = [
  {
    label: "Duplicate Leads",
    key: "duplicateCount",
    icon: WarningIcon,
    color: "#6b7280",
    bgColor: "#f3f4f6",
  },
  {
    label: "Blocked Email Count",
    key: "blockedCount",
    icon: BlockIcon,
    color: "#6b7280",
    bgColor: "#f3f4f6",
  },
  {
    label: "Empty Email Count",
    key: "emptyCount",
    icon: MailIcon,
    color: "#6b7280",
    bgColor: "#f3f4f6",
  },
  {
    label: "Invalid Email Count",
    key: "invalidCount",
    icon: WarningIcon,
    color: "#6b7280",
    bgColor: "#f3f4f6",
  },
  {
    label: "Unsubscribed Leads",
    key: "unsubscribedCount",
    icon: UnsubscribeIcon,
    color: "#6b7280",
    bgColor: "#f3f4f6",
  },
];

const UploadLeadsDialog: React.FC<UploadCsvDialogProps> = ({
  open,
  uploadCounts,
  onClose,
  setIsNextDisabled,
}) => {
  useEffect(() => {
    if (open && uploadCounts?.uploadedCount === 0) {
      toast.error("No leads were uploaded. Please try again.");
      if (setIsNextDisabled) {
        setIsNextDisabled(true);
      }
    }
  }, [open, uploadCounts, setIsNextDisabled]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            fontWeight: "700",
            fontSize: "20px",
            background: "#ffffff",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            color: "#1f2937",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {uploadCounts?.uploadedCount === 0 ? (
              <CancelIcon sx={{ color: "#ef4444", fontSize: "24px" }} />
            ) : (
              <CheckCircleIcon sx={{ color: "#10b981", fontSize: "24px" }} />
            )}

            <span>
              {uploadCounts?.uploadedCount === 0
                ? "No Leads Imported"
                : "Leads Imported Successfully"}
            </span>
          </Box>
        </DialogTitle>
      </Box>

      <DialogContent sx={{ paddingTop: "24px" }}>
        <Box
          sx={{
            backgroundColor: "#f0f9ff",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#1e40af", fontSize: "14px", fontWeight: "600" }}
            >
              Total Uploaded Contacts
            </Typography>
            <Typography
              sx={{
                color: "var(--primary-dark)",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              {uploadCounts?.uploadedCount}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "16px",
          }}
        >
          Import Summary
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {statusItems.map((item, index) => {
            const Icon = item.icon;
            const count = uploadCounts?.[item.key as keyof ILeadsCounts] || 0;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box
                    sx={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: item.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color: item.color, fontSize: "18px" }} />
                  </Box>
                  <Typography
                    sx={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: item.color,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {count}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "28px",
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--primary-dark)",
              color: "white",
              padding: "10px 24px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
            onClick={onClose}
          >
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UploadLeadsDialog;
