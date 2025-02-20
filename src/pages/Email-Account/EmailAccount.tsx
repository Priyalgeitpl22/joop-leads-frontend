import { Box, Checkbox, Menu, Table, TableBody, TableRow, Typography, Link, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import {
  EmailAccountsContainer,
  EmailAccountHeader,
  SectionTitle,
  StyledTableContainer,
  StyledTableHeadCell,
  EmailAccountTable,
  StyledTableCell,
  StyledTableHead,
  CustomEditIconButton,
  CustomDangerIcon,
  CustomForwardIcon,
  StyledWarmup,
  StyledReputation,
  StyledTableCheckbox,
  FilterIcon,
} from "./EmailAccount.styled";

import SendIcon from "@mui/icons-material/Send";
import EmailAccountDialog from "./EmailAccountDialogBox/EmailAccountDialog";
import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { Button2 } from "../../styles/layout.styled";

const EmailAccount: React.FC = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSettingDialog = () => {
    setIsSettingOpen(true);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <EmailAccountsContainer>
      <EmailAccountHeader>
        <SectionTitle>Email Account</SectionTitle>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon>
          <SearchBar>
            <Search size={20} color="#64748b" />
            <input placeholder="Search input..." />
          </SearchBar>
          <EmailAccountDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
          <AdvancedSettingDialog
            open={isSettingOpen}
            onClose={() => setIsSettingOpen(false)}
          />
          <Button2
            onClick={handleSettingDialog}
            background="#f1f2fb"
            color="#6e58f1"
          >
            Advanced Settings
          </Button2>
          <Button2
            onClick={handleOpenDialog}
            background="#6e58f1"
            color="white"
          >
            Add Account
          </Button2>
        </Box>
      </EmailAccountHeader>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "320px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography fontWeight="bold">Filter</Typography>
          <Link
            href="#"
            underline="hover"
            sx={{ color: "#6e58f1", fontSize: "14px" }}
          >
            Clear all
          </Link>
        </Box>
        <MenuItem disableRipple>
          <Checkbox size="small" />
          <Typography variant="body2">Filter disconnected accounts</Typography>
        </MenuItem>
        <MenuItem disableRipple>
          <Checkbox size="small" />
          <Typography variant="body2">Filter by Warmup Reputation</Typography>
        </MenuItem>

        {["Warmup Status", "Tag Name", "Client Name"].map((label) => (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>{label}</InputLabel>
            {/* <InputLabel>Warmup Status</InputLabel> */}
            <Select>
              <MenuItem value="">Select {label}</MenuItem>
            </Select>
          </FormControl>
        ))}

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "#ccc",
              textTransform: "none",
              borderRadius: "8px",
              width: "45%",
            }}
            onClick={handleMenuClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6e58f1",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              width: "45%",
            }}
          >
            Apply
          </Button>
        </Box>
      </Menu>
      <EmailAccountTable>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCheckbox>
                  <Checkbox {...label} />
                </StyledTableCheckbox>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Email</StyledTableHeadCell>
                <StyledTableHeadCell>Daily Limit</StyledTableHeadCell>
                <StyledTableHeadCell>Warmup Enabled</StyledTableHeadCell>
                <StyledTableHeadCell>Reputation</StyledTableHeadCell>
                <StyledTableHeadCell>Type</StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody style={{ background: "#ffff" }}>
              <TableRow>
                <StyledTableCheckbox>
                  <Checkbox {...label} />
                </StyledTableCheckbox>
                <StyledTableCell>
                  Nidhi
                  <CustomForwardIcon>
                    <OpenInNewOutlinedIcon />
                  </CustomForwardIcon>
                  <CustomDangerIcon>
                    <WarningOutlinedIcon />
                  </CustomDangerIcon>
                </StyledTableCell>
                <StyledTableCell>
                  <CustomEditIconButton>
                    <SendIcon />
                  </CustomEditIconButton>
                  nidhi@mailinator.com
                </StyledTableCell>
                <StyledTableCell>0/100</StyledTableCell>
                <StyledTableCell>
                  <div>
                    <StyledWarmup>yes</StyledWarmup>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledReputation>100%</StyledReputation>
                </StyledTableCell>
                <StyledTableCell>
                  <CustomEditIconButton>
                    <SendIcon />
                  </CustomEditIconButton>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </EmailAccountTable>
    </EmailAccountsContainer>
  );
};

export default EmailAccount;
