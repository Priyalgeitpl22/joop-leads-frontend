import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  ContentContainer,
  SectionHeader,
  CustomTableRow,
  CustomTableCell,
  CustomTableBody,
} from "./EmailCampaign.styled";
import { SearchBar } from "../../components/Header/header.styled";
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
  TableItem,
} from "../../styles/layout.styled";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const EmailCampaign: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

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
      await dispatch(DeleteEmailCampaign(selectedCampaign)).unwrap();
      console.log("Campaign deleted successfully");

      handleCloseDeleteDialog();
      getAllEmailCampaigns();
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

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", borderRadius: "8px" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f8f9fc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                Campaign Details
              </TableCell>
              <TableCell
                colSpan={6}
                sx={{ fontWeight: "bold", color: "#35495c" }}
              >
                Report
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {campaigns.map((campaign) => (
            <CustomTableBody key={campaign.id}>
              <CustomTableRow>
                <CustomTableCell>
                  <h3 onClick={handleDetailCampaign}>
                    {campaign.campaignName}
                  </h3>
                  <p>{`${campaign?.status} | ${formatDate(campaign.createdAt)} | ${campaign?.sequences?.length} Sequences`}</p>
                </CustomTableCell>

                {tableData.map((item, index) => (
                  <CustomTableCell key={index}>
                    <TableItem>
                      <item.icon sx={{ fontSize: "20px", color: item.color }} />
                      <p>
                        {item.label}: {item.count}
                      </p>
                    </TableItem>
                  </CustomTableCell>
                ))}

                <CustomTableCell>
                  <Tooltip title="Edit">
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => handleEditCampaign(campaign.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <GridDeleteIcon
                      onClick={() => handleOpenDeleteDialog(campaign.id)}
                    />
                  </Tooltip>
                </CustomTableCell>
              </CustomTableRow>
            </CustomTableBody>
          ))}
        </Table>
      </TableContainer>

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleCampaignDelete}
        title="Delete Campaign?"
        message="Are you sure you want to delete this campaign?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </ContentContainer>
  );
};

export default EmailCampaign;
