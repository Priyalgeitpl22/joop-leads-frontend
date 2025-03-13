import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel  } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./DataGridStyles.css";
import { Box } from "@mui/material";

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
    <Box>
      <Paper
      className="data-grid-container" sx=
      {{ minHeight: "480px"}}>
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
              style={{padding: "20px", textAlign: "center", color: "#888" }}
              >
                No email accounts found
              </div>
            ),
          }}
          sx={{
            cursor: "pointer",
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
};
