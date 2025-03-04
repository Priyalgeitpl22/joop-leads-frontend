import React, { useEffect, useState } from "react";
import {
  Button,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogBox,
  DialogFooter,
  DialogHeader,
} from "./SequenceCampaign/sequenceCampaign.styled";
import MultiSelectDropdown from "../../../assets/Custom/cutomSelectOption";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { fetchEmailAccount } from "../../../redux/slice/emailAccountSlice";
import { Account } from "./SetupCampaign/Interface";

interface SendTestEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

const SendTestEmailDialog: React.FC<SendTestEmailDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rows, setRows] = useState<{_id: any; id: string; email: string }[]>([]);
  const [selectedEmailAccount, setSelectedEmailAccount] = useState<
    string | string[]
  >("");
  const [emailAccounts, setEmailAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const getEmailAccounts = async () => {
      try {
        const data = await dispatch(fetchEmailAccount()).unwrap();
        setRows(data);
        setEmailAccounts(data);
        if (data.length > 0) {
          setSelectedEmailAccount(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch Account:", error);
      }
    };

    getEmailAccounts();
  }, [dispatch]);

  const sendTestEmail = () => {
    const senderAccount = emailAccounts.filter((account) => {
      return account.email === selectedEmailAccount;
     })[0];  
  }

  return (
    <DialogBox open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader>
        <Typography fontWeight="600">Send Test Email</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 12, padding: "0px"}}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <DialogContent>
        <MultiSelectDropdown
          width="550px"
          label="Select Account"
          selectedValues={selectedEmailAccount}
          onChange={setSelectedEmailAccount}
          multiple={false}
          options={rows
            .filter((account) => account.email)
            .map((account) => ({
              key: account._id,
              value: account.email,
              label: account.email,
            }))}
        />
        <Typography fontWeight={500} fontSize={16} mt={2}>
          Edit the email account if you want to send to a different email.
        </Typography>

        <TextField
          name="fullName"
          fullWidth
          variant="outlined"
          // value="sibananda.k@geitpl.com"
          sx={{ marginTop: "15px" }}
          InputProps={{
            sx: { height: "40px" },
          }}
        />
        <Typography fontWeight={500} fontSize={14} mt={1}>
          PS: <b>Do not </b> use this as a mechanism for testing email
          deliverability. Use this for testing formatting and copy.
        </Typography>
      </DialogContent>

      <DialogFooter>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "var(--theme-color)",
            color: "white",
            textTransform: "none",
            padding: "8px 24px",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#5a46d1" },
          }}
          onClick={sendTestEmail}
        >
          Send Test Email
        </Button>
      </DialogFooter>
    </DialogBox>
  );
};

export default SendTestEmailDialog;
