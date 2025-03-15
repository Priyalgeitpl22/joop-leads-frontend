import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  Typography,
  Menu,
} from "@mui/material";
import {
  LeadssContainer,
  LeadsHeader,
  StyledTableContainer,
  StyledTableHeadCell,
  LeadsTable,
  StyledTableCell,
  StyledTableHead,
  CustomEditIconButton,
  StyledTableCheckbox,
  FilterIcon,
} from "./Leads.styled";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import SortIcon from "@mui/icons-material/Sort";
import { SearchBar } from "../../components/Header/header.styled";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import { Search } from "lucide-react";
import { SectionTitle } from "../../styles/layout.styled";

const Leads: React.FC = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <LeadssContainer>
      <LeadsHeader>
        <SectionTitle>All Leads</SectionTitle>
        <Box sx={{ display: "flex", gap: "20px", width: "100%" }}>
          <SearchBar>
            <Search size={20} />
            <input placeholder="Search input..." />
          </SearchBar>
          <FilterIcon>
            <FilterAltOutlinedIcon />
          </FilterIcon>
          <FilterIcon>
            <BackupTableIcon />
          </FilterIcon>
          <FilterIcon onClick={handleMenuOpen}>
            <SortIcon />
          </FilterIcon>
        </Box>
      </LeadsHeader>
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
          <Typography fontWeight="bold">Sort By</Typography>
        </Box>
      </Menu>
      <LeadsTable>
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCheckbox></StyledTableCheckbox>
                <StyledTableHeadCell>Email</StyledTableHeadCell>
                <StyledTableHeadCell>First Name</StyledTableHeadCell>
                <StyledTableHeadCell>Last Name</StyledTableHeadCell>
                <StyledTableHeadCell>Lead ESP</StyledTableHeadCell>
                <StyledTableHeadCell>Created At</StyledTableHeadCell>
                <StyledTableHeadCell>Type</StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody style={{ background: "var(--background-light)f" }}>
              <TableRow>
                <StyledTableCheckbox>
                  <Checkbox {...label} />
                </StyledTableCheckbox>
                <StyledTableCell>
                  <CustomEditIconButton>
                    <MailOutlineSharpIcon />
                  </CustomEditIconButton>
                  nidhi@mailinator.com
                </StyledTableCell>
                <StyledTableCell>Nidhi</StyledTableCell>
                <StyledTableCell>Jain</StyledTableCell>
                <StyledTableCell>Gmail</StyledTableCell>
                <StyledTableCell>Jan, 22, 2025</StyledTableCell>
                <StyledTableCell>
                  <CustomEditIconButton>
                    <SendIcon />
                  </CustomEditIconButton>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </LeadsTable>
    </LeadssContainer>
  );
};

export default Leads;
