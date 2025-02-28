import { Box, Dialog, IconButton, styled } from "@mui/material";

export const DialogBox = styled(Dialog)(`
    border-radius: 12px;
`)

export const TemplateHeader = styled(Box)(`
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    justify-content: space-between;
`);

export const DialogHeader = styled(Box)(`
    position: sticky;
    top: 0;
    z-index: 2;
    1px solid #e5e6ef;
    padding: 12px;
    background: #f1f2fb;
    border-bottom: 1px solid #e5e6ef;
`)

export const DialogFooter = styled(Box)(`
    position: sticky;
    top: 0;
    z-index: 2;
    1px solid #e5e6ef;
    padding: 12px;
    background: #f1f2fb;
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
      color: #6e58f1;
      transition: color 0.3s ease;
    }

    &:hover .MuiSvgIcon-root {
      color: #4a3ec4;
    }
`);


  
