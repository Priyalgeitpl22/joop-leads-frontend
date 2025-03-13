import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./CsvPreview.style"; 

interface CSVPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  csvData: string[][];
}

const CSVPreviewDialog: React.FC<CSVPreviewDialogProps> = ({
  open,
  onClose,
  csvData,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" sx={styles.dialog}>
      <DialogTitle sx={styles.dialogTitle}>
        CSV Preview
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={styles.dialogContent}>
        <TableContainer sx={styles.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {csvData[0]?.map((header, index) => (
                  <TableCell key={index} sx={styles.headerCell}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {csvData.slice(1).map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} sx={styles.cell}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default CSVPreviewDialog;
