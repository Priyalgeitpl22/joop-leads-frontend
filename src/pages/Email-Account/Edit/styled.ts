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
  padding: 8px;
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
  // border: 1px solid var(--border-grey);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 24px;
  margin-top: 20px;
  
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

export const PerformanceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  // margin-bottom: 12px;
`

export const OutboundHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const StatusCard = styled.div`
  display: flex;
  gap: 5px;
  background: #f0f9ff;
  border-left: 4px solid var(--success-color);
  padding: 10px;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
`;

export const NoteBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid var(--accent-color);
  border-radius: 4px;
  display: flex;
  gap: 16px;
  font-size: 12px;
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
  grid-template-columns: 35% 65%;
  gap: 10px;
  box-sizing: border-box;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartBox = styled.div`
  background: var(--text-white);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 1px 3px var(--shadow-color);
  box-sizing: border-box;
`;

export const PieStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PieStat = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: white;
  padding: 0;
`

export const PieStatBar = styled.div<{ color: string }>`
  width: 4px;
  min-height: 100%;
  background: ${props => props.color};
  border-radius: 2px;
`

export const PieStatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

export const PieStatNumbers = styled.div<{ color: string }>`
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: ${props => props.color};
  
  .percentage {
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
  }
  
  .count {
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
  }
`

export const PieStatLabel = styled.p`
  font-size: 10px;
  color: #666;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
`

export const SectionSubTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 10px 0;
  
  svg {
    font-size: 12px !important;
    font-weight: 400;
    color: var(--text-secondary);
  }
`