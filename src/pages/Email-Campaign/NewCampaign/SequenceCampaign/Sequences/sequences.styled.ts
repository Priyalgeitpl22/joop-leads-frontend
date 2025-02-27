import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

export const EmailFollowUpContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 18,
});

export const BorderConatiner = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const LeftDashedBorder = styled.div({
  width: "2px",
  height: "160px",
  backgroundColor: "#d3d3d3",
});

export const  AbConfiguration = styled(Typography)({
  color: "#6e58f1",
  fontSize: "14px",
  fontWeight: "500",
  textDecorationLine: "underline"
})

export const EmailFollowUp = styled(Box)({
    border: "1px solid #6e58f1",
    borderRadius: "8px",
    padding: "20px",
    width: "260px",
})

export const AddVarientButton = styled(Button)({
  textTransform: "none",
  fontSize: "12px",
  color: "#6e58f1",
  backgroundColor: "rgba(110, 88, 241, 0.1)",
  width: "40%",
  float: "right",
});

export const AddStepButton = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  cursor: "pointer",
  color: "#6e58f1",
})