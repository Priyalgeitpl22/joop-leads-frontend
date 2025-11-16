import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Switch,
  Typography,
  Tooltip,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { csvSettingsType } from "../../Interfaces";
import {Button} from '../../../../styles/global.styled'

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
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown
      onClose={(_event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 12,
          color: "#6b7280",
          "&:hover": {
            backgroundColor: "#f3f4f6",
            color: "#1f2937",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 20,
          background: "#ffffff",
          px: 3,
          pt: 3,
          pb: 2,
          borderBottom: "1px solid rgb(229, 231, 235)",
          color: "#1f2937",
          letterSpacing: "-0.3px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            height: 36,
            width: 36,
            borderRadius: "10px",
            background: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/upload.png"
            height={25}
            width={25}
            style={{ objectFit: "contain" }}
          />
        </Box>
        Import Settings
      </DialogTitle>

      <DialogContent
        sx={{
          padding: "28px 24px 10px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          fontSize={15}
          fontWeight="700"
          mb={2}
          mt={2}
          sx={{
            color: "#1f2937",
            letterSpacing: "-0.2px",
          }}
        >
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
        ].map((item) => {
          const isOn = settings[item.key as keyof CsvSettings];

          return (
            <Box
              key={item.key}
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              mb={2}
              sx={{
                padding: "16px 14px",
                border: "1px solid",
                borderRadius: "8px",
                transition: "all 0.25s ease",
                backgroundColor: isOn ? "#f0f9ff" : "#f9fafb",
                borderColor: isOn ? "#bfdbfe" : "#e5e7eb",
              }}
            >
              <Box display="flex" alignItems="center" flex={1}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.5",
                  }}
                >
                  {item.label}
                </Typography>
                <Tooltip title="More info" arrow>
                  <InfoOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: "#9ca3af",
                      ml: 1.5,
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "#6b7280",
                      },
                    }}
                  />
                </Tooltip>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={isOn}
                    onChange={() => handleToggle(item.key as keyof CsvSettings)}
                    sx={{
                      ml: 2,
                      "& .MuiSwitch-switchBase": {
                        color: "#d1d5db",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "var(--primary-dark)",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "var(--primary-light)",
                        },
                    }}
                  />
                }
                label=""
              />
            </Box>
          );
        })}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={handleSave}>Proceed</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSettingDialog;
