import React, { useState, useEffect } from "react";
import {
  Dialog,
  // DialogActions,
  DialogContent,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";
import {
  CloseIconButton,
  StyledDialogTitle,
  StyledFormControl,
  StyledSelectTypography,
  StyledHelpTypography,
  EmailPreviewBox,
  PreviewRow,
  PreviewLabel,
  // FooterBox,
  // FooterTextBox,
  // ClippedText,
  // StyledButton,
  StyledSelect,
} from "./PreviewSequenceDialogue.styled";
import SendTestEmailDialog from "../../SendTestEmailDialog";
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";
import { IEmailCampaign } from "../../interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import SenderAccountDialog from "../../SetupCampaign/SenderAccountDialog/SenderAccountDialog";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (userData: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }) => void;
  user: { id: string; fullName: string; email: string; role: string } | null;
  loading: boolean;
  selectedSequence: any | undefined;
}

const PreviewSequenceDialogue: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  selectedSequence,
}) => {
  const [newSequnce, setSelectedNewSequnce] = React.useState<{
    compiledSubject: string;
    compiledBody: string;
    variantLabel: string;
  } | null>(null);
  console.log(setSelectedNewSequnce);
  const [campaign, setCampaign] = useState<IEmailCampaign | null>(null);
  const [testEmailDialog, setTestEmailDialog] = React.useState(false);
  // const [loading, setLoading] = useState<boolean>(true);
  const [openSenderAccount, setOpenSenderAccount] = useState(false);
  const [senderAccounts, setSenderAccounts] = useState<any[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string>("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch<AppDispatch>();

  const handleSenderAccountValid = (isValid: boolean) => {
    console.log("Sender account valid:", isValid);
  };

  const handleSenderAccountsUpdate = (updatedAccounts: any[]) => {
    setSenderAccounts(updatedAccounts);
    setOpenSenderAccount(false);
  };

  const senderAccountDialogOpen = (val: boolean) => {
    setOpenSenderAccount(val);
  };

  useEffect(() => {
    if (selectedSequence?.campaign_id) {
      fetchCampaignDetails(selectedSequence.campaign_id);
    }
  }, [selectedSequence?.campaign_id,selectedSequence]);


  useEffect(() => {
    if (campaign?.contacts?.length > 0 && selectedContactId) {
      const contact = campaign?.contacts.find(
        (c: any) => c.id === selectedContactId
      );
      setSelectedContactId(contact.id);
    }
  }, [selectedContactId, campaign]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      setCampaign(response.campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      // setLoading(false);
    }
  };

  const selectedContact = campaign?.contacts?.find(
    (c: any) => c.id === selectedContactId
  );

  const stripHtmlTags = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const replacePlaceholders = (text: string, contact: any): string => {
    if (!text || !contact) return text;
    return text.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
      const value = contact[key.trim()];
      return value !== undefined && value !== null ? value : "";
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          width: "950px",
          maxWidth: "100vw",
          borderRadius: "8px",
          background: "#ffffff",
        },
      }}
    >
      <CloseIconButton onClick={onClose}>
        <GridCloseIcon />
      </CloseIconButton>
      <StyledDialogTitle>Sequence Preview</StyledDialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <StyledSelectTypography>Select a Lead</StyledSelectTypography>

        {campaign?.contacts?.length > 0 && (
          <StyledFormControl>
            <StyledSelect
              labelId="select-contact"
              variant="outlined"
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a contact
              </MenuItem>
              {campaign?.contacts.map((contact: any) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.name || contact.email}
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        )}

        <StyledHelpTypography>
          <HelpOutlineSharpIcon className="help-icon" />
          Select a lead or add an email address to check the email preview with
          actual variables.
        </StyledHelpTypography>

        <EmailPreviewBox>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: "#1f2937", fontSize: "14px", mb: 2 }}
          >
            Email preview
          </Typography>

          <PreviewRow>
            <PreviewLabel>Email:</PreviewLabel>
            <Typography sx={{ color: "#374151", fontSize: "14px" }}>
              {selectedContact?.email || "Select a contact"}
            </Typography>
          </PreviewRow>
          <Divider sx={{ my: 1, borderColor: "#d1d5db" }} />

          <PreviewRow>
            <PreviewLabel>Subject:</PreviewLabel>
            <Typography
              fontWeight={600}
              sx={{ color: "#1f2937", fontSize: "14px" }}
            >
              {replacePlaceholders(
                selectedSequence?.seq_variants[0]?.subject || "",
                selectedContact
              )}
            </Typography>
          </PreviewRow>
          <Divider sx={{ my: 1, borderColor: "#d1d5db" }} />

          <PreviewRow>
            <Typography
              sx={{ color: "#6b7280", fontSize: "13px", lineHeight: "1.6" }}
            >
              {stripHtmlTags(
                selectedSequence?.seq_variants[0]?.emailBody || ""
              )}
            </Typography>
          </PreviewRow>
        </EmailPreviewBox>
      </DialogContent>
      {/* <DialogActions sx={{ p: 0 }}>
        <FooterBox>
          <FooterTextBox>
            <Typography
              fontWeight={600}
              sx={{ color: "#1f2937", fontSize: "14px" }}
            >
              Send Test Email
            </Typography>
            <ClippedText>
              Send a test email to preview how your message will appear before
              sending to your full list.
            </ClippedText>
          </FooterTextBox>
          <StyledButton
            onClick={() => {
              if (senderAccounts.length === 0) {
                setOpenSenderAccount(true);
              } else {
                setTestEmailDialog(true);
              }
            }}
            disabled={loading}
          >
            Send Test Email
            {loading && <span className="spinner" />}
          </StyledButton>
        </FooterBox>
      </DialogActions> */}
      <SendTestEmailDialog
        open={testEmailDialog}
        onClose={() => setTestEmailDialog(false)}
        sequence={newSequnce}
      />

      <SenderAccountDialog
        campaign_id={selectedSequence?.campaign_id}
        senderAccounts={senderAccounts}
        open={openSenderAccount}
        handleSenderAccountValid={handleSenderAccountValid}
        onClose={() => senderAccountDialogOpen(false)}
        handleSave={handleSenderAccountsUpdate}
      />
    </Dialog>
  );
};

export default PreviewSequenceDialogue;
