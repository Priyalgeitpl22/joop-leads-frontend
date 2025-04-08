import { SetStateAction, useState } from "react";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
  ScrollableContent,
} from "../../Email-Campaign/EmailCampaign.styled";
import EditGeneralEmailAccount from "./EditGeneralEmailAccount";
import EditCampaignEmailAccount from "./EditCampaignEmailAccount";
import EditWarmupEmailAccount from "./EditWarmupEmailAccount";

const EditEmailAccount = ({ id }: { id?: string }) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  console.log("EditEmailAccount ID:", id);

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    const validTabs = ["general", "warmUp", "campaign"];
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
        <CustomTab label="Campaign" value="campaign" />
      </CustomTabs>

      <ScrollableContent>
        {activeTab === "general" && <EditGeneralEmailAccount id={id} />}
        {activeTab === "warmUp" && <EditWarmupEmailAccount />}
        {activeTab === "campaign" && <EditCampaignEmailAccount id={id}/>}
      </ScrollableContent>
    </ContentContainer>
  );
};

export default EditEmailAccount;
