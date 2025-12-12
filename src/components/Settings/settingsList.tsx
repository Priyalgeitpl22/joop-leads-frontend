import { List, ListItemIcon, ListItemText } from "@mui/material";

import {
  SettingsListContainer,
  StyledIconBox,
  StyledListItemButton,
} from "./styled";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CreditCardIcon } from "lucide-react";

interface SettingsListProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const SettingsList = ({ selectedTab, setSelectedTab }: SettingsListProps) => {
  const settingsItems = [
    { icon: <CreditCardIcon />, label: "Manage Billing" },
    // { icon: <ShieldCheckIcon />, label: "Manage Security" },
  ];

  return (
    <SettingsListContainer>
      <List>
        {settingsItems.map((item) => (
          <StyledListItemButton
            key={item.label}
            selected={selectedTab === item.label}
            onClick={() => setSelectedTab(item.label)}
          >
            <ListItemIcon>
              <StyledIconBox>{item.icon}</StyledIconBox>
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ fontSize: "14px", fontWeight: "500" }}
            />
            <StyledIconBox>
              <ChevronRightIcon />
            </StyledIconBox>
          </StyledListItemButton>
        ))}
      </List>
    </SettingsListContainer>
  );
};

export default SettingsList;
