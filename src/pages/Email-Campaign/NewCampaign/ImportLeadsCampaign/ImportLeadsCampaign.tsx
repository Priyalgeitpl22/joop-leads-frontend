import { useState, useRef, useEffect } from "react";
import { Box, Typography, Dialog } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImportLeadsDetail from "./ImportLeadsDetail";
import ImportSettingsDialog from "./ImportSettingDialog";
import Papa from "papaparse";
import { ImportedLeadsData } from "../NewCampaign";
import { FileUploadContainer } from "./importLeads.styled";
import ViewImportedCsvFile from "./ViewImportedCsvFile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { getCampaignById } from "../../../../redux/slice/emailCampaignSlice";
import toast from "react-hot-toast";

interface ImportLeadsCampaignProps {
  isEdit: boolean;
  handleLeadsData: (data: ImportedLeadsData) => void;
  handleCSVUpload: (data: any) => void;
  saveCSVSetting: (data: any) => void;
  setIsStep1Valid: (status: boolean) => void;
}

const ImportLeadsCampaign: React.FC<ImportLeadsCampaignProps> = ({
  handleLeadsData,
  handleCSVUpload,
  saveCSVSetting,
  setIsStep1Valid,
  isEdit
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCSVData] = useState<any[]>([]);
  const [csvFileDetails, setCsvFileDetails] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    if (campaignId) {
      fetchCampaignDetails(campaignId);
    }
  }, [dispatch]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      setCsvFileDetails(campaign?.csv_file);
      return response.campaign;

    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const processFile = (file: File) => {
    if (file.type === "text/csv") {
      setSelectedFile(file);
      setError("");
      handleCSVUpload(file);
      console.log("csvData", csvData);
      Papa.parse(file, {
        complete: (result) => {
          const firstRow = result.data[0] as string[];
          const data = result.data as any[];
          if (!data.length || data.every(row => row.every((cell: String) => cell === ""))) {
            setError("Cannot upload an empty CSV file.");
            toast.error("Cannot upload an empty CSV file.");
            setSelectedFile(null);
            setShowDetail(false);
            setOpenDialog(false);
            return;
          }
          setColumns(firstRow);
          setCSVData(data);
        },
        skipEmptyLines: true,
      });

      setShowDetail(true);
      setOpenDialog(true);
    } else {
      setError("Please upload a valid CSV file.");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) processFile(file);
  };

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDropAnywhere = (event: DragEvent) => {
      event.preventDefault();

      const file = event.dataTransfer?.files?.[0];
      if (file) processFile(file);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDropAnywhere);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDropAnywhere);
    };
  }, []);
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "40px 20px",
      }}
    >
      {showDetail ? (
        <ImportLeadsDetail
          isUplaodContacts={false}
          onEmailFieldsChange={handleLeadsData}
          columns={columns}
          file={selectedFile}
          onFileChange={handleFileChange}
          onDeleteFile={() => setSelectedFile(null)}
          setIsStep1Valid={setIsStep1Valid}
        />
      ) : (
        <>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{ color: "#111827", mb: 1, mt:5 }}
          >
            Easily add or update Leads / Contacts
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "#6b7280", mb: 6, mt: 1 }}
          >
            How would you like to get contacts into your list?
          </Typography>

          <FileUploadContainer
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="circle-icon">
              <UploadFileOutlinedIcon
                sx={{ fontSize: 32, color: "var(--primary-dark)" }}
              />
            </div>

            <Typography
              variant="h6"
              fontWeight="600"
              sx={{ color: "#111827", mt: 1 }}
            >
              Upload CSV File
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: "20px",
                mt: 1,
              }}
            >
              Select a CSV file to import <br /> or Drag & Drop CSV file here
            </Typography>

            <input
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <Typography
                variant="body2"
                sx={{ color: "#059669", mt: 2, fontSize: "13px" }}
              >
                ✓ {selectedFile.name}
              </Typography>
            )}
            {error && (
              <Typography
                variant="body2"
                sx={{ color: "#ef4444", mt: 2, fontSize: "13px" }}
              >
                ✕ {error}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                color: "#9ca3af",
                mt: 3,
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              Upload your CSV files to import leads.
            </Typography>
          </FileUploadContainer>
          {isEdit && <ViewImportedCsvFile csvFileDetails={csvFileDetails} />}
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
