import { useState } from "react";
import { PageContainer, StatusBadge, Tab, TabsContainer, TabsList } from "./Task&Results.styled";
import { DataTable } from "../../../components/common/DataTable";
import { useNavigate } from "react-router-dom";
import VerificationDetailDialog from "../VerificationDetailDialog";

const TaskAndResults = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"bulk" | "single">("bulk");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);

  const isBulk = mode === "bulk";

  const bulkColumns = [
    { key: "taskId", label: "Task ID" },
    { key: "dateStarted", label: "Date Started" },
    { key: "taskName", label: "Task Name" },
    {
      key: "status",
      label: "Status",
      render: (value: unknown) => {
        const status = String(value ?? "");
        return <StatusBadge $status={status}>{status}</StatusBadge>;
      },
    },
    { key: "total", label: "Total" },
    { key: "progress", label: "Progress" },
  ];

  const singleColumns = [
    { key: "dateVerified", label: "Date Verified" },
    { key: "emailAddress", label: "Email Address" },
    {
      key: "verificationMethod",
      label: "Verification Method",
    },
    {
      key: "status",
      label: "Result Status",
      render: (value: unknown) => {
        const status = String(value ?? "");
        return <StatusBadge $status={status}>{status}</StatusBadge>;
      },
    },
    { key: "timeTaken", label: "Time Taken (Sec)" },
  ];

  const bulkMockData = [
    {
      id: "1",
      taskId: "45263",
      dateStarted: "11:38:23 17/02/2026",
      taskName: "sample-lead.csv",
      status: "pending",
      total: 500,
      progress: "100%",
    },
    {
      id: "2",
      taskId: "98768",
      dateStarted: "13:38:23 17/02/2026",
      taskName: "test-leads.csv",
      status: "Completed",
      total: 1,
      progress: "100%",
    },
    {
      id: "3",
      taskId: "67547",
      dateStarted: "09:38:23 17/02/2026",
      taskName: "demo-leads.csv",
      status: "Completed",
      total: 100,
      progress: "100%",
    },
  ];

  const singleMockData = [
    {
      id: "1",
      dateVerified: "11:38:23 17/02/2026",
      emailAddress: "priyal@goldeneagle.ai",
      verificationMethod: "dashboard",
      status: "Safe",
      timeTaken: 0.4,
    },
    {
      id: "2",
      dateVerified: "13:38:23 17/02/2026",
      emailAddress: "muskan@goldeneagle.ai",
      verificationMethod: "dashboard",
      status: "Safe",
      timeTaken: 0.32,
    },
    {
      id: "3",
      dateVerified: "09:38:23 17/02/2026",
      emailAddress: "satyam.g@goldeneagle.ai",
      verificationMethod: "dashboard",
      status: "Invalid",
      timeTaken: 0.12,
    },
  ];

  const handleSingleDetails = () => {
    setOpenVerificationDialog(true)
  };

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false);
  }

  const handleBulkDetails = (row: any) => {
    navigate(`/email-verification/task-and-results/bulk-detail/${row.taskId}`);
  }

  return (
    <PageContainer>
      <TabsContainer>
        <TabsList>
          <Tab $isActive={isBulk} onClick={() => setMode("bulk")}>
            Bulk Verification Tasks & Results
          </Tab>

          <Tab $isActive={!isBulk} onClick={() => setMode("single")}>
            APIs & Single Verification Results (15 Days)
          </Tab>
        </TabsList>
      </TabsContainer>

      <DataTable
        columns={isBulk ? bulkColumns : singleColumns}
        data={isBulk ? bulkMockData : singleMockData}
        searchable={false}
        showRowActions
        showDetails
        isBulk={isBulk}
        onBulkDetails={(row) => handleBulkDetails(row)}
        onSingleDetails={
          !isBulk ? () => handleSingleDetails() : undefined
        }
      />

      <VerificationDetailDialog
        isOpen={openVerificationDialog}
        onClose={handleCloseVerificationDialog}
      />
    </PageContainer>
  );
}

export default TaskAndResults;