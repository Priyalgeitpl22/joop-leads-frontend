import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Plus, Clock, Trash2, Play, Braces } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { campaignService } from "../../../../services/campaign.service";
import type { ISequence } from "../../../../types/sequence.types";
import { SequenceType } from "../../../../types/enums";
import {
  SequencesContainer,
  Sidebar,
  SidebarHeader,
  SidebarIcon,
  EmailCardList,
  EmailCard,
  EmailCardBorder,
  EmailCardContent,
  EmailCardTitle,
  EmailCardSubject,
  AddStepButton,
  DelayConnectorLine,
  DelayBadgeInline,
  MainContent,
  StageHeader,
  StageTitle,
  PreviewButton,
  SubjectRow,
  SubjectLabel,
  SubjectInputWrapper,
  SubjectInput,
  VariablesButton,
  VariableTagsSection,
  VariableTag,
  EditorWrapper,
  SignatureHint,
  VariablesDropdown,
  VariableOption,
  EmptyState,
  DeleteButton,
  DelayModal,
  DelayModalContent,
  DelayInput,
  ModalButtons,
} from "./SequencesStep.styled";

interface SequencesStepProps {
  campaignId: string;
  sequences: ISequence[];
  onSequencesChange: (sequences: ISequence[]) => void;
}

const VARIABLE_OPTIONS = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "company", label: "Company Name" },
  { key: "designation", label: "Job Title" },
  { key: "phone", label: "Phone" },
  { key: "website", label: "Website" },
  { key: "linkedinUrl", label: "LinkedIn" },
];

// Quill editor configuration - comprehensive toolbar
const QUILL_MODULES = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "align",
  "link",
  "image",
  "blockquote",
];

