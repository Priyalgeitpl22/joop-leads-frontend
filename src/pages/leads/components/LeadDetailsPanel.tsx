import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  // MoreHorizontal,
  // Maximize2,
  Send,
  MessageSquare,
  Phone,
  ListTodo,
  // FileEdit,
  Linkedin,
  Mail,
  CheckCircle2,
  Plus,
  // Settings,
  Calendar,
  ChevronDown as ChevronDownIcon,
  Star,
  Briefcase,
  Globe,
  ExternalLink,
  Trash,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Overlay,
  PanelContainer,
  PanelHeader,
  LeadHeaderInfo,
  LeadAvatar,
  LeadTitleSection,
  LeadName,
  LinkedInIcon,
  LeadSubtitle,
  CompanyBadge,
  HeaderActions,
  HeaderIconButton,
  CloseButton,
  // QuickActions,
  // AddToCampaignButton,
  // QuickActionButton,
  TabsContainer,
  Tab,
  TabBadge,
  PanelContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
  SectionIconButton,
  SectionBody,
  FieldGroup,
  FieldLabel,
  FieldValue,
  FieldInput,
  FieldIcon,
  FieldActionButton,
  EmailFieldValue,
  EmailVerifiedIcon,
  AddFieldButton,
  SelectTrigger,
  DateFieldValue,
  DateInfo,
  RelativeDate,
  OwnerField,
  OwnerAvatar,
  OwnerName,
  // ExperienceCard,
  // ExperienceLogo,
  // ExperienceInfo,
  // ExperienceTitle,
  // ExperienceCompany,
  // ExperienceDuration,
  // ExperienceBookmark,
  TextAreaField,
  LinkField,
  EmptyTabContent,
  EmptyTabIcon,
  EmptyTabTitle,
  EmptyTabDescription,
} from "./LeadDetailsPanel.styled";
import CampaignsList from "./CampaignsList";
import type { Lead } from "../../../interfaces";
import { Button, OptionsMenu } from "../../../components/common";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store";
import { deleteLead, fetchAllLeads, updateLead } from "../../../store/slices/leadSlice";
import ConfirmDialog from "../../common/DeleteDialog";

interface LeadDetailsPanelProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

type TabType = "general" | "activities" | "campaigns" | "tasks" | "signals";

