import { useState, useRef } from "react";
import { Box, Typography, Dialog } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImportLeadsDetail from "./ImportLeadsDetail";
import ImportSettingsDialog from "./ImportSettingDialog";
import Papa from "papaparse";
import { ImportedLeadsData } from "../NewCampaign";
import { CustomDialogFooter } from "../../../../styles/global.styled";
import { FileUploadContainer } from "./importLeads.styled";

interface ImportLeadsCampaignProps {
  handleLeadsData: (data: ImportedLeadsData) => void;
  handleCSVUpload: (data: any) => void;
  saveCSVSetting: (data: any) => void;
  setIsNextDisabled: (status: boolean) => void;
}

const ImportLeadsCampaign: React.FC<ImportLeadsCampaignProps> = ({
  handleLeadsData,
  handleCSVUpload,
  saveCSVSetting,
  setIsNextDisabled,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCSVData] = useState<any[]>([]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "text/csv") {
        setSelectedFile(file);
        setError("");
        handleCSVUpload(file);

        Papa.parse(file, {
          complete: (result) => {
            const firstRow = result.data[0] as string[];
            const data = result.data as any[];
            setColumns(firstRow);
            setCSVData(data);
            console.log(csvData);
          },
          skipEmptyLines: true,
        });

        setShowDetail(true);
        setOpenDialog(true);
      } else {
        setError("Please upload a valid CSV file.");
        setSelectedFile(null);
      }
    }
  };
  const handleDeleteFile = () => {
    setSelectedFile(null);
    setShowDetail(false);
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "2px 0",
        paddingTop: "50px",
      }}
    >
      {showDetail ? (
        <ImportLeadsDetail
          isUplaodContacts={false}
          onEmailFieldsChange={handleLeadsData}
          columns={columns}
          file={selectedFile}
          onFileChange={handleFileChange}
          onDeleteFile={handleDeleteFile}
          setIsNextDisabled={setIsNextDisabled}
        />
      ) : (
        <>
          <Typography variant="h6" fontWeight="600" textAlign="center">
            Easily add or update Leads / Contacts
          </Typography>
          <Typography variant="body2" textAlign="center" color="gray" mb={3}>
            How would you like to get contacts into your list?
          </Typography>

          <FileUploadContainer onClick={() => fileInputRef.current?.click()}>
            <Typography variant="h6" fontWeight="600" mt={2}>
              Upload CSV File
            </Typography>
            <UploadFileOutlinedIcon
              sx={{
                fontSize: 80,
                color: "var(--icon-color)",
                marginBottom: "10px",
              }}
            />
            <Typography
              variant="body2"
              color="gray"
              sx={{ textAlign: "center" }}
            >
              Select a CSV file to import <br /> or <br /> Drag & Drop CSV file
              here
            </Typography>

            <input
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <Typography variant="body2" color="green" mt={1}>
                {selectedFile.name}
              </Typography>
            )}
            {error && (
              <Typography
                variant="body2"
                color="var(--background-light)"
                mt={1}
              >
                {error}
              </Typography>
            )}
            <CustomDialogFooter>
              Upload your CSV files to import leads.
            </CustomDialogFooter>
          </FileUploadContainer>
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <ImportSettingsDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={saveCSVSetting}
        />
      </Dialog>
    </Box>
  );
};

export default ImportLeadsCampaign;
