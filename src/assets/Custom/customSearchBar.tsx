import { Stack, Tooltip, IconButton, TextField } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { SearchIcon } from "lucide-react";

export function CustomSearchBar() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: 'inline', md: 'none' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1, borderRadius: "5px" }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }