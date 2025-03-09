
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";

interface UploadContactCsvDialogProps {
  open: boolean;
  onClose: () => void;
  onCSVUpload: (data: any[]) => void;
}

const UploadContactCsvDialog: React.FC<UploadContactCsvDialogProps> = ({
  open,
  onClose,
  onCSVUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check for CSV file type or file extension
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
        setError("");
        
        Papa.parse(file, {
          complete: (result) => {
            const data = result.data;
            if (data && data.length > 0) {
              // Assuming the first row contains headers
              const headers = data[0] as string[];
              setColumns(headers);
              onCSVUpload(data);
            }
          },
          skipEmptyLines: true,
        });
      } else {
        setError("Please upload a valid CSV file.");
        setSelectedFile(null);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          background: "#f1f2fb",
          padding: "12px 24px",
        }}
      >
        Upload Contacts CSV
      </DialogTitle>

      <DialogContent>
        <Box textAlign="center" mt={3}>
          <Typography variant="body1" mb={2}>
            Select a CSV file to import your contacts.
          </Typography>
          <Button
            variant="contained"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              px: 2,
            }}
          >
            Choose File
          </Button>
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {selectedFile && (
            <Typography variant="body2" mt={2}>
              Selected File: {selectedFile.name}
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ textTransform: "none", borderRadius: "8px", px: 2 }}
          >
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UploadContactCsvDialog;
