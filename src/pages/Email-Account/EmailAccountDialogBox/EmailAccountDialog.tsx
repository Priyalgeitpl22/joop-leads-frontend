import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { addOuthEmailAccount } from "../../../redux/slice/emailAccountSlice";
import EmailAccountSmtpDialog from "./EmailAccountSmtpDialog";

interface EmailCampaignDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmailCampaignDialog: React.FC<EmailCampaignDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [smtpDialogOpen, setSmtpDialogOpen] = useState<boolean>(false);

  const handleGoogleOuth = async () =>{
    const response = await dispatch(addOuthEmailAccount()).unwrap();
    if(response){
    window.location.href=response}
  }

  const handleSmtpDetail = async () =>{
    setSmtpDialogOpen(true);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 10 }}
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
        Add Email Account
      </DialogTitle>

      <DialogContent>
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={2}
        >
          <Typography fontWeight="bold">Bulk Email Addition</Typography>
          <Link href="#" underline="hover" fontWeight="bold">
            Download sample CSV
          </Link>
        </Box> */}

        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f1f2fb",
            padding: "16px",
            borderRadius: "8px",
            border: "1px dashed #ccc",
            textAlign: "center",
            cursor: "pointer",
            mb: 3,
          }}
        >
          <ArrowUpwardRoundedIcon />
          <Typography>
            Drag & Drop CSV file here or{" "}
            <Link href="#" underline="hover">
              choose file
            </Link>
          </Typography>
        </Box> */}

        <Typography fontWeight="bold" mb={1}>
          Connect Google/Gmail Account
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#f1f2fb",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              textTransform: "none",
            }}
            onClick={handleGoogleOuth}
          >
            <Box
              component="img"
              src="/Images/mail.png"
              alt="OAuth Icon"
              sx={{ width: 50, height: 40 }}
            />
            <Typography mt={1} fontWeight="bold">
              OAuth
            </Typography>
            <Typography fontSize="12px">One Click Setup</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#f1f2fb",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              textTransform: "none",
            }}
          >
            <Box
              component="img"
              src="/Images/outlook.webp"
              alt="OAuth Icon"
              sx={{ width: 50, height: 50 }}
            />
            <Typography mt={1} fontWeight="bold">
              Outlook
            </Typography>
          </Button>
          <EmailAccountSmtpDialog
            open={smtpDialogOpen}
            onClose={() => setSmtpDialogOpen(false)}
          />
          <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#f1f2fb",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              textTransform: "none",
            }}
            onClick={handleSmtpDetail}
          >
            <Box
              component="img"
              src="/Images/smtp.png"
              alt="OAuth Icon"
              sx={{ width: 50, height: 50 }}
            />
            <Typography mt={1} fontWeight="bold">
              SMTP
            </Typography>
          </Button>

          {/* <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#f1f2fb",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              textTransform: "none",
            }}
          >
            <Box
              component="img"
              src="/Images/password.png"
              alt="OAuth Icon"
              sx={{ width: 50, height: 50 }}
            />
            <Typography mt={1} fontWeight="bold">
              App Password
            </Typography>
            <Typography fontSize="12px">SMTP Setup</Typography>
          </Button> */}
        </Box>

        {/* <Typography fontWeight="bold" mb={1}>
          Other Email Provider
        </Typography> */}

        {/* <Box display="flex" gap={2}> */}
        {/* <Button
            variant="contained"
            sx={{
              flex: 1,
              background: "#f1f2fb",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              textTransform: "none",
            }}
          >
            <Box
              component="img"
              src="/Images/zoho.png"
              alt="OAuth Icon"
              sx={{ width: 90, height: 40 }}
            />
            <Typography mt={1} fontWeight="bold">
              Zoho
            </Typography>
          </Button> */}
        {/* </Box> */}
      </DialogContent>
    </Dialog>
  );
};

export default EmailCampaignDialog;