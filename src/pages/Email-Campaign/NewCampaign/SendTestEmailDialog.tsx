import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { fetchEmailAccount } from "../../../redux/slice/emailAccountSlice";
import { SendTestEmail } from "../../../redux/slice/emailCampaignSlice";
import toast from "react-hot-toast";

interface SendTestEmailDialogProps {
  open: boolean;
  onClose: () => void;
  sequence: string;
}

const SendTestEmailDialog: React.FC<SendTestEmailDialogProps> = ({
  open,
  onClose,
  sequence,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rows, setRows] = useState<{ _id: any; id: string; email: string }[]>(
    []
  );
  const [selectedEmailAccount, setSelectedEmailAccount] = useState<
    string | string[]
  >("");
  const [toEmail, setToEmail] = useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getEmailAccounts = async () => {
      try {
        const data = await dispatch(fetchEmailAccount({ orgId: user?.orgId || "" })).unwrap();
        setRows(data);
        if (data.length > 0) {
          setSelectedEmailAccount(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch Account:", error);
      }
    };

    getEmailAccounts();
  }, [dispatch]);

  const sendTestEmail = async () => {
    setLoading(true);
    if (!selectedEmailAccount) {
      console.error("No email account selected.");
      return;
    }

    const payload = {
      email: selectedEmailAccount,
      toEmail,
      sequence,  
    };
    try {
      setIsLoading(true);
      console.log(isLoading);
      const response = await dispatch(SendTestEmail(payload)).unwrap();
      if (response) {
        toast.success(response?.message);
      } 
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogBox open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader>
        <Typography fontWeight="600">Send Test Email</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 12, padding: "0px" }}
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
          name="toEmail"
          fullWidth
          variant="outlined"
          onChange={(e) => setToEmail(e.target.value)}
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
            "&:hover": { backgroundColor: "var(--hover-color)" },
          }}
          onClick={sendTestEmail}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Send Test Email"
          )}
        </Button>
      </DialogFooter>
    </DialogBox>
  );
};

export default SendTestEmailDialog;
