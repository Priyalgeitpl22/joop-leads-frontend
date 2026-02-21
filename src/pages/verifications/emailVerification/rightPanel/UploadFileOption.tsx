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
} from "./UploadFileOption.styled";
import { emailVerificationService } from "../../../../services/email.verification.service";
import VerificationDetailDialog from "../../VerificationDetailDialog";

const UploadFileOption = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setSelectedFile(file);
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

  return (
    <>
      <VerifyInputWrapper>
        <IconContainer>
          <Mail size={16} />
        </IconContainer>

        <VerifyInput
          placeholder="Enter email(s) — one or comma-separated"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <VerifyButton
          type="button"
          onClick={handleSingleVerification}
          disabled={isVerifying || !emailInput.trim()}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </VerifyButton>
      </VerifyInputWrapper>
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

        <CheckboxRow>
          <input type="checkbox" />
          Remove duplicate rows (only if all the columns are same).
        </CheckboxRow>

        <FileUploadContainer>
          <HiddenFileInput
            type="file"
            id="fileUpload"
            accept=".txt,.csv"
            onChange={handleFileChange}
          />

          <ChooseFileButton htmlFor="fileUpload">Choose file</ChooseFileButton>

          <FileName>{fileName}</FileName>

          <StartButton
            type="button"
            onClick={handleStartVerification}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Start Verification"}
          </StartButton>
        </FileUploadContainer>
        <VerificationDetailDialog
          isOpen={openVerificationDialog}
          onClose={handleCloseVerificationDialog}
        />
      </CardContainer>
    </>
  );
};

export default UploadFileOption;
