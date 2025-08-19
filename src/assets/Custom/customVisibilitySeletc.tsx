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
  labelId,
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
    <FormControl sx={{ ...sx,  }}> {/* Remove margin and padding */}
      <Select
        labelId={labelId}
        id="column-visibility"
        multiple
        value={columns.filter((column) => visibleColumns[column])}
        onChange={handleChange}
        inputProps={{ "aria-label": label }}  
        sx={{
          background: "white !important",
          padding: "0px",
          height: "40px",
          borderRadius: "4px",
          "&.Mui-focused": {
            borderRadius: "4px",
            border: "none !important",
          },
        
          ...selectSx,
        }}
        renderValue={(selected) => selected.join(", ")}
      >
        <Typography sx={{ px: 2, py: 1, fontWeight: "bold",  }}>
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
            <Checkbox checked={visibleColumns[column]} />
            <ListItemText primary={column} sx={{
              '& .MuiListItemText-primary': {
                  color: '#000000 !important', 
                  fontSize: '14px',
                  fontWeight: 500,
                },
            }}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnVisibilitySelect;