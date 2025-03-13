import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ExportCsvDialogProps {
  open: boolean;
  onClose: () => void;
}

const DownloadCsvFileDialog: React.FC<ExportCsvDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ position: "relative" }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 5 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Dialog Title */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
          }}
        >
          Download as CSV
        </DialogTitle>

        {/* Selection Option */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px 16px",
              mt: 2,
              bgcolor: "#f9f9fc",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Radio checked sx={{ color: "#6c4df8" }} />
              <Typography fontSize={16} fontWeight={500}>
                Full List
              </Typography>
            </Box>
            <Typography fontSize={14} fontStyle="italic" color="gray">
              100 Leads
            </Typography>
          </Box>

          {/* Download Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6c4df8",
                "&:hover": { bgcolor: "#5b3bd4" },
                textTransform: "none",
                fontSize: 14,
                px: 3,
                py: 1,
                borderRadius: "6px",
              }}
            >
              Download File
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DownloadCsvFileDialog;
