import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel,GridRowSelectionModel  } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./DataGridStyles.css";
import { Box } from "@mui/material";

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
  
  const handleRowSelectionChange = (selectionModel: GridRowSelectionModel) => {
    const selectedIds = selectionModel.map(String); // Convert IDs to string

    if (handleRowSelection) {
      handleRowSelection(selectedIds); // Pass selected IDs to parent
    }
  };

  return (
    <Box>
    <Paper className="data-grid-container" sx={{ minHeight: "480px" }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelectionChange} 
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
      />
    </Paper>
    </Box>
  );
};
