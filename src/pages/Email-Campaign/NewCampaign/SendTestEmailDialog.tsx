import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  DialogContent,
  FormHelperText,
  IconButton,
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
import { Button } from "../../../styles/global.styled";
import { TextField } from "../../../styles/layout.styled";

interface SendTestEmailDialogProps {
  open: boolean;
  onClose: () => void;
  sequence: {
    compiledSubject: string;
    compiledBody: string;
    variantLabel: string;
  } | null;
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
  const [emailError, setEmailError] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getEmailAccounts = async () => {
      try {
        const data = await dispatch(
          fetchEmailAccount({ orgId: user?.orgId || "" })
        ).unwrap();
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
    if (!selectedEmailAccount || !toEmail || !sequence) {
      toast.error("Missing required fields.");
      setLoading(false);
      return;
    }

    const payload = {
      email: selectedEmailAccount,
      toEmail,
      emailTemplate: {
        subject: sequence.compiledSubject,
        emailBody: sequence.compiledBody,
        variantLabel: sequence.variantLabel,
      },
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToEmail(value);

    if (!emailRegex.test(value) && value !== "") {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <DialogBox open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader>
        <Typography fontWeight="500" fontSize={16}>Send Test Email</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 12, padding: "0px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <DialogContent>
        {/* <Typography fontWeight="500" fontSize={14}>Sender Account</Typography> */}
        <MultiSelectDropdown
          width="550px"
          label="Sender Account"
          selectedValues={selectedEmailAccount}
          onChange={setSelectedEmailAccount}
          multiple={false}
          options={rows
            ?.filter((account) => account.email)
            .map((account) => ({
              key: account.id,
              value: account.email,
              label: account.email,
            }))}
        />
        <Typography fontWeight={500} fontSize={12} mt={2} mb={2}>
          Edit the email account if you want to send to a different email.
        </Typography>
        {/* <Typography fontWeight="500">Receiver Account</Typography> */}
        <TextField
          label="Receiver Account"
          name="toEmail"
          fullWidth
          variant="outlined"
          onChange={handleEmailChange}
          value={toEmail}
          placeholder="Enter email"
          error={!!emailError}
          InputProps={{
            sx: { height: "40px" },
          }}
        />
        {emailError && <FormHelperText error>{emailError}</FormHelperText>}
        <Typography fontWeight={500} fontSize={12} mt={1}>
          PS: <b>Do not </b> use this as a mechanism for testing email
          deliverability. Use this for testing formatting and copy.
        </Typography>
      </DialogContent>

      <DialogFooter>
        <Button onClick={sendTestEmail}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Send"
          )}
        </Button>
      </DialogFooter>
    </DialogBox>
  );
};

export default SendTestEmailDialog;
