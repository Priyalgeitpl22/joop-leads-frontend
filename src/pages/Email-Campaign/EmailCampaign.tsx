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
  IconButton,
  CircularProgress,
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
  UpdateCampaignStatus,
} from "../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../redux/store/store";
import { IEmailCampaign } from "./NewCampaign/interfaces";
import { formatDateTime } from "../../utils/utils";
import { Button } from "../../styles/global.styled";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { SectionTitle, TableItem } from "../../styles/layout.styled";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import toast from "react-hot-toast";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DoneIcon from "@mui/icons-material/Done";

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

  const handleDetailCampaign = (id: string) => {
    navigate(`/email-campaign/view-email-campaign?view&id=${id}`);
  };

  const tableData = [
    {
      count: 0,
      icon: ForwardToInboxOutlinedIcon,
      label: "Sent",
      count_label: "sent_count",
      color: "#6e58f1",
    },
    {
      count: 2,
      icon: DraftsOutlinedIcon,
      label: "Opened",
      color: "#bf51c1",
      count_label: "opened_count",
    },
    {
      count: 4,
      icon: AdsClickOutlinedIcon,
      count_label: "clicked_count",
      label: "Clicked",
      color: "#efba2f",
    },
    {
      count: 1,
      icon: ErrorOutlinedIcon,
      count_label: "bounced_count",
      label: "Bounced",
      color: "var(--error-color)",
    },
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
      const response = await dispatch(
        DeleteEmailCampaign(selectedCampaign)
      ).unwrap();
      if (response?.code === 200) {
        toast.success(
          response?.message || "Contacts have been deactivated successfully."
        );
      } else {
        toast.error("Failed to deactivate contacts.");
      }
      handleCloseDeleteDialog();
      getAllEmailCampaigns();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };

  const handlePause = async (campaignId: string) => {
    setLoading(true);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000)); // Ensure 1 sec loading

    try {
      await dispatch(
        UpdateCampaignStatus({ campaignId, status: "PAUSED" })
      ).unwrap();
      await getAllEmailCampaigns();
      console.log("Campaign paused successfully");
    } catch (error) {
      console.error("Error pausing campaign:", error);
    } finally {
      await minLoadingTime;
      setLoading(false);
    }
  };

  const handleResume = async (campaignId: string) => {
    setLoading(true);

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000)); // Ensure 1 sec loading

    try {
      await dispatch(
        UpdateCampaignStatus({ campaignId, status: "RUNNING" })
      ).unwrap();
      await getAllEmailCampaigns();
      console.log("Campaign resumed successfully");
    } catch (error) {
      console.error("Error resuming campaign:", error);
    } finally {
      await minLoadingTime;
      setLoading(false);
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
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
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
        sx={{
          boxShadow: "none",
          borderRadius: "8px",
          overflowY: "auto",
          height: "calc(100vh - 150px)",
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f8f9fc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                Campaign Details
              </TableCell>
              <TableCell
                colSpan={4}
                sx={{ fontWeight: "bold", color: "#35495c" }}
              >
                Report
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {campaigns.map((campaign) => (
            <CustomTableBody key={campaign.id}>
              <CustomTableRow>
                <CustomTableCell
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "12px",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "relative",
                      border: "3px solid #ccc7c7",
                      padding: "6px",
                      width: 36,
                      height: 36,
                    }}
                  >
                    {campaign.status === "RUNNING" && !loading && (
                      <Tooltip title="Pause">
                        <PauseIcon
                          style={{ fontSize: 20, color: "#acacac" }}
                          onClick={() => handlePause(campaign.id)}
                        />
                      </Tooltip>
                    )}

                    {campaign.status === "PAUSED" && !loading && (
                      <Tooltip title="Resume">
                        <PlayArrowIcon
                          style={{ fontSize: 20, color: "#acacac" }}
                          onClick={() => handleResume(campaign.id)}
                        />
                      </Tooltip>
                    )}

                    {campaign.status === "COMPLETED" && !loading && (
                      <Tooltip title="completed">
                        <DoneIcon
                          style={{ fontSize: 20, color: "#acacac" }}
                        // onClick={() => handleResume(campaign.id)}
                        />
                      </Tooltip>
                    )}

                    {(campaign.status === "DRAFT" ||
                      campaign.status === "SCHEDULED") &&
                      !loading && (
                        <Tooltip title="Edit">
                          <ModeEditOutlineOutlinedIcon
                            style={{ fontSize: 20, color: "#acacac" }}
                            onClick={() => handleEditCampaign(campaign.id)}
                          />
                        </Tooltip>
                      )}

                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "#d2cece",
                          position: "absolute",
                          top: "12% !important",
                          left: "10%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </IconButton>

                  <div>
                    <h6 onClick={() => handleDetailCampaign(campaign.id)}>
                      {campaign.campaignName}
                    </h6>
                    <p>{`${campaign?.status} | ${formatDateTime(campaign?.createdAt)} | ${campaign?.sequences?.length} Sequences`}</p>
                  </div>
                </CustomTableCell>

                {tableData.map((item, index) => (
                  <CustomTableCell key={index}>
                    <TableItem>
                      <item.icon sx={{ fontSize: "20px", color: item.color }} />
                      <p>
                        {item.label}:{" "}
                        {
                          campaign?.analytics_count[
                          item.count_label as keyof typeof campaign.analytics_count
                          ]
                        }
                      </p>
                    </TableItem>
                  </CustomTableCell>
                ))}

                <CustomTableCell sx={{ display: "flex" }}>
                  {/* <Tooltip title="Edit">
                    <ModeEditOutlineOutlinedIcon
                      onClick={() => handleEditCampaign(campaign.id)}
                    />
                  </Tooltip> */}
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
        {campaigns.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
            No campaigns found
          </div>
        )}
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
