import { useState, useRef } from "react";
import { Box, Typography, Dialog } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImportLeadsDetail from "./ImportLeadsDetail";
import ImportSettingsDialog from "./ImportSettingDialog";


const ImportLeadsCampaign = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        setSelectedFile(file);
        setError("");
        setShowDetail(true);
        setOpenDialog(true);
      } else {
        setError("Please upload a valid CSV file.");
        setSelectedFile(null);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "60px 0",
      }}
    >
      {showDetail ? (
        <ImportLeadsDetail file={selectedFile} onFileChange={setSelectedFile}/>
      ) : (
        <>
          <Typography variant="h6" fontWeight="600" textAlign="center">
            Easily add or update Leads /Contacts
          </Typography>
          <Typography variant="body2" textAlign="center" color="gray" mb={3}>
            How would you like to get contacts into your list?
          </Typography>

          <Box
            sx={{
              width: "80%",
              maxWidth: "300px",
              textAlign: "center",
              padding: "40px",
              borderRadius: "10px",
              backgroundColor: "#F8F9FC",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadFileOutlinedIcon
              sx={{ fontSize: 50, color: "#6e58f1", marginBottom: "10px" }}
            />
            <Typography variant="h6" fontWeight="600" mt={2}>
              Upload CSV File
            </Typography>
            <Typography variant="body2" color="gray">
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
              <Typography variant="body2" color="red" mt={1}>
                {error}
              </Typography>
            )}
          </Box>
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <ImportSettingsDialog onClose={() => setOpenDialog(false)} open={openDialog} />
      </Dialog>
    </Box>
  );
};

export default ImportLeadsCampaign;