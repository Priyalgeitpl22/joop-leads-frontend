import React, { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Plus, Clock, Trash2, Play } from "lucide-react";
import {
  QuillEditor,
  QUILL_MODULES,
  QUILL_FORMATS,
  type QuillEditorRef,
} from "../../../../../components/common";
import { SequenceType } from "../../../../../types/enums";
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
  EditorWrapper,
  SignatureHint,
  EmptyState,
  DeleteButton,
  DelayModal,
  DelayModalContent,
  DelayInput,
  ModalButtons,
} from "./SequencesStep.styled";
import type {
  Campaign,
  NewSequence,
  Sequence,
} from "../../../../../interfaces";
import {
  VARIABLE_OPTIONS,
  VariableOption,
  VariablesButton,
  VariablesWrapper,
  VariablesDropdown,
} from "../../../../../components/common/QuillEditor";
import { Braces } from "lucide-react";

interface Props {
  campaign: Campaign | null;
  onSequencesChange: (sequences: Sequence[]) => void;
}

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

const createDefaultSequence = (seqNumber: number): NewSequence => ({
  id: "",
  campaignId: "",
  seqNumber,
  type: SequenceType.MANUAL_TASK,
  delayDays: 1,
  subject: "",
  bodyHtml: "",
});

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export const SequencesStep: React.FC<Props> = ({
  campaign,
  onSequencesChange,
}) => {
  const [sequences, setSequences] = useState<(Sequence | NewSequence)[]>([]);
  const [selectedSequenceIndex, setSelectedSequenceIndex] = useState(0);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [tempDelay, setTempDelay] = useState(1);
  const[showSubjectVariables, setShowSubjectVariables] = useState(false);

  const quillRef = useRef<QuillEditorRef>(null);
  const delayTargetIndexRef = useRef(0);

  const selectedSequence = sequences[selectedSequenceIndex];

  useEffect(() => {
    const load = async () => {
      const sequences = campaign?.sequences || [];
      if (sequences.length > 0) {
        setSequences(sequences);
        setSelectedSequenceIndex(sequences.length - 1);
      } else {
        setSequences([createDefaultSequence(1)]);
        setSelectedSequenceIndex(0);
      }
    };

    load();
  }, [campaign]);

  const extractTextFromHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const addNewSequence = useCallback(() => {
    setSequences((prev) => {
      const updated = [...prev, createDefaultSequence(prev.length + 1)];
      onSequencesChange(updated as Sequence[]);
      return updated;
    });
  }, [onSequencesChange]);

  const deleteSequence = useCallback(
    (index: number) => {
      if (sequences.length <= 1) return;
      const updated = sequences
        .filter((_, i) => i !== index)
        .map((seq, i) => ({
          ...seq,
          seqNumber: i + 1,
        }));

      const newIndex = Math.max(
        0,
        Math.min(selectedSequenceIndex, updated.length - 1)
      );

      setSequences(updated);
      setSelectedSequenceIndex(newIndex);
      onSequencesChange(updated as Sequence[]);
    },
    [sequences, selectedSequenceIndex, onSequencesChange]
  );

  const updateSubject = (value: string) => {
    setSequences((prev) => {
      const updated = [...prev];
      updated[selectedSequenceIndex] = {
        ...updated[selectedSequenceIndex],
        subject: value,
      };
      onSequencesChange(updated as Sequence[]);
      return updated;
    });
  };

  const updateBody = (htmlValue: string) => {
    setSequences((prev) => {
      const updated = [...prev];
      updated[selectedSequenceIndex] = {
        ...updated[selectedSequenceIndex],
        bodyHtml: htmlValue,
        bodyText: extractTextFromHtml(htmlValue),
      };
      onSequencesChange(updated as Sequence[]);
      return updated;
    });
  };

  const updateDelay = (days: number) => {
    const targetIndex = delayTargetIndexRef.current;
    setSequences((prev) => {
      const updated = [...prev];
      updated[targetIndex] = {
        ...updated[targetIndex],
        delayDays: days,
      };
      onSequencesChange(updated as Sequence[]);
      return updated;
    });
    setShowDelayModal(false);
  };

  const onChangeDelayDays = (index: number) => {
    const prevIndex = index - 1;
    delayTargetIndexRef.current = prevIndex;
    setTempDelay(sequences[prevIndex].delayDays || 1);
    setShowDelayModal(true);
  };

  const insertSubjectVariable = (variable: string) => {
    const newSubject = `${selectedSequence.subject || ""}{{${variable}}}`;
    updateSubject(newSubject);
    setShowSubjectVariables(false);
  };

  return (
    <SequencesContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <SidebarIcon>
            <Mail size={18} />
          </SidebarIcon>
          <span>Email follow up</span>
        </SidebarHeader>

        <EmailCardList>
          {sequences.map((seq, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <DelayConnectorLine>
                  <DelayBadgeInline
                    onClick={() => onChangeDelayDays(index)}
                  >
                    <Clock size={12} />
                    Wait {sequences[index - 1].delayDays || 1} day
                    {(sequences[index - 1].delayDays || 1) !== 1 ? "s" : ""}
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
        {selectedSequence ? (
          <>
            <StageHeader>
              <StageTitle>Stage {selectedSequence.seqNumber}: Email</StageTitle>
              <PreviewButton>
                <Play size={14} />
                Preview
              </PreviewButton>
            </StageHeader>

            <SubjectRow>
              <SubjectLabel>Subject:</SubjectLabel>
              <SubjectInputWrapper>
                <SubjectInput
                  placeholder="Hi {{firstName}}"
                  value={selectedSequence.subject || ""}
                  onChange={(e) => updateSubject(e.target.value)}
                />
              </SubjectInputWrapper>
              <VariablesWrapper>
                <VariablesButton
                  onClick={() => setShowSubjectVariables(!showSubjectVariables)}
                >
                  <Braces size={14} /> Variables
                </VariablesButton>

                {showSubjectVariables && (
                  <VariablesDropdown>
                    {VARIABLE_OPTIONS.map((v) => (
                      <VariableOption
                        key={v.key}
                        type="button"
                        onClick={() => insertSubjectVariable(v.key)}
                      >
                        <span>{v.label}</span>
                      </VariableOption>
                    ))}
                  </VariablesDropdown>
                )}
              </VariablesWrapper>
            </SubjectRow>

            <EditorWrapper>
              <QuillEditor
                key={selectedSequence.seqNumber}   // 🔥 CRITICAL
                ref={quillRef}
                value={selectedSequence.bodyHtml || ""}
                onChange={updateBody}
                modules={QUILL_MODULES}
                formats={QUILL_FORMATS}
                placeholder="Write your email content here..."
                minHeight="300px"
                showVariables
              />
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
