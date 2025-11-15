import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const UsersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: "white";
  border-radius: 8px;
}
`;
export const UserHeader = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: white;
`;
export const FilterIcon = styled(IconButton)`
  height: 40px;
  background: var(--background-color);
  border-radius: 5px;
  border: 1px solid var(--border-color);
  padding: 5px;
`;

export const UserTable = styled.div`
padding-top:1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
`;