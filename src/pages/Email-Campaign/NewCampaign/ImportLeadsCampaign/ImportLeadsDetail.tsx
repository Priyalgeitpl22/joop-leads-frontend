import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CampaignIcon from "@mui/icons-material/Campaign";
import { CSV_COLUMNS, CSV_COLUMNS as csv_columns } from "../../../../constants";
import { Button2 } from "../../../../styles/layout.styled";
import Papa from "papaparse";
import CSVPreviewDialog from "./CsvPreviewDialog";

interface ImportLeadsDetailProps {
  file?: File | null;
  columns: string[];
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailFieldsChange: (data: any) => void;
  setIsStep1Valid: (status: boolean) => void;
  isUplaodContacts: boolean;
  handleUploadContacts?: (data: any) => void;
  onDeleteFile?: () => void;
}

const ImportLeadsDetail: React.FC<ImportLeadsDetailProps> = ({
  file,
  columns,
  onFileChange,
  onEmailFieldsChange,
  setIsStep1Valid,
  isUplaodContacts,
  handleUploadContacts,
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
    console.log("emailFieldMapping", emailFieldMapping);
    setEmailFieldMapping((prev) => ({
      ...prev,
      [field]: value,
    }));

    const column = csv_columns.find((o) => o.key === value)?.key as string;
    console.log("emailFieldAdded", emailFieldsAdded);

    setEmailFieldAdded((prev) => {

      const updatedFields = {
        ...prev,
        [field]: column,
      };

      onEmailFieldsChange(updatedFields);
      const hasSelection =
        Boolean(updatedFields["Email"] && updatedFields["First Name"]) &&
        Object.values(updatedFields).some((v) => Boolean(v));

      setIsStep1Valid(!hasSelection);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileChange({
      target: { files: null } as unknown as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>);
    window.location.reload();
  };

  const [csvData, setCsvData] = useState<string[][]>([]);

  const [isCSVModalOpen, setCSVModalOpen] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          Papa.parse(e.target.result as string, {
            complete: (result) => setCsvData(result.data as string[][]),
          });
        }
      };
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <Box
      sx={{
        maxWidth: "700px",
        margin: "auto",
        padding: "20px",
        background: "#FAFBFF",
        overflowY: "auto",
        height: "462px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          color: "var(--theme-color)",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          1
        </Typography>
        <Typography fontWeight="bold" variant="h6">
          CSV File
        </Typography>
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
          <Tooltip title="View CSV">
            <span>
              <IconButton
                onClick={() => setCSVModalOpen(true)}
                disabled={!file}
              >
                <VisibilityIcon sx={{ color: "var(--theme-color)" }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Reupload">
            <IconButton onClick={handleReupload}>
              <RefreshIcon sx={{ color: "var(--theme-color)" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete File">
            <IconButton onClick={handleDeleteFile}>
              <DeleteIcon sx={{ color: "var(--theme-color)" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 4,
          mb: 3,
          color: "var(--theme-color)",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          2
        </Typography>
        <Typography fontWeight="bold" variant="h6">
          Map Fields
        </Typography>
      </Box>
      <Typography fontSize={14} color="gray" mb={2}>
        Map CSV columns to the variables you want to add to the campaign.
        Firstname and Email are required.
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
        {columns?.map((field, index) => (
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
      {isUplaodContacts && (
        <Button2
          onClick={handleUploadContacts}
          color="white"
          background="var(--theme-color)"
        >
          Save and Next
        </Button2>
      )}
      {isCSVModalOpen && (
        <CSVPreviewDialog
          open={isCSVModalOpen}
          onClose={() => setCSVModalOpen(false)}
          csvData={csvData}
        />
      )}
    </Box>
  );
};

export default ImportLeadsDetail;
