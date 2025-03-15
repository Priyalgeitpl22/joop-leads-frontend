import styled from "@emotion/styled";

export const Container = styled.div(`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`);

export const HeaderContainer = styled.div`
  align-items: center;
  background: var(--theme-color);
  box-shadow: 0 2px 4px #8d8fa91a;
  display: flex;
  padding: 16px;
  gap: 20px;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  height: fit-content;
  padding: 20px;
  position: static;
  background: var(--shadow-color);
  box-shadow: var(--shadow-dark);
`;

export const MainContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background: white;
`;

export const SetupButton = styled.button`
  font-weight: semibold;
  width: 260px;
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: var(--text-primary);
  background-color: var(--theme-color-light);
  cursor: pointer;
  font-size: 16px;  
  white-space: nowrap;
  box-shadow: var(--shadow-dark);

  &:hover {
    background: var(--hover-color);
    color: var(--text-white);
  }

  &:hover .input {
    color: var(--background-light);
  }

  &:active {
    background: var(--active-color);
    color: var(--background-light);
  }

  &:active .input {
    color: var(--background-light);
  }
`;