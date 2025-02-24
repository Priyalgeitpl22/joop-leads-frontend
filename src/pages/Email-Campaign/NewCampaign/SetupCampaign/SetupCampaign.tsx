import {
  Box,
  Typography,
  Button,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import SenderAccountDialog from "./SenderAccountDialog/SenderAccountDialog";
import ScheduleCampaignDialog from "./ScheduleCampaignDialog/ScheduleCampaignDialog";
import CampaignSettingDialog from "./CampaignSettingDialog/CampaignSettingDialog";


const SetupCampaign = () => {
  const [senderAccount, setSenderAccount] = useState<boolean>(false);
  const [scheduleCampaign, setScheduleCampaign] = useState<boolean>(false);
  const [settingCampaign, setSettingCampaign] = useState<boolean>(false);

  const handleSenderAccount = () => {
    setSenderAccount(true);
  };

  const handleScheduleCampaign = () => {
    setScheduleCampaign(true);
  };

  const handleSetting = () => {
    setSettingCampaign(true);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "60px 0",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            padding: "30px",
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
              control={<Radio onClick={handleSenderAccount} />}
              label={
                <Box>
                  <Typography fontWeight="600">Sender Accounts</Typography>
                  <Typography variant="body2" color="gray">
                    Who is sending this campaign?
                  </Typography>
                </Box>
              }
            />
            <SenderAccountDialog
              open={senderAccount}
              onClose={() => setSenderAccount(false)}
            />
            <Button
              variant="contained"
              onClick={handleSenderAccount}
              sx={{
                backgroundColor: "#E4D9FF",
                color: "#6e58f1",
                background: "#f1f2fb",
                textTransform: "none",
                "&:hover": { backgroundColor: "#efeff0" },
              }}
            >
              Choose Sender Accounts
            </Button>
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
              control={<Radio onClick={handleScheduleCampaign} />}
              label={
                <Box>
                  <Typography fontWeight="600">Schedule Campaign</Typography>
                  <Typography variant="body2" color="gray">
                    Email will be triggered based on time chosen here
                  </Typography>
                </Box>
              }
            />
            <ScheduleCampaignDialog
              open={scheduleCampaign}
              onClose={() => setScheduleCampaign(false)}
            />
            <Button
              variant="contained"
              onClick={handleScheduleCampaign}
              sx={{
                color: "#6e58f1",
                textTransform: "none",
                background: "#f1f2fb",
                width: "28%",
                "&:hover": { backgroundColor: "#efeff0" },
              }}
            >
              Schedule Campaign
            </Button>
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
              control={<Radio onClick={handleSetting} />}
              label={
                <Box>
                  <Typography fontWeight="600">Campaign Settings</Typography>
                  <Typography variant="body2" color="gray">
                    Configure the settings for this campaign
                  </Typography>
                </Box>
              }
            />
            <CampaignSettingDialog
              open={settingCampaign}
              onClose={() => setSettingCampaign(false)}
            />
            <Button
              variant="contained"
              onClick={handleSetting}
              sx={{
                color: "#6e58f1",
                textTransform: "none",
                background: "#f1f2fb",
                width: "28%",
                "&:hover": { backgroundColor: "#efeff0" },
              }}
            >
              Modify Settings
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <CheckCircleIcon sx={{ color: "#4CAF50", marginRight: "5px" }} />
            <Typography
              sx={{
                color: "#4CAF50",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              100% Follow up leads
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SetupCampaign;