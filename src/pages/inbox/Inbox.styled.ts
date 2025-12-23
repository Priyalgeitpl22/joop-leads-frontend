import styled, { css, keyframes } from 'styled-components';

// ============================================================================
// Animations
// ============================================================================

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

// ============================================================================
// Page Layout
// ============================================================================

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const InboxWrapper = styled.div`
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow: hidden;
`;

export const InboxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }
`;

export const AccountSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.secondary};
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const AccountButton = styled.button`
  display: flex;
  align-items: center;
  padding: 4px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AccountAvatar = styled.div<{ $size?: 'sm' | 'md' | 'lg' }>`
  width: ${({ $size }) => ($size === 'lg' ? '40px' : $size === 'sm' ? '24px' : '32px')};
  height: ${({ $size }) => ($size === 'lg' ? '40px' : $size === 'sm' ? '24px' : '32px')};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${({ $size }) => ($size === 'lg' ? '14px' : $size === 'sm' ? '10px' : '12px')};
  text-transform: uppercase;
  flex-shrink: 0;
`;

// ============================================================================
// Inbox Content
// ============================================================================

export const InboxContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ThreadList = styled.div<{ $hasSelectedThread?: boolean }>`
  flex: ${({ $hasSelectedThread }) => ($hasSelectedThread ? '0 0 380px' : '1')};
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.secondary};

  @media (max-width: 768px) {
    display: ${({ $hasSelectedThread }) => ($hasSelectedThread ? 'none' : 'flex')};
    flex: 1;
    border-right: none;
  }
`;

export const ThreadListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.15s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.primary};
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    width: 16px;
    height: 16px;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ $active }) => $active ? 'rgba(99, 102, 241, 0.15)' : 'transparent'};
  border: 1px solid ${({ $active, theme }) => $active ? '#6366f1' : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ $active, theme }) => $active ? '#6366f1' : theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(99, 102, 241, 0.15);
    border-color: #6366f1;
    color: #6366f1;
  }
`;

export const FilterChips = styled.div`
  display: flex;
  gap: 6px;
  padding: 6px ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

export const FilterChip = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #6366f1;
  white-space: nowrap;

  button {
    display: flex;
    padding: 2px;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    &:hover { opacity: 1; }
  }
`;

export const ThreadItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 6px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

export const ThreadItem = styled.div<{ $selected?: boolean; $unread?: boolean }>`
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;

  ${({ $selected, $unread, theme }) => {
    if ($selected) {
      return css`
        background: rgba(99, 102, 241, 0.12);
        border: 1px solid rgba(99, 102, 241, 0.3);
      `;
    }
    if ($unread) {
      return css`
        background: ${theme.colors.background.tertiary};
        border: 1px solid ${theme.colors.border.light};
        border-left: 3px solid ${theme.colors.primary.main};
      `;
    }
    return css`
      background: transparent;
      border: 1px solid transparent;
      &:hover {
        background: ${theme.colors.background.tertiary};
        border-color: ${theme.colors.border.light};
      }
    `;
  }}
`;

export const ThreadSubject = styled.h4<{ $unread?: boolean }>`
  font-size: 13px;
  font-weight: ${({ $unread }) => ($unread ? '600' : '500')};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ThreadMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const ThreadSender = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  .info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    .name {
      font-size: 12px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text.primary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .email {
      font-size: 11px;
      color: ${({ theme }) => theme.colors.text.tertiary};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const ThreadDate = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
`;

export const ThreadRecipient = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-left: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// ============================================================================
// Thread Detail View
// ============================================================================

export const ThreadDetail = styled.div<{ $visible?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: 768px) {
    display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  }
`;

export const ThreadDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  h3 {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ThreadMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

export const MessageCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.secondary};
  overflow: hidden;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background.tertiary}50;
`;

export const MessageAvatar = styled.div`
  flex-shrink: 0;
`;

export const MessageInfo = styled.div`
  flex: 1;
  min-width: 0;

  .sender {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .date {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const MessageBody = styled.div`
  padding: 12px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};

  img { max-width: 100%; height: auto; }
  a { color: ${({ theme }) => theme.colors.primary}; }
`;

export const MessageRecipient = styled.div`
  padding: 0 12px 8px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// ============================================================================
// Reply Composer
// ============================================================================

export const ReplyComposer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

export const ReplyTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const ReplyActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  svg { width: 16px; height: 16px; }

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.colors.primary.main};
          color: ${theme.colors.text.primary};
          border: none;
          box-shadow: 0 2px 8px ${theme.colors.primary.dark};
          &:hover:not(:disabled) { 
            background: ${theme.colors.primary.dark};
            box-shadow: 0 4px 12px ${theme.colors.primary.dark};
          }
        `
      : css`
          background: ${theme.colors.background.tertiary};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border.main};
          &:hover:not(:disabled) {
            background: ${theme.colors.background.primary};
            border-color: ${theme.colors.text.tertiary};
          }
        `}

  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================================================
// Empty & Loading States
// ============================================================================

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  height: 100%;
  animation: ${fadeIn} 0.3s ease;

  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    opacity: 0.4;
    margin-bottom: 12px;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 4px;
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

// ============================================================================
// Skeleton Loading
// ============================================================================

export const SkeletonContainer = styled.div`
  padding: 6px;
`;

export const SkeletonItem = styled.div`
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SkeletonAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.border.light};
  animation: ${pulse} 1.5s ease infinite;
`;

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '12px'};
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.border.light} 0%,
    ${({ theme }) => theme.colors.background.tertiary} 50%,
    ${({ theme }) => theme.colors.border.light} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// ============================================================================
// Pagination
// ============================================================================

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.secondary};

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary.main : theme.colors.border.light};
  border-radius: 6px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary.main : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  svg { width: 14px; height: 14px; }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ $active, theme }) => $active ? theme.colors.text.primary : theme.colors.primary.main};
  }

  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

// ============================================================================
// Account Popup
// ============================================================================

export const AccountPopup = styled.div<{ $open?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 280px;
  max-height: 320px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

export const AccountPopupHeader = styled.div`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const AccountPopupSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 6px;

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.primary};
    outline: none;
    &::placeholder { color: ${({ theme }) => theme.colors.text.tertiary}; }
  }

  svg { color: ${({ theme }) => theme.colors.text.tertiary}; width: 14px; height: 14px; }
`;

export const AccountList = styled.div`
  max-height: 240px;
  overflow-y: auto;
  padding: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

export const AccountItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  
  ${({ $selected, theme }) => $selected ? css`
    background: ${theme.colors.primary.main}12;
    border: 1px solid ${theme.colors.primary.main}20;
  ` : css`
    border: 1px solid transparent;
    &:hover { background: ${theme.colors.background.tertiary}; }
  `}
`;

export const AccountItemDetails = styled.div`
  flex: 1;
  min-width: 0;

  .name {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .email {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text.secondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const AccountDivider = styled.div`
  padding: 6px 10px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

// ============================================================================
// Filter Menu
// ============================================================================

export const FilterMenu = styled.div<{ $open?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 200px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

export const FilterMenuItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: ${({ theme }) => theme.colors.background.tertiary}; }

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary.main};
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FilterMenuActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;
