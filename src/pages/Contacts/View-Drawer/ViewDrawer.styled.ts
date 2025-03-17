import { styled } from "@mui/material/styles";
import { Drawer, Box, Typography, Card, IconButton } from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "100%",
    maxWidth: "420px",
    maxHeight: "90vh",
    top: "10vh",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    overflowY: "auto",
    background: "#F9FAFB",

    [theme.breakpoints.down("sm")]: {
      width: "90%",
      maxWidth: "350px",
      borderRadius: "12px",
      top: "5vh",
    },
  },
}));

export const StyleBox = styled(Box)({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
});

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "var(--background-secondary)",
  color: "var(--icon-light)",
  padding: "16px",
  borderRadius: "12px 12px 0 0",
  position: "sticky",
  top: 0,
  zIndex: 2,

  [theme.breakpoints.down("sm")]: {
    padding: "12px",
    fontSize: "18px",
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "20px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));

export const StyledCloseIconButton = styled(IconButton)({
  color: "var(--icon-light)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});

export const ContactCard = styled(Card)(({ theme }) => ({
  margin: "16px",
  padding: "16px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  background: "var(--background-color)",
  borderRadius: "12px",

  [theme.breakpoints.down("sm")]: {
    margin: "12px",
    padding: "14px",
  },
}));

export const CampaignCard = styled(Card)(({ theme }) => ({
  margin: "12px 20px",
  padding: "14px",
  background: "var(--background-color)",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.08)",
  borderRadius: "12px",

  [theme.breakpoints.down("sm")]: {
    margin: "10px 16px",
    padding: "12px",
  },
}));

export const IconStyle = (color: string) => ({
  verticalAlign: "middle",
  marginRight: "8px",
  color,
  fontSize: "22px",
});

export const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: "8px 16px",
  fontWeight: "bold",
  fontSize: "16px",
  color: "#333",

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

export const UploadedByContainer = styled(Typography)(({ theme }) => ({
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "500",
  color: "#555",

  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));
