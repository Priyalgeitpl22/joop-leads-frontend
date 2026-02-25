import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import ConfirmDialog from "../../../../common/DeleteDialog";
import {
  CardContainer,
  Title,
  // SelectWrapper,
  // Select,
  ButtonRow,
  DownloadButton,
  SeparatorText,
  DeleteText,
  DeleteLink,
  InfoText,
  DownloadIcon,
} from "./DownloadResult.styled";
import { useEffect, useState } from "react";
import { emailVerificationService } from "../../../../../services/email.verification.service";

const DownloadResult = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDeleteDialog(false);
  };

  useEffect(() => {
    if (!taskId) return;

    const loadBatchDetails = async () => {
      try {
        const result = await emailVerificationService.getBatchDetails(taskId);

        if (result && typeof result === "object" && "csvResultFile" in result) {
          setFileUrl(result.csvResultFile as string);
        }
      } catch (error) {
        console.error("Failed to fetch batch details:", error);
      }
    };

    loadBatchDetails();
  }, [taskId]);

  const downloadCSV = async () => {
    if (!fileUrl) return;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    const csvBlob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvBlob);
    link.download = "verification-results.csv";
    link.click();
  };

  const downloadJSON = async () => {
    if (!fileUrl) return;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    const jsonBlob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "verification-results.json";
    link.click();
  };

  return (
    <CardContainer>
      <Title>Download Categorized Results</Title>
      <DownloadIcon
        src="/Images/cloud-download.png"
        alt="Upload file"
        width={190}
        height={170}
      />

      {/* <SelectWrapper>
        <Select>
          <option>All - Include all type of results</option>
          <option>Valid Only</option>
          <option>Invalid Only</option>
          <option>Safe Only</option>
        </Select>
      </SelectWrapper> */}

      <ButtonRow>
        <DownloadButton onClick={downloadCSV}>Download CSV</DownloadButton>
        <SeparatorText>or</SeparatorText>
        <DownloadButton onClick={downloadJSON}>Download JSON</DownloadButton>
      </ButtonRow>

      <DeleteText>
        Want to delete the files permanently from our servers?{" "}
        <DeleteLink href="#" onClick={() => setOpenConfirmDeleteDialog(true)}>Click Here</DeleteLink>
      </DeleteText>

      <InfoText>
        All files get deleted automatically after 15 days of verification by
        default.
      </InfoText>

      <ConfirmDialog
        isOpen={openConfirmDeleteDialog}
        title="Delete Verification Task"
        message="Are you sure you want to delete this verification task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setOpenConfirmDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </CardContainer>
  );
};

export default DownloadResult;
