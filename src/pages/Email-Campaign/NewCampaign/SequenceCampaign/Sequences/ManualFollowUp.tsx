import { Typography } from "@mui/material";
import { useState } from "react";
import { BorderConatiner, EmailFollowUp, EmailFollowUpContainer, LeftDashedBorder, LeftDashedBorderLine } from "./sequences.styled";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface ManualFollowUpProps {
  onAddStep: () => void;
  onDelete: () => void;
}


const ManualFollowUp: React.FC<ManualFollowUpProps> = ({onDelete}) => {

  return (
    <>
      <EmailFollowUpContainer>
        <BorderConatiner>
          <HourglassBottomIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <LeftDashedBorderLine />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>Wait for 1 day then</Typography>
        </div>
      </EmailFollowUpContainer>
      <EmailFollowUpContainer>
        <BorderConatiner>
          <ContentCopyIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <LeftDashedBorder />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "58px" }}>
            <Typography fontWeight="bold" sx={{ marginLeft: "8px" }}>
              Manual follow up
            </Typography>
          </div>
          <EmailFollowUp>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={14}>Manual</Typography>
              <DeleteOutlineIcon onClick={onDelete} />
            </div>
            <Typography fontSize={14}>Title: ----</Typography>
          </EmailFollowUp>
        </div>
      </EmailFollowUpContainer>
    </>
  );
};

export default ManualFollowUp;
