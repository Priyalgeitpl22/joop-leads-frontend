import React from "react";
import {
  FormControl,
  InputLabel,
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
    <FormControl sx={sx} variant="outlined" className="column-visibility-form-control">
      <InputLabel id={labelId}>{label}</InputLabel> 
      <Select
        labelId={labelId}
        id="column-visibility"
        multiple
        value={columns.filter((column) => visibleColumns[column])}
        onChange={handleChange}
        className="column-visibility-select"
        label={label}
        sx={{
          background: "white !important",
          "&:hover": {
            borderColor: "gray",
          },
          padding: "0px",
          height: "42px",
          borderRadius: "6px",
          ...selectSx,
        }}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={{
          PaperProps: {
            className: "column-visibility-menu-paper",
            style: {},
          },
        }}
      >
        <Typography className="column-visibility-menu-label" sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'text.secondary' }}>
          {label}
        </Typography>
        <Divider className="column-visibility-menu-divider" />
        {columns.map((column) => (
          <MenuItem
            key={column}
            value={column}
            className="column-visibility-menu-item"
            sx={{
              "&:hover": {
                backgroundColor: "white !important",
              },
              background: "white !important",
              marginTop: "0px",
              marginBottom: "0px",
              borderRadius: "0px",
              ...menuItemSx,
            }}
          >
            <Checkbox checked={visibleColumns[column]} />
            <ListItemText primary={column} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColumnVisibilitySelect;