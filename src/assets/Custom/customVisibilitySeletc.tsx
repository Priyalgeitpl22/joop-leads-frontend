import React from "react";
import {
  FormControl,
  MenuItem,
  ListItemText,
  Checkbox,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
  Typography,
  Divider,
} from "@mui/material";


interface ColumnVisibilitySelectProps {
  visibleColumns: Record<string, boolean>;
  handleColumnVisibilityChange: (updatedColumns: Record<string, boolean>) => void;
  columns: string[];
  labelId: string;
  label: string;
  sx?: SxProps<Theme>;
  selectSx?: SxProps<Theme>;
  menuPropsPaperSx?: SxProps<Theme>;
  menuItemSx?: SxProps<Theme>;
}

const ColumnVisibilitySelect: React.FC<ColumnVisibilitySelectProps> = ({
  visibleColumns,
  handleColumnVisibilityChange,
  columns,
  label,
  sx,
  selectSx,
  menuItemSx,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value;
    const updatedVisibleColumns: Record<string, boolean> = {};
    columns.forEach((column) => {
      updatedVisibleColumns[column] = selectedValues.includes(column);
    });
    handleColumnVisibilityChange(updatedVisibleColumns);
  };

  return (
    <FormControl sx={{ ...sx, }}> {/* Remove margin and padding */}
      <Select
        multiple
        value={columns.filter((column) => visibleColumns[column])}
        onChange={handleChange}
        inputProps={{ "aria-label": label }}
        sx={{
          background: "white !important",
          height: "32px",
          width: "100%",
          borderRadius: "4px",

          "& .MuiSelect-select": {
            fontSize: "12px !important",
            fontWeight: 500,
            padding: "8px !important",
            color: "#9ca3af",
          },
          ...selectSx,
        }}
        renderValue={() => "Customize Columns"}
      >
        <Typography sx={{ px: 2, py: 1, fontWeight: "bold", }}>
          {label}
        </Typography>
        <Divider />
        {columns.map((column) => (
          <MenuItem
            key={column}
            value={column}
            sx={{
              background: "white !important",
              marginTop: "0px",
              marginBottom: "0px",
              borderRadius: "0px",
              ...menuItemSx,
            }}
          >
            <Checkbox checked={visibleColumns[column]} sx={{
              color: 'var(--primary-light) !important',
              '& .MuiCheckbox': {
                color: 'var(--primary-light) !important',
              },
            }} />
            <ListItemText primary={column} sx={{
              '& .MuiListItemText-primary': {
                color: '#000000 !important',
                fontSize: '12px',
                fontWeight: 500,
              },
            }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnVisibilitySelect;