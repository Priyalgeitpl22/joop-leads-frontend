import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, StatusBadge, Tab, TableSection, TabsContainer, TabsList } from "./Task&Results.styled";
import { DataTable } from "../../../components/common/DataTable";
import { emailVerificationService, type Batch } from "../../../services/email.verification.service";
import VerificationDetailDialog from "../VerificationDetailDialog";
import { formatDateTime } from "../../../utils";

function mapBatchToRow(batch: Batch): Record<string, unknown> {
  const b = batch as Record<string, unknown>;
  return {
    id: batch.id,
    reoonTaskId: b.reoonTaskId ?? batch.id,
    dateStarted: formatDateTime(b.createdAt as string) ?? "—",
    taskName: b.name ?? b.fileName ?? batch.id,
    status: b.status ?? "pending",
    total: b.total ?? b.totalEmails ?? 0,
    progress: b.progress ?? "0%",
  };
}

function mapEmailToRow(item: unknown, index: number): Record<string, unknown> {
  const r = (item ?? {}) as Record<string, unknown>;
  const id = r.id ?? r.email ?? `single-${index}`;
  const verifiedAt = r.verifiedAt ?? r.dateVerified ?? r.createdAt;
  const dateStr = verifiedAt != null ? (typeof verifiedAt === "string" ? formatDateTime(verifiedAt) : String(verifiedAt)) : "—";
  return {
    id: String(id),
    dateVerified: dateStr,
    emailAddress: r.email ?? r.emailAddress ?? "—",
    verificationMethod:
      r.verificationMethod ??
      (r.verificationResult as any)?.verification_mode ??
      "dashboard",
    status: r.status ?? "—",
    timeTaken: r.timeTaken ?? r.duration ?? r.timeTakenSec ?? "—",
  };
}

const TaskAndResults = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"bulk" | "single">("bulk");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [singleEmails, setSingleEmails] = useState<unknown[]>([]);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [emailAnalytics, setEmailAnalytics] = useState<any>(null);

  const isBulk = mode === "bulk";

  useEffect(() => {
    if (!isBulk) return;
    let cancelled = false;
    const load = async () => {
      setLoadingBatches(true);
      try {
        const response: any = await emailVerificationService.getAllBatches();
        const batchArray = response?.batches ?? [];
        setBatches(batchArray);
        if (!cancelled) {
          setBatches(batchArray);
        }
      } catch {
        if (!cancelled) setBatches([]);
      } finally {
        if (!cancelled) setLoadingBatches(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isBulk]);

  useEffect(() => {
    if (isBulk) return;
    let cancelled = false;
    const load = async () => {
      setLoadingSingle(true);
      try {
        const { data } = await emailVerificationService.getEmails();
        if (!cancelled) setSingleEmails(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setSingleEmails([]);
      } finally {
        if (!cancelled) setLoadingSingle(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isBulk]);

  const bulkColumns = [
    { key: "reoonTaskId", label: "Task ID" },
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

  const singleData = singleEmails.map(mapEmailToRow);

  const handleSingleDetails = async (row: Record<string, unknown>) => {
    const emailId = String(row.id);
    try {
      const result = await emailVerificationService.getEmailsAnalytics(emailId);
      setEmailAnalytics(result);
      setOpenVerificationDialog(true);
    } catch (error) {
      console.error("Failed to fetch email analytics:", error);
    }
  };

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false);
  }

  const handleBulkDetails = (row: Record<string, unknown>) => {
    const taskId = (row.id ?? row.taskId) as string;
    navigate(`/email-verification/task-and-results/bulk-detail/${taskId}`);
  };

  const bulkData = Array.isArray(batches) ? batches.map(mapBatchToRow) : [];

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

      <TableSection>
        <DataTable
          columns={isBulk ? bulkColumns : singleColumns}
          data={isBulk ? bulkData : singleData}
          loading={isBulk ? loadingBatches : loadingSingle}
          searchable={false}
          showRowActions
          showDetails
          isBulk={isBulk}
          onBulkDetails={(row) => handleBulkDetails(row)}
          onSingleDetails={
            !isBulk ? (row) => handleSingleDetails(row) : undefined
          }
        />
      </TableSection>

      <VerificationDetailDialog
        isOpen={openVerificationDialog}
        onClose={handleCloseVerificationDialog}
        data={emailAnalytics}
      />
    </PageContainer>
  );
}

export default TaskAndResults;