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
  const [waitDays, setWaitDays] = useState(1);

  return (
    <>
      <EmailFollowUpContainer>
        <BorderConatiner>
          <HourglassBottomIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <LeftDashedBorderLine />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>
            Wait for{" "}
            <input
              type="number"
              value={waitDays}
              min={1}
              onChange={(e) => setWaitDays(Number(e.target.value))}
              style={{
                width: "40px",
                textAlign: "center",
                border: "1px solid grey",
                borderBottom: "1px solid black",
              }}
            />{" "}
            day{waitDays > 1 ? "s" : ""} then
          </Typography>
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
