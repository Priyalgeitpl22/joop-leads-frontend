import { TableBody, TableCell, TableContainer } from "@mui/material";
import styled from "styled-components";

export const CustomTableContainer = styled(TableContainer)`
  border-radius: 10px;
  overflow: auto;
  overflow-y: auto;
  max-height: 500px;
  scrollbar-width: none;
  -ms-overflow-style: none
  &::-webkit-scrollbar {
    width: 8px;
  }
    margin-inline:10px
`;

export const CustomTableBody = styled(TableBody)`
  background-color: var(--icon-light);
`;

export const CustomTableCell = styled(TableCell)`
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--border-grey);
  transition: background 0.3s ease;

  &:hover {
    background: var(--background-hover);
  }
`;

export const HeaderCell = styled(TableCell)`
  font-weight: bold;
  color: black;
  background: var(--background-slate);
  padding: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const LeadInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--secondary-color);
  font-size: 14px;
`;

export const SequenceStatus = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 16px;
  display: inline-block;
`;

export const StatusBadge = styled.div<{ active?: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.active ? "#28a745" : "#777")};
  background: ${(props) => (props.active ? "#e9f7ec" : "#f0f0f0")};
  padding: 6px 12px;
  border-radius: 16px;
  text-align: center;
  display: inline-block;
  min-width: 80px;
`;

export const ActiveStatus = styled.span`
  color: var(--success-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const InactiveStatus = styled.span`
  color: var(--error-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`


export const CampaignCard = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #e0e0e0;
`;

export const CampaignSection = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Percentage = styled.span`
  color: black;
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  height: 6px;
  background-color: #d4edda;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 15px;

  li {
    margin: 5px 0;
    color: #444;
  }
`;

export const AnalyticsLink = styled.a`
  color: #6a5acd;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 0 20px;
`;

export const TextGray = styled.span`
  color: #888;
`;
