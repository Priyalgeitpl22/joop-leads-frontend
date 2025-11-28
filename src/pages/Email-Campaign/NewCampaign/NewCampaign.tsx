import * as React from "react";
import Box from "@mui/material/Box";
import {
  Container,
  FooterContainer,
  HeaderContainer,
  MainContainer,
} from "./NewCampaign.styled";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import SequenceCampaign from "./SequenceCampaign/SequenceCampaign";
import ImportLeadsCampaign from "./ImportLeadsCampaign/ImportLeadsCampaign";
import SetupCampaign from "./SetupCampaign/SetupCampaign";
import FinalReviewCampaign from "./FinalReviewCampaign/FinalReviewCampaign";
import { csvSettingsType } from "../Interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import {
  addLeadsToCampaign,
  addSequencesToCampaign,
  addEmailCampaignSettings,
  scheduleCampaign,
  getCampaignById,
} from "../../../redux/slice/emailCampaignSlice";
import UploadLeadsDialog from "./ImportLeadsCampaign/UploadLeadsDialog";
import { Sequence } from "./SequenceCampaign/Sequences/interfaces";
import SendTestEmailDialog from "./SendTestEmailDialog";
import { ILeadsCounts } from "./interfaces";
import { CustomizedStepper } from "./stepper";
import { Button, SecondaryButton } from "../../../styles/global.styled";
import { useLocation } from "react-router-dom";
import CircularLoader from "../../../assets/Custom/circularProgress";
import toast from "react-hot-toast";
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

