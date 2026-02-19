import { ArrowLeft } from "lucide-react";
import { BackButton, LeftPanel, RightPanel, VerificationContent } from "../Task&Results.styled";
import DownloadResult from "./rightPanel/DownloadResult";
import TaskDetailResult from "./leftPanel/TaskDetailResult";
import { useNavigate } from "react-router-dom";

const BulkDetailsResult = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/email-verification/task-and-results");
  }

  return (
    <div>
      <BackButton onClick={handleBack}>
        <ArrowLeft />
        Back to the results
      </BackButton>
      <VerificationContent>
        <LeftPanel>
          <TaskDetailResult />
        </LeftPanel>
        <RightPanel>
          <DownloadResult />
        </RightPanel>
      </VerificationContent>
    </div>
  );
};

export default BulkDetailsResult;
