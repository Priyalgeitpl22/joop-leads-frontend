import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import AddIcon from "@mui/icons-material/Add";
import EmailFollowUpStep from "./Sequences/EmailFollowUpStep";
import { AddStepButton } from "./Sequences/sequences.styled";
import ManualFollowUp from "./Sequences/ManualFollowUp";
import ManualTemplate from "./EmailTemplate/ManualTemplate";
import { TemplateHeader } from "./sequenceCampaign.styled";
import AbConfigurationDialog from "./Sequences/AbConfigurationDialog";
import {
  Sequence,
  SequenceSchedularType,
  SequenceVariant,
} from "./Sequences/interfaces";
import { SequenceType, variantDistributionType } from "./Sequences/enums";

interface ImportLeadsCampaignProps {
  handleSequencesData: (data: any) => void;
  handleEmailTemplateData: (data: any) => void;
  onClickEmailFollowUp: (data: any) => void;
  addSequence: (data: any) => void;
  updateSequences: (data: any) => void;
  updateSequenceData: (data: any) => void;
  setVariants: (data: any) => void;
  sequences: Sequence[];
  selectedSequence?: Sequence;
}

const SequenceCampaign: React.FC<ImportLeadsCampaignProps> = ({
  handleSequencesData,
  handleEmailTemplateData,
  onClickEmailFollowUp,
  addSequence,
  updateSequences,
  updateSequenceData,
  selectedSequence,
  sequences,
}) => {
  const [showStepOptions, setShowStepOptions] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<SequenceVariant>();

  const handleAddStep = () => {
    setShowStepOptions(!showStepOptions);
  };

  useEffect(() => {
    if (sequences.length === 0) {
      const newSequence: Sequence = {
        seq_number: sequences.length + 1,
        seq_type: SequenceType.EMAIL,
        seq_delay_details: { delay_in_days: 1 },
        sequence_schedular_type: SequenceSchedularType.AUTOMATIC,
        seq_variants: [
          { subject: "Subject 1", emailBody: "", variantLabel: "A" },
        ],
        variant_distribution_type: variantDistributionType.MANUAL_EQUAL,
      };
      setSelectedVariant(newSequence.seq_variants[0]);
      addSequence(newSequence);
    }
  }, [selectedVariant]);

  const handleAddEmailStep = () => {
    const newSequence: Sequence = {
      seq_number: sequences.length + 1,
      seq_type: SequenceType.EMAIL,
      seq_delay_details: { delay_in_days: 1 },
      sequence_schedular_type: SequenceSchedularType.AUTOMATIC,
      seq_variants: [
        { subject: "Subject 1", emailBody: "", variantLabel: "A" },
      ],
      variant_distribution_type: variantDistributionType.MANUAL_EQUAL,
    };
    addSequence(newSequence);
    setShowStepOptions(false);
  };

  const handleAddManualStep = () => {
    const newSequence: Sequence = {
      seq_number: sequences.length + 1,
      seq_type: SequenceType.MANUAL,
      seq_delay_details: { delay_in_days: 1 },
      sequence_schedular_type: SequenceSchedularType.MANUAL,
      seq_variants: [{ subject: "----", emailBody: "" }],
      variant_distribution_type: variantDistributionType.MANUAL_EQUAL,
    };
    addSequence(newSequence);
    setShowStepOptions(false);
  };

  const handleRemoveStep = (index: number) => {
    const updatedSequences = sequences.filter((_, i) => i !== index);
    const renumberedSequences = updatedSequences.map((seq, i) => ({
      ...seq,
      seq_number: i + 1,
    }));

    updateSequences(renumberedSequences);
  };

  const onSelectVariant = (variant: SequenceVariant) => {
    setSelectedVariant(variant);
  };

  const openAbConfigurationDialog = () => setIsDialogOpen(true);
  const closeAbConfigurationDialog = () => setIsDialogOpen(false);

  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{
          borderRight: "1px solid #ddd",
          paddingLeft: "2%",
          overflow: "scroll",
          width: "fit-content",
          padding: "18px",
        }}
      >
        {sequences.map((sequence, index) =>
          sequence.seq_type === SequenceType.EMAIL ? (
            <EmailFollowUpStep
              key={sequence.seq_number}
              selectedSequence={sequence}
              onClickEmailFollowUp={onClickEmailFollowUp}
              updateSequenceData={updateSequenceData}
              onSelectVariant={onSelectVariant}
              openAbConfigurationDialog={openAbConfigurationDialog}
              onAddStep={() => {}}
              onDelete={() => handleRemoveStep(index)}
              isFirstEmail={index === 0}
            />
          ) : (
            <ManualFollowUp
              onAddStep={() => {}}
              key={sequence.seq_number}
              selectedSequence={sequence}
              updateSequenceData={updateSequenceData}
              onClickEmailFollowUp={onClickEmailFollowUp}
              onDelete={() => handleRemoveStep(index)}
            />
          )
        )}

        <AddStepButton onClick={handleAddStep}>
          <AddIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <Typography fontSize={14}>Add step</Typography>
        </AddStepButton>

        {showStepOptions && (
          <Box display="flex" justifyContent="center" gap={2} pt={2}>
            <IconButton onClick={handleAddEmailStep}>
              <EmailIcon sx={{ color: "#6e58f1" }} />
            </IconButton>
            <IconButton onClick={handleAddManualStep}>
              <AssignmentIcon sx={{ color: "#6e58f1" }} />
            </IconButton>
          </Box>
        )}
      </SidebarContainer>

      <Box flex={1} padding="40px">
        <TemplateHeader>
          <Typography fontSize={18}>
            Stage {selectedSequence?.seq_number}:{" "}
            {selectedSequence?.seq_type === SequenceType.MANUAL
              ? "Manual Sequence"
              : `Email : Variant ${selectedVariant?.variantLabel}`}
          </Typography>
          <Typography fontSize={14}>Manual</Typography>
        </TemplateHeader>

        {sequences.length > 0 &&
          (selectedSequence?.seq_type === SequenceType.MANUAL ? (
            <ManualTemplate
              selectedSequence={selectedSequence}
              selectedVariant={selectedSequence.seq_variants[0]}
              updateSequenceData={updateSequenceData}
              handleEmailTemplateData={handleEmailTemplateData}
            />
          ) : (
            <EmailTemplate
              selectedSequence={selectedSequence}
              selectedVariant={selectedVariant}
              updateSequenceData={updateSequenceData}
              handleEmailTemplateData={handleEmailTemplateData}
            />
          ))}
      </Box>

      {isDialogOpen && (
        <AbConfigurationDialog
          open={isDialogOpen}
          onClose={closeAbConfigurationDialog}
        />
      )}
    </Box>
  );
};

export default SequenceCampaign;
