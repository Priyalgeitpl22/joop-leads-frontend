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
  enableCheckboxSelection?: boolean;
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  handleRowSelection,
  rowSelectionModel,
  enableCheckboxSelection = true,
}) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: pageSizeOptions[0] || 5,
    });

  return (
    <Box
      sx={{
        height: "100%", 
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        className="data-grid-container"
        sx={{
          flexGrow: 1,
          display: "flex",
          minHeight: "380px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={rowSelectionModel}
          checkboxSelection={enableCheckboxSelection}
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
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
              {
                outline: "none",
              },
          }}
        />
      </Paper>
    </Box>
  );
};
