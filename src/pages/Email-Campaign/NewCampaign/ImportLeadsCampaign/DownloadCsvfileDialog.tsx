import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../../../../styles/global.styled";

interface ExportCsvDialogProps {
  fileUrl: string;
  open: boolean;
  onClose: () => void;
}

const DownloadCsvFileDialog: React.FC<ExportCsvDialogProps> = ({
  fileUrl,
  open,
  onClose,
}) => {

  const handleDownload = async () => {
    if (!fileUrl) return;
  
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "leads.csv");
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
  
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  
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
            <Button onClick={handleDownload}
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
