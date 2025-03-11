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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch } from "react-redux";
import {
  ContactsAccount,
  getCampaignListById,
  VerifyViewContactPayload,
} from "../../redux/slice/contactSlice";
import { AppDispatch } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { Button, SecondaryButton } from "../../styles/global.styled";
import ProgressBar from "../../assets/Custom/linearProgress";
import { fetchContacts } from "../../redux/slice/contactSlice";
import ContactsAccountDialogBox from "./ContactsAccountDialogBox/ContactsAccountDialogBox";
import { SearchEmailAccount } from "../../redux/slice/emailAccountSlice";
import ViewDrawer from "./View-Drawer/ViewDrawer";
import UploadContactCsvDialog from "./UploadContactCsvDialog/UploadContactCsvDialog";
import { csvSettingsType } from "../Email-Campaign/Interfaces";
import { addLeadsToCampaign } from "../../redux/slice/emailCampaignSlice";
import UploadLeadsDialog from "../Email-Campaign/NewCampaign/ImportLeadsCampaign/UploadLeadsDialog";
import { ILeadsCounts } from "../Email-Campaign/NewCampaign/interfaces";
import { useNavigate } from "react-router-dom";

export interface ImportedLeadsData {
  csvSettings: csvSettingsType;
}

const ContactTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contactAccount, setContactAccount] = useState<ContactsAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isCsvUploaded, setIsCsvUploaded] = React.useState(false);
  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCounts, setUploadCounts] = React.useState<ILeadsCounts>();
  const [campaignId, setCampaignId] = React.useState("");

  const saveCSVSetting = (settings: any) => {
    setCSVsettings(settings);
  };

  const handleFileChange = (file: File) => {
    console.log(isCsvUploaded);
    console.log(selectedFile);
    console.log(CSVsettings);
    console.log(emailFieldsToBeAdded);
    setSelectedFile(file);
  };

  const handleLeadsData = (data: ImportedLeadsData) => {
    setEmailFieldsToBeAdded(data);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 150,
        renderCell: (params) => (
          <Box>
            {params.row.first_name} {params.row.last_name}
          </Box>
        ),
      },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "phone_number",
        headerName: "Phone",
        width: 150,
        valueGetter: (params) => params || "N/A",
      },
      {
        field: "used_in_campaigns",
        headerName: "Used in Campaign (Count)",
        width: 120,
      },
      {
        field: "uploaded_by",
        headerName: "Uploaded By",
        width: 150,
        valueGetter: (params: any) => params.full_name || "N/A",
      },

      {
        field: "createdAt",
        headerName: "Uploaded Date",
        width: 180,
        valueGetter: (params: any) => (params ? formatDate(params) : "N/A"),
      },

      {
        field: "view",
        headerName: "View",
        width: 180,
        renderCell: (params) => (
          <IconButton
            onClick={(event) => handleViewClick(event, params.row.id)}
          >
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
      if (data) {
        setLoading(false);
      }
      setContactAccount(data);
      setRows(data);
    } catch (error) {
      setLoading(false);
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

  const handleViewClick = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSelectedId(id);
    setOpen(true);
    const payload: VerifyViewContactPayload = { id };
    dispatch(getCampaignListById(payload));
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenDialog = () => setIsUploadDialogOpen(true);
  const handleCloseDialog = () => setIsUploadDialogOpen(false);

  const handleUploadContacts = async (data: any) => {
    console.log(emailFieldsToBeAdded);
    console.log(CSVsettings);
    console.log;
    console.log(data);

    const payload = {
      CSVsettings: CSVsettings,
      csvFile: selectedFile,
      emailFieldsToBeAdded: emailFieldsToBeAdded,
    };

    const response = await dispatch(addLeadsToCampaign(payload));

    if (response.payload.code === 200) {
      console.log(response);
      setUploadCounts(response.payload.counts);
      setCampaignId(response.payload.campaignId);
      // setUploadCsv(false);
      setUploadLeads(true);
    }
  };

  const goToNextStep = () => {
    navigate(`/email-campaign/new-campaign?campaignId=${campaignId}`);
  };

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

          <SecondaryButton onClick={handleOpenDialog}>
            Upload Contacts
          </SecondaryButton>
          <Button onClick={handleOpenDialog}>Add Contacts</Button>
        </Box>
      </ContactsHeader>
      {loading && <ProgressBar />}
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
      <CustomDataTable
        columns={columns}
        rows={rows}
        pageSizeOptions={[10, 10]}
      />

      <UploadContactCsvDialog
        handleUploadContacts={handleUploadContacts}
        open={isUploadDialogOpen}
        onClose={handleCloseDialog}
        handleLeadsData={handleLeadsData}
        handleCSVUpload={handleFileChange}
        saveCSVSetting={saveCSVSetting}
        setIsCsvUploaded={setIsCsvUploaded}
      />

      <UploadLeadsDialog
        open={uploadleads}
        uploadCounts={uploadCounts}
        onClose={() => {
          setUploadLeads(false);
          goToNextStep();
        }}
      />
      <ViewDrawer
        open={open}
        onClose={() => setOpen(false)}
        selectedId={selectedId}
      />
    </ContactsContainer>
  );
};

export default ContactTable;
