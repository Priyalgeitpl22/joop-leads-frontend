import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  EmailAccountTable,
} from "./EmailAccount.styled";
import EmailAccountDialog from "./EmailAccountDialogBox/EmailAccountDialog";
import AdvancedSettingDialog from "./AdvancedSettingDialogBox/AdvancedSettingDialog";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailAccount,
  EmailAccount,
  fetchEmailAccount,
  SearchEmailAccount,
} from "../../redux/slice/emailAccountSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { SearchBar } from "../../components/Header/header.styled";
import { Search, Trash2 } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Container, HeaderContainer } from "../../styles/global.styled";
import { CustomTableCell } from "../Email-Campaign/EmailCampaign.styled";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../styles/layout.styled";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import EmailAccountSmtpDialog from "./EmailAccountDialogBox/EmailAccountSmtpDialog";
import toast, { Toaster } from "react-hot-toast";

const EmailAccounts: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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

  const columns: GridColDef[] = useMemo(() => {
    const baseColumns: GridColDef[] = [
      { field: "name", headerName: "Name", width: 180 },
      { field: "email", headerName: "Email", width: 250 },
      {
        field: "type",
        headerName: "Type",
        width: 120,
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
        field: "enabled",
        headerName: "Warmup Enabled",
        width: 150,
        renderCell: (params: GridRenderCellParams<EmailAccount>) => <Box>{params.row.warmup?.enabled ? "Yes" : "No"}</Box>,
      },
      {
        field: "limit",
        headerName: "Daily Limit",
        width: 140,
        valueGetter: (params: any) => params ?? "N/A",
      },
      {
        field: "reputation",
        headerName: "Reputation",
        width: 140,
        renderCell: () => <Box>100%</Box>,
      },
      // {
      //   field: "createdAt",
      //   headerName: "Created At",
      //   width: 200,
      //   valueGetter: (params: any) => (params ? formatDate(params) : null),
      // },
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
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEditEmailAccount(params.row.id);
                  }}
                  sx={{ cursor: "pointer", color: "var(--secondary-light)" }}
                />
              </Tooltip>
              {user?.role === "Admin" && (
                <Tooltip title="Delete Email Account" arrow>
                  <Trash2
                    size="18"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDeleteDialog(params.row.id);
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          </CustomTableCell>
        ),
      },
    ];
    return baseColumns;
  }, [user?.role]);

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };

    getEmailAccounts();
  }, []);

  useEffect(() => {
    getAllEmailAccounts();
  }, [smtpDialogOpen]);

  const getAllEmailAccounts = async () => {
    try {
      setLoading(true);
      const data = await dispatch(
        fetchEmailAccount({ orgId: user?.orgId || "" })
      ).unwrap();
      setTimeout(() => {
        setLoading(false);
        const mappedRows = data.map((account: EmailAccount) => ({
          ...account,
          id: account._id,
        }));
        setEmailAccounts(data);
        setRows(mappedRows);
      }, 1000);
    } catch (error) {
      console.error("Search failed:", error);
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

  const handleEditEmailAccount = (id: string) => {
    if (!id) {
      console.warn("No ID found for this email account");
      return;
    }
    navigate(`/email-account/edit-email-account/${id}`);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedEmailAccount(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialogBox = () => {
    setSelectedEmailAccount(null);
    setOpenDeleteDialog(false);
  };
  const handleDeleteEmailAccount = async () => {
    if (!selectedEmailAccount) return;
    try {
      await dispatch(deleteEmailAccount(selectedEmailAccount)).unwrap();
      toast.success("Email account deleted successfully!");
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedEmailAccount)
      );
      setEmailAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account._id !== selectedEmailAccount)
      );
      handleCloseDeleteDialogBox();
    } catch (error) {
      console.error("Failed to delete email account:", error);
    }
  };

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

  const handleSmtpDetail = async () => {
    setIsDialogOpen(false);
    setSmtpDialogOpen(true);
  };

  return (
    <Container>
        <Toaster position="top-right" />
        <HeaderContainer style={{ display: isMobile ? "none" : "flex" }}>
          <SectionTitle >
            Email Accounts
          </SectionTitle>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <SearchBar>
              <Search size={20} />
              <input
                placeholder="Search by Email or Name"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchBar>
            <EmailAccountSmtpDialog
              open={smtpDialogOpen}
              onClose={() => setSmtpDialogOpen(false)}
            />
            <EmailAccountDialog
              handleSmtpDetail={handleSmtpDetail}
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
            />
            <AdvancedSettingDialog
              open={isSettingOpen}
              onClose={() => setIsSettingOpen(false)}
            />
            <Button onClick={handleOpenDialog}>Add Account</Button>
          </Box>
        </HeaderContainer>
        <HeaderContainer style={{ display: isMobile ? "flex" : "none" }}>
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <SectionTitle>Email Accounts</SectionTitle>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchBar>
                  <Search size={20} />
                  <input
                    placeholder="Search by Email or Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </SearchBar>
                <EmailAccountSmtpDialog
                  open={smtpDialogOpen}
                  onClose={() => setSmtpDialogOpen(false)}
                />
                <EmailAccountDialog
                  handleSmtpDetail={handleSmtpDetail}
                  open={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                />
                <AdvancedSettingDialog
                  open={isSettingOpen}
                  onClose={() => setIsSettingOpen(false)}
                />
                <Button onClick={handleOpenDialog}>Add Account</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </HeaderContainer>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <EmailAccountTable>
            <CustomDataTable
              columns={columns}
              rows={rows}
              loading={loading}
              handleRowSelection={handleEditEmailAccount}
              pageSizeOptions={[15, 10, 5]}
              enableCheckboxSelection={false}
            />
          </EmailAccountTable>
        </Box>

        <ConfirmDeleteDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialogBox}
          onConfirm={handleDeleteEmailAccount}
          title="Delete Email Account?"
          message="Are you sure you want to delete this email account?"
          confirmText="Delete"
          cancelText="Cancel"
        />
    </Container>
  );
};

export default EmailAccounts;
