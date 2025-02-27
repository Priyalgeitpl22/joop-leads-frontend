import React from "react";
import { Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  AbConfiguration,
  AddVarientButton,
  BorderConatiner,
  EmailFollowUp,
  EmailFollowUpContainer,
  LeftDashedBorder,
} from "./sequences.styled";

// Define props interface
interface EmailFollowUpStepProps {
  onAddStep: () => void;
}

const EmailFollowUpStep: React.FC<EmailFollowUpStepProps> = () => {
  return (
    <>
      <EmailFollowUpContainer>
        <BorderConatiner>
          <MailOutlineIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <LeftDashedBorder />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "58px" }}>
            <Typography fontWeight="bold" sx={{ marginLeft: "8px" }}>
              Email follow up
            </Typography>

            <AbConfiguration>A/B Configuration</AbConfiguration>
          </div>
          <EmailFollowUp>
            <Typography fontSize={14}>Email</Typography>
            <Typography fontSize={14}>Subject: ----</Typography>
          </EmailFollowUp>
          <div>
            <AddVarientButton>+ Add Variant</AddVarientButton>
          </div>
        </div>
      </EmailFollowUpContainer>

      
    </>
  );
};

export default EmailFollowUpStep;
