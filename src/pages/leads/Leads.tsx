import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { LeadDetailsPanel } from "./components";
import {
  PageContainer,
} from "./Leads.styled";
import type { ILead } from "../../types/lead.types";
import {
  fetchAllLeads,
  deleteLeads,
  deleteLead,
} from "../../store/slices/leadSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useAppSelector } from "../../store";
import { DataTable } from "../../components/common";

const ITEMS_PER_PAGE = 10;

export const Leads: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leads, isLoading } = useAppSelector(
    (state) => state.lead
  );

  // Local state
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchAllLeads());
  }, [dispatch]);

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedLeads.size} leads?`
      )
    ) {
      try {
        const idsToDelete = Array.from(selectedLeads);
        await dispatch(deleteLeads(idsToDelete));
        toast.success(`Deleted ${selectedLeads.size} leads`);
        setSelectedLeads(new Set());
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(
          err.response?.data?.message ||
            "Failed to delete leads. Please try again."
        );
      }
    }
  };

  // Edit lead handler - opens the details panel
  const handleEditLead = (row: Record<string, unknown>) => {
    const lead = row as unknown as ILead;
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  // Delete single lead handler
  const handleDeleteLead = async (row: Record<string, unknown>) => {
    const lead = row as unknown as ILead;
    if (window.confirm(`Are you sure you want to delete ${lead.email}?`)) {
      try {
        await dispatch(deleteLead(lead.id));
        toast.success("Lead deleted successfully");
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(
          err.response?.data?.message || "Failed to delete lead. Please try again."
        );
      }
    }
  };

  // Lead details panel handlers
  const handleOpenLeadDetails = (row: Record<string, unknown>) => {
    const lead = row as unknown as ILead;
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handleCloseLeadDetails = () => {
    setIsPanelOpen(false);
    setSelectedLead(null);
  };

  const handleNavigatePrevLead = () => {
    if (!selectedLead) return;
    const currentIndex = leads.findIndex(
      (l: ILead) => l.id === selectedLead.id
    );
    if (currentIndex > 0) {
      setSelectedLead(leads[currentIndex - 1]);
    }
  };

  const handleNavigateNextLead = () => {
    if (!selectedLead) return;
    const currentIndex = leads.findIndex(
      (l: ILead) => l.id === selectedLead.id
    );
    if (currentIndex < leads.length - 1) {
      setSelectedLead(leads[currentIndex + 1]);
    }
  };

  const getLeadNavigationInfo = () => {
    if (!selectedLead) return { hasPrev: false, hasNext: false };
    const currentIndex = leads.findIndex(
      (l: ILead) => l.id === selectedLead.id
    );
    return {
      hasPrev: currentIndex > 0,
      hasNext: currentIndex < leads.length - 1,
    };
  };

  const columns = [
    { key: "email", label: "Email" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    
    { key: "createdAt", label: "Created At" },
  ];

  return (
    <PageContainer>

      <DataTable
        columns={columns}
        data={leads as unknown as Record<string, unknown>[]}
        title="All Leads"
        showCount={true}
        loading={isLoading}
        searchable={true}
        searchPlaceholder="Search leads..."
        searchKeys={["email", "firstName", "lastName"]}
        filterable={true}
        selectable={true}
        selectedRows={Array.from(selectedLeads)}
        onSelectionChange={(ids: string[]) => setSelectedLeads(new Set(ids))}
        showRowActions={true}
        onEdit={handleEditLead}
        onDelete={handleDeleteLead}
        onRowClick={handleOpenLeadDetails}
        onBulkDelete={handleBulkDelete}
        paginated={true}
        pageSize={ITEMS_PER_PAGE}
        pageSizeOptions={[10, 25, 50, 100]}
        totalItems={leads.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sortable={true}
        defaultSort={{ key: "createdAt", direction: "desc" }}
        emptyTitle="No leads found"
        emptyMessage="Get started by importing leads or adding them manually."
        emptyIcon={<Users size={40} />}
        showSaveButton={false}
        handleSaveSenderAccounts={() => {}}
      />

      <LeadDetailsPanel
        lead={selectedLead}
        isOpen={isPanelOpen}
        onClose={handleCloseLeadDetails}
        onNavigatePrev={handleNavigatePrevLead}
        onNavigateNext={handleNavigateNextLead}
        hasPrev={getLeadNavigationInfo().hasPrev}
        hasNext={getLeadNavigationInfo().hasNext}
      />
    </PageContainer>
  );
};

export default Leads;
