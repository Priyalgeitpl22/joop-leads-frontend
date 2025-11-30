import { Box, Dialog, IconButton, styled } from "@mui/material";
import { motion } from "framer-motion";

export const DialogBox = styled(Dialog)(`
    border-radius: 12px;
`)

export const TemplateHeader = styled(Box)(`
    align-items: center;
    display: flex;
    margin: 12px 0px;
    width: 100%;
    justify-content: space-between;
`);

export const DialogHeader = styled(Box)(`
    position: sticky;
    top: 0;
    z-index: 2;
    1px solid #e5e6ef;
    padding: 12px;
    background: var(--primary-lighter);
    border-bottom: 1px solid #e5e6ef;
`)

export const DialogFooter = styled(Box)(`
    position: sticky;
    top: 0;
    z-index: 2;
    1px solid #e5e6ef;
    padding: 12px;
    background: var(--primary-lighter);
    border-bottom: 1px solid #e5e6ef;
    align-items: flex-end;
    display: flex;
    justify-content: flex-end;
`)

export const DialogContent = styled(Box)(`
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e6ef;
`)

export const Content = styled(Box)(`
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e6ef;
`)

export const AddStepContainer = styled(Box)(`
    background: #f7f8fe;
    border-radius: 4px;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 10px;

    > * { 
        flex: 1; /* Makes all child elements take equal space */
        text-align: center; /* Optional: Centers text inside each child */
    }
`)

export const StyledIconButton = styled(IconButton)(`
    background-color: transparent;
    transition: background-color 0.3s ease;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;

    &:hover {
      background-color: rgba(110, 88, 241, 0.1);
      padding: 8px; /* Adds padding on hover */
    }

    .MuiSvgIcon-root {
      color: var(--theme-color);
      transition: color 0.3s ease;
    }

    &:hover .MuiSvgIcon-root {
      color: #4a3ec4;
    }
`);

export const SequenceSidebarContainer = styled(motion.aside)`
  background-color: var(--background-light);
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  height: 100%;
  gap: 10px;
  width: 350px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;
  
