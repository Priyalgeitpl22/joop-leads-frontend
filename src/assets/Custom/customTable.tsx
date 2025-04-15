import { TableRow, TableCell, TableBody, Checkbox, Table } from "@mui/material";
import React from "react";
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableHeadCell,
} from "./styled";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

interface TableProps {
  columns: Column[];
  rows: any[];
  onRowSelect: (row: any) => void;
}

const CustomTable: React.FC<TableProps> = ({ columns, rows, onRowSelect }) => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);

  const handleRowClick = (row: any) => {
    setSelectedRow(row.id);
    onRowSelect(row);
  };

  return (
    <StyledTableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <StyledTableHeadCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableHeadCell>
            ))}
          </TableRow>
        </StyledTableHead>

        {/* Table Body */}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              selected={selectedRow === row.id}
              onClick={() => handleRowClick(row)}
            >
              <TableCell>
                <Checkbox checked={selectedRow === row.id} />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CustomTable;
