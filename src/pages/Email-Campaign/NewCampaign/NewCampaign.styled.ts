import styled from "@emotion/styled";

export const Container = styled.div(`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`);

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  height: fit-content;
  padding: 20px 24px;
  position: static;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  box-shadow: none;
`;

export const MainContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background: white;
`;

export const SetupButton = styled.button`
  font-weight: 600;
  width: 260px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  color: white;
  background: var(--primary-light-gradient);
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.2);
  transition: all 0.2s;

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;