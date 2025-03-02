import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./DataGridStyles.css"; // Import the CSS file

interface CustomDataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
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
        getRowId={(row) => row._id}
        // sx={{
        //   "& .MuiCheckbox-root": {
        //     color: "var(--primary-color)",
        //   },
        //   "& .Mui-checked": {
        //     color: "var(--border-color) !important",
        //   },
        // }}
      />
    </Paper>
  );
};
