import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  Menu,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  FilterIcon,
  SectionTitle,
  ContactsHeader,
  ContactsContainer,
} from "./ContactTable.styled";

// import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch } from "react-redux";
import { ContactsAccount } from "../../redux/slice/contactSlice";
import { AppDispatch } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { Button, SecondaryButton } from "../../styles/global.styled";
import { fetchContacts } from "../../redux/slice/contactSlice";
import ContactsAccountDialogBox from "./ContactsAccountDialogBox/ContactsAccountDialogBox";
import { SearchEmailAccount } from "../../redux/slice/emailAccountSlice";

const ContactTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contactAccount, setContactAccount] = useState<ContactsAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 150,
        renderCell: (params) => (
          <Box sx={{ marginTop: "8px" }}>
            {params.row.first_name} {params.row.last_name}
          </Box>
        ),
      },

      { field: "email", headerName: "Email", width: 250 },
      { field: "phone_number", headerName: "Phone", width: 150 },

      {
        field: "used_in_campaign",
        headerName: "Used in Campaign (Count)",
        width: 120,
        valueGetter: () => "",
      },

      {
        field: "",
        headerName: "Uploaded By",
        width: 120,
        renderCell: () => <Box sx={{ marginTop: "8px" }}></Box>,
      },
      {
        field: "createdAt",
        headerName: "Uploaded Date",
        width: 180,
        valueGetter: (params: any) => (params ? formatDate(params) : null),
      },

      {
        field: "view",
        headerName: "View",
        width: 180,
        renderCell: () => (
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };

    getEmailAccounts();
  }, []);

  const getAllEmailAccounts = async () => {
    try {
      const data = await dispatch(fetchContacts()).unwrap();
      setContactAccount(data);
      setRows(data);
      console.log("tableeee", data);
    } catch (error) {
      console.error("Failed to fetch Account:", error);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        setRows(contactAccount);
      } else {
        const [email, name] = trimmedQuery.split(" ");
        const filteredData = await dispatch(
          SearchEmailAccount({ email, name })
        ).unwrap();
        setRows(filteredData);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

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
    console.log(isSettingOpen);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <ContactsContainer>
      <ContactsHeader>
        <SectionTitle>Contacts</SectionTitle>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginLeft: "auto",
            marginBottom: "10px",
          }}
        >
          <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon>
          <SearchBar>
            <Search size={20} />
            <input
              placeholder="Search by Contact or Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <ContactsAccountDialogBox
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
          {/* <AdvancedSettingDialog
            open={isSettingOpen}
            onClose={() => setIsSettingOpen(false)}
          /> */}
          <SecondaryButton onClick={handleSettingDialog}>
            Upload Contacts
          </SecondaryButton>
          <Button onClick={handleOpenDialog}>Add Contacts</Button>
        </Box>
      </ContactsHeader>
      {/* {loading && <ProgressBar />} */}
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
            sx={{ color: "var(--theme-color)", fontSize: "14px" }}
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
            <InputLabel shrink={false}>{label}</InputLabel>
            <Select sx={{ background: "white!important" }}>
              <MenuItem value="">Select {label}</MenuItem>
            </Select>
          </FormControl>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleMenuClose}>Cancel</Button>
          <Button>Apply</Button>
        </Box>
      </Menu>
      {/* <ContactTable> */}
      <CustomDataTable
        columns={columns}
        rows={rows}
        pageSizeOptions={[10, 10]}
      />
      {/* </ContactTable> */}
    </ContactsContainer>
  );
};

export default ContactTable;
