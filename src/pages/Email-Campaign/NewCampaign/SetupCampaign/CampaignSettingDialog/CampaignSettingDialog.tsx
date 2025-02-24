import { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton
} from "@mui/material";
import { ContentContainer, CustomTab, CustomTabs } from "../../../EmailCampaign.styled";
import GeneralCampaignSetting from "./GeneralCampaignSetting";
import CloseIcon from "@mui/icons-material/Close";
import EmailCampaignSetting from "./EmailCampaignSetting";
import WebhooksCampaignSetting from "./WebhooksCampaignSetting";


interface SettingCampaignProps {
  open: boolean;
  onClose: () => void;
}

const CampaignSettingDialog: React.FC<SettingCampaignProps> = ({
  open,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { height: "620px" } }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 10 }}
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
          Campaign Settings
        </DialogTitle>

        <CustomTabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
          }}
        >
          <CustomTab label="General" value="general" />
          <CustomTab label="Email Account" value="email_account" />
          <CustomTab label="Webhooks" value="webhooks" />
        </CustomTabs>
        <ContentContainer>
          {activeTab === "general" && <GeneralCampaignSetting />}
          {activeTab === "email_account" && <EmailCampaignSetting />}
          {activeTab === "webhooks" && <WebhooksCampaignSetting />}
        </ContentContainer>
      </Dialog>
    </>
  );
};

export default CampaignSettingDialog;
