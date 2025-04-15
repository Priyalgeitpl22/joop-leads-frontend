import { Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ContentContainer = styled(Box)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  backgroundColor: "var(--background-light)",
  minHeight: "100%",
});

export const HeaderOptions = styled(Box)`
  height: 40px;
  display: flex;
  background-color: #e7e7e7;
  padding: 5px;
  border-radius: 8px;
`;

export const MetricCard = styled(Card)(({ borderColor }: { borderColor: string }) => ({
  padding: "16px",
  borderRadius: "10px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 4px 12px var(--shadow-color)",
  borderLeft: `5px solid ${borderColor}`,
  backgroundColor: "var(--icon-light)",
  minHeight: "88px",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export const GraphContainer = styled(Card)({
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px var(--shadow-color)",
  backgroundColor: "var(--icon-light)",
});

export const SideCard = styled(Card)({
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  color: "#fff",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "100%",
  justifyContent: "space-between",
  transition: "0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
  },

  "& strong": {
    fontSize: "18px",
    fontWeight: "600",
  },

  "& span": {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ffea00",
  },
});

export const MetricCard1 = styled(Card)(
  ({ borderColor }: { borderColor: string }) => ({
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "160px",
    height: "88px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderLeft: `5px solid ${borderColor}`,
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  })
);
