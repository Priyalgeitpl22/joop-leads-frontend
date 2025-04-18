import { FC } from "react";
import { Chip, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";

type Filters = {
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
};

interface ActiveFiltersProps {
  filters: Filters;
  onRemove: (key: keyof Filters) => void;
  statusLabel?: string;
}


const ActiveFilters: FC<ActiveFiltersProps> = ({
  filters,
  onRemove,
  statusLabel = "Status",
}) => {
  const renderChips = () => {
    const chips: { label: string; key: keyof Filters }[] = [];

    if (filters.status) {
      chips.push({
        label: `${statusLabel}: ${filters.status}`,
        key: "status",
      });
    }

    if (filters.startDate || filters.endDate) {
      chips.push({
        label: `Date: ${filters.startDate || "N/A"} - ${filters.endDate || "N/A"}`,
        key: "startDate",
      });
    }

    return chips.map((chip) => (
      <Chip
        key={chip.key + chip.label}
        label={chip.label}
        onDelete={() => onRemove(chip.key)}
        deleteIcon={<Close sx={{ fontSize: 16 }} />}
        sx={{
          mr: 1,
          mb: 1,
          borderRadius: "20px",
          fontSize: "14px",
          color: "black",
          backgroundColor: "#F7F7F7",
          border: "1px solid #E0E0E0",
          "& .MuiChip-deleteIcon": {
            color: "#2C2C2C",
            marginLeft: "4px",
            "&:hover": {
              color: "#000",
            },
          },
        }}
      />
    ));
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      {renderChips()}
    </Stack>
  );
};


export default ActiveFilters