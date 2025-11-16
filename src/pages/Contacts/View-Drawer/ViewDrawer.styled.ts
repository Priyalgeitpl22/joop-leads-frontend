import { styled } from "@mui/material/styles";
import { Drawer, Box, Typography, Card, IconButton, Chip } from "@mui/material";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "50%",
    maxWidth: "320px",
    height: "100vh",
    top: "10vh",
    borderRadius: "0px",
    flexDirection: "column",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",

  },
}));

export const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const ScrollableContent = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "18px",
  background: "#ffffff",
});

export const TitleContainer = styled(Box)({
  marginTop: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 10px",
  borderBottom: "1px solid #e5e7eb",
  background: "#ffffff",

});

export const StyledTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: "20px",
});

export const StyledCloseIconButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});

export const SectionTitle = styled(Typography)({
  fontSize: "13px",
  fontWeight: 600,
  color: "#6b7280",
  textTransform: "uppercase",
});

export const ContactCard = styled(Card)({
  margin: "10px 0",
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  boxShadow: "none",
});

export const FieldLabel = styled(Typography)({
  fontSize: "12px",
  color: "#6b7280",
  textTransform: "uppercase",
  marginBottom: "2px",
});

export const FieldValue = styled(Typography)({
  fontSize: "15px",
  color: "#111827",
  marginBottom: "8px",
});

export const CampaignCard = styled(Card)({
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  boxShadow: "none",
  marginBottom: "10px",
});

export const DraftChip = styled(Chip)({
  backgroundColor: "#fff7ed",
  color: "#d97706",
  fontWeight: 600,
  fontSize: "11px",
  height: "22px",
});

export const UploadedByContainer = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "15px",
  color: "#444",
});
export const IconStyle = (color: string) => ({
  verticalAlign: "middle",
  marginRight: "8px",
  color,
  fontSize: "22px",
});
