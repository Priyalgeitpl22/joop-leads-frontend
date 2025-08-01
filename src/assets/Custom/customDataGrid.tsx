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
        overflow: 'scroll',
      }}>
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
                style={{ 
                  padding: "20px", 
                  textAlign: "center", 
                  color: "black !important",
                  backgroundColor: "white !important"
                }}
              >
                No data found
              </div>
            ),
          }}
          sx={{
            cursor: "pointer",
            backgroundColor: "white !important",
            color: "black !important",
            "& .MuiDataGrid-root": {
              backgroundColor: "white !important",
              color: "black !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "white !important",
              color: "black !important",
              borderBottom: "1px solid black !important",
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "white !important",
              color: "black !important",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "white !important",
              color: "black !important",
              "&:hover": {
                backgroundColor: "#f5f5f5 !important",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "white !important",
              color: "black !important",
              borderTop: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-panel": {
              backgroundColor: "white !important",
              color: "black !important",
            },
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "white !important",
              color: "black !important",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
              {
                outline: "none",
              },
            "& .MuiDataGrid-footerContainer .MuiTablePagination-selectLabel, \
            & .MuiDataGrid-footerContainer .MuiTablePagination-displayedRows, \
            & .MuiDataGrid-footerContainer .MuiSelect-select, \
            & .MuiDataGrid-footerContainer .MuiSvgIcon-root":
            {
              color: "black !important",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              flexBasis: "0px !important",
            },
            "& .MuiDataGrid-scrollbar": {
            scrollbarWidth: "none",         // Firefox
            msOverflowStyle: "none",        // IE and Edge
            "&::-webkit-scrollbar": {
              display: "none",              // Chrome, Safari
            },
          }}}
        />
      </Paper>
    </Box>
  );
};
