import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import EmailFollowUpStep from "./Sequences/EmailFollowUpStep";
import {
  AddStepButton,
  AddStepButtonWrapper,
  StyledAddIcon,
  StyledAssignmentIcon,
  StyledEmailIcon,
} from "./Sequences/sequences.styled";
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import ManualFollowUp from "./Sequences/ManualFollowUp";
import ManualTemplate from "./EmailTemplate/ManualTemplate";
import {
  AddStepContainer,
  SequenceSidebarContainer,
  StyledIconButton,
  TemplateHeader,
} from "./sequenceCampaign.styled";
import AbConfigurationDialog from "./Sequences/AbConfigurationDialog";
import {
  Sequence,
  SequenceSchedularType,
  SequenceVariant,
} from "./Sequences/interfaces";
import { SequenceType, variantDistributionType } from "./Sequences/enums";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { getCampaignById } from "../../../../redux/slice/emailCampaignSlice";
import CircularLoader from "../../../../assets/Custom/circularProgress";
import PreviewSequenceDialogue from "./Sequences/Preview/PreviewSequenceDialogue";
import { Button2 } from "../../../../styles/layout.styled";

interface ImportLeadsCampaignProps {
  campaign_id: string,
  handleEmailTemplateData: (data: any) => void;
  onClickEmailFollowUp: (data: any) => void;
  addSequence: (data: any) => void;
  updateSequences: (data: any) => void;
  updateSequenceData: (data: any) => void;
  sequences: Sequence[];
  selectedSequence?: Sequence;
}

const SequenceCampaign: React.FC<ImportLeadsCampaignProps> = ({
  campaign_id,
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
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  // const handleAddStep = () => {
  //   setShowStepOptions(!showStepOptions);
  // };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");
    console.log(selectedVariant);

    if (campaignId || campaign_id) {
      fetchCampaignDetails(campaignId || campaign_id);
    } else {
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
        setIsLoading(false);
      }
    }
  }, []);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const sequences = response.campaign.sequences;
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
        setIsLoading(false);
      } else {
        setSelectedVariant(sequences[0].seq_variants[0]);
        updateSequences(sequences);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const handleAddEmailStep = () => {
    const sequenceCount = sequences.length;
    const newSequence: Sequence = {
      seq_number: sequenceCount + 1,
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
    const sequenceCount = sequences.length;
    const newSequence: Sequence = {
      seq_number: sequenceCount + 1,
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
      seq_variants: seq.seq_variants.map(variant => ({ ...variant }))
    }));

    updateSequences(renumberedSequences);
  };

  const onSelectVariant = (variant: SequenceVariant) => {
    setSelectedVariant(variant);
  };

  const openAbConfigurationDialog = () => setIsDialogOpen(true);
  const closeAbConfigurationDialog = () => setIsDialogOpen(false);

  const openPreviewDialog = () => {
    setIsPreviewDialogOpen(true);
  };

  // Close the preview dialog
  const closePreviewDialog = () => {
    setIsPreviewDialogOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }} display={"flex"}>
      {isLoading && <CircularLoader />}
      <SequenceSidebarContainer>
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

        <AddStepButtonWrapper>
          <StyledAddIcon />
          <AddStepButton onClick={handleAddEmailStep}>Add step</AddStepButton>
        </AddStepButtonWrapper>

        {showStepOptions && (
          <AddStepContainer>
            <StyledIconButton onClick={handleAddEmailStep}>
              <StyledEmailIcon />
            </StyledIconButton>
            <StyledIconButton onClick={handleAddManualStep}>
              <StyledAssignmentIcon />
            </StyledIconButton>
          </AddStepContainer>
        )}
      </SequenceSidebarContainer>

      <Box flex={1} padding="12px 16px">
        <TemplateHeader>
          <Typography fontSize={18} fontWeight={500}>
            Stage {selectedSequence?.seq_number}:{" "}
            {selectedSequence?.seq_type === SequenceType.MANUAL
              ? "Manual Sequence"
              : "Email"}
          </Typography>

          <Button2 onClick={openPreviewDialog} color={""} background={""}>
            <Typography sx={{ display: "inline-flex", alignItems: "center" }}>
              <PlayArrowSharpIcon sx={{ margin: "-4px", marginRight: "4px" }} />
              Preview
            </Typography>
          </Button2>
          {/* <Typography fontSize={14}>Manual</Typography> */}
        </TemplateHeader>

        {sequences.length > 0 &&
          (selectedSequence?.seq_type === SequenceType.MANUAL ? (
            <ManualTemplate
              selectedSequence={selectedSequence}
              updateSequenceData={updateSequenceData}
              handleEmailTemplateData={handleEmailTemplateData}
            />
          ) : (
            <EmailTemplate
              selectedSequence={selectedSequence}
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

      <PreviewSequenceDialogue
        onClose={closePreviewDialog}
        open={isPreviewDialogOpen}
        user={null}
        loading={false}
      />
    </Box>
  );
};

export default SequenceCampaign;
