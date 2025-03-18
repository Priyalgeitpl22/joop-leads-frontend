import { useState, useRef } from "react";
import { Box, Typography, Dialog, IconButton } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ImportLeadsDetail from "../../Email-Campaign/NewCampaign/ImportLeadsCampaign/ImportLeadsDetail";
import ImportSettingDialog from "../../Email-Campaign/NewCampaign/ImportLeadsCampaign/ImportSettingDialog";
import Papa from "papaparse";
import { ImportedLeadsData } from "../../Email-Campaign/NewCampaign/NewCampaign";
import { CustomDialogFooter } from "../../../styles/global.styled";

import { FileUploadContainer } from "../../Email-Campaign/NewCampaign/ImportLeadsCampaign/importLeads.styled";
import toast from "react-hot-toast";

interface UploadContactCsvDialog {
  handleLeadsData: (data: ImportedLeadsData) => void;
  handleCSVUpload: (data: any) => void;
  saveCSVSetting: (data: any) => void;
  setIsCsvUploaded: (status: boolean) => void;
  handleUploadContacts: (data: any) => void;
  open: boolean;
  onClose: () => void;
}

const UploadContactCsvDialog: React.FC<UploadContactCsvDialog> = ({
  handleLeadsData,
  handleCSVUpload,
  saveCSVSetting,
  setIsCsvUploaded,
  handleUploadContacts,
  open,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCSVData] = useState<any[]>([]);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.type === "text/csv") {

        setSelectedFile(file);
        setError("");
        handleCSVUpload(file);
        console.log("csvData", csvData);
        console.log("isnextdisabled", isNextDisabled);
        Papa.parse(file, {
          complete: (result) => {
            const firstRow = result.data[0] as string[];
            const data = result.data as any[];

            if (!data.length || data.every(row => row.every((cell: String) => cell === ""))) {
              setError("Cannot upload an empty CSV file.");
              toast.error("Cannot upload an empty CSV file.");
              setSelectedFile(null);
              setShowDetail(false);
              setIsCsvUploaded(false);
              setOpenDialog(false);
              return;
            }
            setColumns(firstRow);
            setCSVData(data);
            setShowDetail(true);
            setOpenDialog(true);
            setIsCsvUploaded(true);
          },
          skipEmptyLines: true,
        });

      } else {
        setError("Please upload a valid CSV file.");
        setSelectedFile(null);
        setIsCsvUploaded(false);
      }
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files?.[0] || null);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };
  const handleClose = () => {
    setSelectedFile(null);
    setError("");
    setShowDetail(false);
    setOpenDialog(false);
    setColumns([]);
    setCSVData([]);
    setIsCsvUploaded(false);
    onClose();


  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "2px 0",
          paddingTop: "50px",
          marginBottom: "20px",

        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {showDetail ? (
          <ImportLeadsDetail
            isUplaodContacts={true}
            handleUploadContacts={handleUploadContacts}
            setIsNextDisabled={setIsNextDisabled}
            onEmailFieldsChange={handleLeadsData}
            columns={columns}
            file={selectedFile}
            onFileChange={(e) => onFileSelect(e)}
          />
        ) : (
          <>
            <Typography variant="h6" fontWeight="600" textAlign="center">
              Easily add or update Leads
            </Typography>
            <Typography variant="body2" textAlign="center" color="gray" mb={3}>
              How would you like to get leads into your list?
            </Typography>

            <FileUploadContainer
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
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
                Select a CSV file to import <br /> or <br /> Drag & Drop CSV
                file here
              </Typography>

              <input
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={onFileSelect}
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
          <ImportSettingDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onSave={saveCSVSetting}
          />

        </Dialog>

      </Box>
    </Dialog >

  );
};

export default UploadContactCsvDialog;
