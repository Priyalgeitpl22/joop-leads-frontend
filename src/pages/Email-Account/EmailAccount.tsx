import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Tooltip,
  Button as MuiButton
} from "@mui/material";
import {
  EmailAccountsContainer,
  EmailAccountHeader,
  EmailAccountTable,
} from "./EmailAccount.styled";
import EmailAccountDialog from "./EmailAccountDialogBox/EmailAccountDialog";
import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AssessmentIcon from '@mui/icons-material/Assessment';
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

import { useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import { SectionTitle } from "../../styles/layout.styled";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import EmailAccountSmtpDialog from "./EmailAccountDialogBox/EmailAccountSmtpDialog";
import EmailAnalyticsDialog from "./EmailAnalyticsDialog";
import {
  getWarmupSettings,
  setupEmailWarmup
} from "../../services/emailWarmupService";
import toast, { Toaster } from "react-hot-toast";
// import ProgressBar from "../../assets/Custom/linearProgress";

const EmailAccounts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmailAccount, setSelectedEmailAccount] = useState<
    string | null
  >(null);
  const [smtpDialogOpen, setSmtpDialogOpen] = useState<boolean>(false);
  const [analyticsDialogOpen, setAnalyticsDialogOpen] = useState<boolean>(false);
  const [selectedAccountForAnalytics, setSelectedAccountForAnalytics] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [warmupEnabledMap, setWarmupEnabledMap] = useState<Record<string, boolean>>({});

  const columns: GridColDef[] = useMemo(() => {
    const baseColumns: GridColDef[] = [
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
        field: "enableWarmup",
        headerName: "Warmup Enabled",
        width: 150,
        renderCell: (params) => (
          <Box>{warmupEnabledMap[params.row.id] ? "Yes" : "No"}</Box>
        ),
      },
      {
        field: "msg_per_day",
        headerName: "Daily Limit",
        width: 120,
        valueGetter: (params: any) => (params ?? "N/A"),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        valueGetter: (params: any) => (params ? formatDate(params) : null),
      },
      {
        field: "action",
        headerName: "Action",
        width: 140,
        sortable: false,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Tooltip title="Email Analytics" arrow>
              <AssessmentIcon
                onClick={() => handleOpenAnalyticsDialog(params.row)}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Tooltip title="Edit Email Account" arrow>
              <ModeEditOutlineOutlinedIcon
                onClick={() => handleEditEmailAccount(params.row.id)}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>

            {user?.role === "Admin" && (
              <Tooltip title="Delete Email Account" arrow>
                <GridDeleteIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenDeleteDialog(params.row.id)}
                />
              </Tooltip>
            )}
          </Box>
        ),
      },
    ];
    return baseColumns;
  }, [user?.role, warmupEnabledMap]);

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };

    getEmailAccounts();
  }, []);

  useEffect(() => {
    getAllEmailAccounts();
  }, [smtpDialogOpen]);

  useEffect(() => {
    // Fetch warmup settings for each account
    const fetchWarmupSettings = async () => {
      const enabledMap: Record<string, boolean> = {};
      
      if (rows.length > 0) {
        for (const row of rows) {
          try {
            // First try to get existing warmup settings
            console.log(`Checking warmup settings for account ${row.id}`);
            const response = await getWarmupSettings(row.id);
            
            if (!response.success) {
              // If settings don't exist, set up default warmup settings
              console.log(`No settings exist, setting up default warmup for account ${row.id}`);
              const setupResponse = await setupEmailWarmup(row.id, false, 50);
              
              if (setupResponse.success) {
                console.log(`Successfully set up warmup for ${row.id}`);
                // Wait a moment to ensure settings are created on the server
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Verify the settings were created
                const verifyResponse = await getWarmupSettings(row.id);
                enabledMap[row.id] = verifyResponse.success && verifyResponse.data?.isEnabled || false;
              } else {
                console.error(`Failed to set up warmup for ${row.id}:`, setupResponse.error);
                enabledMap[row.id] = false;
              }
            } else {
              // Use existing settings
              console.log(`Found existing warmup settings for ${row.id}:`, response.data?.isEnabled);
              enabledMap[row.id] = response.data?.isEnabled || false;
            }
          } catch (error) {
            console.error(`Error handling warmup settings for ${row.id}:`, error);
            enabledMap[row.id] = false;
          }
        }
        
        setWarmupEnabledMap(enabledMap);
      }
    };
    
    fetchWarmupSettings();
  }, [rows]);

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
        const filteredData = await dispatch(
          SearchEmailAccount({ query: trimmedQuery, orgId: user?.orgId || "" })
        ).unwrap();
        setRows(filteredData.data);
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    getAllEmailAccounts();
    setIsDialogOpen(false);
  };

  const handleOpenSettingDialog = () => {
    setIsSettingOpen(true);
  };

  const handleCloseSettingDialog = () => {
    setIsSettingOpen(false);
  };

  const handleEditEmailAccount = (id: string) => {
    navigate(`/email-account/edit/${id}`);
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
    if (selectedEmailAccount) {
      try {
        await dispatch(deleteEmailAccount(selectedEmailAccount)).unwrap();
        await getAllEmailAccounts();
        toast.success("Email account deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete email account");
      } finally {
        setOpenDeleteDialog(false);
        setSelectedEmailAccount(null);
      }
    }
  };

  const handleOpenAnalyticsDialog = (account: any) => {
    setSelectedAccountForAnalytics({
      id: account.id,
      name: account.name,
      email: account.email
    });
    setAnalyticsDialogOpen(true);
  };

  const handleCloseAnalyticsDialog = () => {
    setSelectedAccountForAnalytics(null);
    setAnalyticsDialogOpen(false);
    getAllEmailAccounts(); // Refresh list to show updated warmup status
  };

  const CustomIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" fill="#6B7280" />
      <text
        x="10"
        y="10"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        I
      </text>
    </svg>
  );

  const handleSmtpDetail = async () => {
    setSmtpDialogOpen(true);
  };

  return (
    <>
      <EmailAccountsContainer>
        <EmailAccountHeader>
          <SectionTitle>Email Accounts</SectionTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <SearchBar>
              <Search size={18} />
              <input
                type="text"
                placeholder="Search email account..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchBar>
            <MuiButton
              onClick={handleOpenDialog}
              variant="contained"
              size="medium"
            >
              Add Account
            </MuiButton>
          </Box>
        </EmailAccountHeader>
        <EmailAccountTable>
          {loading ? (
            <ProgressBar />
          ) : (
            <CustomDataTable
              rows={rows}
              columns={columns}
            />
          )}
        </EmailAccountTable>
      </EmailAccountsContainer>

      <EmailAccountDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        handleSmtpDetail={handleSmtpDetail}
      />
      <AdvancedSettingDialog
        open={isSettingOpen}
        onClose={handleCloseSettingDialog}
      />
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteEmailAccount}
        title="Delete Email Account"
        message="Are you sure you want to delete this email account? This action cannot be undone."
      />

      <EmailAccountSmtpDialog
        open={smtpDialogOpen}
        onClose={() => setSmtpDialogOpen(false)}
      />

      {selectedAccountForAnalytics && (
        <EmailAnalyticsDialog
          open={analyticsDialogOpen}
          onClose={handleCloseAnalyticsDialog}
          accountId={selectedAccountForAnalytics.id}
          accountName={selectedAccountForAnalytics.name}
          accountEmail={selectedAccountForAnalytics.email}
        />
      )}
      <Toaster position="top-center" />
    </>
  );
};

export default EmailAccounts;
