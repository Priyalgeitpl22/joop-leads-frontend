import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Menu,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  SelectChangeEvent,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactsAccount,
  CreateCampaignWithContacts,
  DeactivateContacts,
  deleteContact,
  filterContacts,
  getCampaignListById,
  SearchContacts,
  VerifyViewContactPayload,
  fetchContacts,
} from "../../redux/slice/contactSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { CheckCircle, Search, Trash2, XCircle } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDateTime } from "../../utils/utils";
import { Button, IconsButton, SecondaryButton } from "../../styles/global.styled";
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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ActiveFilters from "../Email-Campaign/ActiveFilters";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { HeaderContainer, FilterIcon } from "../../styles/global.styled";
import { SectionTitle } from "../../styles/layout.styled";
import { Container } from "../../styles/global.styled";
export interface ImportedLeadsData {
  csvSettings: csvSettingsType;
}

const ContactTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [CSVsettings, setCSVsettings] = React.useState<csvSettingsType>();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAddAccountDialogOPen, setIsAddAccountDialogOPen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    status: "",
  });

  const filterOptions: Record<"status", string[]> = {
    status: ["Active", "Inactive"],
  };

  const [emailFieldsToBeAdded, setEmailFieldsToBeAdded] =
    React.useState<ImportedLeadsData>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<(ContactsAccount & { active?: boolean; used_in_campaigns?: number })[]>([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [uploadleads, setUploadLeads] = React.useState<boolean>(false);
  const [uploadCounts, setUploadCounts] = React.useState<ILeadsCounts>();
  const [campaignId, setCampaignId] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [dateFilters, setDateFilters] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    [key: string]: string | Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [appliedFilters, setAppliedFilters] = useState<{
    status: string;
    startDate: string | null;
    endDate: string | null;
  }>({
    status: "",
    startDate: null,
    endDate: null,
  });

  const saveCSVSetting = (settings: csvSettingsType) => {
    setCSVsettings(settings);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterChange =
    (field: keyof typeof filters) => (event: SelectChangeEvent<string>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  const handleDateChange =
    (field: "startDate" | "endDate") => (value: Dayjs | null) => {
      setDateFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleLeadsData = (data: ImportedLeadsData) => {
    setEmailFieldsToBeAdded(data);
  };

  const handleCreateCampaign = async () => {
    if (rowSelectionModel.length > 0) {
      try {
        const response = await dispatch(
          CreateCampaignWithContacts(rowSelectionModel)
        ).unwrap();
        navigate(`/email-campaign/new-campaign?campaignId=${response.campaignId}`);
      } catch {
        toast.error("Something went wrong with create leads.");
      }
    } else {
      toast.error("No leads selected for create leads");
    }
  };

  const handleOpenDeleteDialog = (ids: string[]) => {
    setRowSelectionModel(ids);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteContact = async () => {
    if (rowSelectionModel.length > 0) {
      try {
        const response = await dispatch(deleteContact(rowSelectionModel)).unwrap();
        if (response?.message) {
          toast.success(response.message);
          setRows((prevRows) =>
            prevRows.filter((contact) => !rowSelectionModel.includes(contact.id))
          );
          setRowSelectionModel([]);
        } else {
          toast.error("Failed to delete contacts.");
        }
      } catch {
        toast.error("Something went wrong while deleting the contacts.");
      }
    }
    handleCloseDeleteDialog();
  };

  const handleViewClick = useCallback((event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSelectedId(id);
    setOpen(true);
    const payload: VerifyViewContactPayload = { id };
    dispatch(getCampaignListById(payload));
  }, [dispatch]);

  const handleEditClick = useCallback((event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSelectedId(id);
    setIsAddAccountDialogOPen(true);
    const payload: VerifyViewContactPayload = { id };
    dispatch(getCampaignListById(payload));
  }, [dispatch]);

  const columns: GridColDef[] = useMemo(() => {
    const baseColumns: GridColDef[] = [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 200,
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
        width: 170,
      },
      {
        field: "createdAt",
        headerName: "Uploaded Date",
        width: 200,
        valueGetter: (params: string | undefined) => (params ? formatDateTime(params) : "N/A"),
      },
      {
        field: "active",
        headerName: "Status",
        renderCell: (params: { row: ContactsAccount & { active?: boolean } }) => (
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
        width: 100,
        renderCell: (params) => (
          <Tooltip title="View Leads Detail" arrow>
            <IconButton
              onClick={(event) => handleViewClick(event, params.row.id)}
            >
              <VisibilityIcon style={{ color: "var(--primary-light)" }} />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        field: "edit",
        headerName: "Edit",
        width: 100,
        renderCell: (params) => (
          <Tooltip title="Edit Leads Detail" arrow>
            <IconButton
              onClick={(event) => handleEditClick(event, params.row.id)}
            >
              <ModeEditOutlineOutlinedIcon
                style={{ color: "var(--secondary-light)" }}
              />
            </IconButton>
          </Tooltip>
        ),
      },
    ];

    if (user?.role === "Admin") {
      baseColumns.push({
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params: { row: ContactsAccount }) => (
          <Tooltip title="Delete Lead" arrow>
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteDialog([params.row.id])}
            >
              <Trash2 width="18px" style={{ color: "var(--error-color)" }} />
            </IconButton>
          </Tooltip>
        ),
      });
    }

    return baseColumns;
  }, [user?.role, handleViewClick, handleEditClick]);

  useEffect(() => {
    getFetchAllContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearFilters = () => {
    setFilters({ status: "" });
    setDateFilters({ startDate: null, endDate: null });
    getFetchAllContacts();
    handleMenuClose();
  };

  const getFetchAllContacts = async () => {
    setLoading(true);
    try {
      const data = await dispatch(fetchContacts()).unwrap();
      setRows(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Account:", error);
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        await getFetchAllContacts();
      } else {
        const filteredData = await dispatch(
          SearchContacts({ query: trimmedQuery, orgId: user?.orgId || "" })
        ).unwrap();
        setRows(filteredData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setLoading(false);
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

  const handleSelectedRows = (ids: string[]) => {
    setRowSelectionModel(ids);
  };

  const selectedRowsData = rows.filter((row) => rowSelectionModel.includes(row.id));

  const allActive =
    selectedRowsData.length > 0 &&
    selectedRowsData.every((row) => row.active === true);

  const allInactive =
    selectedRowsData.length > 0 &&
    selectedRowsData.every((row) => row.active === false);

  const handleDeactivate = async () => {
    if (rowSelectionModel.length > 0) {
      try {
        const response = await dispatch(
          DeactivateContacts(rowSelectionModel)
        ).unwrap();
        if (response?.code === 200) {
          toast.success(
            response?.message || "Leads have been deactivated successfully."
          );
        } else {
          toast.error("Failed to deactivate Leads.");
        }
        setRowSelectionModel([]);
        await getFetchAllContacts();
      } catch {
        toast.error("Something went wrong while deactivating leads.");
      }
    } else {
      toast.error("No leads selected for deactivation.");
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleAccountOpenDialog = () => {
    setSelectedId(null);
    setIsAddAccountDialogOPen(true);
  };

  const handleAccountCloseDialog = async () => {
    setIsAddAccountDialogOPen(false);
    await getFetchAllContacts();
  };

  const handleUploadContacts = async () => {
    const payload = {
      CSVsettings: CSVsettings,
      csvFile: selectedFile,
      emailFieldsToBeAdded: emailFieldsToBeAdded,
    };

    const response = await dispatch(addLeadsToCampaign(payload));

    if (response.payload.code === 200) {
      setUploadCounts(response.payload.counts);
      setCampaignId(response.payload.campaignId);
      setUploadLeads(true);
    } else {
      toast.error(response.payload.message);
    }
  };

  const handleApplyFilter = async () => {
    try {
      const status =
        filters.status === "Active"
          ? "true"
          : filters.status === "Inactive"
            ? "false"
            : "";

      const filterPayload = {
        status,
        startDate: dateFilters.startDate
          ? dateFilters.startDate.format("YYYY-MM-DD")
          : "",
        endDate: dateFilters.endDate
          ? dateFilters.endDate.format("YYYY-MM-DD")
          : "",
      };

      const filterData = await dispatch(filterContacts(filterPayload));
      setRows(filterData.payload.data);

      setAppliedFilters({
        status: filters.status,
        startDate: filterPayload.startDate || null,
        endDate: filterPayload.endDate || null,
      });

      handleMenuClose();
    } catch (error) {
      console.error("Error applying filter:", error);
    }
  };
  const goToNextStep = () => {
    navigate(`/email-campaign/new-campaign?campaignId=${campaignId}`);
  };

  const activeFilters = useMemo(
    () => ({
      status: appliedFilters.status,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    }),
    [appliedFilters]
  );

  const handleRemoveFilter = (key: keyof typeof activeFilters) => {
    const updatedFilters = {
      status: appliedFilters.status,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    };

    switch (key) {
      case "status":
        updatedFilters.status = "";
        setFilters((prev) => ({ ...prev, status: "" }));
        break;
      case "startDate":
      case "endDate":
        updatedFilters.startDate = null;
        updatedFilters.endDate = null;
        setDateFilters({ startDate: null, endDate: null });
        break;
      default:
        break;
    }

    setAppliedFilters(updatedFilters);

    const statusForApi =
      updatedFilters.status === "Active"
        ? "true"
        : updatedFilters.status === "Inactive"
          ? "false"
          : "";

    const filterPayload: { status: string; startDate: string; endDate: string } = {
      status: statusForApi || "",
      startDate: updatedFilters.startDate || "",
      endDate: updatedFilters.endDate || "",
    };

    const allCleared = !filterPayload.status && !filterPayload.startDate && !filterPayload.endDate;

    if (allCleared) {
      getFetchAllContacts();
    } else {
      dispatch(filterContacts(filterPayload)).then((res) => {
        if (res.payload && typeof res.payload === 'object' && 'data' in res.payload) {
          setRows((res.payload as { data: (ContactsAccount & { active?: boolean; used_in_campaigns?: number })[] }).data);
        }
      });
    }
  };

  return (
    <Container>
      <Toaster position="top-right" />
      {isMobile ? (
        <HeaderContainer>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <SectionTitle>
                All Leads
              </SectionTitle>
            </AccordionSummary>
            <Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <SearchBar>
                  <Search size={20} />
                  <input
                    placeholder="Search by Leads or Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </SearchBar>
                <Tooltip title="Filter" arrow>
                  <FilterIcon onClick={handleMenuOpen}>
                    <FilterAltOutlinedIcon />
                  </FilterIcon>
                </Tooltip>
                <ContactsAccountDialogBox
                  open={isAddAccountDialogOPen}
                  onClose={handleAccountCloseDialog}
                  selectedId={selectedId}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                }}
              >
                {rowSelectionModel.length === 0 && (
                  <>
                    <Tooltip title="Upload Bulk Leads" arrow>
                      <IconsButton onClick={() => setIsUploadDialogOpen(true)}>
                        <CloudUploadIcon />
                      </IconsButton>
                    </Tooltip>
                    <Tooltip title="Add Lead" arrow>
                      <IconsButton onClick={handleAccountOpenDialog}>
                        <PersonAddIcon />
                      </IconsButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Box>
          </Accordion>
        </HeaderContainer>
      ) : (
        <HeaderContainer>
          <SectionTitle>All Leads</SectionTitle>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <SearchBar>
              <Search size={20} />
              <input
                placeholder="Search by Leads or Name"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchBar>
            <Tooltip title="Filter" arrow>
              <FilterIcon onClick={handleMenuOpen}>
                <FilterAltOutlinedIcon />
              </FilterIcon>
            </Tooltip>
            <ContactsAccountDialogBox
              open={isAddAccountDialogOPen}
              onClose={handleAccountCloseDialog}
              selectedId={selectedId}
            />

            {rowSelectionModel.length === 0 && (
              <>
                <Tooltip title="Upload Bulk Leads" arrow>
                  <IconsButton
                    onClick={() => setIsUploadDialogOpen(true)}
                    style={{ border: "1px solid var(--secondary-light)" }}
                  >
                    <CloudUploadIcon
                      sx={{
                        color: "var(--secondary-dark)",
                        "&:hover": {
                          color: "var(--secondary-light)",
                        },
                      }}
                    />
                  </IconsButton>
                </Tooltip>
                <Tooltip title="Add Lead" arrow>
                  <IconsButton
                    onClick={handleAccountOpenDialog}
                    style={{ border: "1px solid var(--primary-light)" }}
                  >
                    <PersonAddIcon
                      sx={{
                        color: "var(--primary-dark)",
                        "&:hover": {
                          color: "var(--primary-light)",
                        },
                      }}
                    />
                  </IconsButton>
                </Tooltip>
              </>
            )}

            {rowSelectionModel.length > 0 && allActive && (
              <Tooltip title="Deactivate User" arrow>
                <IconsButton
                  onClick={handleDeactivate}
                  style={{
                    color: "var(--error-color)",
                    border: "1px solid var(--error-color)",
                  }}
                >
                  <PersonOffIcon />
                </IconsButton>
              </Tooltip>
            )}

            {rowSelectionModel.length > 0 && allInactive && (
              <Tooltip title="Activate User" arrow>
                <IconsButton onClick={handleDeactivate}>
                  <HowToRegIcon />
                </IconsButton>
              </Tooltip>
            )}

            {rowSelectionModel.length > 0 && (
              <>
                <Tooltip title="Create Campaign" arrow>
                  <IconsButton
                    onClick={handleCreateCampaign}
                    style={{
                      color: "var(--primary-dark)",
                      border: "1px solid var(--primary-light)",
                    }}
                  >
                    <AddCircleIcon />
                  </IconsButton>
                </Tooltip>
                <Tooltip title="Delete Contacts" arrow>
                  <IconsButton
                    onClick={() => handleOpenDeleteDialog(rowSelectionModel)}
                    style={{
                      color: "var(--error-color)",
                      border: "1px solid var(--error-color)",
                    }}
                  >
                    <Trash2 width="18px" />
                  </IconsButton>
                </Tooltip>
              </>
            )}
          </Box>
        </HeaderContainer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "320px",
            padding: "20px",
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
          <Typography fontWeight="bold" fontSize={14}>
            Filter
          </Typography>
          <Link
            href="#"
            underline="hover"
            onClick={handleClearFilters}
            sx={{ color: "var(--theme-color)", fontSize: "14px" }}
          >
            Clear all
          </Link>
        </Box>

        <Box sx={{ mt: 2, width: "100%" }}>
          <Box sx={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date *"
              value={dateFilters.startDate}
              onChange={handleDateChange("startDate")}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          </Box>
          <Box sx={{ mt: 2, width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date *"
                value={dateFilters.endDate}
                onChange={handleDateChange("endDate")}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {Object.keys(filterOptions).map((label) => (
          <FormControl key={label} fullWidth sx={{ mt: 2, width: "100%" }}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={filters[label.toLowerCase() as keyof typeof filters] || ""}
              onChange={handleFilterChange(
                label.toLowerCase() as keyof typeof filters
              )}
              label={label}
              sx={{ background: "white!important", borderRadius: "4px" }}
            >
              {filterOptions[label as keyof typeof filterOptions]?.map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <SecondaryButton onClick={handleMenuClose}>
            Cancel
          </SecondaryButton>
          <Button onClick={handleApplyFilter}>Apply</Button>
        </Box>
      </Menu>
      <Box
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ background: "var(--input-bg)" }}>
          <ActiveFilters
            filters={activeFilters}
            onRemove={handleRemoveFilter}
          />
        </Box>
        <CustomDataTable
          loading={loading}
          columns={columns}
          rows={rows}
          pageSizeOptions={[15, 10, 5]}
          rowSelectionModel={rowSelectionModel}
          handleRowSelection={handleSelectedRows}
        />
      </Box>

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
        onClose={() => setIsUploadDialogOpen(false)}
        handleLeadsData={handleLeadsData}
        handleCSVUpload={handleFileChange}
        saveCSVSetting={saveCSVSetting}
        setIsCsvUploaded={() => {}}
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
    </Container>
  );
};

export default ContactTable;
