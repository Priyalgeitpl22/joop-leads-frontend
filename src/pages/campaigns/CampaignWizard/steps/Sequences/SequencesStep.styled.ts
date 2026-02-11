import styled from 'styled-components';

export const SequencesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  height: calc(100vh - 200px);
  min-height: 600px;
`;

// ============== SIDEBAR ==============

export const Sidebar = styled.div`
  width: 320px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SidebarIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.contrast};
`;

export const EmailCardList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  overflow-y: auto;
`;

export const EmailCard = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const EmailCardBorder = styled.div<{ $isActive?: boolean }>`
  width: 4px;
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : theme.colors.border.light};
  flex-shrink: 0;
`;

export const EmailCardContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const EmailCardTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const EmailCardSubject = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${EmailCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.error.light};
    color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const DelayConnectorLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border.light};
  }
`;

export const DelayBadgeInline = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  z-index: 1;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const AddStepButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;

// ============== MAIN CONTENT ==============

export const MainContent = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// ============== INBOX PREVIEW ==============

export const InboxPreview = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const InboxPreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const InboxPreviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const InboxPreviewCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.border.main};
  border-radius: 3px;
  flex-shrink: 0;
`;

export const InboxPreviewStar = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  flex-shrink: 0;
`;

export const InboxPreviewSender = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  flex-shrink: 0;
`;

export const InboxPreviewSubject = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InboxPreviewBody = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InboxPreviewEdit = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ============== STAGE HEADER ==============

export const StageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const StageTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ============== SUBJECT ROW ==============

export const SubjectRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// ============== VARIABLE TAGS ==============

export const VariableTagsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`;

export const VariableTag = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SubjectLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`;

export const SubjectInputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const SubjectInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
  }
`;

export const VariablesButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`;

export const VariablesDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`;

export const VariableOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

// ============== EDITOR ==============

export const EditorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 350px;
  position: relative;

  .quill {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ql-toolbar {
    border: none !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light} !important;
    background: ${({ theme }) => theme.colors.background.primary};
    padding: 12px !important;
  }

  .ql-toolbar .ql-stroke {
    stroke: ${({ theme }) => theme.colors.text.secondary};
  }

  .ql-toolbar .ql-fill {
    fill: ${({ theme }) => theme.colors.text.secondary};
  }

  .ql-toolbar .ql-picker {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .ql-toolbar button:hover .ql-stroke,
  .ql-toolbar button.ql-active .ql-stroke {
    stroke: ${({ theme }) => theme.colors.primary.main};
  }

  .ql-toolbar button:hover .ql-fill,
  .ql-toolbar button.ql-active .ql-fill {
    fill: ${({ theme }) => theme.colors.primary.main};
  }

  .ql-container {
    border: none !important;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    flex: 1;
  }

  .ql-editor {
    min-height: 200px;
    padding: 16px;
    
    &.ql-blank::before {
      color: ${({ theme }) => theme.colors.text.tertiary};
      font-style: normal;
    }
  }

  .ql-snow .ql-picker-label {
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    border-radius: 4px;
  }

  .ql-snow .ql-picker-options {
    background: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const ComposeAIButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: fit-content;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const SignatureHint = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing.md};

  strong {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// ============== EMPTY STATE ==============

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;

  svg {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin: 0;
  }
`;

// ============== MODAL ==============

export const DelayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const DelayModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 90%;
  max-width: 400px;

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }
`;

export const DelayInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  input {
    width: 80px;
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    text-align: center;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};

    &.cancel {
      background: none;
      border: 1px solid ${({ theme }) => theme.colors.border.main};
      color: ${({ theme }) => theme.colors.text.primary};

      &:hover {
        background: ${({ theme }) => theme.colors.background.secondary};
      }
    }

    &.save {
      background: ${({ theme }) => theme.colors.primary.main};
      border: none;
      color: white;

      &:hover {
        background: ${({ theme }) => theme.colors.primary.dark};
      }
    }
  }
`;

// Keep old exports for backward compatibility (unused now)
export const SequencesSidebar = Sidebar;
export const SidebarHeader_old = SidebarHeader;
export const SequencesList = EmailCardList;
export const SequenceItem = EmailCard;
export const SequenceIcon = SidebarIcon;
export const SequenceInfo = EmailCardContent;
export const DelayConnector = DelayConnectorLine;
export const InlineDelayInput = DelayBadgeInline;
export const AddSequenceButton = AddStepButton;
export const EditorContainer = MainContent;
export const EditorHeader = StageHeader;
export const EditorTitle = StageTitle;
export const DelayBadge = DelayBadgeInline;
export const EditorActions = styled.div``;
export const ActionButton = DeleteButton;
export const EditorContent = styled.div``;
export const EmailBodyEditor = EditorWrapper;
export const VariableButtons = styled.div``;
export const VariableButton = VariableOption;
