import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Papa from "papaparse";
import {
  ArrowLeft,
  FileSpreadsheet,
  Check,
  ChevronDown,
  X,
  Eye,
  RefreshCw,
  Trash2,
  FileUp,
} from "lucide-react";
import { Megaphone } from "lucide-react";
import { campaignService } from "../../../services/campaign.service";
import toast from "react-hot-toast";
import { SequencesStep, SetupStep, FinalReviewStep } from "./steps";
import { ImportSettingsDialog, UploadSuccessDialog } from "./components";
import type { Campaign, CsvSettings, Sequence } from "../../../interfaces";
import {
  WizardContainer,
  WizardHeader,
  BackButton,
  CampaignIconWrapper,
  StepperContainer,
  StepItem,
  StepIndicator,
  StepLabel,
  StepConnector,
  WizardContent,
  ContentCard,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  ImportCard,
  ImportTitle,
  UploadHeader,
  DropZone,
  UploadIconWrapper,
  UploadPrompt,
  UploadHint,
  UploadFooterNote,
  FilePreviewCard,
  FileInfoSection,
  FileIconWrapper,
  FileMetadata,
  FileName,
  FileSize,
  FileActionsGroup,
  FileActionLink,
  FieldMappingSection,
  SectionNumberBadge,
  NumberBadge,
  SectionSubtitle,
  FieldMappingDescription,
  MappingVisualHeader,
  MappingIconsRow,
  MappingIconBox,
  FieldMappingRow,
  CsvColumnLabel,
  FieldSelectWrapper,
  FieldSelect,
  SelectDropdownIcon,
  ClearMappingButton,
  WizardFooter,
  SecondaryActionButton,
  PrimaryActionButton,
} from "./CampaignWizard.styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import type { UploadCounts } from "../../../interfaces";
import { WIZARD_STEPS, CONTACT_FIELD_OPTIONS } from "../../../constants";
import { fetchCampaignById } from "../../../store/slices/campaignSlice";
import type { ICreateSequence } from "../../../types/sequence.types";

