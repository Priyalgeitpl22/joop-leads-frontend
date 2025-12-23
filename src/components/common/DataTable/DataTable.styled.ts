import styled from 'styled-components';

export const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TableTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;

  span {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export const TableActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: 36px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 250px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 12px;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const IconButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary.main : theme.colors.background.primary};
  border: 1px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ $active, theme }) => 
      $active ? theme.colors.primary.dark : theme.colors.background.secondary};
    color: ${({ $active, theme }) => 
      $active ? 'white' : theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const DangerButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.error.main};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: white;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.error.dark};
  }
`;

export const BulkActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main}10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const SelectedCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const TableHeadRow = styled.tr``;

export const TableHeadCell = styled.th<{ $sortable?: boolean; $width?: string; $align?: string }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: ${({ $align }) => $align || 'left'};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  width: ${({ $width }) => $width || 'auto'};
  cursor: ${({ $sortable }) => $sortable ? 'pointer' : 'default'};
  user-select: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ $sortable, theme }) => 
      $sortable ? theme.colors.text.primary : theme.colors.text.secondary};
  }

  svg {
    margin-left: ${({ theme }) => theme.spacing.xs};
    vertical-align: middle;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ $selected?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ $selected, theme }) => 
    $selected ? `${theme.colors.primary.main}08` : 'transparent'};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{ $align?: string }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: ${({ $align }) => $align || 'left'};
  vertical-align: middle;
`;

export const Checkbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background.primary};
  cursor: pointer;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:checked {
    background: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};

    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 11px;
      font-weight: bold;
    }
  }

  &:indeterminate {
    background: ${({ theme }) => theme.colors.primary.main};
    border-color: ${({ theme }) => theme.colors.primary.main};

    &::after {
      content: '−';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const RowActionButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ $danger, theme }) => 
    $danger ? theme.colors.error.main : theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ $danger, theme }) => 
      $danger ? `${theme.colors.error.main}10` : theme.colors.background.secondary};
    color: ${({ $danger, theme }) => 
      $danger ? theme.colors.error.main : theme.colors.text.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.neutral[300]};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PaginationInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary.main : 'transparent'};
  border: 1px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary.main : theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) => 
      $active ? theme.colors.primary.dark : theme.colors.background.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  select {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  z-index: 100;
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  input {
    accent-color: ${({ theme }) => theme.colors.primary.main};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const FilterWrapper = styled.div`
  position: relative;
`;

export const Badge = styled.span<{ $variant?: 'success' | 'warning' | 'error' | 'info' | 'default' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: ${theme.colors.success.light};
          color: ${theme.colors.success.main};
        `;
      case 'warning':
        return `
          background: #fef9c3;
          color: #ca8a04;
        `;
      case 'error':
        return `
          background: ${theme.colors.error.light};
          color: ${theme.colors.error.main};
        `;
      case 'info':
        return `
          background: ${theme.colors.primary.light};
          color: ${theme.colors.primary.main};
        `;
      default:
        return `
          background: ${theme.colors.neutral[100]};
          color: ${theme.colors.text.secondary};
        `;
    }
  }}
`;

