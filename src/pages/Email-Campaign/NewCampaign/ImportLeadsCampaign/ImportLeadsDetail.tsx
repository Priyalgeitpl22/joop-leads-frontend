import React, { useState, useRef } from "react";
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CampaignIcon from "@mui/icons-material/Campaign";
import { CSV_COLUMNS, CSV_COLUMNS as csv_columns } from "../../../../constants";

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
  const [emailFieldMapping, setEmailFieldMapping] = useState<
    Record<string, string>
  >({});
  const [emailFieldsAdded, setEmailFieldAdded] = useState<
    Record<string, string>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEmailFieldsChange = (event: any, field: string) => {
    const value = event.target.value;
    setEmailFieldMapping((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log(emailFieldMapping);
    const column = csv_columns.find((o) => o.key === value)?.key as string;

    setEmailFieldAdded((prev) => {
      const updatedFields = {
        ...prev,
        [field]: column,
      };
      console.log(emailFieldsAdded);

      onEmailFieldsChange(updatedFields);
      return updatedFields;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event);
    }
  };

  const handleReupload = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {
    onFileChange({
      target: { files: null },
    } as React.ChangeEvent<HTMLInputElement>);
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
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "var(--theme-color)" }}
        >
          1
        </Typography>
        <Typography fontWeight="bold">CSV File</Typography>
      </Box>
      <Box
        sx={{
          background: "var(--background-light)",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InsertDriveFileIcon sx={{ fontSize: 40, color: "#4caf50" }} />
          {file ? (
            <Typography>{file.name}</Typography>
          ) : (
            <Typography color="gray">No file uploaded</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <VisibilityIcon sx={{ color: "var(--theme-color)" }} />
          </IconButton>
          <IconButton onClick={handleReupload}>
            <RefreshIcon sx={{ color: "var(--theme-color)" }} />
          </IconButton>
          <IconButton onClick={handleDeleteFile}>
            <DeleteIcon sx={{ color: "var(--theme-color)" }} />
          </IconButton>
        </Box>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4, mb: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "var(--theme-color)" }}
        >
          2
        </Typography>
        <Typography fontWeight="bold">Map Fields</Typography>
      </Box>
      <Typography fontSize={14} color="gray" mb={2}>
        Map CSV columns to the variables you want to add to the campaign.
      </Typography>
      <Box
        sx={{
          background: "var(--background-light)",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <InsertDriveFileIcon
          sx={{
            fontSize: 30,
            color: "var(--theme-color)",
            marginLeft: "5%",
            mb: 3,
          }}
        />
        <CampaignIcon
          sx={{
            marginLeft: "50%",
            fontSize: 33,
            color: "var(--theme-color)",
            mb: 3,
          }}
        />
        {columns.map((field, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Typography sx={{ flex: 1 }}>{field}</Typography>
            <Select
              displayEmpty
              onChange={(event) => handleEmailFieldsChange(event, field)}
              sx={{
                maxHeight: "40px",
                minWidth: "60%",
                background: "white!important",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              {CSV_COLUMNS.map((column) => (
                <MenuItem value={column.key} sx={{ fontSize: "13px" }}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImportLeadsDetail;