export const CampaignWizard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvColumnHeaders, setCsvColumnHeaders] = useState<string[]>([]);
  const [columnToFieldMappings, setColumnToFieldMappings] = useState<
    Record<string, string>
  >({});
  const [isDragActive, setIsDragActive] = useState(false);
  const [showImportSettingsDialog, setShowImportSettingsDialog] =
    useState(false);
  const [showUploadSuccessDialog, setShowUploadSuccessDialog] = useState(false);
  const [uploadCounts, setUploadCounts] = useState<UploadCounts | null>(null);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [isSetupValid, setIsSetupValid] = useState<boolean | string>(false);
  const currentCampaign = useSelector(
    (state: RootState) => state.campaign.currentCampaign
  );

  const campaign = currentCampaign as unknown as Campaign;
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id || id === "new") return;

    if (!currentCampaign || currentCampaign.id !== id) {
      dispatch(fetchCampaignById(id));
    }
  }, [id, dispatch, currentStepIndex]);

  useEffect(() => {
    if (!currentCampaign?.id) return;

    setCampaignId(currentCampaign.id);

    if (id && id !== "new") {
      checkCampaignStep(currentCampaign.id);
    }
  }, [currentCampaign?.id]);

  const processUploadedCsvFile = useCallback((file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    setUploadedFile(file);

    // Parse CSV to extract column headers
    Papa.parse(file, {
      preview: 1, // Only parse first row for headers
      complete: (result) => {
        const headers = result.data[0] as string[];
        if (!headers || headers.length === 0) {
          toast.error("CSV file appears to be empty");
          setUploadedFile(null);
          return;
        }
        setCsvColumnHeaders(headers.filter((h) => h && h.trim()));

        // Auto-detect and map common column names to lead fields
        const detectedMappings: Record<string, string> = {};
        headers.forEach((header) => {
          const normalizedHeader = header.toLowerCase().trim();
          if (normalizedHeader.includes("email")) {
            detectedMappings[header] = "email";
          } else if (
            normalizedHeader.includes("first") &&
            normalizedHeader.includes("name")
          ) {
            detectedMappings[header] = "firstName";
          } else if (
            normalizedHeader.includes("last") &&
            normalizedHeader.includes("name")
          ) {
            detectedMappings[header] = "lastName";
          } else if (
            normalizedHeader === "company" ||
            normalizedHeader.includes("company") ||
            normalizedHeader.includes("organization")
          ) {
            detectedMappings[header] = "company";
          } else if (
            normalizedHeader === "phone" ||
            normalizedHeader.includes("phone") ||
            normalizedHeader.includes("mobile")
          ) {
            detectedMappings[header] = "phone";
          } else if (
            normalizedHeader.includes("title") ||
            normalizedHeader.includes("designation") ||
            normalizedHeader.includes("position")
          ) {
            detectedMappings[header] = "designation";
          } else if (normalizedHeader.includes("linkedin")) {
            detectedMappings[header] = "linkedinUrl";
          } else if (
            normalizedHeader.includes("website") ||
            normalizedHeader.includes("url")
          ) {
            detectedMappings[header] = "website";
          } else if (normalizedHeader.includes("industry")) {
            detectedMappings[header] = "industry";
          } else if (
            normalizedHeader.includes("location") &&
            !normalizedHeader.includes("company")
          ) {
            detectedMappings[header] = "city";
          } else if (normalizedHeader.includes("state")) {
            detectedMappings[header] = "state";
          } else if (normalizedHeader.includes("country")) {
            detectedMappings[header] = "country";
          }
        });
        setColumnToFieldMappings(detectedMappings);
      },
      error: () => {
        toast.error("Failed to parse CSV file");
        setUploadedFile(null);
      },
    });
  }, []);

  const checkCampaignStep = (id: string) => {
    if (!campaignId && !id) {
      setCurrentStepIndex(0);
      return;
    }
    if (campaign?.leads && campaign?.leads?.length === 0) {
      setCurrentStepIndex(0);
    } else if (campaign?.sequences?.length === 0) {
      setCurrentStepIndex(1);
    } else if (
      !campaign?.sender_accounts ||
      campaign?.senders?.length === 0 ||
      !campaign.scheduledAt ||
      campaign.name === "Untitled Campaign"
    ) {
      setCurrentStepIndex(2);
    } else {
      setCurrentStepIndex(3);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) processUploadedCsvFile(file);
  };

  const handleFileDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragActive(false);

      const file = event.dataTransfer.files[0];
      if (file) processUploadedCsvFile(file);
    },
    [processUploadedCsvFile]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setCsvColumnHeaders([]);
    setColumnToFieldMappings({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleReuploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleFieldMappingChange = (
    csvColumn: string,
    contactField: string
  ) => {
    setColumnToFieldMappings((prev) => ({
      ...prev,
      [csvColumn]: contactField,
    }));
  };

  const handleClearFieldMapping = (csvColumn: string) => {
    setColumnToFieldMappings((prev) => {
      const updated = { ...prev };
      delete updated[csvColumn];
      return updated;
    });
  };

  const isEmailFieldMapped = Object.values(columnToFieldMappings).includes(
    "email"
  );

  const handleValidateBeforeImport = () => {
    if (!uploadedFile) {
      toast.error("Please upload a CSV file");
      return false;
    }

    if (!isEmailFieldMapped) {
      toast.error(
        "Email field is required. Please map at least one column to Email."
      );
      return false;
    }

    // Show import settings dialog
    setShowImportSettingsDialog(true);
    return "show_settings"; // Special return to indicate we're showing dialog
  };

  const handleImportLeads = async (settings: CsvSettings) => {
    if (!uploadedFile) {
      toast.error("Please upload a CSV file");
      return false;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("csvFile", uploadedFile);

      if (campaignId) {
        formData.append("campaignId", campaignId);
      }

      formData.append(
        "emailFieldsToBeAdded",
        JSON.stringify(columnToFieldMappings)
      );

      const importSettings = {
        campaign_name: campaign?.name || "Untitled Campaign",
        isLeadAddedFirstTime: !campaignId,
        ...settings,
      };
      formData.append("CSVsettings", JSON.stringify(importSettings));
      formData.delete("campaignId");
      const response = await campaignService.addLeadsToCampaign(formData);

      if (response.code === 200) {
        setUploadCounts(response?.data?.counts as unknown as UploadCounts);
        setShowUploadSuccessDialog(true);
        setCampaignId(response.data.campaign.id);
        dispatch(fetchCampaignById(response.data.campaign.id));
        return true;
      } else {
        toast.error(response.message || "Failed to import leads");
        return false;
      }
    } catch (error: unknown) {
      toast.error((error as string) || "Failed to import leads");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const moveToNextStep = () => {
    dispatch(fetchCampaignById(campaignId || campaign.id));
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleImportSettingsSave = async (settings: CsvSettings) => {
    setShowImportSettingsDialog(false);
    await handleImportLeads(settings);
  };

  const handleUploadSuccessClose = () => {
    setShowUploadSuccessDialog(false);
    if ((uploadCounts?.uploaded || 0) > 0 || campaignId) {
      moveToNextStep();
    } else {
      toast.error(
        "No leads were imported. Please try again with a valid CSV file."
      );
    }
  };

  const handleSaveSequences = async () => {
    if (!campaignId && !campaign.id) {
      toast.error("Campaign not found");
      return false;
    }

    if (sequences?.length === 0) {
      toast.error("Please add at least one email sequence");
      return false;
    }

    const hasEmptySequence = sequences?.some(
      (seq) => !seq.subject?.trim() || !seq.bodyText?.trim()
    );

    if (hasEmptySequence) {
      toast.error("Please fill in subject and body for all email sequences");
      return false;
    }

    const response = await campaignService.addSequencesToCampaign({
      campaignId: campaignId || campaign.id || "",
      sequences: sequences as unknown as Sequence[],
    } as unknown as ICreateSequence);

    if (response.code === 200) {
      setCampaignId(response.data.campaign_id);
      toast.success("Sequences saved successfully!");
      return true;
    }
    toast.error("Failed to save sequences");
    return false;
  };

  const handleScheduleCampaign = async () => {
    if (!campaign.id && campaignId) {
      toast.error("Campaign not found");
      return false;
    }

    try {
      const response = await campaignService.updateCampaignStatus(
        campaignId || campaign.id,
        "SCHEDULED"
      );

      if (response.code === 200) {
        localStorage.removeItem("campaignId");
        toast.success("Campaign scheduled successfully!");
        setTimeout(() => {
          navigate("/campaigns");
        }, 1500);
        return true;
      } else {
        toast.error("Failed to schedule campaign");
        return false;
      }
    } catch (error: unknown) {
      const apiError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        apiError.response?.data?.message ||
          apiError.message ||
          "Failed to schedule campaign"
      );
      return false;
    }
  };

  const handleSaveAndProceed = async () => {
    try {
      let success: boolean | string = false;

      switch (currentStepIndex) {
        case 0:
          success = handleValidateBeforeImport();
          if (success === "show_settings") {
            return;
          }
          break;
        case 1:
          setIsSaving(true);
          success = await handleSaveSequences();
          break;
        case 2:
          if (!isSetupValid) {
            toast.error("Please complete all setup sections");
            success = false;
          } else {
            success = true;
          }
          break;
        case 3:
          setIsSaving(true);
          success = await handleScheduleCampaign();
          break;
        default:
          success = false;
      }

      if (success === true && currentStepIndex < 3) {
        moveToNextStep();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const isNextButtonDisabled = () => {
    if (isSaving) return true;

    switch (currentStepIndex) {
      case 0:
        return !uploadedFile || !isEmailFieldMapped;
      case 1:
        return sequences?.length === 0;
      case 2:
        return !isSetupValid;
      case 3:
        return false;
      default:
        return false;
    }
  };

  const renderProgressStepper = () => (
    <StepperContainer>
      {WIZARD_STEPS.map((step, index) => (
        <React.Fragment key={step.id}>
          <StepItem
            $isActive={currentStepIndex === index}
            $isCompleted={currentStepIndex > index}
          >
            <StepIndicator
              $isActive={currentStepIndex === index}
              $isCompleted={currentStepIndex > index}
            >
              {currentStepIndex > index ? <Check size={14} /> : index + 1}
            </StepIndicator>
            <StepLabel
              $isActive={currentStepIndex === index}
              $isCompleted={currentStepIndex > index}
            >
              {step.label}
            </StepLabel>
          </StepItem>
          {index < WIZARD_STEPS.length - 1 && (
            <StepConnector $isCompleted={currentStepIndex > index} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );

  const renderImportLeadsStep = () => (
    <ContentCard>
      <SectionHeader>
        <SectionTitle>Easily add or update Leads /Contacts</SectionTitle>
        <SectionDescription>
          How would you like to get contacts into your list?
        </SectionDescription>
      </SectionHeader>

      <ImportCard>
        <ImportTitle>Import Your Existing Contacts</ImportTitle>

        <UploadHeader>
          <FileSpreadsheet size={20} />
          Upload CSV File
        </UploadHeader>

        {!uploadedFile ? (
          <DropZone
            $isDragActive={isDragActive}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <UploadIconWrapper>
              <FileUp size={32} />
            </UploadIconWrapper>
            <UploadPrompt>
              <span>Click to browse</span> or drag and drop
            </UploadPrompt>
            <UploadHint>Upload your CSV files to import leads.</UploadHint>
          </DropZone>
        ) : (
          <FilePreviewCard>
            <FileInfoSection>
              <FileIconWrapper>
                <FileSpreadsheet size={20} />
              </FileIconWrapper>
              <FileMetadata>
                <FileName>{uploadedFile.name}</FileName>
                <FileSize>{uploadedFile.size}</FileSize>
              </FileMetadata>
            </FileInfoSection>
            <FileActionsGroup>
              <FileActionLink onClick={() => toast("Preview coming soon")}>
                <Eye size={16} style={{ marginRight: 4 }} />
                Preview
              </FileActionLink>
              <FileActionLink onClick={handleReuploadFile}>
                <RefreshCw size={16} style={{ marginRight: 4 }} />
                Reupload
              </FileActionLink>
              <FileActionLink $variant="danger" onClick={handleRemoveFile}>
                <Trash2 size={16} style={{ marginRight: 4 }} />
                Delete
              </FileActionLink>
            </FileActionsGroup>
          </FilePreviewCard>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />

        <UploadFooterNote>
          Upload your existing lead lists or connect to your favorite CRM
          platform. Quick and easy import in just a few clicks.
        </UploadFooterNote>
      </ImportCard>

      {/* Field Mapping Section - visible after CSV upload */}
      {csvColumnHeaders.length > 0 && (
        <FieldMappingSection>
          <SectionNumberBadge>
            <NumberBadge>2</NumberBadge>
            <SectionSubtitle>Map Fields</SectionSubtitle>
          </SectionNumberBadge>
          <FieldMappingDescription>
            Map CSV columns to the variables you want to add it on the campaign
          </FieldMappingDescription>

          <MappingVisualHeader>
            <MappingIconsRow>
              <MappingIconBox>
                <FileSpreadsheet size={20} />
              </MappingIconBox>
              <MappingIconBox>
                <Megaphone size={20} />
              </MappingIconBox>
            </MappingIconsRow>
          </MappingVisualHeader>

          {csvColumnHeaders.map((csvColumn) => (
            <FieldMappingRow key={csvColumn}>
              <CsvColumnLabel>{csvColumn}</CsvColumnLabel>
              <FieldSelectWrapper>
                <FieldSelect
                  value={columnToFieldMappings[csvColumn] || ""}
                  onChange={(e) =>
                    handleFieldMappingChange(csvColumn, e.target.value)
                  }
                >
                  <option value="">Select field</option>
                  {CONTACT_FIELD_OPTIONS.map((field) => (
                    <option key={field.key} value={field.key}>
                      {field.label} {field.required ? "*" : ""}
                    </option>
                  ))}
                </FieldSelect>
                {columnToFieldMappings[csvColumn] && (
                  <ClearMappingButton
                    onClick={() => handleClearFieldMapping(csvColumn)}
                  >
                    <X size={16} />
                  </ClearMappingButton>
                )}
                <SelectDropdownIcon>
                  <ChevronDown size={16} />
                </SelectDropdownIcon>
              </FieldSelectWrapper>
            </FieldMappingRow>
          ))}
        </FieldMappingSection>
      )}
    </ContentCard>
  );

  const renderSequencesStep = () => (
    <SequencesStep
      campaign={currentCampaign}
      onSequencesChange={setSequences as (sequences: Sequence[]) => void}
    />
  );

  const renderSetupStep = () => (
    <SetupStep
      campaign={currentCampaign}
      onSettingsUpdate={() => {}}
      onValidationChange={setIsSetupValid}
    />
  );

  const renderFinalReviewStep = () => (
    <FinalReviewStep
      campaign={currentCampaign}
      onEmailTemplateSelect={() => {}}
    />
  );

  return (
    <WizardContainer>
      <WizardHeader>
        <BackButton onClick={() => navigate("/campaigns")}>
          <ArrowLeft size={20} />
        </BackButton>
        <CampaignIconWrapper>
          <Megaphone size={20} />
        </CampaignIconWrapper>
        {renderProgressStepper()}
      </WizardHeader>

      <WizardContent>
        {currentStepIndex === 0 && renderImportLeadsStep()}
        {currentStepIndex === 1 && renderSequencesStep()}
        {currentStepIndex === 2 && renderSetupStep()}
        {currentStepIndex === 3 && renderFinalReviewStep()}
      </WizardContent>

      <WizardFooter>
        {currentStepIndex > 0 && (
          <SecondaryActionButton
            onClick={() => setCurrentStepIndex((prev) => prev - 1)}
            disabled={isSaving}
          >
            Back
          </SecondaryActionButton>
        )}
        <PrimaryActionButton
          onClick={handleSaveAndProceed}
          disabled={isNextButtonDisabled()}
        >
          {isSaving
            ? "Saving..."
            : currentStepIndex === 3
            ? "Schedule Campaign"
            : "Save & Next"}
        </PrimaryActionButton>
      </WizardFooter>

      <ImportSettingsDialog
        open={showImportSettingsDialog}
        onClose={() => setShowImportSettingsDialog(false)}
        onSave={handleImportSettingsSave}
      />

      <UploadSuccessDialog
        open={showUploadSuccessDialog}
        uploadCounts={uploadCounts}
        onClose={handleUploadSuccessClose}
      />
    </WizardContainer>
  );
};

export default CampaignWizard;
