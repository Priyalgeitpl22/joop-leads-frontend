import { Box, Menu } from "@mui/material";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";


export const CampaignsFolder = styled(Box)({
  width: "100%",
  height: "100%",
  marginTop: "5px",
  backgroundColor: "var(--background-light)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  position: "relative",
});

export const Icon = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15%",
});

export const FoldersIcon = styled(FolderIcon)({
  color: "var(--theme-color)",
});

export const FolderMenu = styled(Menu)({
  "& .MuiPaper-root": {
    boxShadow: "0px 1px 5px 1px var(--shadow-color) !important",
  },
})