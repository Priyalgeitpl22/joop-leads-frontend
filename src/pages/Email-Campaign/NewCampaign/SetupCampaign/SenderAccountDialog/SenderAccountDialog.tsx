import React, { useEffect, useMemo, useState } from "react";
import { Dialog, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { SearchBar } from "../../../../../components/Header/header.styled";
import { Search } from "lucide-react";
import {
  EmailAccount,
  fetchEmailAccount,
  SearchEmailAccount,
} from "../../../../../redux/slice/emailAccountSlice";
import {
  Button,
  CustomDialogContainer,
  CustomDialogFooter,
  CustomDialogHeader,
} from "../../../../../styles/global.styled";
import { CustomDataTable } from "../../../../../assets/Custom/customDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../../../../utils/utils";
import { StyledWarmup } from "./SenderAccountDialog.styled";
import { Account, EmailAccounts } from "../Interface";
import { getCampaignById } from "../../../../../redux/slice/emailCampaignSlice";

interface SenderAccountDialogProps {
  open: boolean;
  onClose: () => void;
  campaign_id?: string;
  handleSave: (data: any) => void;
  senderAccounts?: any;
  handleSenderAccountValid: (data: any) => void;
}

const SenderAccountDialog: React.FC<SenderAccountDialogProps> = ({
  open,
  onClose,
  campaign_id,
  handleSave,
  handleSenderAccountValid
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [senderAccounts, setSenderAccounts] = useState<EmailAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmailAccounts, setSelectedEmailAccounts] = useState<string[]>(
    []
  );
  const [rows, setRows] = useState<any[]>([]);
  const [selectedAccounts, setSelectedAccounts] = React.useState<EmailAccounts>(
    []
  );
  const { user } = useSelector((state: RootState) => state.user);
  const isSaveDisabled = selectedEmailAccounts.length === 0;


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
        renderCell: () => <StyledWarmup>Yes</StyledWarmup>,
      },
      {
        field: "daily_limit",
        headerName: "Daily Limit",
        width: 120,
        valueGetter: (params: any) => (params ?? "N/A"),
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
    handleSenderAccountValid(!isSaveDisabled);
  }, [isSaveDisabled]);

  useEffect(() => {
    console.log(emailAccounts);
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    const id = campaignId ?? campaign_id;
    if (id !== undefined && id !== null) {
      fetchCampaignDetails(id);
    }

    dispatch(fetchEmailAccount({ orgId: user?.orgId || "" }))
      .unwrap()
      .then((data) => {
        setRows(data);
        setSenderAccounts(data);
      })
      .catch(console.error);
  }, [open]);

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      const senderAccounts = campaign.sender_accounts;
      const accountIds = senderAccounts.map((o: any) => o.account_id);
      setSelectedEmailAccounts(accountIds);
      console.log("SetSelectedAEmailAccount", selectedEmailAccounts);
      setEmailAccounts(senderAccounts);
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  const handleSelectedAccounts = (newSelection: any[]) => {
    console.log("selectedEmailAccounts", selectedEmailAccounts);
    setSelectedEmailAccounts(newSelection);

    // Ensure we get correct details for each selected account
    const formattedSelection: EmailAccounts = newSelection.map((id) => {
      const account = rows.find((o) => o._id === id) as Account; // Find correct account for each ID

      return {
        account_id: id,
        type: account.type,
        email: account.email,
        smtp: account.smtp,
        user: account.type === "imap" ? account.smtp.auth.user : undefined,
        pass: account.type === "imap" ? account.smtp.auth.pass : undefined,
        oauth2: account.type !== "imap" ? account.oauth2 : undefined,
      };
    });

    setSelectedAccounts(formattedSelection);
  };

  useEffect(() => {
    const getEmailAccounts = async () => {
      await getAllEmailAccounts();
    };

    getEmailAccounts();
  }, []);

  const getAllEmailAccounts = async () => {
    try {
      const data = await dispatch(
        fetchEmailAccount({ orgId: user?.orgId || "" })
      ).unwrap();

      const formattedData = data.map((item: any) => ({
        ...item,
        id: item._id,
      }));

      setEmailAccounts(formattedData);
      setRows(formattedData);
    } catch (error) {
      console.error("Failed to fetch Account:", error);
    }
  };

  const handleSearch = async (query: string) => {
    try {

      const trimmedQuery = query.trim();
      if (trimmedQuery === "") {
        setRows(senderAccounts);
        return;
      }

      const filteredData = await dispatch(
        SearchEmailAccount({ query: trimmedQuery, orgId: user?.orgId || "" })
      ).unwrap();

      // const formattedData = filteredData.map((item: any) => ({
      //   ...item,
      //   id: item._id,
      // }));

      setRows(filteredData.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ overflowX: "hidden" }}
    >
      <CustomDialogHeader>
        <Typography variant="h5">Choose Sender Accounts</Typography>
        {
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        }
      </CustomDialogHeader>

      <CustomDialogContainer>
        <Box
          sx={{
            background: "white",
            padding: "12px 15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: "18px" }}
            mt={1}
            // ml={1}
          >
            Email Accounts
          </Typography>
          <Box>
            <SearchBar>
              <Search size={20} />
              <input
                placeholder="Search by Email or Name"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </SearchBar>
          </Box>
        </Box>
        <Box sx={{ height: "350px", overflow: "auto" }}>
          <CustomDataTable
            columns={columns}
            rows={rows}
            pageSizeOptions={[15, 10, 5]}
            handleRowSelection={handleSelectedAccounts}
            rowSelectionModel={selectedEmailAccounts}
          />
        </Box>
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent={"flex-end"}>
        <Button
          onClick={() => {
            handleSave({
              sender_accounts: selectedAccounts,
              campaign_id: campaign_id,
            });
            onClose();
          }}
          disabled={isSaveDisabled}
          style={{
            backgroundColor: isSaveDisabled ? "#878484" : "var(--theme-color)",
            color: isSaveDisabled ? "lightgray" : "white"

          }}
        >
          Save Email Accounts
        </Button>
      </CustomDialogFooter>
    </Dialog >
  );
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

export default SenderAccountDialog;
