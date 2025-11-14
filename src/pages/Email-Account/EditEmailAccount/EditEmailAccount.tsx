import { SetStateAction, useState } from "react";
import {
  CustomTab,
  CustomTabs,
  ScrollableContent,
} from "../../Email-Campaign/EmailCampaign.styled";
import { ContentContainer } from "./EditCampaignEmailAccount.styled";
import EditGeneralEmailAccount from "./EditGeneralEmailAccount";
import EditCampaignEmailAccount from "./EditCampaignEmailAccount";
import EditWarmupEmailAccount from "./EditWarmupEmailAccount";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EditEmailAccount = ({ id }: { id?: string }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("general");
  console.log("EditEmailAccount ID:", id);

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    if(newValue as string === "back"){
      navigate("/email-accounts")
    }
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
          height:"3.5rem !important"
        }}
      >
        <CustomTab value="back" label={ <ArrowLeft />} /> 
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
