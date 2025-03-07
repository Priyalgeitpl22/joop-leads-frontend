import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./DataGridStyles.css"; // Import the CSS file

interface CustomDataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
  handleRowSelection?: (selection: any) => void;
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  handleRowSelection
}) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: pageSizeOptions[0] || 5,
    });

  return (
    <Paper className="data-grid-container">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        getRowId={(row) => row._id}
        sx={{
          cursor: "pointer",
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#888" }}
            >
              No email accounts found
            </div>
          ),
        }}
      />
    </Paper>
  );
};
