import * as React from "react";
import Box from "@mui/material/Box";
import {
  Container,
  FooterContainer,
  HeaderContainer,
  MainContainer,
} from "./NewCampaign.styled";
import { SearchBar } from "../../../components/Header/header.styled";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import SequenceCampaign from "./SequenceCampaign/SequenceCampaign";
import ImportLeadsCampaign from "./ImportLeadsCampaign/ImportLeadsCampaign";
import SetupCampaign from "./SetupCampaign/SetupCampaign";
import FinalReviewCampaign from "./FinalReviewCampaign/FinalReviewCampaign";
import { useNavigate } from "react-router-dom";
import { csvSettingsType } from "../Interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import {
  addLeadsToCampaign,
  addSequencesToCampaign,
} from "../../../redux/slice/emailCampaignSlice";
import UploadLeadsDialog from "./ImportLeadsCampaign/UploadLeadsDialog";
import { Sequence } from "./SequenceCampaign/Sequences/interfaces";
import SendTestEmailDialog from "./SendTestEmailDialog";
import { ILeadsCounts } from "./interfaces";
import { CustomizedStepper } from "./stepper";
import { Button, SecondaryButton } from "../../../styles/global.styled";
import { Router } from "@toolpad/core/AppProvider";
export interface ImportedLeadsData {
  campaignName?: string;
  clientId?: string;
  csvSettings: csvSettingsType;
  customFields: Record<string, any>;
  emailFieldsToBeAdded: Record<string, any>;
  isLeadAddedFirstTime: boolean;
  leadList: Record<string, any>[];
  fileName: string;
}

interface NewCampaignProps {
  router: Router;
}

const NewCampaign: React.FC<NewCampaignProps> = ({ router }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploadCsv, setUploadCsv] = React.useState<boolean>(false);
  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCounts, setUploadCounts] = React.useState<ILeadsCounts>();
  const [sequences, setSequences] = React.useState<Sequence[]>([]);
  const [selectedSequence, setSelectedSequence] = React.useState<Sequence>();
  const [campaignId, setCampaignId] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [testEmailDialog, setTestEmailDialog] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleLeadsData = (data: ImportedLeadsData) => {
    setEmailFieldsToBeAdded(data);
  };

  const handleEmailTemplateData = (data: any) => {
    console.log(data);
  };

  const saveCSVSetting = (settings: any) => {
    setCSVsettings(settings);
  };

  const handleImportLeads = async () => {
    setUploadCsv(true);
    setIsLoading(true);
    const payload = {
      CSVsettings,
      csvFile: selectedFile,
      emailFieldsToBeAdded,
    };

    const response = await dispatch(addLeadsToCampaign(payload));

    if (response.payload.code === 200) {
      setIsLoading(false);
      console.log(response);
      setUploadCounts(response.payload.counts);
      setCampaignId(response.payload.campaignId);
      setUploadCsv(false);
      setUploadLeads(true);
      goToNextStep();
    }
  };

  const handleSequences = async () => {
    const payload = {
      campaign_id: campaignId,
      sequences,
    };
    const response = await dispatch(addSequencesToCampaign(payload));
  };

  // const handleSetup = () => {
  //   goToNextStep();
  // };

  // const handleFinalReview = () => {
  //   goToNextStep();
  // };

  const goToNextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        goToNextStep();
        await handleImportLeads();
        break;
      case 1:
        goToNextStep();
        handleSequences();
        break;
      case 2:
        goToNextStep();
        // handleSetup();
        break;
      case 3:
        goToNextStep();
        // handleFinalReview();
        break;
      default:
        console.warn("Unknown step:", activeStep);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const GoBack = () => {
    router.navigate("/email-campaign");
  };

  const onClickEmailFollowUp = (sequence: Sequence) => {
    setSelectedSequence(sequence);
  };

  const addSequence = (sequence: Sequence) => {
    setSelectedSequence(sequence);
    setSequences([...sequences, sequence]);
  };

  const updateSequences = (sequences: Sequence[]) => {
    setSequences(sequences);
  };

  const updateSequenceData = (sequence: Sequence) => {
    setSelectedSequence((prevSequence) => {
      if (!prevSequence) return sequence;
      return {
        ...prevSequence,
        ...sequence,
        seq_variants: [...sequence.seq_variants],
      };
    });

    setSequences((prevSequences) =>
      prevSequences.map((seq) =>
        seq.seq_number === sequence.seq_number
          ? { ...seq, ...sequence, seq_variants: [...sequence.seq_variants] }
          : seq
      )
    );
  };

  const handleTestEmail = () => {
    setTestEmailDialog(true);
  };

  return (
    <Container>
      <HeaderContainer>
        <Box sx={{ width: "100%", display: "flex" }}>
          <WestOutlinedIcon
            onClick={GoBack}
            sx={{
              color: "var(--theme-color-light)",
              cursor: "pointer",
              margin: "14px",
              width: "35px",
              height: "35px",
            }}
          />
          <SearchBar>
            <input placeholder="Untitled Campaign" />
          </SearchBar>
          <CustomizedStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          <UploadLeadsDialog
            open={uploadleads}
            uploadCounts={uploadCounts}
            onClose={() => setUploadLeads(false)}
          />
        </Box>
      </HeaderContainer>
      <MainContainer>
        {activeStep === 0 && (
          <ImportLeadsCampaign
            handleLeadsData={handleLeadsData}
            handleCSVUpload={handleFileChange}
            saveCSVSetting={saveCSVSetting}
          />
        )}
        {activeStep === 1 && (
          <SequenceCampaign
            onClickEmailFollowUp={onClickEmailFollowUp}
            handleEmailTemplateData={handleEmailTemplateData}
            addSequence={addSequence}
            updateSequences={updateSequences}
            updateSequenceData={updateSequenceData}
            sequences={sequences}
            selectedSequence={selectedSequence}
          />
        )}
        {activeStep === 2 && <SetupCampaign campaignId={campaignId} />}
        {activeStep === 3 && <FinalReviewCampaign campaignId={campaignId} />}
      </MainContainer>
      <FooterContainer>
        {activeStep !== 0 && (
          <SecondaryButton onClick={handleBack} disabled={activeStep === 0}>
            Back
          </SecondaryButton>
        )}
        {activeStep === 2 ? (
          <>
            <SendTestEmailDialog
              open={testEmailDialog}
              onClose={() => setTestEmailDialog(false)}
            />
            <SecondaryButton onClick={handleTestEmail}>
              Send Test Email
            </SecondaryButton>
            <Button onClick={handleNext}>Schedule Campaign</Button>
          </>
        ) : (
          <Button
            onClick={handleNext}
            // disabled={activeStep === steps.length - 1}
          >
            Save and Next
          </Button>
        )}
      </FooterContainer>
    </Container>
  );
};

export default NewCampaign;
