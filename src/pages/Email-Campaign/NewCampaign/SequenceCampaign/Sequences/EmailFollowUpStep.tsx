import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AbConfiguration,
  BorderConatiner,
  EmailFollowUp,
  EmailFollowUpContainer,
  LeftDashedBorder,
  LeftDashedBorderLine,
  StyledMailIcon,
  StyledWaitIcon,
  VariantWrapper,
} from "./sequences.styled";
import { Sequence, SequenceVariant } from "./interfaces";

interface EmailFollowUpStepProps {
  onAddStep: () => void;
  onDelete: (sequenceId: number) => void;
  updateSequenceData: (sequence: Sequence) => void;
  onSelectVariant: (variant: SequenceVariant) => void;
  openAbConfigurationDialog: () => void;
  onClickEmailFollowUp: (sequence: Sequence) => void;
  isFirstEmail: boolean;
  selectedSequence?: Sequence;
}

const EmailFollowUpStep: React.FC<EmailFollowUpStepProps> = ({
  onDelete,
  openAbConfigurationDialog,
  onClickEmailFollowUp,
  updateSequenceData,
  onSelectVariant,
  isFirstEmail,
  selectedSequence,
}) => {
  const [variants, setVariants] = useState<SequenceVariant[]>(
    selectedSequence?.seq_variants || []
  );
  const [waitDays, setWaitDays] = useState(
    selectedSequence?.seq_delay_details?.delay_in_days || 1
  );

  useEffect(() => {
    if (selectedSequence) {
      setVariants(selectedSequence.seq_variants.map(variant => ({ ...variant })));
      setWaitDays(selectedSequence.seq_delay_details?.delay_in_days || 1);
    }
  }, [selectedSequence]);

  // const getNextVariantLabel = (variants: SequenceVariant[]) => {
  //   if (variants.length === 0) return "A";

  //   const lastLabel = variants[variants.length - 1].variantLabel ?? "A";
  //   return String.fromCharCode(lastLabel.charCodeAt(0) + 1);
  // };

  // const handleAddVariant = () => {
  //   const newVariant: SequenceVariant = {
  //     subject: `Subject ${variants.length + 1}`,
  //     emailBody: "",
  //     variantLabel: getNextVariantLabel(variants),
  //   };

  //   setVariants([...variants, newVariant]);

  //   if (selectedSequence) {
  //     const updatedSequence: Sequence = {
  //       ...selectedSequence,
  //       seq_variants: [...selectedSequence.seq_variants, newVariant],
  //     };

  //     updateSequenceData(updatedSequence);
  //   }
  // };

  const handleWaitDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWaitDays = Number(e.target.value);
    setWaitDays(newWaitDays);

    if (selectedSequence) {
      const updatedSequence: Sequence = {
        ...selectedSequence,
        seq_delay_details: { delay_in_days: newWaitDays },
        seq_variants: selectedSequence.seq_variants.map(variant => ({ ...variant }))
      };

      updateSequenceData(updatedSequence);
    }
  };

  return (
    <>
      {!isFirstEmail && (
        <EmailFollowUpContainer
          onClick={() => onClickEmailFollowUp(selectedSequence!)}
        >
          <BorderConatiner>
            <StyledWaitIcon
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
        </EmailFollowUpContainer>
      )}
      <EmailFollowUpContainer
        onClick={() => onClickEmailFollowUp(selectedSequence!)}
      >
        <BorderConatiner>
          <StyledMailIcon />
          <LeftDashedBorder />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "58px" }}>
            <Typography fontWeight="bold">
              Email follow-up
            </Typography>
            {variants.length > 1 && (
              <AbConfiguration onClick={openAbConfigurationDialog}>
                A/B Configuration
              </AbConfiguration>
            )}
          </div>

          <EmailFollowUp>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px",
              }}
            >
              <Typography fontSize={14}>Email</Typography>
              <DeleteOutlineIcon
                sx={{ color: "var(--icon-color)", cursor: "pointer" }}
                onClick={() => onDelete(selectedSequence?.seq_number!)}
              />
            </div>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <VariantWrapper
                  key={index}
                  onClick={() => onSelectVariant(variant)}
                >
                  <Box display="flex" gap={1}>
                    {/* <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: colors[index % colors.length],
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                        margin: "4px",
                        fontSize: 14,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </Box> */}
                    <Typography fontSize={14}>
                      {"Subject: "}
                      {selectedSequence?.seq_variants[0].subject}
                    </Typography>
                  </Box>

                  {/* <IconButton
                    size="small"
                    onClick={() => handleRemoveVariant(index)}
                    sx={{ marginLeft: "auto" }}
                  >
                    <CloseIcon fontSize="small" sx={{ color: "black" }} />
                  </IconButton> */}
                </VariantWrapper>
              ))
            ) : (
              <Typography fontSize={14}>No variants added</Typography>
            )}
          </EmailFollowUp>

          {/* <div>
            <AddVarientButton onClick={handleAddVariant}>
              + Add Variant
            </AddVarientButton>
          </div> */}
        </div>
      </EmailFollowUpContainer>
    </>
  );
};

export default EmailFollowUpStep;
