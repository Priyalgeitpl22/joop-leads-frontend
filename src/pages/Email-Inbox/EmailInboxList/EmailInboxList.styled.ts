import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  ListItem,
  TypographyProps,
  List,
} from "@mui/material";
import { motion } from "framer-motion";

export const EmailInboxListContainer = styled(Box)({
  width: 290,
  borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
});

export const EmailInboxListHeader = styled(Box)({
  padding: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
});

export const ThreadList = styled(List)`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;
interface EmailInboxListItemProps {
  active?: boolean;
}

export const EmailInboxListItem = styled(motion.create(ListItem), {
  shouldForwardProp: (prop) => prop !== "active",
})<EmailInboxListItemProps>(({ active }) => ({
  "&:hover": {
    backgroundColor: "var(--theme-color)",
    cursor: "pointer",
  },
  padding: "12px 16px",
  backgroundColor: active ? "var(--theme-color)" : "transparent",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
}));

export const TimeStamp = styled(Typography)({
  display: "flex",
  flexDirection: "row",
  fontSize: "0.75rem",
  color: "rgba(0, 0, 0, 0.6)",
  alignItems: "center",
});

export const MessagePreview = styled(Typography)<TypographyProps>({
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "0.7rem",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: "22ch",
  textOverflow: "clip",
});

MessagePreview.defaultProps = {
  component: "span",
};
