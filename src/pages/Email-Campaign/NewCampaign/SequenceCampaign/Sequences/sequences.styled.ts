import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { AssessmentOutlined, HourglassBottomOutlined, MailOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

export const EmailFollowUpContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 18,
});

export const ManualFollowUpContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 18,
});

export const BorderConatiner = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 5,
});

export const LeftDashedBorder = styled.div({
  width: "2px",
  height: "100px",
  backgroundColor: "#d2c4f5",
});

export const LeftDashedBorderLine = styled.div({
  width: "2px",
  height: "20px",
  backgroundColor: "#d2c4f5",
});

export const AbConfiguration = styled(Typography)({
  color: "var(--theme-color)",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  textDecorationLine: "underline"
})

export const EmailFollowUp = styled(Box)({
  border: "1px solid var(--icon-color)",
  borderRadius: "8px",
  padding: "20px",
  width: "260px",
  background: "white"
})

export const AddVarientButton = styled(Button)({
  textTransform: "none",
  fontSize: "12px",
  color: "var(--theme-color)",
  backgroundColor: "rgba(110, 88, 241, 0.1)",
  width: "40%",
  float: "right",
});

export const AddStepButton = styled.button`
  background: none;
  border: 0;
  color: var(--border-color);
  cursor: pointer;

  &:hover {
    background: var(--accent-color);
    border-radius: 3px;
    padding: 4px;
    transition: none !important;
  }
`;

export const AddStepButtonWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "18px",
  cursor: "pointer",
  color: "var(--theme-color)",
})

export const VariantWrapper = styled(Box)(`
  display: flex;
  transition: background-color 0.3s ease-in-out;
`)

export const StyledEmailIcon = styled(EmailIcon)(`
  color: var(--hover-color) !important;
  width: 40px;
  height: 40px;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 8px;
  background: white;
  border-radius: 50%;
  border: 1px solid var(--border-dark);
  
  &:hover {
    border-color: 1px solid var(--border-dark);
  }
`);

export const StyledAssignmentIcon = styled(AssessmentOutlined)(`
  color: var(--hover-color) !important;
  width: 40px;
  height: 40px;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 8px;
  background: white;
  border-radius: 50%;
  border: 1px solid var(--border-dark);
  
  &:hover {
    border-color: 1px solid var(--border-dark);
  }
`);

export const StyledWaitIcon = styled(HourglassBottomOutlined)(`
  color: var(--hover-color) !important;
  width: 30px;
  height: 30px;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 4px;
  background: white;
  border-radius: 50%;
  
  &:hover {
    border-color: 1px solid var(--border-dark);
  }
`);

export const StyledMailIcon = styled(MailOutline)(`
  color: var(--hover-color) !important;
  width: 30px;
  height: 30px;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 4px;
  background: white;
  border-radius: 50%;
  
  &:hover {
    border-color: 1px solid var(--border-dark);
  }
`);

export const StyledAddIcon = styled(AddIcon)(`
  color: var(--hover-color) !important;
  width: 30px;
  height: 30px;
  transition: color 0.3s ease, background-color 0.3s ease;
  padding: 4px;
  background: white;
  border-radius: 50%;
  
  &:hover {
    border-color: 1px solid var(--border-dark);
  }
`);


