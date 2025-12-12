import { Container } from "../../styles/global.styled";
import SettingsList from "./settingsList";
import { useState } from "react";
import { SettingsContainer } from "./styled";
import BillingSettings from "./billingSettings";
  
const Settings = () => {

  const [selectedTab, setSelectedTab] = useState<string>("Manage Billing");
  
  return (
    <Container>
      {/* <Box sx={{ width: "100%", height: "100%" }}> */}
        <SettingsContainer> 
          <SettingsList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          {selectedTab === "Manage Billing" && <BillingSettings />}
          {selectedTab === "Manage Security" && <BillingSettings />}
        </SettingsContainer>
      {/* </Box> */}
    </Container>
  );
};

export default Settings;
