import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  FormControl,
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { EmailCampaignContainer } from "./EmailCampaign.styled";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteEmailCampaign,
  fetchEmailCampaigns,
  filterCamapign,
  SearchEmailCampaign,
  updateCampaignName,
  UpdateCampaignStatus,
} from "../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../redux/store/store";
import { IEmailCampaign } from "./NewCampaign/interfaces";
import {
  Button,
  Container,
  HeaderContainer,
  FilterIcon,
} from "../../styles/global.styled";
import { Button2, SectionTitle } from "../../styles/layout.styled";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import toast from "react-hot-toast";
import EmailCampaignDialog from "./EmailCampaignDialog/AddEmailCampaignDialog";
import CampaignFolder from "./Folder/CampaignFolder";
import MoveToFolderDialog from "./MoveToFolderDialog";
import EmailCampaignTable from "./EmailCampaignTable";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { showFolders } from "../../redux/slice/emailCampaignFolderSlice";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import RenameEmailCampaignDialog from "./RenameEmailCampaignDialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColumnVisibilitySelect from "../../assets/Custom/customVisibilitySeletc";

import ActiveFilters from "./ActiveFilters";
import MultiSelectDropdown from "../../assets/Custom/cutomSelectOption";

const EmailCampaign: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const tab = pathParts[2];

  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tab);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterOpen, setFilterOpen] = useState<null | HTMLElement>(null);
  const [moveToFolderDialog, setMoveToFolderDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "",
  });
  const [folderCampaignDelete, setFolderCampaignDelete] = useState<
    string | null
  >(null);

  const filterOptions: Record<"status", string[]> = {
    status: ["SCHEDULED", "RUNNING", "PAUSED", "DRAFT", "COMPLETED"],
  };
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [selectedRenameCampaignId, setSelectedRenameCampaignId] = useState<
    string | null
  >(null);
  const [selectedRenameCampaignName, setSelectedRenameCampaignName] =
    useState<string>("");

  const [dateFilters, setDateFilters] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    [key: string]: string | Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [visibleColumns, setVisibleColumns] = useState<{
    Leads: boolean;
    Sent: boolean;
    Opened: boolean;
    Clicked: boolean;
    Bounced: boolean;
  }>({
    Leads: true,
    Sent: true,
    Opened: true,
    Clicked: true,
    Bounced: true,
  });

  const columnOptions = ["Leads", "Sent", "Opened", "Clicked", "Bounced"];
  const [appliedFilters, setAppliedFilters] = useState<{
    status: string;
    startDate: string | null;
    endDate: string | null;
  }>({
    status: "",
    startDate: null,
    endDate: null,
  });

  const isFilterOpen = Boolean(filterOpen);
  const folders = useSelector((state: any) => state.folder.folders);
  console.log("folderrr", folders.length);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
    dispatch(showFolders());
  }, [tab]);

  useEffect(() => {
    const getEmailCampaigns = async () => {
      await getAllEmailCampaigns();
    };

    getEmailCampaigns();
  }, []);

  const handleColumnVisibilityChange = (newVisibleColumns: any) => {
    setVisibleColumns(newVisibleColumns);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (typeof newValue !== "string") {
      return;
    }
    setActiveTab(newValue);

    if (newValue === "all") {
      setSelectedFolder(null);
    } else if (newValue === "folders") {
      setSelectedFolder(null);
      navigate(`/email-campaign/folders`, { replace: true });
      return;
    }
    navigate(`/email-campaign/${newValue}`, { replace: true });
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

  const handleMenuOpen1 = (event: any) => {
    setFilterOpen(event.currentTarget);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    campaignId?: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaign(campaignId || "");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCampaign(null);
  };

  const handleRenameOpen = (campaignId: string, campaignName: string) => {
    setSelectedRenameCampaignId(campaignId);
    setSelectedRenameCampaignName(campaignName);
    setRenameDialogOpen(true);
    handleMenuClose();
  };

  const handleRenameClose = async () => {
    if (!selectedRenameCampaignId) return;
    try {
      await dispatch(
        updateCampaignName({
          campaignId: selectedRenameCampaignId,
          newName: selectedRenameCampaignName,
        })
      );

      await getAllEmailCampaigns();
      setRenameDialogOpen(false);
    } catch (error) {
      console.error("Failed to update campaign name:", error);
    }
  };

  const handleFilterClose = () => {
    setFilterOpen(null);
  };
  const handleCreateFolder = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setCreateFolder(true);
  };

  const getAllEmailCampaigns = async () => {
    try {
      setLoading(true);
      const response = await dispatch(fetchEmailCampaigns()).unwrap();
      setTimeout(() => {
        setLoading(false);
        setCampaigns(response.data || []);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    navigate("/email-campaign/new-campaign");
  };

  const handleSearch = async (query: string) => {
    try {
      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        await getAllEmailCampaigns();
      } else {
        const filteredData = await dispatch(
          SearchEmailCampaign({ campaign_name: trimmedQuery })
        ).unwrap();
        setCampaigns(filteredData.data);
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

  const handleDetailCampaign = (id: string) => {
    navigate(`/email-campaign/view-email-campaign?view&id=${id}`);
  };

  const handleEditCampaign = (id: string) => {
    navigate(`/email-campaign/new-campaign?edit&id=${id}`);
  };

  const handleOpenDeleteDialog = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCampaign(null);
    setOpenDeleteDialog(false);
  };

  const handleCampaignDelete = async () => {
    if (!selectedCampaign) return;
    try {
      const response = await dispatch(
        DeleteEmailCampaign(selectedCampaign)
      ).unwrap();
      if (response?.code === 200) {
        setFolderCampaignDelete(selectedCampaign);
        toast.success(
          response?.message || "Contacts have been deactivated successfully."
        );
      } else {
        toast.error("Failed to deactivate contacts.");
      }
      handleCloseDeleteDialog();
      getAllEmailCampaigns();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };

  const handlePause = async (campaignId: string) => {
    setLoading(true);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await dispatch(
        UpdateCampaignStatus({ campaignId, status: "PAUSED" })
      ).unwrap();
      await getAllEmailCampaigns();
      console.log("Campaign paused successfully");
    } catch (error) {
      console.error("Error pausing campaign:", error);
    } finally {
      await minLoadingTime;
      setLoading(false);
    }
  };

  const handleResume = async (campaignId: string) => {
    setLoading(true);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await dispatch(
        UpdateCampaignStatus({ campaignId, status: "RUNNING" })
      ).unwrap();
      await getAllEmailCampaigns();
      console.log("Campaign resumed successfully");
    } catch (error) {
      console.error("Error resuming campaign:", error);
    } finally {
      await minLoadingTime;
      setLoading(false);
    }
  };

  // const handleMoveFolderOpen = (campaignId: string) => {
  //   setSelectedCampaign(campaignId);
  //   setMoveToFolderDialog(true);
  //   setAnchorEl(null);
  // };

  const handleMoveFolderClose = () => {
    setMoveToFolderDialog(false);
  };

  const handleFolderChange = () => {
    setSelectedFolder(null);
    navigate(`/email-campaign/folders`);
  };

  const handleApplyFilters = async () => {
    try {
      const filterPayload = {
        status: filters.status,
        startDate: dateFilters.startDate
          ? dateFilters.startDate.format("YYYY-MM-DD")
          : "",
        endDate: dateFilters.endDate
          ? dateFilters.endDate.format("YYYY-MM-DD")
          : "",
      };

      const filterData = await dispatch(filterCamapign(filterPayload));
      setCampaigns(filterData.payload.data);
      setAppliedFilters(filterPayload);
      handleFilterClose();
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };
  const handleClearFilters = () => {
    setFilters({ status: "" });
    setDateFilters({ startDate: null, endDate: null });
    getAllEmailCampaigns();
    handleFilterClose();
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
      ...filters,
      startDate: dateFilters.startDate
        ? dateFilters.startDate.format("YYYY-MM-DD")
        : null,
      endDate: dateFilters.endDate
        ? dateFilters.endDate.format("YYYY-MM-DD")
        : null,
    };

    switch (key) {
      case "status":
        setFilters((prev) => ({ ...prev, status: "" }));
        updatedFilters.status = "";
        break;

      case "startDate":
      case "endDate":
        setDateFilters({ startDate: null, endDate: null });
        updatedFilters.startDate = null;
        updatedFilters.endDate = null;
        break;

      default:
        break;
    }

    setAppliedFilters({
      status: updatedFilters.status || "",
      startDate: updatedFilters.startDate,
      endDate: updatedFilters.endDate,
    });

    const allCleared =
      !updatedFilters.status &&
      !updatedFilters.startDate &&
      !updatedFilters.endDate;

    if (allCleared) {
      getAllEmailCampaigns();
    } else {
      dispatch(
        filterCamapign({
          status: updatedFilters.status,
          startDate: updatedFilters.startDate || "",
          endDate: updatedFilters.endDate || "",
        })
      ).then((res: any) => {
        setCampaigns(res.payload.data);
      });
    }
  };

  return (
    <Container>
      {activeTab === "all" || activeTab === "folders" ? (
        <>
          <HeaderContainer>
            <SectionTitle>Campaigns</SectionTitle>
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "flex-end" }}>
              <ColumnVisibilitySelect
                visibleColumns={visibleColumns}
                handleColumnVisibilityChange={handleColumnVisibilityChange}
                columns={columnOptions}
                labelId="column-visibility-label"
                label="Customize Columns"
                sx={{ width: 200, borderRadius: "4px" }}
              />
              <SearchBar style={{ width: 335 }}>
                <Search size={20} />
                <input
                  placeholder="Search by Campaign Name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </SearchBar>
              <Tooltip title="Filter" arrow>
                <FilterIcon onClick={handleMenuOpen1}>
                  <FilterAltOutlinedIcon />
                </FilterIcon>
              </Tooltip>
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            </Box>
          </HeaderContainer>

          <Menu
            anchorEl={filterOpen}
            open={isFilterOpen}
            onClose={handleFilterClose}
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
                sx={{ color: "var(--theme-color)", fontSize: "12px" }}
              >
                Clear all
              </Link>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Start Date *"
                    value={dateFilters.startDate}
                    onChange={handleDateChange("startDate")}
                    sx={{ borderRadius: "8px", width: "100%" }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ mt: 2, width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="End Date *"
                    value={dateFilters.endDate}
                    onChange={handleDateChange("endDate")}
                    sx={{ borderRadius: "8px", width: "100%" }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            {Object.keys(filterOptions).map((label) => (
              <FormControl
                key={label}
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
              >
                <InputLabel>{label}</InputLabel>
                <Select
                  value={
                    filters[label.toLowerCase() as keyof typeof filters] || ""
                  }
                  onChange={handleFilterChange(
                    label.toLowerCase() as keyof typeof filters
                  )}
                  label={label}
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "var(--text-white)",

                    "& .MuiOutlinedInput-input": {
                      backgroundColor: "var(--text-white)",
                    },
                  }}
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
              <Button2 onClick={handleFilterClose} color={""} background={""}>
                Cancel
              </Button2>
              <Button onClick={handleApplyFilters}>Apply</Button>
            </Box>
          </Menu>
          <Box>
            <ActiveFilters
              filters={activeFilters}
              onRemove={handleRemoveFilter}
            />
          </Box>
          {activeTab === "all" ? (
            <EmailCampaignTable
              campaigns={campaigns}
              loading={loading}
              handlePause={handlePause}
              handleResume={handleResume}
              handleEditCampaign={handleEditCampaign}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
              handleDetailCampaign={handleDetailCampaign}
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
              handleRenameOpen={handleRenameOpen}
              handleRenameClose={handleRenameClose}
              anchorEl={anchorEl}
              selectedCampaign={selectedCampaign}
              visibleColumns={visibleColumns}
            />
          ) : (
            <Container>
              <span
                onClick={handleFolderChange}
                style={{
                  color: selectedFolder ? "grey" : "var(--theme-color)",
                }}
              >
                All Folders
              </span>
              {selectedFolder && (
                <>
                  <span style={{ color: "var(--theme-color)" }}>{">"}</span>
                  <span style={{ color: "var(--theme-color)" }}>
                    {selectedFolder}
                  </span>
                </>
              )}
              {folders && folders.length > 0 ? (
                <CampaignFolder
                  loading={loading}
                  handlePause={handlePause}
                  handleResume={handleResume}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  setFolderId={setSelectedFolderId}
                  handleEditCampaign={handleEditCampaign}
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                  // handleMoveFolderOpen={handleMoveFolderOpen}
                  handleDetailCampaign={handleDetailCampaign}
                  handleMenuOpen={handleMenuOpen}
                  handleMenuClose={handleMenuClose}
                  anchorEl={anchorEl}
                  selectedCampaign={selectedCampaign}
                  folderCampaignDel={folderCampaignDelete}
                  handleRenameOpen={handleRenameOpen}
                  handleRenameClose={handleRenameClose}
                />
              ) : (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "60px 0px",
                    width: "100%",
                  }}
                >
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: "570px",
                      width: "100%",
                    }}
                  >
                    <FolderOpenOutlinedIcon
                      style={{ height: "20%", width: "20%" }}
                    />
                    <Typography
                      style={{ textAlign: "center", fontWeight: "200" }}
                    >
                      Campaign Organization with Folders
                    </Typography>
                    Streamline Your Workflow by Grouping Campaigns into Folders
                    :rocket:.
                    <EmailCampaignDialog
                      open={createFolder}
                      onClose={() => setCreateFolder(false)}
                    />
                    <Button2
                      background="var(--theme-color)"
                      color="white"
                      style={{
                        width: "25%",
                        height: "25%",
                        marginTop: "10px",
                        padding: "0px",
                      }}
                      onClick={(event) => handleCreateFolder(event)}
                    >
                      Create Folder
                    </Button2>
                  </Box>
                </Box>
              )}
            </Container>
          )}
        </>
      ) : null}

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleCampaignDelete}
        title="Delete Campaign?"
        message="Are you sure you want to delete this campaign?"
        confirmText="Delete"
        cancelText="Cancel"
      />
      <MoveToFolderDialog
        open={moveToFolderDialog}
        onClose={handleMoveFolderClose}
        campaignId={selectedCampaign}
      />
      <RenameEmailCampaignDialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        campaignId={selectedRenameCampaignId}
        campaignName={selectedRenameCampaignName}
        fetchEmailCampaign={getAllEmailCampaigns}
        folderId={selectedFolderId}
      />
    </Container>
  );
};

export default EmailCampaign;
