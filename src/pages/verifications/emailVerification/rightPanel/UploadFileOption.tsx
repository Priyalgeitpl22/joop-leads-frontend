import { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import {
  CardContainer,
  CheckboxRow,
  ChooseFileButton,
  Description,
  FileName,
  FileUploadContainer,
  HiddenFileInput,
  IconContainer,
  OptionTitle,
  StartButton,
  UploadIcon,
  VerifyButton,
  VerifyInput,
  VerifyInputWrapper,
  Error,
} from "./UploadFileOption.styled";
import { emailVerificationService } from "../../../../services/email.verification.service";
import VerificationDetailDialog from "../../VerificationDetailDialog";
import SuccessDialog from "../SuccessDialog";
import { useNavigate } from "react-router-dom";

const validateEmails = (input: string) => {
  if (!input.trim()) return false;

  const emails = input
    .trim()
    .replace(/\s*,\s*/g, ",")
    .replace(/\n+/g, ",")
    .split(",");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emails.every((email) => emailRegex.test(email));
};

const validateFile = (file: File) => {
  const allowedExtensions = ["txt", "csv"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return fileExtension ? allowedExtensions.includes(fileExtension) : false;
};

const UploadFileOption = ({ emailVerificationAddOn }: { emailVerificationAddOn: boolean | undefined }) => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!validateFile(file)) {
        setFileName("No file chosen");
        setSelectedFile(null);
        setFileError("Only TXT and CSV files are allowed");
        return;
      }

      setFileName(file.name);
      setSelectedFile(file);
      setFileError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailInput(value);

    if (!value.trim()) {
      setIsEmailValid(false);
      setEmailError("");
      return;
    }

    if (!validateEmails(value)) {
      setIsEmailValid(false);
      setEmailError("Enter valid email(s), comma-separated");
    } else {
      setIsEmailValid(true);
      setEmailError("");
    }
  };

  const handleStartVerification = async () => {
    if (!selectedFile) {
      toast.error("Please choose a file first");
      return;
    }
    setIsUploading(true);
    try {
      const result = await emailVerificationService.uploadAndCreateBatch(selectedFile);
      const batchId = result?.batchId ?? (result?.data as { id?: string })?.id;
      toast.success(batchId ? `Batch created successfully` : "File uploaded successfully");
      setFileName("No file chosen");
      setSelectedFile(null);
      // Reset file input
      const input = document.getElementById("fileUpload") as HTMLInputElement;
      if (input) input.value = "";
      setOpenSuccessDialog(true);
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Upload failed";
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSingleVerification = async () => {
    const emails = emailInput.trim().replace(/\s*,\s*/g, ",").replace(/\n+/g, ",");
    if (!emails) {
      toast.error("Enter one or more email addresses (comma-separated)");
      return;
    }
    setIsVerifying(true);
    try {
      const result = await emailVerificationService.verifyEmails({
        emails,
        mode: "power",
      });
      setVerificationResult(result);
      const verifiedCount = result?.verifiedCount ?? 0;
      const failedCount = result?.failedCount ?? 0;
      if (verifiedCount > 0) {
        toast.success(
          failedCount > 0
            ? `Verified ${verifiedCount} email(s), ${failedCount} failed`
            : `Verified ${verifiedCount} email(s) successfully`
        );
        setOpenVerificationDialog(true);
      } else if (failedCount > 0) {
        toast.error(`Verification failed for ${failedCount} email(s)`);
      } else {
        toast.success("Verification completed");
      }
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Verification failed";
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  }

  const handleGoToTask = () => {
    navigate(`/email-verification/task-and-results`);
  };

  return (
    <>
      <VerifyInputWrapper>
        <IconContainer>
          <Mail size={16} />
        </IconContainer>

        <VerifyInput
          disabled={!emailVerificationAddOn}
          placeholder="Enter email(s) — one or comma-separated"
          value={emailInput}
          onChange={handleEmailChange}
        />

        <VerifyButton
          type="button"
          onClick={handleSingleVerification}
          disabled={!emailVerificationAddOn || isVerifying || !isEmailValid}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </VerifyButton>
      </VerifyInputWrapper>
        {emailError && (
          <Error>{emailError}</Error>
        )}
      <CardContainer>
        <OptionTitle>Option 2: Upload File for Verification</OptionTitle>
        <UploadIcon
          src="/Images/upload.png"
          alt="Upload file"
          width={140}
          height={140}
        />
        <Description>
          The supported file formats are TXT and CSV. The TXT file can contain
          only email addresses and the CSV file can contain multiple data
          columns.
        </Description>

        {emailVerificationAddOn && <CheckboxRow>
          <input type="checkbox" />
          Remove duplicate rows (only if all the columns are same).
        </CheckboxRow>}

        <FileUploadContainer>
          <HiddenFileInput
            type="file"
            id="fileUpload"
            accept=".txt,.csv"
            onChange={handleFileChange}
            disabled={!emailVerificationAddOn}
          />

          <ChooseFileButton htmlFor="fileUpload" $disabled={!emailVerificationAddOn}>
            Choose file
          </ChooseFileButton>

          <FileName>{fileName}</FileName>
          {fileError && (
            <Error>{fileError}</Error>
          )}

          <StartButton
            type="button"
            onClick={handleStartVerification}
            disabled={!emailVerificationAddOn || !selectedFile || isUploading || !!fileError}
          >
            {isUploading ? "Uploading..." : "Start Verification"}
          </StartButton>
        </FileUploadContainer>
        <VerificationDetailDialog
          isOpen={openVerificationDialog}
          onClose={handleCloseVerificationDialog}
          data={verificationResult}
        />
        <SuccessDialog
          isOpen={openSuccessDialog}
          onClose={handleCloseSuccessDialog}
          textMessage='You have successfully submitted the emails. Now the verification will start automatically within few moments. Please note that, the required credits has been deducted from your account. However, after the verification completes, you will get credits refund for all the emails with "unknown" status.'
          onGoToTask={handleGoToTask}
        />
      </CardContainer>
    </>
  );
};

export default UploadFileOption;
