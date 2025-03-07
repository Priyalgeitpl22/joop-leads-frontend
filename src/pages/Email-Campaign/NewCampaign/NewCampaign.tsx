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
  addEmailCampaignSettings,
  scheduleCampaign,
} from "../../../redux/slice/emailCampaignSlice";
import UploadLeadsDialog from "./ImportLeadsCampaign/UploadLeadsDialog";
import { Sequence } from "./SequenceCampaign/Sequences/interfaces";
import SendTestEmailDialog from "./SendTestEmailDialog";
import { ILeadsCounts } from "./interfaces";
import { CustomizedStepper } from "./stepper";
import { Button, SecondaryButton } from "../../../styles/global.styled";
import { Button2 } from "../../../styles/layout.styled";
import Loader from "../../../components/Loader";
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
  router?: any;
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
  const [campaignId, setCampaignId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [testEmailDialog, setTestEmailDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({
    senderAccount: {},
    scheduleCampaign: {},
    campaignSettings: {},
  });
  const [isCsvUploaded, setIsCsvUploaded] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
    setIsLoading(true);
    setUploadCsv(true);
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
    }
  };

  const handleSequences = async () => {
    setIsLoading(true);
    const payload = {
      campaign_id: campaignId,
      sequences,
    };
    setIsLoading(true)
    const response = await dispatch(addSequencesToCampaign(payload));
    if (response.payload.code) {
      setIsLoading(false);
      if (response.payload.code == 200) {
        setCampaignId(response.payload.data.campaign_id);
      }
    }
    setIsLoading(false)
  };

  const handleSetup = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        addEmailCampaignSettings({
          ...dialogData?.senderAccount,
          ...dialogData?.scheduleCampaign,
          ...dialogData?.campaignSettings,
          campaign_id: campaignId,
        })
      );
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error setting up campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleFinalReview = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true)
      const response = await dispatch(
        scheduleCampaign({
          campaignId: campaignId,
          status: "SCHEDULED",
        })
      );
      setIsLoading(true)
      if (response.payload.code === 200){
        setIsLoading(true)
        GoBack();
      }
    } catch (error) {
      console.error("Error scheduling campaign:", error);
    // } finally {
    //   setIsLoading(false);
    }
  };


  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await handleImportLeads();
        break;
      case 1:
        await handleSequences();
        goToNextStep();
        break;
      case 2:
        await handleSetup();
        goToNextStep();
        break;
      case 3:
        await handleFinalReview();
        goToNextStep();
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
    window.location.assign("/email-campaign");
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

  const handleSenderAccountsUpdate = (data: any) => {
    setDialogData((prev) => ({ ...prev, senderAccount: data }));
  };

  const handleScheduleCampaignUpdate = (data: any) => {
    setDialogData((prev) => ({ ...prev, scheduleCampaign: data }));
  };

  const handleCampaignSettingsUpdate = (data: any) => {
    setDialogData((prev) => ({ ...prev, campaignSettings: data }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <HeaderContainer>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <WestOutlinedIcon
            onClick={GoBack}
            sx={{
              color: "var(--theme-color-light)",
              cursor: "pointer",
              margin: "14px",
              width: "35px",
              height: "35px",
              "&:hover": { color: "var(--theme-color-light)" },
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
            onClose={() => {
              setUploadLeads(false);
              goToNextStep();
            }}
          />
        </Box>
      </HeaderContainer>
      {/* {isLoading && <ProgressBar />} */}
      {/* {isLoading && <ProgressBar />} */}
      <MainContainer>
        {activeStep === 0 && (
          <ImportLeadsCampaign
            handleLeadsData={handleLeadsData}
            handleCSVUpload={handleFileChange}
            saveCSVSetting={saveCSVSetting}
            setIsCsvUploaded={setIsCsvUploaded}
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
        {activeStep === 2 && (
          <SetupCampaign
            campaignId={campaignId}
            handleSenderAccountsUpdate={handleSenderAccountsUpdate}
            handleScheduleCampaignUpdate={handleScheduleCampaignUpdate}
            handleCampaignSettingsUpdate={handleCampaignSettingsUpdate}
          />
        )}
        {activeStep === 3 && <FinalReviewCampaign campaignId={campaignId} />}
      </MainContainer>
      <FooterContainer>
        {activeStep !== 0 && (
          <SecondaryButton onClick={handleBack} disabled={activeStep === 0}>
            Back
          </SecondaryButton>
        )}
        {activeStep === 3 ? (
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
          <Button2
            onClick={handleNext}
            disabled={isCsvUploaded === false}
            color={isCsvUploaded ? "white" : "lightgray"}
            background={isCsvUploaded ? "var(--theme-color)" : "#878484"}
            style={{
              width: "10%",
              cursor: isCsvUploaded ? "pointer" : "not-allowed",
            }}
          >
            Save and Next
          </Button2>
        )}
      </FooterContainer>
    </Container>
  );
};

export default NewCampaign;
