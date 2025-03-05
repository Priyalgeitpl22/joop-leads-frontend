import { Box, Typography, Radio, FormControlLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import SenderAccountDialog from "./SenderAccountDialog/SenderAccountDialog";
import ScheduleCampaignDialog from "./ScheduleCampaignDialog/ScheduleCampaignDialog";
import CampaignSettingDialog from "./CampaignSettingDialog/CampaignSettingDialog";
import { SetupButton } from "../NewCampaign.styled";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface SetupCampaignProps {
  campaignId?: string;
  handleSenderAccountsUpdate: (data: any) => void;
  handleScheduleCampaignUpdate: (data: any) => any;
  handleCampaignSettingsUpdate: (data: any) => any;
}

const SetupCampaign: React.FC<SetupCampaignProps> = ({
  campaignId,
  handleSenderAccountsUpdate,
  handleScheduleCampaignUpdate,
  handleCampaignSettingsUpdate,
}) => {
  const [senderAccount, setSenderAccount] = useState(false);
  const [scheduleCampaign, setScheduleCampaign] = useState(false);
  const [settingCampaign, setSettingCampaign] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "0px 32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          marginTop: "50px",
          maxWidth: "700px",
          padding: "32px",
          borderRadius: "10px",
          backgroundColor: "#F8F9FC",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E0E0E0",
            paddingBottom: "15px",
          }}
        >
          <FormControlLabel
            control={
              <Radio
                icon={<TaskAltIcon sx={{ color: "gray" }} />}
                checkedIcon={
                  <TaskAltIcon sx={{ color: "var(--success-color)" }} />
                }
              />
            }
            label={
              <Box>
                <Typography fontWeight="600">Sender Accounts</Typography>
                <Typography variant="body2">
                  Who is sending this campaign?
                </Typography>
              </Box>
            }
          />
          <SetupButton onClick={() => setSenderAccount(true)}>
            Choose Sender Accounts
          </SetupButton>

          <SenderAccountDialog
            campaignId={campaignId}
            open={senderAccount}
            onClose={() => setSenderAccount(false)}
            handleSave={handleSenderAccountsUpdate}
            handleSave={handleSenderAccountsUpdate}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E0E0E0",
            paddingY: "15px",
          }}
        >
          <FormControlLabel
            control={
              <Radio
                icon={<TaskAltIcon sx={{ color: "gray" }} />}
                checkedIcon={
                  <TaskAltIcon sx={{ color: "var(--success-color)" }} />
                }
              />
            }
            label={
              <Box>
                <Typography fontWeight="600">Schedule Campaign</Typography>
                <Typography variant="body2" >
                  Email will be triggered based on time chosen here
                </Typography>
              </Box>
            }
          />
          <SetupButton onClick={() => setScheduleCampaign(true)}>
            Schedule Campaign
          </SetupButton>
          <ScheduleCampaignDialog
            campaignId={campaignId}
            open={scheduleCampaign}
            onClose={() => setScheduleCampaign(false)}
            handleSave={handleScheduleCampaignUpdate}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "15px",
          }}
        >
          <FormControlLabel
            control={
              <Radio
                icon={<TaskAltIcon sx={{ color: "gray" }} />}
                checkedIcon={
                  <TaskAltIcon sx={{ color: "var(--success-color)" }} />
                }
              />
            }
            label={
              <Box>
                <Typography variant="h5">Campaign Settings</Typography>
                <Typography variant="body2" color="gray">
                  Configure the settings for this campaign
                </Typography>
              </Box>
            }
          />
          <SetupButton onClick={() => setSettingCampaign(true)}>
            Modify Settings
          </SetupButton>
          <CampaignSettingDialog
            open={settingCampaign}
            onClose={() => setSettingCampaign(false)}
            handleSave={handleCampaignSettingsUpdate}
          />
        </Box>

        {/* Follow-up Leads */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <CheckCircleIcon
            sx={{ color: "var(--success-color)", marginRight: "5px" }}
          />
          <Typography
            sx={{
              color: "var(--success-color)",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            100% Follow-up leads
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SetupCampaign;
