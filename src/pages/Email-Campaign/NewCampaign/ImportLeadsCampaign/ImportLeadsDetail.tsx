import React, { useState, useRef } from "react";
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CampaignIcon from "@mui/icons-material/Campaign";
import { CSV_COLUMNS as csv_columns } from "../../../../constants";

interface ImportLeadsDetailProps {
  file?: File | null;
  columns: string[];
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailFieldsChange: (data: any) => void;
}

const ImportLeadsDetail: React.FC<ImportLeadsDetailProps> = ({
  file,
  columns,
  onFileChange,
  onEmailFieldsChange,
}) => {
  const [emailFieldMapping, setEmailFieldMapping] = useState<Record<string, string>>({});
  const [emailFieldsAdded, setEmailFieldAdded] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmailFieldsChange = (event: any, field: string) => {
    const value = event.target.value;
    setEmailFieldMapping((prev) => ({
      ...prev,
      [field]: value,
    }));

    const column = csv_columns.filter((o)=>o.label === value)[0].key as string

    setEmailFieldAdded((prev) => ({
      ...prev,
      [field]: column
    }))

    onEmailFieldsChange(emailFieldsAdded);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      onFileChange(event);
    }
  };

  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {
    onFileChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "auto",
        padding: "20px",
        background: "#FAFBFF",
        overflowY: "auto",
        height: "462px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#6e58f1" }}>
          1
        </Typography>
        <Typography fontWeight="bold">CSV File</Typography>
      </Box>
      <Box sx={{ background: "#ffffff", padding: "16px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InsertDriveFileIcon sx={{ fontSize: 40, color: "#4caf50" }} />
          {file ? <Typography>{file.name}</Typography> : <Typography color="gray">No file uploaded</Typography>}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <VisibilityIcon sx={{ color: "#6e58f1" }} />
          </IconButton>
          <IconButton onClick={handleReupload}>
            <RefreshIcon sx={{ color: "#6e58f1" }} />
          </IconButton>
          <IconButton onClick={handleDeleteFile}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      </Box>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#6e58f1" }}>
          3
        </Typography>
        <Typography fontWeight="bold">Map Fields</Typography>
      </Box>
      <Typography fontSize={14} color="gray" mb={2}>
        Map CSV columns to the variables you want to add to the campaign.
      </Typography>
      <Box sx={{ background: "#ffffff", padding: "16px", borderRadius: "8px" }}>
        <InsertDriveFileIcon sx={{ fontSize: 30, color: "#6e58f1", marginLeft: "5%", mb: 3 }} />
        <CampaignIcon sx={{ marginLeft: "50%", fontSize: 33, color: "#6e58f1", mb: 3 }} />
        {columns.map((field, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography sx={{ flex: 1 }}>{field}</Typography>
            <Select
              displayEmpty
              sx={{
                maxHeight: "40px",
                minWidth: "60%",
                background: "white",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              <MenuItem value="first_name" sx={{ fontSize: "13px" }}>
                First Name
              </MenuItem>
              <MenuItem value="last_name" sx={{ fontSize: "13px" }}>
                Last Name
              </MenuItem>
              <MenuItem value="email" sx={{ fontSize: "13px" }}>
                Email
              </MenuItem>
              <MenuItem value="phone_number" sx={{ fontSize: "13px" }}>
                Phone Number
              </MenuItem>
              <MenuItem value="company_name" sx={{ fontSize: "13px" }}>
                Company Name
              </MenuItem>
              <MenuItem value="website" sx={{ fontSize: "13px" }}>
                Website
              </MenuItem>
              <MenuItem value="linkedin_profile" sx={{ fontSize: "13px" }}>
                LinkedIn Profile
              </MenuItem>
              <MenuItem value="location" sx={{ fontSize: "13px" }}>
                Location
              </MenuItem>
              <MenuItem value="custom_field" sx={{ fontSize: "13px" }}>
                Custom Field
              </MenuItem>
              <MenuItem value="ignore_field" sx={{ fontSize: "13px" }}>
                Ignore Field
              </MenuItem>
            </Select>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImportLeadsDetail;