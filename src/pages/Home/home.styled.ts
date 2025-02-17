import { Box, styled } from "@mui/material";

export const ContentContainer = styled(Box)`
  width: 100%;
  height: 98%;
  display: flex;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  position: relative;
  flex-direction: column;
  background: var(--white-fade-gradient);
`;

export const HeaderOptions = styled(Box)`
  height: 40px;
  display: flex;
  background-color: #f1f5f9;
  padding: 5px;
  border-radius: 8px;
`