const NewCampaign: React.FC<NewCampaignProps> = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCounts, setUploadCounts] = React.useState<ILeadsCounts>();
  const [sequences, setSequences] = React.useState<Sequence[]>([]);
  const [selectedSequence, setSelectedSequence] = React.useState<Sequence>();
  const [newSequnce, setSelectedNewSequnce] = React.useState<{
    compiledSubject: string;
    compiledBody: string;
    variantLabel: string;
  } | null>(null);
  const [campaignId, setCampaignId] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [testEmailDialog, setTestEmailDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({
    senderAccount: {},
    scheduleCampaign: {},
    campaignSettings: {},
  });
  const [isScheduleValid, setIsScheduleValid] = React.useState(false);
  const [isSettingValid, setIsSettingValid] = React.useState(false);
  const [isSenderAccountValid, setIsSenderAccountValid] = React.useState(true);
  const [isStep1Valid, setIsStep1Valid] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  React.useEffect(() => {
    if (activeStep == 2) {
    }
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("campaignId");

    const fetchDataAndProceed = async (id: string) => {
      try {
        setIsLoading(true);
        const campaign = await fetchCampaignDetails(id);

        if (campaign) {
          if (campaign.contacts.length === 0) {
            setActiveStep(0);
          } else if (campaign.sequences.length === 0) {
            setActiveStep(1);
          } else if (campaign.selectedAccounts === 0) {
            setActiveStep(2);
          } else {
            setActiveStep(3);
          }
          setCampaignId(id);
        }
      } catch (error) {
        console.error("Failed to fetch campaign details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (campaignId) {
      setActiveStep(1);
      setCampaignId(campaignId);
      setActiveStep(1);
    } else {
      const isEdit = params.has("edit");
      const id = params.get("id");

      if (isEdit && id) {
        setIsEdit(true);
        fetchDataAndProceed(id);
      }
    }
  }, [location.search]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
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
    const payload = {
      campaignId,
      CSVsettings,
      csvFile: selectedFile,
      emailFieldsToBeAdded,
    };

    const response = await dispatch(addLeadsToCampaign(payload));

    if (response.payload.code === 200) {
      setIsLoading(false);
      setUploadCounts(response.payload.counts);
      setCampaignId(response.payload.campaignId);
      setUploadLeads(true);
    }
  };

  const handleSequences = async () => {
    setIsLoading(true);
    const payload = {
      campaign_id: campaignId,
      sequences,
    };
    setIsLoading(true);
    const response = await dispatch(addSequencesToCampaign(payload));
    if (response.payload.code) {
      setIsLoading(false);
      if (response.payload.code == 200) {
        setCampaignId(response.payload.data.campaign_id);
      }
    }
    setIsLoading(false);
  };

  const goToNextStep = () => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleFinalReview = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await dispatch(
        scheduleCampaign({
          campaignId: campaignId,
          status: "SCHEDULED",
        })
      ).unwrap();

      setIsLoading(false);
      if (response.code === 200) {
        toast.success("Campaign scheduled successfully!");
        setTimeout(() => {
          GoBack();
        }, 1200);
      } else {
        toast.error("Failed to schedule campaign. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error scheduling campaign:", error);
      toast.error("Failed to schedule campaign. Please try again.");
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
    window.location.assign("/email-campaign/all");
  };

  const onClickEmailFollowUp = (sequence: Sequence) => {
    setSelectedSequence(sequence);
  };

  const addSequence = (sequence: Sequence) => {
    setSelectedSequence({ ...sequence });

    setSequences(prevSequences => {
      const updatedSequences = [...prevSequences];
      const newSequence = {
        ...sequence,
        seq_variants: sequence.seq_variants.map(variant => ({ ...variant }))
      };
      updatedSequences.push(newSequence);
      return updatedSequences;
    });
  };

  const updateSequences = (sequences: Sequence[]) => {
    const deepCopiedSequences = sequences.map(sequence => ({
      ...sequence,
      seq_variants: sequence.seq_variants.map(variant => ({ ...variant }))
    }));
    setSequences(deepCopiedSequences);
  };

  const updateSequenceData = (sequence: Sequence) => {
    setSelectedSequence((prevSequence) => {
      if (!prevSequence) return sequence;
      return {
        ...prevSequence,
        ...sequence,
        seq_variants: sequence.seq_variants.map(variant => ({ ...variant })),
      };
    });

    setSequences((prevSequences) => {
      return prevSequences.map((seq) => {
        if (seq.seq_number === sequence.seq_number) {
          return {
            ...seq,
            ...sequence,
            seq_variants: sequence.seq_variants.map(variant => ({ ...variant })),
          };
        }
        return seq;
      });
    });
  };

  const handleTestEmail = () => {
    setTestEmailDialog(true);
  };

  const handleSenderAccountsUpdate = async (data: any) => {
    setDialogData((prev) => ({ ...prev, senderAccount: data }));

    try {
      setIsLoading(true);
      const response = await dispatch(
        addEmailCampaignSettings({
          ...data,
          campaign_id: campaignId,
        })
      );
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating sender account:", error);
      setIsLoading(false);
    }
  };

  const handleScheduleCampaignUpdate = async (data: any) => {
    setDialogData((prev) => ({ ...prev, scheduleCampaign: data }));

    try {
      setIsLoading(true);
      const response = await dispatch(
        addEmailCampaignSettings({
          ...data,
          campaign_id: campaignId,
        })
      );
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating schedule campaign:", error);
      setIsLoading(false);
    }
  };

  const handleCampaignSettingsUpdate = async (data: any) => {
    setDialogData((prev) => ({ ...prev, campaignSettings: data }));

    try {
      setIsLoading(true);
      const response = await dispatch(
        addEmailCampaignSettings({
          ...data,
          campaign_id: campaignId,
        })
      );
      if (response) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating campaign settings:", error);
      setIsLoading(false);
    }
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

  const IsCampaignScheduleValid = (data: boolean) => {
    setIsScheduleValid(data);
  };

  const IsCampaignSettingsValid = (data: boolean) => {
    setIsSettingValid(data);
  };

  const IsCampaignSenderAccountValid = (data: boolean) => {
    setIsSenderAccountValid(data);
  };

  const isNextDisabled = () => {
    if (activeStep === 0) return isStep1Valid;
    if (activeStep === 1) return !true;
    if (activeStep === 2)
      return !isScheduleValid || !isSettingValid || !isSenderAccountValid;
    if (activeStep === 3) return true

    return false;
  };

  return (
    <Container>
      <HeaderContainer
        style={{
          backgroundColor: "#f7f7f7",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            px: 2,
          }}
        >
          <WestOutlinedIcon
            onClick={GoBack}
            sx={{
              color: "#1f2937",
              cursor: "pointer",
              width: "28px",
              height: "28px",
              "&:hover": { color: "var(--primary-dark)" },
              transition: "color 0.2s",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <CustomizedStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Box>
          <UploadLeadsDialog
            open={uploadleads}
            uploadCounts={uploadCounts}
            onClose={() => {
              setUploadLeads(false);
              if (
                uploadCounts?.uploadedCount &&
                uploadCounts?.uploadedCount > 0
              )
                goToNextStep();
            }}
          />
        </Box>
      </HeaderContainer>
      {isLoading && <CircularLoader />}
      <MainContainer>
        {activeStep === 0 && (
          <ImportLeadsCampaign
            isEdit={isEdit}
            setIsStep1Valid={setIsStep1Valid}
            handleLeadsData={handleLeadsData}
            handleCSVUpload={handleFileChange}
            saveCSVSetting={saveCSVSetting}
          />
        )}
        {activeStep === 1 && (
          <SequenceCampaign
            campaign_id={campaignId}
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
            handleScheduleValid={IsCampaignScheduleValid}
            handleSettingsValid={IsCampaignSettingsValid}
            handleSenderAccountValid={IsCampaignSenderAccountValid}
            campaign_id={campaignId}
            handleSenderAccountsUpdate={handleSenderAccountsUpdate}
            handleScheduleCampaignUpdate={handleScheduleCampaignUpdate}
            handleCampaignSettingsUpdate={handleCampaignSettingsUpdate}
          />
        )}
        {activeStep === 3 && (
          <FinalReviewCampaign
            campaign_id={campaignId}
            setSelectedEmailTemplate={setSelectedNewSequnce}
          />
        )}
      </MainContainer>
      <FooterContainer>
        {activeStep !== 0 && (
          <SecondaryButton
            onClick={handleBack}
            disabled={activeStep === 0 || activeStep === 1}
          >
            Back
          </SecondaryButton>
        )}
        {activeStep === 3 ? (
          <>
            <SendTestEmailDialog
              open={testEmailDialog}
              onClose={() => setTestEmailDialog(false)}
              sequence={newSequnce}
            />
            <SecondaryButton onClick={handleTestEmail}>
              Send Test Email
            </SecondaryButton>
            <Button onClick={handleNext} style={{ marginRight: "5%" }}>
              Schedule Campaign
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNext}
            disabled={isNextDisabled()}
            color={isNextDisabled() ? "lightgray" : "white"}
            style={{
              cursor: isNextDisabled() ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              background: isNextDisabled()
                ? "#d1d5db"
                : "var(--secondary-gradient)",
              marginRight: "5%"
            }}
          >
            Save and Next
          </Button>
        )}
      </FooterContainer>
    </Container>
  );
};

export default NewCampaign;
