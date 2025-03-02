import { SetStateAction, useState } from "react";
import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
} from "../../../EmailCampaign.styled";
import GeneralCampaignSetting from "./GeneralCampaignSetting";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";

interface SettingCampaignProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
}

const CampaignSettingDialog: React.FC<SettingCampaignProps> = ({
  open,
  onClose,
  campaignId,
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
        <CustomDialogHeader>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 16, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5">General Campaign Settings</Typography>
        </CustomDialogHeader>

        <ContentContainer>
          {activeTab === "general" && (
            <GeneralCampaignSetting campaignId={campaignId} onClose={onClose} />
          )}
        </ContentContainer>
        <CustomDialogFooter>
          {" "}
          <Button>Save General Settings</Button>
        </CustomDialogFooter>
      </Dialog>
    </>
  );
};

export default CampaignSettingDialog;
