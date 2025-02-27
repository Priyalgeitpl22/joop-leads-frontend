import { Box, Input, styled } from "@mui/material";

export const ManualTemplateContainer = styled(Box)(`
    background: #fff;
    border: 1px solid #e1e2ef;
    border-radius: 4px;
    box-shadow: 0 2px 10px #1414140d;
    padding: 40px;
`);

export const DescriptionContainer = styled(Box)(`
    margin-bottom: 40px;
    width: 100%;
`);


export const TitleContainer = styled(Box)(`
    margin-bottom: 40px;
    width: 100%;
`);

export const TitleBody = styled(Input)(`
    border: 1px solid #c6c7db;
    border-radius: 3px;
    min-height: 50px;
    width: 100%;
`);
