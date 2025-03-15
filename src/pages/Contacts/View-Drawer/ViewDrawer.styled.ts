import { styled } from "@mui/material/styles";
import { Drawer, Box, Typography, Card, IconButton } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 400,
    maxHeight: "90vh",
    top: "10vh",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    overflowY: "auto",
    background: "#FAFAFA",
  },
});

export const TitleContainer = styled(Box)({
  position: "relative",
  top: "14vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#4A4A8A",
  color: "#fff",
  marginBottom: "20px",
  padding: "10px",
});

export const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "20px",
});

export const StyledCloseIconButton = styled(IconButton)({
  color: "#fff",
});

export const ContactCard = styled(Card)({
  marginTop: "73px",
  overflow: "visible",
  padding: "15px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  background: "#FFFFFF",
});

export const CampaignCard = styled(Card)({
  margin: "10px 20px",
  overflow: "visible",
  padding: "12px",
  background: "#E3F2FD",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.08)",
});

export const IconStyle = (color: string) => ({
  verticalAlign: "middle",
  marginRight: "8px",
  color,
});

export const SectionTitle = styled(Typography)({
  padding: "0 16px",
});

export const UploadedByContainer = styled(Typography)({
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
});
