import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export const EmailFollowUpContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 18,
  // maxHeight: '140px'
});

export const ManualFollowUpContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 18,
  // maxHeight: '10px'
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

export const LeftDashedBorderLine = styled.div({
  width: "2px",
  height: "60px",
  backgroundColor: "#d3d3d3",
});

export const  AbConfiguration = styled(Typography)({
  color: "#6e58f1",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
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

export const VariantWrapper = styled(Box)(`
  display: flex;
  transition: background-color 0.3s ease-in-out;

  // &:hover {
  //     background-color: #f0f0f5; /* Light gray background on hover */
  //     cursor: pointer; /* Changes cursor to pointer */
  // }
`)

export const StyledEmailIcon = styled(EmailIcon)(`
  color: #6e58f1;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 8px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  
  &:hover {
    color: #4a3ec4; /* Darker purple on hover */
    background: rgba(110, 88, 241, 0.1); /* Light purple hover effect */
    border-color: #d0d0d0; /* Slightly darker border on hover */
  }
`);

export const StyledAssignmentIcon = styled(EmailIcon)(`
  color: #6e58f1;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 8px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
  
  &:hover {
    color: #4a3ec4; /* Darker purple on hover */
    background: rgba(110, 88, 241, 0.1); /* Light purple hover effect */
    border-color: #d0d0d0; /* Slightly darker border on hover */
  }
`);