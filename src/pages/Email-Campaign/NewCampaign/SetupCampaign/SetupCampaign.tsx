import { Box, Typography, Radio, FormControlLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";
import SenderAccountDialog from "./SenderAccountDialog/SenderAccountDialog";
import ScheduleCampaignDialog from "./ScheduleCampaignDialog/ScheduleCampaignDialog";
import CampaignSettingDialog from "./CampaignSettingDialog/CampaignSettingDialog";
import { SetupButton } from "../NewCampaign.styled";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { getCampaignById } from "../../../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../../../redux/store/store";
import { useLocation } from "react-router-dom";

interface SetupCampaignProps {
  campaign_id?: string;
  handleSenderAccountsUpdate: (data: any) => void;
  handleScheduleCampaignUpdate: (data: any) => any;
  handleCampaignSettingsUpdate: (data: any) => any;
}

const SetupCampaign: React.FC<SetupCampaignProps> = ({
  campaign_id,
  handleSenderAccountsUpdate,
  handleScheduleCampaignUpdate,
  handleCampaignSettingsUpdate,
}) => {
  const [openSenderAccount, setOpenSenderAccount] = useState(false);
  const [openCampaignSchedule, setOpenCampaignSchedule] = useState(false);
  const [openCampaignSetting, setOpenCampaignSetting] = useState(false);

  const [senderAccounts, setSenderAccounts] = useState();
  const [campaignSchedule, setCampaignSchedule] = useState();
  const [campaignSetting, setCampaignSetting] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    if (campaignId) {
      fetchCampaignDetails(campaignId);
    }
  }, [dispatch]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      setSenderAccounts(campaign.sender_accounts);
      setCampaignSchedule(campaign.campaign_schedule);
      setCampaignSetting(campaign.campaign_settings);
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const senderAccountDialogOpen = (isOpen: boolean) => {
    setOpenSenderAccount(isOpen);
  };

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
          <SetupButton onClick={() => senderAccountDialogOpen(true)}>
            Choose Sender Accounts
          </SetupButton>

          <SenderAccountDialog
            campaignId={campaign_id}
            senderAccounts={senderAccounts}
            open={openSenderAccount} // ✅ Correctly passing boolean
            onClose={() => senderAccountDialogOpen(false)}
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
                <Typography variant="body2">
                  Email will be triggered based on time chosen here
                </Typography>
              </Box>
            }
          />
          <SetupButton onClick={() => setOpenCampaignSchedule(true)}>
            Schedule Campaign
          </SetupButton>

          <ScheduleCampaignDialog
            campaignSchedule={campaignSchedule}
            handleSave={handleScheduleCampaignUpdate}
            campaignId={campaign_id}
            open={openCampaignSchedule}
            onClose={() => setOpenCampaignSchedule(false)}
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
                <Typography variant="body2">
                  Configure the settings for this campaign
                </Typography>
              </Box>
            }
          />
          <SetupButton onClick={() => setOpenCampaignSetting(true)}>
            Modify Settings
          </SetupButton>
          <CampaignSettingDialog
            campaignSetting={campaignSetting}
            handleSave={handleCampaignSettingsUpdate}
            campaignId={campaign_id}
            open={openCampaignSetting}
            onClose={() => setOpenCampaignSetting(false)}
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
