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

interface SenderAccountDialogProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  handleSave: (data: any) => void;
}

const SenderAccountDialog: React.FC<SenderAccountDialogProps> = ({
  open,
  onClose,
  campaignId,
  handleSave,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedEmailAccounts, setSelectedEmailAccounts] = useState<
    EmailAccount[]
  >([]);

  const [rows, setRows] = useState<any[]>([]);
  const [selectedAccounts, setSelectedAccounts] = React.useState<EmailAccounts>(
    []
  );
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
    dispatch(fetchEmailAccount())
      .unwrap()
      .then((data) => {
        setRows(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    console.log(loading);
  }, [dispatch, user]);

  const handleSelectedAccounts = (newSelection: any[]) => {
    console.log(rows);
    setSelectedEmailAccounts(newSelection);
    console.log(selectedEmailAccounts);

    const filteredAccount = rows.filter((o) => {
      return o._id === newSelection[newSelection.length-1];
    })[0] as Account;

    console.log(filteredAccount);

    const formattedSelection: EmailAccounts = newSelection?.map((id) => ({
      account_id: id,
      user: filteredAccount.type === 'imap' ? filteredAccount.smtp.auth.user : undefined,
      pass: filteredAccount.type === 'imap' ? filteredAccount.smtp.auth.pass : undefined,
      oauth2: filteredAccount.type !== 'imap' ? filteredAccount.oauth2 : undefined
    }));

    setSelectedAccounts(formattedSelection);
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
        <Typography variant="h5">Campaign Settings</Typography>
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
          <Box sx={{ display: "flex" }}>
            <SearchBar>
              <Search size={20} />
              <input placeholder="Search input..." />
            </SearchBar>
          </Box>
        </Box>
        <CustomDataTable
          columns={columns}
          rows={rows}
          pageSizeOptions={[5, 10]}
          handleRowSelection={handleSelectedAccounts}
        />
      </CustomDialogContainer>

      <CustomDialogFooter justifyContent={"flex-end"}>
        <Button
          onClick={() => {
            handleSave({
              sender_accounts: selectedAccounts,
              campaign_id: campaignId,
            });
            onClose();
          }}
        >
          Save Email Accounts
        </Button>
      </CustomDialogFooter>
    </Dialog>
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
