import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const SidebarContainer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    background: "#1E1E2D", // Dark theme background
    color: "white",
  },
});

const SidebarList = styled(List)({
  paddingTop: 20,
});

const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  color: "white",
  "&.Mui-selected": {
    backgroundColor: "#007bff",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const CustomSidebar = ({ selected, onSelect }: { selected: string; onSelect: (path: string) => void }) => {
  const [openReports, setOpenReports] = useState(false);

  return (
    <SidebarContainer variant="permanent">
      <SidebarList>
        <SidebarItem selected={selected === "dashboard"} onClick={() => onSelect("dashboard")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </SidebarItem>

        <SidebarItem selected={selected === "orders"} onClick={() => onSelect("orders")}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </SidebarItem>

        <SidebarItem onClick={() => setOpenReports(!openReports)}>
          <ListItemIcon>
            <BarChartIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </SidebarItem>

        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <SidebarItem sx={{ pl: 4 }} selected={selected === "sales"} onClick={() => onSelect("sales")}>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Sales" />
            </SidebarItem>
            <SidebarItem sx={{ pl: 4 }} selected={selected === "traffic"} onClick={() => onSelect("traffic")}>
              <ListItemIcon>
                <DescriptionIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Traffic" />
            </SidebarItem>
          </List>
        </Collapse>

        <SidebarItem selected={selected === "integrations"} onClick={() => onSelect("integrations")}>
          <ListItemIcon>
            <LayersIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default CustomSidebar;
