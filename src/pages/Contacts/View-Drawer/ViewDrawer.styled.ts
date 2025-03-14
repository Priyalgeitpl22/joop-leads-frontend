import { styled } from "@mui/material/styles";
import { Drawer, Box, Typography, Card } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 450,

    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    overflowY: "auto",
  },
});

export const TitleContainer = styled(Box)({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
});

export const Title = styled(Typography)({
  fontSize: "25px",
  fontWeight: "bold",
  color: "#2E2E5D",
});

export const ContactCard = styled(Card)({
  padding: "16px",
  paddingBottom: "20px",
  borderRadius: "10px",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  marginBottom: "16px",
});

export const CampaignCard = styled(Card)({
  padding: "12px",
  marginTop: "8px",
  borderRadius: "8px",
  background: "#f9f9f9",
});
