import { Box, Dialog, styled } from "@mui/material";

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