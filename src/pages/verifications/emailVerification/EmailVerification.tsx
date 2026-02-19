import { useState } from "react";
import { LeftPanel, PageContainer, RightPanel, Tab, TabsContainer, TabsList, VerificationContent } from "./EmailVerification.styled"
import StartVerificationOption from "./leftPanel/StartVerificationOption";
import UploadFileOption from "./rightPanel/UploadFileOption";

const EmailVerification = () => {
  const [activeTab, setActiveTab] = useState<string>("verification");
  
  return (
    <PageContainer>
      <TabsContainer>
        <TabsList>
          <Tab
            $isActive={activeTab === "verification"}
            onClick={() => setActiveTab("verification")}
          >
            Verify Email
          </Tab>
        </TabsList>
      </TabsContainer>
      <VerificationContent>
        <LeftPanel><StartVerificationOption/> </LeftPanel>
        <RightPanel><UploadFileOption /></RightPanel>
      </VerificationContent>
    </PageContainer>
  );
}

export default EmailVerification