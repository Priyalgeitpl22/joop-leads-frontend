import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const UsersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  background: white;
  position: relative;
  flex-direction: column;
  background: "white";
  border-radius: 10px;
  border:var(--border-color) 1px solid !important;
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

export const UserTable = styled.div`
// padding-top:1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;