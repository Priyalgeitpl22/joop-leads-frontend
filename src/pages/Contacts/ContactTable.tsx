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
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  ContactsHeader,
  ContactsContainer,
} from "./ContactTable.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactsAccount,
  CreateCampaignWithContacts,
  DeactivateContacts,
  deleteContact,
  getCampaignListById,
  SearchContacts,
  VerifyViewContactPayload,
} from "../../redux/slice/contactSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { CheckCircle, Search, XCircle } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { Button, IconsButton } from "../../styles/global.styled";
import ProgressBar from "../../assets/Custom/linearProgress";
import { fetchContacts } from "../../redux/slice/contactSlice";
import ContactsAccountDialogBox from "./ContactsAccountDialogBox/ContactsAccountDialogBox";
import ViewDrawer from "./View-Drawer/ViewDrawer";
import UploadContactCsvDialog from "./UploadContactCsvDialog/UploadContactCsvDialog";
import { csvSettingsType } from "../Email-Campaign/Interfaces";
import { addLeadsToCampaign } from "../../redux/slice/emailCampaignSlice";
import UploadLeadsDialog from "../Email-Campaign/NewCampaign/ImportLeadsCampaign/UploadLeadsDialog";
import { ILeadsCounts } from "../Email-Campaign/NewCampaign/interfaces";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import HowToRegIcon from '@mui/icons-material/HowToReg'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast, { Toaster } from 'react-hot-toast';
import { SectionTitle } from "../../styles/layout.styled";
import { DeleteIcon } from "./ContactTable.styled";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";


export interface ImportedLeadsData {
  csvSettings: csvSettingsType;
}

const ContactTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contactAccount, setContactAccount] = useState<ContactsAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAddAccountDialogOPen, setIsAddAccountDialogOPen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);

  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedIds, setSelectedIds] = useState<any>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isCsvUploaded, setIsCsvUploaded] = React.useState(false);
  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCounts, setUploadCounts] = React.useState<ILeadsCounts>();
  const [campaignId, setCampaignId] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const handleCreateCampaign = async () => {
    if (selectedIds.length > 0) {

      try {
        const response = await dispatch(CreateCampaignWithContacts(selectedIds)).unwrap();
        const campaignId = response.campaignId;
        navigate(`/email-campaign/new-campaign?campaignId=${campaignId}`);
      } catch (error) {
        toast.error("Something went wrong with create leads.");
      }
    } else {
      toast.error("No leads selected for create leads");
    }
  };


  const handleOpenDeleteDialog = (selectedIds: string[]) => {
    setSelectedIds(selectedIds);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteContact = async () => {
    if (selectedIds.length > 0) {
      try {

        const response = await dispatch(deleteContact(selectedIds)).unwrap();
        if (response?.message) {
          toast.success(response.message);

          setRows((prevRows) =>
            prevRows.filter((contact) => !selectedIds.includes(contact.id))
          );
        } else {
          toast.error("Failed to delete contacts.");
        }
      } catch (error) {
        toast.error("Something went wrong while deleting the contacts.");
      }
    }
    handleCloseDeleteDialog();
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
        field: "createdAt",
        headerName: "Uploaded Date",
        width: 150,
        valueGetter: (params: any) => (params ? formatDate(params) : "N/A"),
      },
      {
        field: "active",
        headerName: "Status",
        renderCell: (params: any) => (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: params?.row?.active
                ? "var(--success-color)"
                : "var(--error-color)",
              fontWeight: "bold",
            }}
          >
            {params?.row?.active ? (
              <>
                <CheckCircle size={16} /> Active
              </>
            ) : (
              <>
                <XCircle size={16} /> Inactive
              </>
            )}
          </span>
        ),
      },

      {
        field: "view",
        headerName: "View",
        renderCell: (params) => (
          <Tooltip title="View Leads Detail" arrow>
            <IconButton
              onClick={(event) => handleViewClick(event, params.row.id)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        renderCell: (_params) => (
          <Tooltip title="Delete Lead" arrow>
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteDialog(_params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const getContactsAccounts = async () => {
      await getFetchAllContacts();
    };

    getContactsAccounts();
  }, [dispatch]);



  const getFetchAllContacts = async () => {
    try {
      setLoading(true);
      const data = await dispatch(fetchContacts()).unwrap();
      if (data) {
        setContactAccount(data);
        setLoading(false);
      }
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
        const filteredData = await dispatch(
          SearchContacts({ query: trimmedQuery, orgId: user?.orgId || "" })
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

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedRows = (selectedIds: string[]) => {
    setSelectedIds(selectedIds);
    setRowSelectionModel(selectedIds);
  };

  const selectedRowsData = rows.filter((row) => selectedIds.includes(row.id));

  const allActive =
    selectedRowsData.length > 0 &&
    selectedRowsData.every((row) => row.active === true);

  const allInactive =
    selectedRowsData.length > 0 &&
    selectedRowsData.every((row) => row.active === false);




  const handleDeactivate = async () => {
    if (selectedIds.length > 0) {

      try {
        const response = await dispatch(DeactivateContacts(selectedIds)).unwrap();
        if (response?.code === 200) {
          toast.success(response?.message || "Leads have been deactivated successfully.");
        } else {
          toast.error("Failed to deactivate Leads.");
        }
        setSelectedIds([]);
        setRowSelectionModel([])

        await getFetchAllContacts();
      } catch (error) {
        toast.error("Something went wrong while deactivating leads.");
      }
    } else {
      toast.error("No leads selected for deactivation.");
    }
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

  const handleAccountOpenDialog = () => setIsAddAccountDialogOPen(true);
  const handleAccountCloseDialog = () => setIsAddAccountDialogOPen(false);

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
      <Toaster position="top-right" />
      <ContactsHeader>
        <SectionTitle>All Leads</SectionTitle>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            width: "100%",
            alignItems: "center",
            justifyContent: 'right'
          }}
        >
          {/* <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon> */}
          <SearchBar>
            <Search size={20} />
            <input
              placeholder="Search by Leads or Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <ContactsAccountDialogBox
            open={isAddAccountDialogOPen}
            onClose={handleAccountCloseDialog}
          />

          {selectedIds.length == 0 && (
            <Tooltip title="Upload Bulk Leads" arrow>
              <IconsButton onClick={handleOpenDialog}>
                <CloudUploadIcon />
              </IconsButton>
            </Tooltip>
          )}
          {selectedIds.length == 0 && (
            <Tooltip title="Add Lead" arrow>
              <IconsButton onClick={handleAccountOpenDialog}>
                <PersonAddIcon />
              </IconsButton>
            </Tooltip>
          )}

          {selectedIds.length > 0 && allActive && (
            <Tooltip title="Deactivate User" arrow>
              <IconsButton onClick={handleDeactivate}>
                <PersonOffIcon />
              </IconsButton>
            </Tooltip>
          )}


          {selectedIds.length > 0 && allInactive && (
            <Tooltip title="Activate User" arrow>
              <IconsButton onClick={handleDeactivate}>
                <HowToRegIcon />
              </IconsButton>
            </Tooltip>
          )}


          {selectedIds.length > 0 && (
            <Tooltip title="Create Campaign" arrow>
              <IconsButton onClick={handleCreateCampaign}>
                <AddCircleIcon />
              </IconsButton>
            </Tooltip>
          )}

          {selectedIds.length > 0 && (
            <Tooltip title="Delete Contacts" arrow>
              <IconsButton onClick={() => handleOpenDeleteDialog(selectedIds)}>
                <DeleteIcon />
              </IconsButton>
            </Tooltip>
          )}
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
        pageSizeOptions={[15, 10, 5]}
        rowSelectionModel={rowSelectionModel}
        handleRowSelection={handleSelectedRows}
      />
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteContact}
        title="Delete Contact?"
        message="Are you sure you want to delete this contact?"
        confirmText="Delete"
        cancelText="Cancel"
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
