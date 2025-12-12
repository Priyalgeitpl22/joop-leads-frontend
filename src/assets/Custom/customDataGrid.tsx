import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress } from "@mui/material";
import "./DataGridStyles.css";

interface CustomDataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
  handleRowSelection?: (selection: any) => void;
  rowSelectionModel?: string[];
  enableCheckboxSelection?: boolean;
  loading?: boolean;
}

export const CustomDataTable: React.FC<CustomDataTableProps> = ({
  columns,
  rows,
  pageSizeOptions = [5, 10],
  handleRowSelection,
  rowSelectionModel,
  enableCheckboxSelection = true,
  loading = false,
}) => {
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: pageSizeOptions[0] || 5,
    });

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "none",
        flexDirection: "column",
        overflow: "auto",
        border: "1px solid var(--border-grey)",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Paper
        className="data-grid-container"
        sx={{
          flexGrow: 1,
          display: "flex",
          minHeight: "500px",
          borderRadius: "0px",
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
          loading={loading}
          slots={{
            noRowsOverlay: () => (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "black",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#888" }} />
                ) : (
                  "No data found"
                )}
              </div>
            ),
          }}
          sx={{
            cursor: "pointer",
            backgroundColor: "white !important",
            color: "black !important",

            /* ⭐ BOLD COLUMN HEADING */
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "700 !important",
            },

            "& .MuiDataGrid-columnHeaders": {
              height: "40px !important",
              backgroundColor: "white !important",
              color: "black !important",
              borderBottom: "1px solid black !important",
            },

            "& .MuiDataGrid-cell": {
              backgroundColor: "white !important",
              color: "black !important",
            },

            ".MuiDataGrid-container--top [role=row]": {
              height: "40px !important",
              backgroundColor: "var(--background-slate) !important",
              color: "#35495c !important",
              fontWeight: "bold !important",
              "&:hover": {
                backgroundColor: "var(--background-slate) !important",
              },
            },

            ".MuiDataGrid-columnSeparator--resizable": {
              color: "var(--text-grey)",
            },

            "& .MuiDataGrid-row": {
              backgroundColor: "white !important",
              color: "black !important",
              border: "1px solid var(--border-grey)",
              "&:hover": {
                backgroundColor: "#f5f5f5 !important",
              },
            },

            /* ⭐ PAGINATION LEFT ALIGNMENT */
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "white !important",
              color: "black !important",
              borderTop: "1px solid #e0e0e0",
              justifyContent: "flex-start !important", // LEFT ALIGN
            },

            "& .MuiTablePagination-root": {
              marginLeft: "0 !important", // flush left
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
                height: "40px !important",
                outline: "none",
              },
            "& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sortable.MuiDataGrid-withBorderColor": {
                height: "40px !important",
            },

            "& .MuiDataGrid-footerContainer .MuiTablePagination-selectLabel, \
      & .MuiDataGrid-footerContainer .MuiTablePagination-displayedRows, \
      & .MuiDataGrid-footerContainer .MuiSelect-select, \
      & .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
              color: "black !important",
            },

            "& .MuiDataGrid-virtualScrollerContent": {
              flexBasis: "0px !important",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "var(--primary) !important",
            },

            /* HIDE SCROLLBAR */
            "& .MuiDataGrid-scrollbar": {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
};
