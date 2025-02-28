import React, { useEffect, useState, useCallback } from "react";
import {
  StyledTableContainer,
  StyledTableHeadCell,
  SenderAccountTable,
  StyledTableCell,
  StyledTableHead,
  StyledTableCheckbox,
  StyledWarmup,
  StyledReputation,
  CustomEditIconButton,
} from "./SenderAccountDialog.styled";
import Loader from "../../../../../components/Loader";
import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Button,
  Checkbox,
  Menu,
  Table,
  TableBody,
  TableRow,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { SearchBar } from "../../../../../components/Header/header.styled";
import { Search } from "lucide-react";
import {
  EmailAccount,
  fetchEmailAccount,
} from "../../../../../redux/slice/emailAccountSlice";
import { addEmailCampaignSettings } from "../../../../../redux/slice/emailCampaignSlice";
import { EmailAccounts } from "../Interface";

const tableColumns = [
  "Name",
  "Email",
  "Daily Limit",
  "Warmup Enabled",
  "Reputation",
  "Type",
];
const filterOptions = ["Disconnected Accounts", "Warmup Reputation"];
const selectFilters = ["Warmup Status", "Tag Name", "Client Name"];

interface SenderAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

const SenderAccountDialog: React.FC<SenderAccountDialogProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmailAccounts, setSelectedEmailAccounts] = useState<
    EmailAccounts[]
  >([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    dispatch(fetchEmailAccount())
      .unwrap()
      .then(setEmailAccounts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dispatch, user]);

  const handleCheckboxChange = (_id: string) => {
    setSelectedEmailAccounts((prevAccounts) => {
      if (prevAccounts.some((account) => account.account_id === _id)) {
        return prevAccounts.filter((account) => account.account_id !== _id);
      } else {
        return [...prevAccounts, { account_id: _id }];
      }
    });
  };

  const handleSave = () => {
    if (selectedEmailAccounts.length === 0) {
      alert("Please select at least one email account.");
      return;
    }
    dispatch(
      addEmailCampaignSettings({
        sender_accounts: selectedEmailAccounts,
        campaign_id: "250cac40-bbbf-4da2-96e7-67d8ad6094f4",
        auto_warm_up: false,
        schedule_settings: {
          time_zone: "",
          send_these_days: [],
          time_sequences: {
            from: "",
            to: "",
            minutes: "",
          },
          start_date: "",
          max_leads_per_day: 0,
        },
        campaign_settings: {
          campaign_name: "",
          stop_message_on_lead: "",
          email_delivery_optimization: false,
          excluded_tracking: {
            dont_track_open_emails: false,
            dont_track_link_clicks: false,
          },
          priority_sending_pattern: 0,
          company_auto_pause: false,
          enhanced_email_delivery: false,
          bounce_rate: false,
          unsubscribe: false,
        },
      })
    )
      .unwrap()
      .then(() => {
        // alert("Campaign settings saved successfully!");
        onClose();
      })
      .catch(() => alert("Failed to save campaign settings."));
  };

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    []
  );
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);

  if (loading) return <Loader />;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box sx={{ minWidth: "80%" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            background: "#f1f2fb",
            padding: "12px 24px",
          }}
        >
          Campaign Settings
        </DialogTitle>
        <Box
          sx={{
            padding: "12px 15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography mt={1} ml={1}>
            Email Account
          </Typography>
          <Box sx={{ display: "flex" }}>
            <SearchBar>
              <Search size={20} color="#64748b" />
              <input placeholder="Search input..." />
            </SearchBar>
          </Box>
        </Box>
        <SenderAccountTable>
          <StyledTableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCheckbox>
                    <Checkbox />
                  </StyledTableCheckbox>
                  {tableColumns.map((col) => (
                    <StyledTableHeadCell key={col}>{col}</StyledTableHeadCell>
                  ))}
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {emailAccounts.map(({ _id, name, email }) => (
                  <TableRow key={_id}>
                    <StyledTableCheckbox>
                      <Checkbox
                        checked={selectedEmailAccounts
                          .map((id) => id.account_id)
                          .includes(_id)}
                        onChange={() => handleCheckboxChange(_id)}
                      />
                    </StyledTableCheckbox>
                    <StyledTableCell>{name}</StyledTableCell>
                    <StyledTableCell>{email}</StyledTableCell>
                    <StyledTableCell>0/100</StyledTableCell>
                    <StyledTableCell>
                      <StyledWarmup>Yes</StyledWarmup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledReputation>100%</StyledReputation>
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomEditIconButton>
                        <CustomIcon />
                      </CustomEditIconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </SenderAccountTable>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            background: "#6e58f1",
            color: "white",
            mt: 2,
            mb: 3,
            float: "right",
          }}
        >
          Save Email Accounts
        </Button>
      </Box>
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
      fill="#6E58F1"
    ></path>
  </svg>
);

export default SenderAccountDialog;
