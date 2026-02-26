import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { LeadDetailsPanel } from "./components";
import {
  AddButton,
  PageContainer,
} from "./Leads.styled";
import {
  fetchAllLeads,
  deleteLeads,
  deleteLead,
} from "../../store/slices/leadSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useAppSelector } from "../../store";
import { DataTable } from "../../components/common";
import type { Lead } from "../../interfaces";
import ConfirmDialog from "../common/DeleteDialog";
import AddLeadDialog from "./components/AddLeadDialog";

const ITEMS_PER_PAGE = 10;

type DeleteType = "single" | "bulk" | null;

export const Leads: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leads, isLoading } = useAppSelector(
    (state) => state.lead
  );

  // Local state
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [deleteType, setDeleteType] = useState<DeleteType>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  const isDeleteDialogOpen = deleteType !== null;

  // Initial fetch
  useEffect(() => {
    dispatch(fetchAllLeads());
  }, [dispatch]);

  // Edit lead handler - opens the details panel
  const handleEditLead = (row: Record<string, unknown>) => {
    const lead = row as unknown as Lead;
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  // Delete single lead handler
  const handleDeleteClick = (row: Record<string, unknown>) => {
    const lead = row as unknown as Lead;
    setLeadToDelete(lead);
    setDeleteType("single");
  };

  // Delete bulk lead handler
  const handleBulkDelete = () => {
    if (selectedLeads.size === 0) return;
    setDeleteType("bulk");
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === "single" && leadToDelete) {
        await dispatch(deleteLead(leadToDelete.id)).unwrap();
        toast.success("Lead deleted successfully");
        setLeadToDelete(null);
      }

      if (deleteType === "bulk") {
        const idsToDelete = Array.from(selectedLeads);
        await dispatch(deleteLeads(idsToDelete)).unwrap();
        toast.success(`Deleted ${idsToDelete.length} leads`);
        setSelectedLeads(new Set());
      }

      setDeleteType(null);
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to delete");
    }
  };

  const handleCancelDelete = () => {
    setDeleteType(null);
    setLeadToDelete(null);
  };

  // Lead details panel handlers
  const handleOpenLeadDetails = (row: Record<string, unknown>) => {
    const lead = row as unknown as Lead;
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
      (l: Lead) => l.id === selectedLead.id
    );
    if (currentIndex > 0) {
      setSelectedLead(leads[currentIndex - 1]);
    }
  };

  const handleNavigateNextLead = () => {
    if (!selectedLead) return;
    const currentIndex = leads.findIndex(
      (l: Lead) => l.id === selectedLead.id
    );
    if (currentIndex < leads.length - 1) {
      setSelectedLead(leads[currentIndex + 1]);
    }
  };

  const getLeadNavigationInfo = () => {
    if (!selectedLead) return { hasPrev: false, hasNext: false };
    const currentIndex = leads.findIndex(
      (l: Lead) => l.id === selectedLead.id
    );
    return {
      hasPrev: currentIndex > 0,
      hasNext: currentIndex < leads.length - 1,
    };
  };

  const headerActions = (
    <AddButton
      onClick={() => setIsAddLeadOpen(true)}
    >
      Add Lead
    </AddButton>
  );

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
        onDelete={handleDeleteClick}
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
        headerActions={headerActions}
        showSaveButton={false}
        handleSaveSenderAccounts={() => {}}
      />

      <LeadDetailsPanel
        lead={selectedLead as Lead}
        isOpen={isPanelOpen}
        onClose={handleCloseLeadDetails}
        onNavigatePrev={handleNavigatePrevLead}
        onNavigateNext={handleNavigateNextLead}
        hasPrev={getLeadNavigationInfo().hasPrev}
        hasNext={getLeadNavigationInfo().hasNext}
      />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title={deleteType === "bulk" ? "Delete Leads" : "Delete Lead"}
        message={
          deleteType === "bulk"
            ? `Are you sure you want to delete ${selectedLeads.size} selected ${
                selectedLeads.size === 1 ? "lead" : "leads"
              }? This action cannot be undone.`
            : `Are you sure you want to delete ${
                leadToDelete
                  ? `${leadToDelete.firstName ? leadToDelete.firstName : ""}${leadToDelete.firstName && leadToDelete.lastName ? " " : ""}${leadToDelete.lastName ? leadToDelete.lastName : ""}`
                  : "this lead"
              }? This action cannot be undone.`
        }
        confirmText="Delete"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <AddLeadDialog
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />
    </PageContainer>
  );
};

export default Leads;
