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
import CloseIcon from "@mui/icons-material/Close";
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
      [field]: event.target.value || "",
    }));

    const column = csv_columns.find((o) => o.key === value)?.key as string;
    console.log("emailFieldAdded", emailFieldsAdded);

    setEmailFieldAdded((prev) => {
      const updatedFields = {
        ...prev,
        [field]: column,
      };

      onEmailFieldsChange(updatedFields);

      const requiredKeys = ["First Name", "Last Name", "Email"];
      const allRequiredMapped = requiredKeys.every((key) =>
        Object.values(updatedFields).includes(
          CSV_COLUMNS.find((col) => col.label === key)?.key ?? ""
        )
      );

      setIsStep1Valid(!allRequiredMapped);

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
        padding: "32px 24px",
        background: "#ffffff",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            background: "var(--primary-gradient)",
            color: "white",
            width: 30,
            height: 30,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          1
        </Box>
        <Typography fontWeight="600" variant="h6" sx={{ color: "#1f2937" }}>
          CSV File
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#f9fafb",
          padding: "16px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InsertDriveFileIcon
            sx={{ fontSize: 26, color: "var(--primary-dark)" }}
          />
          {file ? (
            <Box>
              <Typography sx={{ color: "#1f2937", fontWeight: "500" }}>
                {file.name}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
                Ready to import
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ color: "#9ca3af" }}>No file uploaded</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View CSV">
            <span>
              <IconButton
                onClick={() => setCSVModalOpen(true)}
                disabled={!file}
                sx={{
                  color: "var(--primary-dark)",
                  "&:hover": { background: "#eff6ff" },
                  "&.Mui-disabled": { color: "#d1d5db" },
                }}
              >
                <VisibilityIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Reupload">
            <IconButton
              onClick={handleReupload}
              sx={{
                color: "var(--primary-dark)",
                "&:hover": { background: "#eff6ff" },
              }}
            >
              <RefreshIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete File">
            <IconButton
              onClick={handleDeleteFile}
              sx={{
                color: "#ef4444",
                "&:hover": { background: "#fee2e2" },
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
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
          mb: 2,
        }}
      >
        <Box
          sx={{
            background: "var(--primary-gradient)",
            color: "white",
            width: 30,
            height: 30,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          2
        </Box>
        <Typography fontWeight="600" variant="h6" sx={{ color: "#1f2937" }}>
          Map Fields
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 2 }}>
        Map CSV columns to the variables you want to add to the campaign.
        <Box component="span" sx={{ fontWeight: "600", color: "#1f2937" }}>
          {" "}
          First Name, Last Name and Email are required.
        </Box>
      </Typography>
      <Box
        sx={{
          background: "#f9fafb",
          padding: "24px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", gap: 3, alignItems: "center", mb: 4 }}>
          <InsertDriveFileIcon
            sx={{
              fontSize: 26,
              color: "var(--primary-dark)",
            }}
          />
          <Box sx={{ width: "100%", height: "2px", background: "#e5e7eb" }} />
          <CampaignIcon
            sx={{
              fontSize: 28,
              color: "var(--primary-dark)",
            }}
          />
        </Box>
        {columns?.map((field, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: index === columns.length - 1 ? 0 : 3,
              pb: index === columns.length - 1 ? 0 : 3,
              borderBottom:
                index === columns.length - 1 ? "none" : "1px solid #e5e7eb",
            }}
          >
            <Typography
              sx={{
                flex: 1,
                color: "#374151",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              {field}
            </Typography>
            <Select
              value={emailFieldMapping[field] || ""} // "" is shown ✔
              displayEmpty
              onChange={(event) => handleEmailFieldsChange(event, field)}
              sx={{
                maxHeight: "40px",
                minWidth: "60%",
                background: "white",
                borderRadius: "8px",
                fontSize: "14px",
                border: "1px solid #e5e7eb",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e5e7eb",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary-dark)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary-dark)",
                  borderWidth: "2px",
                },
              }}
              renderValue={(selected) =>
                selected === "" ? (
                  <span style={{ color: "#9ca3af" }}>Select field</span>
                ) : (
                  CSV_COLUMNS.find((col) => col.key === selected)?.label
                )
              }
            >
              <MenuItem value="" disabled sx={{ color: "#9ca3af" }}>
                Select field
              </MenuItem>

              {CSV_COLUMNS.map((column) => (
                <MenuItem
                  key={column.key}
                  value={column.key}
                  sx={{ fontSize: "14px" }}
                >
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
          background="var(--secondary-gradient)"
          style={{alignSelf: "end"}}
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
