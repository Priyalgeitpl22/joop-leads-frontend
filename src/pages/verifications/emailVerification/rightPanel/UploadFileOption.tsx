import { useState } from "react";
import { CardContainer, CheckboxRow, ChooseFileButton, Description, FileName, FileUploadContainer, HiddenFileInput, IconContainer, OptionTitle, StartButton, UploadIcon, VerifyButton, VerifyInput, VerifyInputWrapper } from "./UploadFileOption.styled";
import { Mail } from "lucide-react";
import VerificationDetailDialog from "../../VerificationDetailDialog";

const UploadFileOption = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSingleVerification = () => {
    setOpenVerificationDialog(true)
  }

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false)
  }

  return (
    <>
      <VerifyInputWrapper>
        <IconContainer>
          <Mail size={16} />
        </IconContainer>

        <VerifyInput placeholder="Enter an email address" />

        <VerifyButton onClick={handleSingleVerification}>Verify</VerifyButton>
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

          <StartButton>Start Verification</StartButton>
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
