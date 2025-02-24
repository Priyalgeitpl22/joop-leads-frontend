import React, { useEffect, useState } from "react";
import {
  StyledTableContainer,
  StyledTableHeadCell,
  SenderAccountTable,
  StyledTableCell,
  StyledTableHead,
  CustomEditIconButton,
  StyledWarmup,
  StyledReputation,
  StyledTableCheckbox,
  FilterIcon,
} from "../../../../Email-Campaign/NewCampaign/SetupCampaign/SenderAccountDialog/SenderAccountDialog.styled";
import {
  Typography,
  Box,
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
import {
  EmailAccount,
  fetchEmailAccount,
} from "../../../../../redux/slice/emailAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { SearchBar } from "../../../../../components/Header/header.styled";
import { Search } from "lucide-react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const EmailCampaignSetting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.user);
  // const { data } = useSelector((state: RootState) => state.agents);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    if (user) {
      dispatch(fetchEmailAccount())
        .unwrap()
        .then((data) => {
          setEmailAccounts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch Account:", error);
        });
    }
  }, [dispatch, user]);

  const CustomIcon = () => (
    <svg
      fill="none"
      viewBox="0 0 16 16"
      height="16"
      width="16"
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

  return (
    <Box sx={{ minWidth: "100%", maxWidth: "fit-content !important" }}>
      <Box
        sx={{
          padding: "12px 15px",
          fontWeight: "bold",
          display: "flex",
          gap: "55%",
        }}
      >
        <Typography mt={1}>Email Account</Typography>
        <Box sx={{ display: "flex" }}>
          <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon />
          </FilterIcon>
          <SearchBar style={{ width: "80%" }}>
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
                  <Checkbox {...label} />
                </StyledTableCheckbox>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell>Email</StyledTableHeadCell>
                <StyledTableHeadCell>Daily Limit</StyledTableHeadCell>
                <StyledTableHeadCell>Warmup Enabled</StyledTableHeadCell>
                <StyledTableHeadCell>Reputation</StyledTableHeadCell>
                <StyledTableHeadCell>Type</StyledTableHeadCell>
              </TableRow>
            </StyledTableHead>
            <TableBody style={{ background: "#ffff" }}>
              {emailAccounts.map((account) => (
                <TableRow key={account.id}>
                  <StyledTableCheckbox>
                    <Checkbox {...label} />
                  </StyledTableCheckbox>
                  <StyledTableCell>{account.name}</StyledTableCell>
                  <StyledTableCell>{account.email}</StyledTableCell>
                  <StyledTableCell>0/100</StyledTableCell>
                  <StyledTableCell>
                    <div>
                      <StyledWarmup>yes</StyledWarmup>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <StyledReputation>100%</StyledReputation>
                  </StyledTableCell>
                  {/* <StyledTableCell>warmup</StyledTableCell> */}
                  {/* <StyledTableCell>
                  <StyledWarmup>{account.type}</StyledWarmup>
                </StyledTableCell> */}
                  {/* <StyledTableCell></StyledTableCell> */}
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
        sx={{
          backgroundColor: "#E4D9FF",
          color: "white",
          background: "#6e58f1",
          marginTop: "15px",
          marginBottom: "20px",
          marginRight: "10px",
          float: "right",
          textTransform: "none",
        }}
      >
        Save Email Accounts
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "260px",
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
            sx={{ color: "#6e58f1", fontSize: "14px" }}
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
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel shrink={false}>{label}</InputLabel>
            <Select>
              <MenuItem value="">Select {label}</MenuItem>
            </Select>
          </FormControl>
        ))}

        <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "#ccc",
              textTransform: "none",
              borderRadius: "8px",
              width: "45%",
            }}
            onClick={handleMenuClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6e58f1",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              width: "45%",
            }}
          >
            Apply
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default EmailCampaignSetting;
