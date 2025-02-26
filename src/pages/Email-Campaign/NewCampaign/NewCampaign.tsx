
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import { HeaderContainer } from "./NewCampaign.styled";
import { SearchBar } from '../../../components/Header/header.styled';
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { StepButton } from '@mui/material';
import SequenceCampaign from './SequenceCampaign/SequenceCampaign';
import ImportLeadsCampaign from './ImportLeadsCampaign/ImportLeadsCampaign';
import SetupCampaign from './SetupCampaign/SetupCampaign';
import FinalReviewCampaign from './FinalReviewCampaign/FinalReviewCampaign';
import { useNavigate } from 'react-router-dom';
import { csvSettingsType } from '../Interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { addLeadsToCampaign } from '../../../redux/slice/emailCampaignSlice';

const steps = ['Import Leads', 'Sequences', 'Setup', 'Final Review'];

export interface ImportedLeadsData {
  campaignName?: string;
  clientId?: string;
  csvSettings: csvSettingsType;
  customFields: Record<string, any>;
  emailFieldsToBeAdded: Record<string, any>;
  isLeadAddedFirstTime: boolean;
  leadList: Record<string, any>[];
  fileName: string
}

const NewCampaign = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] = React.useState<ImportedLeadsData>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleLeadsData = (data: ImportedLeadsData) => {
    setEmailFieldsToBeAdded(data);
  };

  const saveCSVSetting = (settings: any) => {
    setCSVsettings(settings);
  }

  const handleNext = async () => {
    const payload = {
      CSVsettings,
      csvFile: selectedFile,
      emailFieldsToBeAdded
    }
    const response = await dispatch(addLeadsToCampaign(payload))
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleNavigate = () => {
    navigate('/email-campaign')
  };

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
                <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
      </HeaderContainer>

      {activeStep === 0 && <ImportLeadsCampaign handleLeadsData={handleLeadsData} handleCSVUpload={handleFileChange} saveCSVSetting={saveCSVSetting}/>}
      {activeStep === 1 && <SequenceCampaign />}
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
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          sx={{ background: "#6e58f1", color: "white" }}
        >
          Save and Next
        </Button>
      </Box>
    </>
  );
};

export default NewCampaign;
