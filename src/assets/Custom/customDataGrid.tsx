import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import "./DataGridStyles.css";

interface CustomDataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
  handleRowSelection?: (selection: any) => void;
  rowSelectionModel?: string[];
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  handleRowSelection,
  rowSelectionModel,
}) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: pageSizeOptions[0] || 5,
    });

  return (
    <Box
      sx={{
        height: "100%", // Ensure Box takes full height of its container
        display: "flex", // Use flexbox layout
        flexDirection: "column", // Stack children vertically
      }}
    >
      <Paper
        className="data-grid-container"
        sx={{
          flexGrow: 1, // Ensures Paper takes up remaining height
          display: "flex", // Enables flex layout within Paper
          minHeight: "480px", // Minimum height for Paper
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={rowSelectionModel}
          getRowId={(row) => row._id || row.id}
          slots={{
            noRowsOverlay: () => (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#888" }}
              >
                No data found
              </div>
            ),
          }}
          sx={{
            cursor: "pointer",
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },
          }}
        />
      </Paper>
    </Box>
  );
};
