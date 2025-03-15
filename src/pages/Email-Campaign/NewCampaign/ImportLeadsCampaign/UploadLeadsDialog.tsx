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
import Grid2 from "@mui/material/Grid2";
import { ILeadsCounts } from "../interfaces";
import { useEffect } from "react";

interface UploadCsvDialogProps {
  open: boolean;
  uploadCounts?: ILeadsCounts;
  onClose: () => void;
  setIsNextDisabled?: (status: boolean) => void;
}

const UploadLeadsDialog: React.FC<UploadCsvDialogProps> = ({
  open,
  uploadCounts,
  onClose,
  setIsNextDisabled,
}) => {

  useEffect(() => {
    if (setIsNextDisabled && uploadCounts?.uploadedCount === 0) {
      setIsNextDisabled(true);
    }
  }, [open, uploadCounts, setIsNextDisabled]);  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box style={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {uploadCounts?.uploadedCount === 0
            ? "No Leads Imported"
            : "Leads Imported"}
        </DialogTitle>
      </Box>

      <DialogContent>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{
            borderBottom: "1px solid grey",
            paddingBottom: 1,
            marginBottom: 2,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          Uploaded Leads
          <Typography variant="h5" fontWeight="bold">
            {uploadCounts?.uploadedCount}
          </Typography>
        </Typography>

        {[
          { label: "Duplicate Leads", count: uploadCounts?.duplicateCount },
          { label: "Blocked Email Count", count: uploadCounts?.blockedCount },
          { label: "Empty Email Count", count: uploadCounts?.emptyCount },
          { label: "Invalid Email Count", count: uploadCounts?.invalidCount },
          {
            label: "Unsubscribed Leads",
            count: uploadCounts?.unsubscribedCount,
          },
        ].map((item, index) => (
          <Grid2 container key={index} spacing={2} sx={{ marginBottom: 1 }}>
            <Grid2 size={{ xs: 9 }}>
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 3 }} textAlign="right">
              <Typography variant="body2" fontWeight="bold">
                {item.count}
              </Typography>
            </Grid2>
          </Grid2>
        ))}

        <Box
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--theme-color)",
              color: "white",
              marginTop: "20px",
            }}
            onClick={onClose}
          >
            Okay
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UploadLeadsDialog;
