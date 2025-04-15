import { SxProps } from "@mui/material";

export const styles: { [key: string]: SxProps } = {
  dialog: {
    "& .MuiDialog-paper": {
      height: "380px",
      width: "1000px",
      display: "flex",
      flexDirection: "column",
    },
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogContent: {
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
  },
  tableContainer: {
    minWidth: "1200px",
    overflowX: "auto",
  },
  headerCell: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  cell: {
    whiteSpace: "nowrap",
  },
};
