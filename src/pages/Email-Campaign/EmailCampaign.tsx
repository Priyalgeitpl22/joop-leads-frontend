import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from "@mui/material";
import {
  ContentContainer,
  SectionHeader,
  CustomTableRow,
  CustomTableCell,
  CustomTableBody,
} from "./EmailCampaign.styled";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { SearchBar } from "../../components/Header/header.styled";
import { FilterIcon } from "../Email-Account/EmailAccount.styled";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  DeleteEmailCampaign,
  fetchEmailCampaigns,
  SearchEmailCampaign,
} from "../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../redux/store/store";
import { IEmailCampaign } from "./NewCampaign/interfaces";
import { formatDate } from "../../utils/utils";
import { Button } from "../../styles/global.styled";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  SectionTitle,
  TableIcons,
  TableItem,
} from "../../styles/layout.styled";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import { CampaignStatus } from "../../enums";
interface EmailCampaignProps {
  router?: any;
}

const EmailCampaign: React.FC<EmailCampaignProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const getEmailCampaigns = async () => {
      await getAllEmailCampaigns();
    };

    getEmailCampaigns();
  }, []);

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
    window.location.assign("/email-campaign/new-campaign");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleDetailCampaign = () => {
    navigate(`/email-campaign/view-email-campaign`);
  };

  const tableData = [
    {
      count: 0,
      icon: ForwardToInboxOutlinedIcon,
      label: "Sent",
      color: "#6e58f1",
    },
    { count: 2, icon: DraftsOutlinedIcon, label: "Opened", color: "#bf51c1" },
    {
      count: 4,
      icon: AdsClickOutlinedIcon,
      label: "Clicked",
      color: "#efba2f",
    },
    {
      count: 7,
      icon: MarkEmailReadOutlinedIcon,
      label: "Replied",
      color: "#51c1c1",
    },
    {
      count: 10,
      icon: AttachMoneyOutlinedIcon,
      label: "Positive Reply",
      color: "#23b820",
    },
    { count: 1, icon: ErrorOutlinedIcon, label: "Bounced", color: "#e01010" },
  ];

  const isMenuOpen = Boolean(anchorEl);

  const handleEditCampaign = (id: string) => {
    navigate(`email-campaign/new-campaign?edit&id=${id}`);
  };

  const handleCampaignDelete = async (campaignId: string) => {
    try {
      const response = await dispatch(DeleteEmailCampaign(campaignId)).unwrap();
      console.log("Campaign deleted successfully:", response);

      await getAllEmailCampaigns();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };

  return (
    <ContentContainer>
      <SectionHeader
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <SectionTitle>Email Campaigns</SectionTitle>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          {/* <FilterIcon onClick={handleMenuOpen}>
            <FilterAltOutlinedIcon sx={{ color: "var(--icon-color)" }} />
          </FilterIcon> */}
          <SearchBar>
            <Search size={20} />
            <input
              placeholder="Search by Campaign Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchBar>
          <Button onClick={handleCreateCampaign}>Create Campaign</Button>
        </Box>
      </SectionHeader>
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

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel shrink={false}>Campaign Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ background: "white!important" }}
          >
            <MenuItem value="">Select Campaign Status</MenuItem>
            {Object.values(CampaignStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleMenuClose}>Cancel</Button>
          <Button>Apply</Button>
        </Box>
      </Menu>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", borderRadius: "8px" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fc" }}>
            <TableRow>
              <TableCell
                colSpan={1}
                sx={{ fontWeight: "bold", color: "#35495c" }}
              >
                Campaign Details
              </TableCell>
              <TableCell
                colSpan={11}
                sx={{ fontWeight: "bold", color: "#35495c" }}
              >
                Report
              </TableCell>
            </TableRow>
          </TableHead>

          {campaigns?.length > 0 ? (
            campaigns.map((campaign) => (
              <CustomTableBody key={campaign.id}>
                <CustomTableRow>
                  <CustomTableCell>
                    <div>
                      <h3
                        style={{
                          marginBottom: "8px",
                          color: "var(--title-color)",
                        }}
                        onClick={handleDetailCampaign}
                      >
                        {campaign.campaignName}
                      </h3>
                      <p
                        style={{
                          fontWeight: "400",
                          color: "var(--text-light)",
                        }}
                      >
                        {`${campaign?.status} | ${formatDate(campaign.createdAt)} | ${campaign?.sequences?.length} Sequences`}
                      </p>
                    </div>
                  </CustomTableCell>

                  {tableData.map((item, index) => (
                    <CustomTableCell key={index}>
                      <TableItem>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "var(--text-light)",
                            fontSize: "24px",
                          }}
                        >
                          {item.count}
                        </p>
                        <TableIcons>
                          <item.icon
                            sx={{ fontSize: "20px", color: item.color }}
                          />
                          <p
                            style={{
                              fontWeight: "400",
                              color: "var(--text-light)",
                              fontSize: "12px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.label}
                          </p>
                        </TableIcons>
                      </TableItem>
                    </CustomTableCell>
                  ))}
                  <CustomTableCell>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                      <Tooltip title="Edit">
                        <ModeEditOutlineOutlinedIcon
                          onClick={() => handleEditCampaign(campaign.id)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <GridDeleteIcon
                          onClick={() => handleCampaignDelete(campaign.id)}
                        />
                      </Tooltip>
                    </Box>
                  </CustomTableCell>
                </CustomTableRow>
              </CustomTableBody>
            ))
          ) : (
            <Paper className="data-grid-container" sx={{ width: "150%" }}>
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#888",
                }}
              >
                No Campaigns found
              </div>
            </Paper>
          )}
        </Table>
      </TableContainer>
    </ContentContainer>
  );
};

export default EmailCampaign;
