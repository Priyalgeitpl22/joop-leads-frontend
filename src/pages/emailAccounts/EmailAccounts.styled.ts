import styled, { keyframes } from 'styled-components';

export const PageContainer = styled.div`
  padding: 0;
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const TabsList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Tab = styled.button<{ $isActive?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary.main : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-bottom: -1px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const TabsActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 280px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-left: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
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

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const PurchaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }
`;

export const EmailAccountsTable = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 1fr 120px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TableHeaderCell = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 1fr 1fr 1fr 1fr 120px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const TableCell = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CheckboxCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary.main};
`;

export const NameCell = styled(TableCell)`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EmailCell = styled(TableCell)`
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const VendorCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DailyLimitCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WarmupEnabledCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ReputationBadge = styled.span<{ $reputation: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  background: ${({ $reputation }) => 
    $reputation >= 95 ? '#e8f5e9' : $reputation >= 80 ? '#fff3e0' : '#ffebee'};
  color: ${({ $reputation }) => 
    $reputation >= 95 ? '#2e7d32' : $reputation >= 80 ? '#e65100' : '#c62828'};
`;

export const MailboxIssueCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const IssueIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary.main}20;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

// Skeleton Loader Styles
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const Skeleton = styled.div<{ $width?: string; $height?: string }>`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.tertiary} 0px,
    ${({ theme }) => theme.colors.background.secondary} 40px,
    ${({ theme }) => theme.colors.background.tertiary} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
`;

export const SkeletonRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.background.primary};
  }
`;

export const SkeletonCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonCheckbox = styled(Skeleton)`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const SkeletonBadge = styled(Skeleton)`
  width: 60px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const SkeletonIcon = styled(Skeleton)`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

