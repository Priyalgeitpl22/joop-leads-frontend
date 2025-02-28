import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { HeaderContainer } from "./NewCampaign.styled";
import { SearchBar } from "../../../components/Header/header.styled";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import {
  Sequence,
} from "./SequenceCampaign/Sequences/interfaces";
import Loader from "../../../components/Loader";
import { StepButton } from '@mui/material';
import SequenceCampaign from './SequenceCampaign/SequenceCampaign';
import ImportLeadsCampaign from './ImportLeadsCampaign/ImportLeadsCampaign';
import SetupCampaign from './SetupCampaign/SetupCampaign';
import FinalReviewCampaign from './FinalReviewCampaign/FinalReviewCampaign';
import { useNavigate } from 'react-router-dom';
import { csvSettingsType } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { addLeadsToCampaign, addSequencesToCampaign } from '../../../redux/slice/emailCampaignSlice';
import ImportCsvFileDialog from './ImportLeadsCampaign/ImportCsvFileDialog';
import UploadLeadsDialog from './ImportLeadsCampaign/UploadLeadsDialog';
import SendTestEmailDialog from './SendTestEmailDialog';

const steps = ["Import Leads", "Sequences", "Setup", "Final Review"];

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

const NewCampaign = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploadCsv, setUploadCsv] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCount, setUploadCount] = React.useState<number>(0);
  const [sequences, setSequences] = React.useState<Sequence[]>([]);
  const [selectedSequence, setSelectedSequence] = React.useState<Sequence>();
  const [campaignId, setCampaignId] = React.useState<Sequence>();
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

  const handleSequencesData = (data: any) => {
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
      setUploadCount(response.payload.contactsInserted);
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
    console.log(response);
  };
  
  const handleSetup = () => {
    console.log("Handling setup step");
    goToNextStep();
  };

  const handleFinalReview = () => {
    console.log("Handling final review step");
    goToNextStep();
  };

  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await handleImportLeads();
        break;
      case 1:
        handleSequences();
        break;
      case 2:
        handleSetup();
        break;
      case 3:
        handleFinalReview();
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

  const handleNavigate = () => {
    navigate("/email-campaign");
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
    console.log("Updated Sequence:", sequence);

    setSelectedSequence((prevSequence) => ({
      ...prevSequence,
      ...sequence,
    }));

    setSequences((prevSequences) =>
      prevSequences.map((seq) =>
        seq.seq_number === sequence.seq_number ? sequence : seq
      )
    );
  };

  const setVariants = (data: any) => {
    console.log(data);
  };

  if (isLoading) {
    return <Loader />;
  }
  
  const handleTestEmail = () => {
    setTestEmailDialog(true);
  }

  return (
    <>
      <HeaderContainer style={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}>
        <Box sx={{ width: "100%", display: "flex" }}>
          <WestOutlinedIcon
            onClick={handleNavigate}
            sx={{ cursor: "pointer", margin: "10px" }}
          />
          <SearchBar style={{ width: "10%" }}>
            <input placeholder="Untitled Campaign" />
          </SearchBar>
          <Stepper
            nonLinear
            activeStep={activeStep}
            style={{ width: "40%", marginLeft: "22%" }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  color="inherit"
                  onClick={() => setActiveStep(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <UploadLeadsDialog
            open={uploadleads}
            uploadCount={uploadCount}
            onClose={() => setUploadLeads(false)}
          />
        </Box>
      </HeaderContainer>

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
          handleSequencesData={handleSequencesData}
          handleEmailTemplateData={handleEmailTemplateData}
          addSequence={addSequence}
          updateSequences={updateSequences}
          updateSequenceData={updateSequenceData}
          setVariants={setVariants}
          sequences={sequences}
          selectedSequence={selectedSequence}
        />
      )}
      {activeStep === 2 && <SetupCampaign />}
      {activeStep === 3 && <FinalReviewCampaign />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 32px",
          backgroundColor: "#f8f9fc",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "96%",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Button
          variant="contained"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ background: "#6e58f1", color: "white" }}
        >
          Back
        </Button>
        {activeStep === 0 ? (
          <>
            <ImportCsvFileDialog
              open={uploadCsv}
              onClose={() => setUploadCsv(false)}
            />
            <Button
              variant="contained"
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
              sx={{ background: "#6e58f1", color: "white" }}
            >
              Save
            </Button>
          </>
        ) : activeStep === 3 ? (
          <>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ background: "#ececee", color: "#6e58f1" }}
              >
                Run Spam Test
              </Button>
              <SendTestEmailDialog
                open={testEmailDialog}
                onClose={() => setTestEmailDialog(false)}
                />
              <Button
                variant="contained"
                onClick={handleTestEmail}
                sx={{ background: "#ececee", color: "#6e58f1" }}
              >
                Send Test Email
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ background: "#6e58f1", color: "white" }}
              >
                Schedule Campaign
              </Button>
            </Box>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            sx={{ background: "#6e58f1", color: "white" }}
          >
            Save and Next
          </Button>
        )}
      </Box>
    </>
  );
};

export default NewCampaign;
