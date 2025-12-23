import styled from "styled-components";
import { Box } from "@mui/material";

export const CampaignDetailsContainer = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  padding: 0;
`;

export const CampaignHeader = styled(Box)`
  background: white;
  // padding: 16px 24px;
  border-bottom: 1px solid var(--border-grey, #e0e0e0);
`;

export const CampaignTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
  }
`;

export const StatusBadge = styled.span<{ status?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case "ACTIVE":
        return "#e6f7e6";
      case "PAUSED":
        return "#fff3e0";
      case "COMPLETED":
        return "#e3f2fd";
      case "DRAFT":
        return "#f5f5f5";
      default:
        return "#e6f7e6";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "ACTIVE":
        return "#2e7d32";
      case "PAUSED":
        return "#f57c00";
      case "COMPLETED":
        return "#1976d2";
      case "DRAFT":
        return "#757575";
      default:
        return "#2e7d32";
    }
  }};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const CampaignMeta = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
`;

export const CampaignTags = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Tag = styled.span<{ variant?: "success" | "info" | "warning" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${(props) => {
    switch (props.variant) {
      case "success":
        return "#2e7d32";
      case "warning":
        return "#f57c00";
      default:
        return "#666";
    }
  }};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => {
      switch (props.variant) {
        case "success":
          return "#4caf50";
        case "warning":
          return "#ff9800";
        default:
          return "#9e9e9e";
      }
    }};
  }
`;

export const TabsContainer = styled(Box)`
  background: white;
  border-bottom: 1px solid var(--border-grey, #e0e0e0);
  // padding: 0 24px;
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  // padding: 20px 24px;
  overflow-y: auto;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #6366f1;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;
