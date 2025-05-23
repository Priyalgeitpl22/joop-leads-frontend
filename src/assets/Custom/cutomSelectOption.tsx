import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface options {
  key: string,
  value: string
}

interface MultiSelectDropdownProps {
  options: options[];
  label: string;
  selectedValues: string | string[];
  onChange: (selected: string | string[]) => void;
  multiple?: boolean;
  width?: string
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  label,
  selectedValues,
  onChange,
  multiple = false,
  width = '300px'
}) => {

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const { value } = event.target;
    onChange(multiple ? (typeof value === "string" ? value.split(",") : value) : value);
  };

  return (
    <FormControl sx={{ width: width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 530,
              width: 400,
            },
          },
        }}
        sx={{
          height: 50,
          width: "100%",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.key}
            value={option.value}
          >
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export default MultiSelectDropdown;
