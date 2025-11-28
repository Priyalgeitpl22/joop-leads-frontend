import styled from "styled-components";

export const OverviewContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  border: 1px solid var(--border-grey);
  border-radius: 10px;
  color: var(--text-secondary);
  height: 100%;
`;

export const OverviewSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px var(--shadow-color);
`;

export const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
`

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`

export const MetricCard = styled.div`
  background: var(--background-head);
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
`

export const PerformanceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

export const OutboundHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const StatusCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: #f0f9ff;
  border-left: 4px solid var(--success-color);
  padding: 16px;
  border-radius: 4px;
`;

export const NoteBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid var(--accent-color);
  border-radius: 4px;
  display: flex;
  gap: 16px;
  margin: 20px 2px;
`;

export const NoteBorder = styled.div`
  width: 4px;
  background: var(--accent-color);
  border-radius: 4px 0 0 4px;
`;

export const NoteContent =styled.div`
  padding: 12px 16px;
`

export const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 38% 60%;
  gap: 24px;
`;

export const ChartBox = styled.div`
  background: var(--text-white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px var(--shadow-color);
`;

export const PieStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PieStat = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`