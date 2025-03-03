import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BorderConatiner,
  EmailFollowUp,
  EmailFollowUpContainer,
  LeftDashedBorder,
  LeftDashedBorderLine,
  ManualFollowUpContainer,
} from "./sequences.styled";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Sequence, SequenceVariant } from "./interfaces";

interface ManualFollowUpProps {
  onAddStep: () => void;
  onDelete: (data: any) => void;
  onClickEmailFollowUp: (data: any) => void;
  updateSequenceData: (data: Sequence) => void;
  selectedSequence?: Sequence;
}

const ManualFollowUp: React.FC<ManualFollowUpProps> = ({
  onDelete,
  onClickEmailFollowUp,
  updateSequenceData,
  selectedSequence,
}) => {
  const [waitDays, setWaitDays] = useState(1);
  const [variants, setVariants] = useState<SequenceVariant[]>(
    selectedSequence?.seq_variants || []
  );

  useEffect(() => {
    if (selectedSequence) {
      setVariants(selectedSequence.seq_variants);
      setWaitDays(selectedSequence.seq_delay_details?.delay_in_days || 1);
    }
  }, [selectedSequence]);

  const handleWaitDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWaitDays = Number(e.target.value);
    setWaitDays(newWaitDays);

    if (selectedSequence) {
      const updatedSequence: Sequence = {
        ...selectedSequence,
        seq_delay_details: { delay_in_days: newWaitDays },
      };

      updateSequenceData(updatedSequence);
    }
  };

  return (
    <>
      <ManualFollowUpContainer>
        <BorderConatiner>
          <HourglassBottomIcon
            sx={{ fontSize: 20, color: "var(--theme-color)" }}
          />
          <LeftDashedBorderLine />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography>
            Wait for{" "}
            <input
              defaultValue={waitDays}
              // value={waitDays}
              onChange={handleWaitDaysChange}
              style={{
                textAlign: "center",
                border: "1px solid var(--icon-color)",
                borderRadius: '4px',
                padding: '0 12px',
                height: '24px',
                width: '47px',
              }}
            />{" "}
            day{waitDays > 1 ? "s" : ""} then
          </Typography>
        </div>
      </ManualFollowUpContainer>

      <ManualFollowUpContainer
        onClick={() => onClickEmailFollowUp(selectedSequence)}
      >
        <BorderConatiner>
          <ContentCopyIcon sx={{ fontSize: 20, color: "var(--theme-color)" }} />
          <LeftDashedBorder />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "58px" }}>
            <Typography
              fontWeight="bold"
              sx={{ marginLeft: "8px", marginBottom: "8px" }}
            >
              Manual follow-up
            </Typography>
          </div>
          <EmailFollowUp>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={14}>Manual</Typography>
              <DeleteOutlineIcon
                sx={{ color: "var(--icon-color)", cursor: "pointer" }}
                onClick={() => onDelete(selectedSequence)}
              />
            </div>
            <Typography fontSize={14}>
              Title : {selectedSequence?.seq_variants[0].subject}
            </Typography>
          </EmailFollowUp>
        </div>
      </ManualFollowUpContainer>
    </>
  );
};

export default ManualFollowUp;
