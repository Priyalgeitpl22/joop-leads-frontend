import { Box, Button, Card, CardContent, Input, styled, Typography } from "@mui/material";

export const ManualTemplateContainer = styled(Box)(`
    background: #fff;
    border: 1px solid #e1e2ef;
    border-radius: 4px;
    box-shadow: 0 2px 10px #1414140d;
    padding: 20px;
`);

export const DescriptionContainer = styled(Box)(`
    margin-bottom: 20px;
    width: 100%;
`);

export const TitleContainer = styled(Box)(`
    margin-bottom: 40px;
    width: 100%;
`);

export const TitleBody = styled(Input)`
    border: 1px solid #c6c7db !important;
    border-radius: 3px;
    min-height: 50px;
    width: 100%;
    border-bottom: 0 !important;

    &:hover {
        border: 1px solid #c6c7db !important;
        background-color: inherit !important;
    }

    &.Mui-focused {
        border: 1px solid #c6c7db !important;
        box-shadow: none !important;
        outline: none !important;
        background-color: inherit !important;
    }

    .MuiOutlinedInput-notchedOutline {
        border: none !important;
    }
`;

export const EmailTemplateWrapper = styled(Card)(`
    background: #fff;
    border: 1px solid #e1e2ef;
    border-radius: 4px;
    box-shadow: 0 2px 10px #1414140d;
    width: 100%;
`)

export const EmailTemplateFooter = styled(Card)(`
    border-top: 1px solid #e1e2ef;
    padding: 12px 20px;
    width: 97%;
    box-shadow: none !important;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; /* Ensures content moves to the next line if needed */
    min-height: 50px; /* Adjust as needed */
    overflow: hidden;
`);


export const FooterContent = styled(Typography)(`
    color: #282b4266;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    font-family: "DM Sans", sans-serif !important;
    white-space: normal; /* Allows text wrapping */
    word-wrap: break-word; /* Ensures long words break */
    overflow-wrap: break-word; /* Alternative for breaking */
    max-width: 100%; /* Prevents text from exceeding container width */
`);


export const EmailTemplateHeader = styled(Card)(`
    border-bottom: 1px solid #e1e2ef !important;
    display: flex;
    width: 100%;
    border: 0;
    box-shadow: none !important;
`)

export const SubjectBox = styled(CardContent)`
    background: #f1f3fd;
    color: #686b8a;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    padding: 20px;
    align-items: center;
    display: flex;
    font-size: 16px;
    line-height: 1.715em;
`;

export const SubjectText = styled("input")`
    cursor: pointer;
    height: 58px;
    outline: none;
    overflow-y: hidden;
    width: 100%;
    position: relative;
    border: none;
    padding: 10px 24px;
    background: transparent;
`;

export const VariablesButton = styled(Button)`
    width: max-content;
    min-width: 130px;
    color: #6e58f1 !important;
`;

