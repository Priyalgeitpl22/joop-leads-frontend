import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StepText, LinkText } from "./EmailAccount.styled";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addOutlookEmailAccount } from "../../../redux/slice/emailAccountSlice";
import { Button } from "../../../styles/global.styled";

const EmailAccountOutlookDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleOutlookAccount = async () => {
    const response = await dispatch(addOutlookEmailAccount({ orgId: user?.orgId })).unwrap();
    if (response) {
      window.location.href = response;
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          gap: "4%",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Box />
        <Box
          component="img"
          src="/Images/campaign2.png"
          alt="campaign Icon"
          sx={{ width: 45, height: 45 }}
        />
        <Box
          component="img"
          src="/Images/compare.png"
          alt="compare Icon"
          sx={{ width: 25, height: 25 }}
        />
        <Box
          component="img"
          src="/Images/outlook.webp"
          alt="OAuth Icon"
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Box sx={{ borderBottom: "1px solid #ddd" }}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Connect your Outlook account
        </DialogTitle>
      </Box>

      <DialogContent>
        <Typography fontSize={14} fontWeight={500} sx={{ mb: 2 }}>
          Follow the given steps to connect your account:
        </Typography>

        <StepText>
          1. Login to your <b>Microsoft 365 Admin Center</b>
        </StepText>
        <StepText>
          2. Click on your <b>Active Users</b>
        </StepText>
        <StepText>3. Click onto the user you want to connect</StepText>
        <StepText>
          4. A fly out will appear, click on the <b>Mail Tab</b> and then click
          on <b>Manage Email Apps</b>
        </StepText>
        <StepText>
          5. Make sure the <b>Authenticated SMTP</b> and <b>IMAP</b> options are
          enabled
        </StepText>
        <StepText>
          6. Click on <b>Save Changes</b> and you are done (give it 30 mins,
          then connect to Smartlead)
        </StepText>
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 3 }}>
        <Button onClick={handleOutlookAccount}>Connect Account</Button>
      </Box>
    </Dialog>
  );
};

export default EmailAccountOutlookDialog;