export const SequencesStep: React.FC<SequencesStepProps> = ({
  campaignId,
  sequences,
  onSequencesChange,
}) => {
  const [selectedSequenceIndex, setSelectedSequenceIndex] = useState<number>(0);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [tempDelay, setTempDelay] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariablesDropdown, setShowVariablesDropdown] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const variablesRef = useRef<HTMLDivElement>(null);

  // Track if we've initialized to prevent duplicate initialization
  const hasInitialized = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        variablesRef.current &&
        !variablesRef.current.contains(event.target as Node)
      ) {
        setShowVariablesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to create a default sequence
  const createDefaultSequence = useCallback((): ISequence => ({
    id: "",
    campaignId: campaignId,
    seqNumber: 1,
    type: SequenceType.MANUAL_TASK,
    delayDays: 1,
    delayHours: 0,
    delayMinutes: 0,
    subject: "",
    bodyHtml: "",
    bodyText: "",
    taskTitle: "",
    taskDescription: "",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }), [campaignId]);

  // Single initialization effect - fetch from API or create default
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const initialize = async () => {
      setIsLoading(true);
      hasInitialized.current = true;
      
      try {
        // If campaign exists, try to fetch existing sequences
        if (campaignId) {
          const response = await campaignService.getCampaignSequences(campaignId);
          if (Array.isArray(response) && response.length > 0) {
            onSequencesChange(response as ISequence[]);
            setSelectedSequenceIndex(response.length-1);
            setIsLoading(false);
            return;
          }
        }
        
        // No existing sequences found - create default if sequences array is empty
        if (sequences.length === 0) {
          onSequencesChange([createDefaultSequence()]);
          setSelectedSequenceIndex(0);
        }
      } catch (error) {
        console.error("Failed to fetch sequences:", error);
        // On error, still create default if empty
        if (sequences.length === 0) {
          onSequencesChange([createDefaultSequence()]);
          setSelectedSequenceIndex(0);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [campaignId, sequences.length, onSequencesChange, createDefaultSequence]);

  const addNewSequence = useCallback(() => {
    const newSeqNumber = sequences.length + 1;
    const newSequence: ISequence = {
      id: "",
      campaignId: campaignId,
      seqNumber: newSeqNumber,
      type: SequenceType.MANUAL_TASK,
      delayDays: 1,
      delayHours: 0,
      delayMinutes: 0,
      subject: "",
      bodyHtml: "",
      bodyText: "",
      taskTitle: "",
      taskDescription: "",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...sequences, newSequence];
    // Set index first, then update sequences - React will batch these
    setSelectedSequenceIndex(updated.length -1); // This will be the index of the new sequence
    onSequencesChange(updated);
  }, [campaignId, sequences, onSequencesChange]);

  const deleteSequence = useCallback(
    (index: number) => {
      if (sequences.length <= 1) return;
      
      const updated = sequences
        .filter((_, i) => i !== index)
        .map((seq, i) => ({
          ...seq,
          seqNumber: i + 1,
        }));
      
      // Calculate new index: if we deleted the currently selected or a later one,
      // stay at current index (clamped). If we deleted before current, shift down.
      let newIndex = selectedSequenceIndex;
      if (index <= selectedSequenceIndex) {
        newIndex = Math.max(0, selectedSequenceIndex - 1);
      }
      // Clamp to valid range
      newIndex = Math.min(newIndex, updated.length - 1);
      
      setSelectedSequenceIndex(newIndex);
      onSequencesChange(updated);
    },
    [sequences, selectedSequenceIndex, onSequencesChange]
  );

  // Helper to extract plain text from HTML
  const extractTextFromHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const updateSubject = useCallback(
    (value: string) => {
      const updated = [...sequences];
      const seq = updated[selectedSequenceIndex];
      if (seq) {
        updated[selectedSequenceIndex] = {
          ...seq,
          subject: value,
        };
        onSequencesChange(updated);
      }
    },
    [sequences, selectedSequenceIndex, onSequencesChange]
  );

  const updateBody = useCallback(
    (htmlValue: string) => {
      const updated = [...sequences];
      const seq = updated[selectedSequenceIndex];
      if (seq) {
        updated[selectedSequenceIndex] = {
          ...seq,
          bodyHtml: htmlValue,
          bodyText: extractTextFromHtml(htmlValue),
        };
        onSequencesChange(updated);
      }
    },
    [sequences, selectedSequenceIndex, onSequencesChange]
  );

  const updateDelay = useCallback(
    (days: number) => {
      const updated = [...sequences];
      const seq = updated[selectedSequenceIndex];
      if (seq) {
        seq.delayDays = days;
        onSequencesChange(updated);
      }
      setShowDelayModal(false);
    },
    [sequences, selectedSequenceIndex, onSequencesChange]
  );

  // Get the current sequence safely - clamp index to valid range
  const currentSequence = sequences.length > 0 
    ? sequences[Math.min(Math.max(0, selectedSequenceIndex), sequences.length - 1)] 
    : null;

  const insertVariable = useCallback(
    (variable: string) => {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        const variableText = `{{${variable}}}`;
        if (range) {
          quill.insertText(range.index, variableText);
          quill.setSelection(range.index + variableText.length, 0);
        } else {
          const length = quill.getLength();
          quill.insertText(length - 1, variableText);
        }
      } else {
        const currentBody = currentSequence?.bodyHtml || "";
        updateBody(currentBody + `{{${variable}}}`);
      }
      setShowVariablesDropdown(false);
    },
    [currentSequence, updateBody]
  );

  if (isLoading) {
    return (
      <SequencesContainer>
        <EmptyState>
          <Mail size={48} />
          <h3>Loading sequences...</h3>
        </EmptyState>
      </SequencesContainer>
    );
  }

  return (
    <SequencesContainer>
      {/* Left Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <SidebarIcon>
            <Mail size={18} />
          </SidebarIcon>
          <span>Email follow up</span>
        </SidebarHeader>

        <EmailCardList>
          {sequences.map((seq, index) => (
            <React.Fragment key={seq.seqNumber}>
              {/* Delay between sequences */}
              {index > 0 && (
                <DelayConnectorLine>
                  <DelayBadgeInline
                    onClick={() => {
                      setSelectedSequenceIndex(index);
                      setTempDelay(seq.delayDays || 1);
                      setShowDelayModal(true);
                    }}
                  >
                    <Clock size={12} />
                    Wait {seq.delayDays || 1} day
                    {(seq.delayDays || 1) !== 1 ? "s" : ""}
                  </DelayBadgeInline>
                </DelayConnectorLine>
              )}

              <EmailCard
                $isActive={selectedSequenceIndex === index}
                onClick={() => setSelectedSequenceIndex(index)}
              >
                <EmailCardBorder $isActive={selectedSequenceIndex === index} />
                <EmailCardContent>
                  <EmailCardTitle>Email</EmailCardTitle>
                  <EmailCardSubject>
                    Subject: {seq.subject || "----"}
                  </EmailCardSubject>
                </EmailCardContent>
                {sequences.length > 1 && (
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSequence(index);
                    }}
                  >
                    <Trash2 size={14} />
                  </DeleteButton>
                )}
              </EmailCard>
            </React.Fragment>
          ))}
        </EmailCardList>

        <AddStepButton onClick={addNewSequence}>
          <Plus size={16} />
          <span>Add step</span>
        </AddStepButton>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {currentSequence ? (
          <>
            <StageHeader>
              <StageTitle>Stage {currentSequence.seqNumber}: Email</StageTitle>
              <PreviewButton>
                <Play size={14} />
                Preview
              </PreviewButton>
            </StageHeader>

            {/* Subject Input */}
            <SubjectRow>
              <SubjectLabel>Subject:</SubjectLabel>
              <SubjectInputWrapper>
                <SubjectInput
                  placeholder="Hi {{firstName}}"
                  value={currentSequence?.subject || ""}
                  onChange={(e) => updateSubject(e.target.value)}
                />
              </SubjectInputWrapper>
              <div ref={variablesRef} style={{ position: "relative" }}>
                <VariablesButton
                  onClick={() =>
                    setShowVariablesDropdown(!showVariablesDropdown)
                  }
                >
                  <Braces size={14} />
                  Variables
                </VariablesButton>
                {showVariablesDropdown && (
                  <VariablesDropdown>
                    {VARIABLE_OPTIONS.map((v) => (
                      <VariableOption
                        key={v.key}
                        onClick={() => insertVariable(v.key)}
                      >
                        {`{{${v.key}}}`}
                        <span>{v.label}</span>
                      </VariableOption>
                    ))}
                  </VariablesDropdown>
                )}
              </div>
            </SubjectRow>

            {/* Variable Tags */}
            <VariableTagsSection>
              {VARIABLE_OPTIONS.map((v) => (
                <VariableTag key={v.key} onClick={() => insertVariable(v.key)}>
                  {`{{${v.label}}}`}
                </VariableTag>
              ))}
            </VariableTagsSection>

            {/* Email Editor */}
            <EditorWrapper>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={currentSequence?.bodyHtml || ""}
                onChange={(value) => updateBody(value)}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder="Write your email content here..."
              />

              {/* <ComposeAIButton>
                <Sparkles size={18} />
                Compose with AI
              </ComposeAIButton> */}
            </EditorWrapper>

            <SignatureHint>
              Type <strong>%signature%</strong> to insert your email account's
              signature where you want it added or it will be added at the end
              of the email by default
            </SignatureHint>
          </>
        ) : (
          <EmptyState>
            <Mail size={48} />
            <h3>No sequence selected</h3>
            <p>Add an email step to get started</p>
          </EmptyState>
        )}
      </MainContent>

      {/* Delay Modal */}
      {showDelayModal && (
        <DelayModal onClick={() => setShowDelayModal(false)}>
          <DelayModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Set Delay</h3>
            <DelayInput>
              <span>Wait</span>
              <input
                type="number"
                min={1}
                max={90}
                value={tempDelay}
                onChange={(e) => setTempDelay(Number(e.target.value))}
              />
              <span>days before sending</span>
            </DelayInput>
            <ModalButtons>
              <button
                className="cancel"
                onClick={() => setShowDelayModal(false)}
              >
                Cancel
              </button>
              <button className="save" onClick={() => updateDelay(tempDelay)}>
                Save
              </button>
            </ModalButtons>
          </DelayModalContent>
        </DelayModal>
      )}
    </SequencesContainer>
  );
};

export default SequencesStep;