export const LeadDetailsPanel: React.FC<LeadDetailsPanelProps> = ({
  lead,
  isOpen,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [isClosing, setIsClosing] = useState(false);
  const [deleteLeadDialogOpen, setDeleteLeadDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: lead?.firstName || "",
    lastName: lead?.lastName || "",
    phone: lead?.phone || "",
    designation: lead?.designation || "",
    linkedinUrl: lead?.linkedinUrl || "",
  });

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (lead?.id !== undefined) {
      setTimeout(() => {
        setActiveTab("general");
      }, 0);
    }
  }, [lead?.id !== undefined]);

  useEffect(() => {
    if (lead) {
      setFormData({
        firstName: lead.firstName || "",
        lastName: lead.lastName || "",
        phone: lead.phone || "",
        designation: lead.designation || "",
        linkedinUrl: lead.linkedinUrl || "",
      });
    }
  }, [lead]);

  const isFormChanged = useMemo(() => {
    if (!lead) return false;

    return (
      formData.firstName !== (lead.firstName || "") ||
      formData.lastName !== (lead.lastName || "") ||
      formData.phone !== (lead.phone || "") ||
      formData.designation !== (lead.designation || "") ||
      formData.linkedinUrl !== (lead.linkedinUrl || "")
    );
  }, [formData, lead]);


  const handleSave = async () => {
    if (!isFormChanged) return;

    try {
      setIsUpdating(true);

      await dispatch(
        updateLead({
          id: lead.id,
          data: formData,
        }),
      ).unwrap();

      await dispatch(fetchAllLeads()).unwrap();
      toast.success("Lead updated successfully");
      setIsClosing(true);
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to update lead");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !lead) return null;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase() || "?";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1d ago";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const getOwnerInitials = (name?: string) => {
    if (!name) return "??";
    const parts = name.split(" ");
    return parts.length >= 2
      ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const handleDeleteClick = (lead: Lead) => {
    setLeadToDelete(lead);
    setDeleteLeadDialogOpen(true);
  };

  const handleConfirmDeleteLead = async () => {
    if (!leadToDelete) return;

    try {
      await dispatch(deleteLead(leadToDelete.id)).unwrap();
      toast.success("Lead deleted successfully");
      setDeleteLeadDialogOpen(false);
      setIsClosing(true);
      setLeadToDelete(null);
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err?.message || "Failed to delete lead");
    }
  };

  const handleCancelDeleteLead = () => {
    setDeleteLeadDialogOpen(false);
    setLeadToDelete(null);
  };

  const renderGeneralTab = () => (
    <>
      {/* Contact Fields Section */}
      <Section>
        <SectionHeader>
          <SectionTitle>Contact fields</SectionTitle>
          <SectionActions>
            {/* <SectionIconButton onClick={() => toast("Settings coming soon")}>
              <Settings size={16} />
            </SectionIconButton> */}
            <SectionIconButton onClick={() => toast("Add field coming soon")}>
              <Plus size={16} />
            </SectionIconButton>
          </SectionActions>
        </SectionHeader>
        <SectionBody>
          {/* Emails */}
          <FieldGroup>
            <FieldLabel>Emails</FieldLabel>
            <EmailFieldValue>
              <FieldIcon>
                <Mail size={16} />
              </FieldIcon>
              <span>{lead.email}</span>
              <EmailVerifiedIcon>
                <CheckCircle2 size={16} />
              </EmailVerifiedIcon>
              <FieldActionButton onClick={() => toast("Send email coming soon")}>
                <Mail size={16} />
              </FieldActionButton>
            </EmailFieldValue>
            <AddFieldButton>
              <Plus size={14} />
              Add email
            </AddFieldButton>
          </FieldGroup>

          {/* Phone */}
          <FieldGroup>
            <FieldLabel>Main phone</FieldLabel>
            <FieldValue>
              <FieldIcon>
                <Phone size={16} />
              </FieldIcon>
              {lead.phone ? (
                <span>{lead.phone}</span>
              ) : (
                <button
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => toast("Find phone coming soon")}
                >
                  FIND PHONE
                </button>
              )}
              <FieldActionButton onClick={() => toast("Call coming soon")}>
                <Phone size={16} />
              </FieldActionButton>
            </FieldValue>
          </FieldGroup>

          {/* First Name */}
          <FieldGroup>
            <FieldLabel>First name</FieldLabel>
            <FieldValue>
              <FieldIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </FieldIcon>
              <FieldInput
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </FieldValue>
          </FieldGroup>

          {/* Last Name */}
          <FieldGroup>
            <FieldLabel>Last name</FieldLabel>
            <FieldValue>
              <FieldIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </FieldIcon>
              <FieldInput
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </FieldValue>
          </FieldGroup>

          {/* Added Date */}
          <FieldGroup>
            <FieldLabel>Added to list date</FieldLabel>
            <DateFieldValue>
              <DateInfo>
                <FieldIcon>
                  <Calendar size={16} />
                </FieldIcon>
                <span>{formatDate(lead.createdAt)}</span>
              </DateInfo>
              <RelativeDate>{getRelativeTime(lead.createdAt)}</RelativeDate>
            </DateFieldValue>
          </FieldGroup>

          {/* Contact Status */}
          <FieldGroup>
            <FieldLabel>Contact status</FieldLabel>
            <SelectTrigger onClick={() => toast("Status change coming soon")}>
              <span>{lead.isVerified ? "Verified" : "Unverified"}</span>
              <ChevronDownIcon size={16} />
            </SelectTrigger>
          </FieldGroup>

          {/* Owner */}
          <FieldGroup>
            <FieldLabel>Owner</FieldLabel>
            <OwnerField onClick={() => toast("Change owner coming soon")}>
              <OwnerAvatar>{getOwnerInitials(lead.uploadedBy?.fullName)}</OwnerAvatar>
              <OwnerName>{lead.uploadedBy?.fullName || "Unassigned"}</OwnerName>
              <ChevronDownIcon size={16} />
            </OwnerField>
          </FieldGroup>
        </SectionBody>
      </Section>

      {/* Experiences Section */}
      {/* <Section>
        <SectionHeader>
          <SectionTitle>Experiences</SectionTitle>
        </SectionHeader>
        <SectionBody>
          {lead.company || lead.designation ? (
            <ExperienceCard>
              <ExperienceLogo>
                {lead.company?.substring(0, 4).toUpperCase() || "N/A"}
              </ExperienceLogo>
              <ExperienceInfo>
                <ExperienceTitle>{lead.designation || "Unknown Role"}</ExperienceTitle>
                <ExperienceCompany>{lead.company || "Unknown Company"}</ExperienceCompany>
                <ExperienceDuration>Present</ExperienceDuration>
              </ExperienceInfo>
              <ExperienceBookmark>
                <Star size={16} />
              </ExperienceBookmark>
            </ExperienceCard>
          ) : (
            <EmptyTabContent>
              <EmptyTabIcon>
                <Briefcase size={24} />
              </EmptyTabIcon>
              <EmptyTabTitle>No experience data</EmptyTabTitle>
              <EmptyTabDescription>
                Experience information will appear here when available.
              </EmptyTabDescription>
            </EmptyTabContent>
          )}
          <AddFieldButton>
            <Plus size={14} />
            Add new experience
          </AddFieldButton>
        </SectionBody>
      </Section> */}

      {/* Job Title */}
      <Section>
        <SectionHeader>
          <SectionTitle>Job title</SectionTitle>
        </SectionHeader>
        <SectionBody>
          <FieldValue>
            <FieldIcon>
              <Briefcase size={16} />
            </FieldIcon>
            <FieldInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FieldValue>
        </SectionBody>
      </Section>

      {/* Job Description */}
      <Section>
        <SectionHeader>
          <SectionTitle>Job description</SectionTitle>
        </SectionHeader>
        <SectionBody>
          <TextAreaField
            defaultValue={lead.designation || ""}
            placeholder="Enter job description..."
          />
        </SectionBody>
      </Section>

      {/* LinkedIn Profile */}
      <Section>
        <SectionHeader>
          <SectionTitle>LinkedIn profile</SectionTitle>
        </SectionHeader>
        <SectionBody>
          {lead.linkedinUrl ? (
            <LinkField href={lead.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                {lead.linkedinUrl}
              </span>
              <ExternalLink size={14} />
            </LinkField>
          ) : (
            <FieldValue>
              <FieldIcon>
                <Linkedin size={16} />
              </FieldIcon>
              <FieldInput
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
              />
            </FieldValue>
          )}
        </SectionBody>
      </Section>

      {/* Website */}
      {lead.website && (
        <Section>
          <SectionHeader>
            <SectionTitle>Website</SectionTitle>
          </SectionHeader>
          <SectionBody>
            <LinkField href={lead.website} target="_blank" rel="noopener noreferrer">
              <Globe size={16} />
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                {lead.website}
              </span>
              <ExternalLink size={14} />
            </LinkField>
          </SectionBody>
        </Section>
      )}
      <Button onClick={handleSave} disabled={!isFormChanged || isUpdating}>
        {isUpdating ? "Saving..." : "Save"}
      </Button>
    </>
  );

  const renderEmptyTab = (title: string, description: string, icon: React.ReactNode) => (
    <EmptyTabContent>
      <EmptyTabIcon>{icon}</EmptyTabIcon>
      <EmptyTabTitle>{title}</EmptyTabTitle>
      <EmptyTabDescription>{description}</EmptyTabDescription>
    </EmptyTabContent>
  );

  return (
    <>
      <Overlay $isClosing={isClosing} onClick={handleOverlayClick} />
      <PanelContainer
        $isClosing={isClosing}
        className={deleteLeadDialogOpen ? "blur-background" : ""}
      >
        {/* Header */}
        <PanelHeader>
          <LeadHeaderInfo>
            <LeadAvatar>{getInitials(lead.firstName || "", lead.lastName || "")}</LeadAvatar>
            <LeadTitleSection>
              <LeadName>
                {lead.firstName} {lead.lastName}
                {lead.linkedinUrl && (
                  <LinkedInIcon
                    href={lead.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} />
                  </LinkedInIcon>
                )}
              </LeadName>
              <LeadSubtitle>
                {lead.designation && <span>{lead.designation}</span>}
                {lead.designation && lead.company && <span>at</span>}
                {lead.company && <CompanyBadge>{lead.company}</CompanyBadge>}
              </LeadSubtitle>
            </LeadTitleSection>
          </LeadHeaderInfo>
          <HeaderActions>
            {hasPrev && (
              <HeaderIconButton onClick={onNavigatePrev} title="Previous lead">
                <ChevronUp size={18} />
              </HeaderIconButton>
            )}
            {hasNext && (
              <HeaderIconButton onClick={onNavigateNext} title="Next lead">
                <ChevronDown size={18} />
              </HeaderIconButton>
            )}
            <OptionsMenu
              items={[
                {
                  id: "delete",
                  label: "Delete lead",
                  icon: <Trash size={18} />,
                  danger: true,
                  onClick: () => handleDeleteClick(lead),
                },
              ]}
            />
            <CloseButton onClick={handleClose} title="Close">
              <X size={18} />
            </CloseButton>
          </HeaderActions>
        </PanelHeader>

        {/* Quick Actions */}
        {/* <QuickActions>
          <AddToCampaignButton onClick={() => toast("Add to campaign coming soon")}>
            <Send size={16} />
            Add to campaign
          </AddToCampaignButton>
          <QuickActionButton title="Message" onClick={() => toast("Message coming soon")}>
            <MessageSquare size={18} />
          </QuickActionButton>
          <QuickActionButton title="Call" onClick={() => toast("Call coming soon")}>
            <Phone size={18} />
          </QuickActionButton>
          <QuickActionButton title="Tasks" onClick={() => toast("Tasks coming soon")}>
            <ListTodo size={18} />
          </QuickActionButton>
          <QuickActionButton title="Notes" onClick={() => toast("Notes coming soon")}>
            <FileEdit size={18} />
          </QuickActionButton>
        </QuickActions> */}

        {/* Tabs */}
        <TabsContainer>
          <Tab $isActive={activeTab === "general"} onClick={() => setActiveTab("general")}>
            General
          </Tab>
          <Tab $isActive={activeTab === "activities"} onClick={() => setActiveTab("activities")}>
            Activities
          </Tab>
          <Tab $isActive={activeTab === "campaigns"} onClick={() => setActiveTab("campaigns")}>
            Campaigns
            <TabBadge>{lead.campaigns?.length || 0}</TabBadge>
          </Tab>
        </TabsContainer>

        {/* Content */}
        <PanelContent>
          {activeTab === "general" && renderGeneralTab()}
          {activeTab === "activities" &&
            renderEmptyTab(
              "No activities yet",
              "Activities and interactions with this lead will appear here.",
              <MessageSquare size={24} />
            )}
          {activeTab === "campaigns" && (
            lead.campaigns?.length === 0 ? (
              renderEmptyTab(
                "No campaigns",
                "This lead hasn't been added to any campaigns yet.",
                <Send size={24} />
              )
            ) : (
              <CampaignsList lead={lead} campaignId={lead.campaigns?.[0]?.id || ""} />
            )
          )}
          {activeTab === "tasks" &&
            renderEmptyTab(
              "No tasks",
              "Tasks related to this lead will appear here.",
              <ListTodo size={24} />
            )}
          {activeTab === "signals" &&
            renderEmptyTab(
              "No signals",
              "Engagement signals and insights will appear here.",
              <Star size={24} />
            )}
        </PanelContent>
      </PanelContainer>
      <ConfirmDialog
        isOpen={deleteLeadDialogOpen}
        title="Delete Lead"
        message={`Are you sure you want to delete ${
          leadToDelete
            ? `${leadToDelete.firstName ? leadToDelete.firstName : ""}${leadToDelete.firstName && leadToDelete.lastName ? " " : ""}${leadToDelete.lastName ? leadToDelete.lastName : ""}`
            : "this lead"
        }? This action cannot be undone.`}
        confirmText="Delete"
        onClose={handleCancelDeleteLead}
        onConfirm={handleConfirmDeleteLead}
      />
    </>
  );
};

export default LeadDetailsPanel;

