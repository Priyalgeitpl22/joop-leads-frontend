import styled, { keyframes } from 'styled-components';

export const PageContainer = styled.div`
  padding: 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
  }
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

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
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

  @media (max-width: 600px) {
    width: 100%;
  }
`;

// Empty State Styles
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const EmptyStateIllustration = styled.div`
  position: relative;
  width: 360px;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const IllustrationCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

export const SubjectLine = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  span {
    color: ${({ theme }) => theme.colors.text.tertiary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const SubjectInput = styled.div`
  flex: 1;
  height: 8px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const EmailPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EmailToolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ToolbarButton = styled.div<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) => 
    $active ? theme.colors.success.main + '30' : theme.colors.background.tertiary};
  height: 8px;
  width: ${({ $active }) => $active ? '60px' : '50px'};
`;

export const EmailLine = styled.div<{ $width?: string }>`
  height: 10px;
  background: ${({ theme }) => theme.colors.primary.main}15;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  width: ${({ $width }) => $width || '100%'};
`;

export const ChartContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 50px;
`;

const drawLine = keyframes`
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

export const ChartSvg = styled.svg`
  width: 100%;
  height: 100%;

  path {
    stroke: ${({ theme }) => theme.colors.success.main};
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 100;
    animation: ${drawLine} 2s ease-out forwards;
  }

  circle {
    fill: ${({ theme }) => theme.colors.success.main};
  }
`;

export const EnvelopeIcon = styled.div`
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const EmptyStateTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  max-width: 450px;
  line-height: 1.5;
`;

export const EmptyStateActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary.main}40;
  }
`;

export const LearnMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
    text-decoration: underline;
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// Loading Skeleton
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
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

export const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

// ================================
// CAMPAIGN LIST STYLES
// ================================

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

export const TabsActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
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

export const ListControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ColumnDropdown = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const FilterButton = styled.button`
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
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// Campaign Table
export const CampaignTable = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  // overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const TableHeaderCell = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CampaignRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const CampaignInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CampaignIconBadge = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const CampaignDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

import { Link } from 'react-router-dom';

export const CampaignName = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

export const CampaignMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  span {
    white-space: nowrap;
  }
`;

export const MetaSeparator = styled.span`
  color: ${({ theme }) => theme.colors.border.main};
`;

// Campaign Stats
export const CampaignStats = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 70px;
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
`;

export const MasterInboxLink = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const ActionIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CampaignWrapper = styled.div`
  padding: ${({theme}) => theme.spacing.xxl}; 
  text-align: center; 
  width: 100%;
`;