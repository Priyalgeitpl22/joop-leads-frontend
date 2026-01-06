import React, { useState, useEffect, useMemo } from "react";
import { Mail, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import type { Sequence, Lead, Campaign } from "../../../../../interfaces";
import {
  ReviewContainer,
  ContactsSidebar,
  SidebarHeader,
  SidebarTitle,
  SearchInput,
  ContactsList,
  ContactItem,
  PreviewContainer,
  PreviewHeader,
  SequenceTabs,
  SequenceTab,
  PreviewContent,
  EditorWrapper,
  EmailInfoRow,
  PreviewFooter,
  TestEmailButton,
  EmptyState
} from "./FinalReviewStep.styled";
import { QuillEditor } from "../../../../../components/common/QuillEditor";
import type { AppDispatch } from "../../../../../store";
import { fetchCampaignById } from "../../../../../store/slices/campaignSlice";
import { useLocation, useParams } from "react-router-dom";
import type { Account } from "../../../../../types";
import SendTestEmail from "../SetupStep/SendTestEmail";

interface FinalReviewStepProps {
  campaign: Campaign | null;
  onEmailTemplateSelect: (template: {
    compiledSubject: string;
    compiledBody: string;
  }) => void;
}

export const FinalReviewStep: React.FC<FinalReviewStepProps> = ({
  campaign,
  onEmailTemplateSelect,
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(campaign?.leads?.[0] as Lead | null);
  const [selectedSequenceIndex, setSelectedSequenceIndex] = useState(campaign?.sequences?.[0] ? campaign?.sequences?.findIndex((seq: Sequence) => seq.id === campaign?.sequences?.[0]?.id) : 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTestEmailDialog, setShowTestEmailDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const searchParams = new URLSearchParams(location.search);
  const isEdit = searchParams.get("edit") === "true";

  useEffect(() => {
    if (!campaign && isEdit) {
      dispatch(fetchCampaignById(id as string));
    }
  }, [campaign, dispatch]);

  const compileTemplate = (template: string, lead: Lead): string => {
    if (!template) return "";

    return template.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
      const value = lead[key as keyof Lead];
      return value?.toString() || `{{${key}}}`;
    });
  };

  const currentSequence = campaign?.sequences?.[selectedSequenceIndex];

  const compiledSubject = useMemo(() => {
    if (!currentSequence?.subject || !selectedLead) return "";
    return compileTemplate(currentSequence.subject, selectedLead);
  }, [currentSequence, selectedLead]);

  const compiledBody = useMemo(() => {
    if (!currentSequence?.bodyHtml || !selectedLead) return "";
    return compileTemplate(currentSequence.bodyHtml, selectedLead);
  }, [currentSequence, selectedLead]);

  useEffect(() => {
    if (campaign?.leads?.[0] && currentSequence && compiledSubject && compiledBody) {
      onEmailTemplateSelect({
        compiledSubject: compiledSubject,
        compiledBody: compiledBody,
      });
    }
  }, [campaign?.leads, currentSequence, compiledSubject, compiledBody, onEmailTemplateSelect]);

  const filteredLeads = useMemo((): Lead[] => {
    const leads = campaign?.leads || [];
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return leads;
    }

    return leads.filter(
      (lead: Lead) =>
        lead.email?.toLowerCase().includes(query) ||
        lead.firstName?.toLowerCase().includes(query) ||
        lead.lastName?.toLowerCase().includes(query)
    );
  }, [campaign?.leads, searchQuery]);

  return (
    <ReviewContainer>
      {/* Contacts Sidebar */}
      <ContactsSidebar>
        <SidebarHeader>
          <SidebarTitle>
            Imported Leads ({campaign?.leads?.length || 0})
          </SidebarTitle>
          <SearchInput
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>
        <ContactsList>
          {filteredLeads?.length === 0 ? (
            <ContactItem>
              <div className="email">No leads found</div>
            </ContactItem>
          ) : (
            filteredLeads?.map((lead: Lead) => (
              <ContactItem
                key={lead.id}
                $isActive={selectedLead?.email === lead.email}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="email">{lead.email}</div>
              </ContactItem>
            ))
          )}
        </ContactsList>
      </ContactsSidebar>

      {/* Preview Area */}
      <PreviewContainer>
        <PreviewHeader>
          <SequenceTabs>
            {campaign?.sequences?.map((seq: Sequence, index: number) => (
              <SequenceTab
                key={seq?.seqNumber}
                $isActive={selectedSequenceIndex === index}
                onClick={() => setSelectedSequenceIndex(index)}
              >
                EMAIL {seq?.seqNumber}
              </SequenceTab>
            ))}
          </SequenceTabs>
        </PreviewHeader>

        {currentSequence ? (
          <>
            <EmailInfoRow>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">
                  {selectedLead?.email || "No lead selected"}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Subject:</span>
                <span className="value">{compiledSubject || "No subject"}</span>
              </div>
            </EmailInfoRow>

            <PreviewContent>
              <EditorWrapper>
                <QuillEditor
                  value={compiledBody}
                  readOnly={true}
                  placeholder="Email content will appear here..."
                  minHeight="300px"
                />
              </EditorWrapper>
            </PreviewContent>
          </>
        ) : (
          <PreviewContent>
            <EmptyState>
              <Mail size={48} />
              <h3>No email sequence</h3>
              <p>Please add at least one email sequence</p>
            </EmptyState>
          </PreviewContent>
        )}

        <PreviewFooter>
          <TestEmailButton onClick={() => setShowTestEmailDialog(true)}>
            <Send size={16} />
            Send Test Email
          </TestEmailButton>
        </PreviewFooter>
      </PreviewContainer>

      {/* Test Email Dialog */}
      {showTestEmailDialog && (
        <SendTestEmail
          isOpen={showTestEmailDialog}
          onClose={() => setShowTestEmailDialog(false)}
          senderAccounts={campaign?.sender_accounts as Account[] || []}
          sendAsPlainText={campaign?.sendAsPlainText || false}
          compiledSubject={compiledSubject}
          compiledBody={compiledBody}
        />  
      )}
    </ReviewContainer>
  );
};

export default FinalReviewStep;
