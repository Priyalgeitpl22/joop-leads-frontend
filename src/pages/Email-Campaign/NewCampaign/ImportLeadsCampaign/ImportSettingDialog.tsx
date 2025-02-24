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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ImportSettingDialogProps {
  open: boolean;
  onClose: () => void;
}

type SettingKey =
  | "blockList"
  | "unsubscribeList"
  | "bouncedLeads"
  | "existingCampaign";

const ImportSettingDialog: React.FC<ImportSettingDialogProps> = ({
  open,
  onClose,
}) => {
  const [settings, setSettings] = useState<{
    blockList: boolean;
    unsubscribeList: boolean;
    bouncedLeads: boolean;
    existingCampaign: boolean;
  }>({
    blockList: false,
    unsubscribeList: false,
    bouncedLeads: false,
    existingCampaign: false,
  });

  const handleToggle = (key: SettingKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
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
          General Preference
        </Typography>

        {(
          [
            {
              key: "blockList",
              label: "Import Leads Even If They Are In The Global Block List",
            },
            {
              key: "unsubscribeList",
              label: "Import Leads Even If They Are In The Unsubscribe List",
            },
            {
              key: "bouncedLeads",
              label:
                "Import Leads Even If They Bounced Across Our Entire Userbase",
            },
            {
              key: "existingCampaign",
              label: "Ignore The Leads That Exist In Another Campaign",
            },
          ] as { key: SettingKey; label: string }[]
        ).map((item) => (
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
            <Switch
              checked={settings[item.key]}
              onChange={() => handleToggle(item.key)}
              color="primary"
            />
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6e58f1",
              color: "white",
              textTransform: "none",
              padding: "8px 24px",
              borderRadius: "6px",
              "&:hover": { backgroundColor: "#5a46d1" },
            }}
            onClick={onClose}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSettingDialog;
