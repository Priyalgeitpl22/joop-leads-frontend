import { Box, Card, styled } from "@mui/material";

export const ContentContainer = styled("div")({
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100%",
  backgroundColor: "#f8f9fc",
});

export const HeaderOptions = styled(Box)`
  height: 40px;
  display: flex;
  background-color: var(--background-color)
  padding: 5px;
  border-radius: 8px;
`

export const SideCard = styled(Card)({
  width: "25%",
  height: "50%",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#f3f1ff",
  borderRadius: "12px",
  boxShadow: "none",
  alignContent: "center",
});

export const MetricCard = styled(Card)(({ borderColor }: { borderColor: string }) => ({
  padding: "12px",
  borderRadius: "6px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "none",
  borderLeft: `4px solid ${borderColor}`,
}));

export const metricStyles = [
  { label: "Total Sent", value: 65, color: "#e6e8fc", borderColor: "#8c68f5" },
  {
    label: "Unique Bounced",
    value: 43,
    color: "#fdeaea",
    borderColor: "#e65984",
  },
  {
    label: "Unique Replied",
    value: 21,
    color: "#eaf8f0",
    borderColor: "#2188bd",
  },
  {
    label: "Unique Positive Replies",
    value: 16,
    color: "#e5ffeb",
    borderColor: "#a7cc7d",
  },
];
