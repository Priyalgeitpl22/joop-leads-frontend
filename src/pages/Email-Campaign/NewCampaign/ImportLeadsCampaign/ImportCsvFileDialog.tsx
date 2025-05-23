import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface ImportCsvFileDialogProps {
  open: boolean;
  onClose: () => void;
}

const ImportCsvFileDialog: React.FC<ImportCsvFileDialogProps> = ({
  open,
  onClose,
}) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ textAlign: "center" }}
        >
          Importing CSV file
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          mt={2}
          sx={{ textAlign: "center" }}
        >
          It will take some time to import your file. Please wait. Take a break
          if it's a large CSV file (grater than 20, 000 leads)
        </Typography>
        {/* <Button2 color={"white"} background={"var(--theme-color)"} style={{marginTop: "20px"}} onClick={handleUploadLeads}>
          Save
        </Button2> */}
      </DialogContent>
    </Dialog>
  );
};

export default ImportCsvFileDialog;
