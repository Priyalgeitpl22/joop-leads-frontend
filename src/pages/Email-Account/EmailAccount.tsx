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
  Tooltip,
} from "@mui/material";
import {
  EmailAccountsContainer,
  EmailAccountHeader,
  EmailAccountTable,
} from "./EmailAccount.styled";
import EmailAccountDialog from "./EmailAccountDialogBox/EmailAccountDialog";
import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailAccount,
  EmailAccount,
  fetchEmailAccount,
  SearchEmailAccount,
} from "../../redux/slice/emailAccountSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
// import toast from "react-hot-toast";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { Button, SecondaryButton } from "../../styles/global.styled";
import { CustomTableCell } from "../Email-Campaign/EmailCampaign.styled";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import { SectionTitle } from "../../styles/layout.styled";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
// import ProgressBar from "../../assets/Custom/linearProgress";

const EmailAccounts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmailAccount, setSelectedEmailAccount] = useState<
    string | null
  >(null);


  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 160 },
      { field: "email", headerName: "Email", width: 260 },
      {
        field: "type",
        headerName: "Type",
        width: 100,
        renderCell: (params: any) => {
          let icon = null;

          if (params.value === "gmail") {
            icon = (
              <img
                src="https://img.icons8.com/color/48/000000/gmail-new.png"
                alt="Gmail Icon"
                width="24"
                height="24"
              />
            );
          } else if (params.value === "outlook") {
            icon = (
              <img
                src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019.png"
                alt="Outlook Icon"
                width="24"
                height="24"
              />
            );
          } else if (params.value === "imap") {
            icon = <CustomIcon />;
          }

          return <Box sx={{ marginTop: "8px" }}>{icon}</Box>;
        },
      },
      {
        field: "warm_up",
        headerName: "Warmup Enabled",
        width: 150,
        renderCell: () => <Box>Yes</Box>,
      },
      {
        field: "daily_limit",
        headerName: "Daily Limit",
        width: 120,
        valueGetter: () => "0 / 100",
      },
      {
        field: "reputation",
        headerName: "Reputation",
        width: 110,
        renderCell: () => <Box>100%</Box>,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        valueGetter: (params: any) => (params ? formatDate(params) : null),
      },
      {
        field: "edit",
        headerName: "Action",
        width: 100,
        sortable: false,
        renderCell: (params) => (
          <CustomTableCell>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Tooltip title="Edit Email Account" arrow>
                <ModeEditOutlineOutlinedIcon
                  onClick={() => handleEditEmailAccount(params.row.id)}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title="Delete Email Account" arrow>
                <GridDeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenDeleteDialog(params.row.id)}
                />
              </Tooltip>
            </Box>
          </CustomTableCell>
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
      setLoading(true);
      const data = await dispatch(fetchEmailAccount({ orgId: user?.orgId || "" })).unwrap();
      setTimeout(() => {
        setLoading(false);
        const mappedRows = data.map((account: { _id: any }) => ({
          ...account,
          id: account._id,
        }));
        console.log("Mapped Rows:", mappedRows);
        setEmailAccounts(data);
        setRows(mappedRows);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        setRows(emailAccounts);
      } else {
        const [email, name] = trimmedQuery.split(" ");
        const filteredData = await dispatch(
          SearchEmailAccount({ email, name, orgId: user?.orgId || "" })
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSettingDialog = () => {
    setIsSettingOpen(true);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleEditEmailAccount = (id: string) => {
    if (!id) {
      console.warn("No ID found for this email account");
      return;
    }
    navigate(`/email-account/edit-email-account/${id}`);
    console.log("Navigating to:", `/email-account/edit-email-account/${id}`);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedEmailAccount(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedEmailAccount(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteEmailAccount = async () => {
    if (!selectedEmailAccount) return;
    try {
      await dispatch(deleteEmailAccount(selectedEmailAccount)).unwrap();
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedEmailAccount)
      );
      setEmailAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account._id !== selectedEmailAccount)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Failed to delete email account:", error);
    }
  };

  console.log("Loader", loading);

  const CustomIcon = () => (
    <svg
      fill="none"
      viewBox="0 0 16 16"
      height="22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6.61829L16 3.08496L12.3964 13.5072L6.79537 9.88496L5.70399 14.085L4.75676 9.01829L0 6.61829Z"
        fill="#5F63CB"
      ></path>
      <path
        d="M5.84857 12.3289L6.30159 9.64006L14.559 3.95117L5.14844 8.64006L5.84857 12.3289Z"
        fill="#9297EC"
      ></path>
      <path
        d="M9.30771 11.5067L5.7041 14.0845L6.79548 9.8623L9.30771 11.5067Z"
        fill="var(--theme-color)"
      ></path>
    </svg>
  );

  return (
    <EmailAccountsContainer>
      <EmailAccountHeader>
        <SectionTitle>Email Accounts</SectionTitle>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          {/* <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon> */}
          <SearchBar>
            <Search size={20} />
            <input
              placeholder="Search by Email or Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <EmailAccountDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
          <AdvancedSettingDialog
            open={isSettingOpen}
            onClose={() => setIsSettingOpen(false)}
          />
          <SecondaryButton onClick={handleSettingDialog}>
            Advanced Settings
          </SecondaryButton>
          <Button onClick={handleOpenDialog}>Add Account</Button>
        </Box>
      </EmailAccountHeader>
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
      <EmailAccountTable>
        <CustomDataTable
          columns={columns}
          rows={rows}
          pageSizeOptions={[15, 10, 5]}
          enableCheckboxSelection={true}
        />
      </EmailAccountTable>
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteEmailAccount}
        title="Delete Email Account?"
        message="Are you sure you want to delete this email account?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </EmailAccountsContainer>
  );
};

export default EmailAccounts;
