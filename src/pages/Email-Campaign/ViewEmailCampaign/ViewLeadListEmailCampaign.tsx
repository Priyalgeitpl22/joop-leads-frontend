import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import styled from "styled-components";

const CustomTableContainer = styled(TableContainer)`
  box-shadow: none;
  border-radius: 8px;
`;

const CustomTableBody = styled(TableBody)`
  background-color: white;
`;

const CustomTableCell = styled(TableCell)`
  padding: 16px;
  font-size: 14px;
  color: #5f6368;
  border-bottom: none;
`;

const HeaderCell = styled(TableCell)`
  font-weight: bold;
  color: #35495c;
`;

const LeadInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 14px;
`;

const SequenceStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 4px;
  color: #6b7280;
  gap: 6px;
`;

const tableData = [
  {
    name: "Sheryl Baxter",
    email: "zunigavanessa@smith.info",
    linkedin: "--",
    company: "Rasmussen Group",
    status: "Scheduled",
  },
  {
    name: "Preston Lozano",
    email: "vmata@colon.com",
    linkedin: "--",
    company: "Vega-Gentry",
    status: "Scheduled",
  },
];

const CustomTable = () => {
  return (
    <CustomTableContainer>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <HeaderCell>Lead Details</HeaderCell>
            <HeaderCell>Other Details</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </TableRow>
        </TableHead>

        <CustomTableBody>
          {tableData.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <CustomTableCell>
                  <LeadInfo>
                    <Checkbox />
                    <div>
                      <strong>{row.name}</strong>
                      <IconText>
                        {row.email}
                      </IconText>
                    </div>
                  </LeadInfo>

                  <SequenceStatus>
                    Sequence Status: <strong>1. Email</strong>
                  </SequenceStatus>
                </CustomTableCell>

                <CustomTableCell>
                  <IconText>
                    linkedin
                  </IconText>
                  <IconText> Others</IconText>
                </CustomTableCell>

                <CustomTableCell>
                  <strong>{row.status}</strong>
                </CustomTableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </CustomTableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default CustomTable;
