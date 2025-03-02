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
} from "@mui/material";
import {
  EmailAccountsContainer,
  EmailAccountHeader,
  EmailAccountTable,
  FilterIcon,
  StyledWarmup,
} from "./EmailAccount.styled";
import EmailAccountDialog from "./EmailAccountDialogBox/EmailAccountDialog";
import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailAccount,
  fetchEmailAccount,
} from "../../redux/slice/emailAccountSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/utils";
import { Button, SecondaryButton } from "../../styles/global.styled";

const EmailAccounts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.user);

  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 150 },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "type",
        headerName: "Type",
        width: 120,
        renderCell: (params: any) => {
          if (params.value === "gmail") {
            return (
              <img
                src="https://img.icons8.com/color/48/000000/gmail-new.png"
                alt="Gmail Icon"
                width="24"
                height="24"
              />
            );
          } else if (params.value === "outlook") {
            return (
              <img
                src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019.png"
                alt="Outlook Icon"
                width="24"
                height="24"
              />
            );
          } else if (params.value === "imap") {
            return <CustomIcon />;
          } else {
            return null;
          }
        },
      },
      {
        field: "warm_up",
        headerName: "Warmup Enabled",
        width: 120,
        renderCell: (params: any) => <StyledWarmup>Yes</StyledWarmup>,
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
        width: 120,
        renderCell: () => <StyledWarmup>100%</StyledWarmup>,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 180,
        valueGetter: (params: any) => (params ? formatDate(params) : null),
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
    dispatch(fetchEmailAccount())
      .unwrap()
      .then((data) => {
        setEmailAccounts(data);
        setRows(data);
        // setLoading(false);
        toast.success("Email Accounts fetched successfully");
      })
      .catch((error) => {
        console.error("Failed to fetch Account:", error);
        toast.error("Failed to fetch Account");
      });
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
  };

  const isMenuOpen = Boolean(anchorEl);

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
        {/* <SectionTitle>Email Account</SectionTitle> */}
        <Box sx={{ display: "flex", gap: "20px", width: "100%" }}>
          <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon>
          <SearchBar>
            <Search size={20} />
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
          <SecondaryButton onClick={handleSettingDialog}>
            Advanced Settings
          </SecondaryButton>
          <Button onClick={handleOpenDialog}>Add Account</Button>
        </Box>
      </EmailAccountHeader>
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
            <Select>
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
          pageSizeOptions={[10, 10]}
        />
      </EmailAccountTable>
    </EmailAccountsContainer>
  );
};

export default EmailAccounts;
