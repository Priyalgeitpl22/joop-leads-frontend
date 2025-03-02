import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  IconButton,
  Switch,
  Typography,
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { csvSettingsType } from "../../Interfaces";

interface ImportSettingDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: CsvSettings) => void;
}

type CsvSettings = csvSettingsType

const ImportSettingDialog: React.FC<ImportSettingDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [settings, setSettings] = useState<CsvSettings>({
    ignoreCommunityBounceList: false,
    ignoreDuplicateLeadsInOtherCampaign: false,
    ignoreGlobalBlockList: false,
    ignoreUnsubscribeList: false,
  });

  const handleToggle = (key: keyof CsvSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 12 }}
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
        Import Settings
      </DialogTitle>

      <DialogContent sx={{ padding: "20px 24px" }}>
        <Typography fontSize={14} fontWeight="600" mb={2} mt={2}>
          General Preferences
        </Typography>

        {[
          {
            key: "ignoreGlobalBlockList",
            label: "Import Leads Even If They Are In The Global Block List",
          },
          {
            key: "ignoreUnsubscribeList",
            label: "Import Leads Even If They Are In The Unsubscribe List",
          },
          {
            key: "ignoreCommunityBounceList",
            label:
              "Import Leads Even If They Bounced Across Our Entire Userbase",
          },
          {
            key: "ignoreDuplicateLeadsInOtherCampaign",
            label: "Ignore The Leads That Exist In Another Campaign",
          },
        ].map((item) => (
          <Box
            key={item.key}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Typography fontSize={14}>{item.label}</Typography>
              <Tooltip title="More info">
                <InfoOutlinedIcon
                  sx={{ fontSize: 16, color: "#9E9E9E", ml: 1 }}
                />
              </Tooltip>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings[item.key as keyof CsvSettings]}
                  onChange={() => handleToggle(item.key as keyof CsvSettings)}
                  color="primary"
                />
              }
              label=""
            />
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--theme-color)",
              color: "white",
              textTransform: "none",
              padding: "8px 24px",
              borderRadius: "6px",
              "&:hover": { backgroundColor: "#5a46d1" },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSettingDialog;
