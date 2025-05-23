import { Box, styled } from "@mui/material";

export const EmailPreviewContainer = styled(Box)(`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 950px;
    background: white;
    border: 1px solid var(--error-color);
    border: 1px solid #e1e2ef;
    border-radius: 4px;
    box-shadow: 0 2px 10px #1414140d;
    width: 100%;
    padding: 24px;
`);

export const FinalReviewContainer = styled(Box)(`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 16px;
`);

export const TabsHeader = styled(Box)(`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 60px;
    background: var(--background-light);
`);

