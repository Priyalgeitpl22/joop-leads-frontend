import { SetStateAction, useEffect, useState } from "react";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
} from "../EmailCampaign.styled";
import { useDispatch } from "react-redux";
import { fetchEmailCampaigns } from "../../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../../redux/store/store";
import { IEmailCampaign } from "./../NewCampaign/interfaces";

const EditEmailCampaign = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const dispatch = useDispatch<AppDispatch>();
  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);

  useEffect(() => {
    const getEmailCampaigns = async () => {
      await getAllEmailCampaigns();
    };

    getEmailCampaigns();
  }, []);

  const getAllEmailCampaigns = async () => {
    const response = await dispatch(fetchEmailCampaigns());
    console.log("campaign", campaigns)
    setCampaigns(response.payload.data || []);
  };

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    const validTabs = [
      "general",
      "warmUp",
      "management",
      "campaign",
      "attentionRequired",
    ];
    setActiveTab(validTabs.includes(newValue as string) ? newValue : "general");
  };

  return (
    <ContentContainer>
      <CustomTabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <CustomTab label="General" value="general" />
        <CustomTab label="Warm Up" value="warmUp" />
        <CustomTab label="Management" value="management" />
        <CustomTab label="Campaign" value="campaign" />
        <CustomTab label="Attention Required" value="attentionRequired" />
      </CustomTabs>

      {activeTab === "general" && <div>General Tab Content</div>}
      {activeTab === "warmUp" && <div>Warm Up Tab Content</div>}
      {activeTab === "management" && <div>Management Tab Content</div>}
      {activeTab === "campaign" && <div>Campaign Tab Content</div>}
      {activeTab === "attentionRequired" && (
        <div>Attention Required Tab Content</div>
      )}
    </ContentContainer>
  );
};

export default EditEmailCampaign;
