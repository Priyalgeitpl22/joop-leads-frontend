import styled from "@emotion/styled";

export const UsersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: var(--white-fade-gradient);
  border-radius: 8px;
}
`;
export const UserHeader = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: var(--background-secondary);
`;

export const UserTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
`;