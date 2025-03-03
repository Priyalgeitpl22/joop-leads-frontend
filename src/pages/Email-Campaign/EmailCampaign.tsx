import React, { SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Table,
  TableBody,
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
} from "@mui/material";
import { Email, Replay, ErrorOutline } from "@mui/icons-material";
import {
  ContentContainer,
  CustomTab,
  CustomTabs,
  SectionTitle,
  EmailCampaignContainer,
  CustomTableRow,
  CustomTableCell,
  CustomTableBody,
} from "./EmailCampaign.styled";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { SearchBar } from "../../components/Header/header.styled";
import { FilterIcon } from "../Email-Account/EmailAccount.styled";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import EmailCampaignDialog from "./EmailCampaignDialog/AddEmailCampaignDialog";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchEmailCampaigns } from "../../redux/slice/emailCampaignSlice";
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
import { TableIcons, TableItem } from "../../styles/layout.styled";

interface EmailCampaignProps {
  router?: any;
}

const EmailCampaign: React.FC<EmailCampaignProps> = ({ router }) => {
  const [activeTab, setActiveTab] = useState("all_campaign");
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);

  useEffect(() => {
    const getEmailCampaigns = async () => {
      await getAllEmailCampaigns();
    };

    getEmailCampaigns();
  }, []);

  const getAllEmailCampaigns = async () => {
    const response = await dispatch(fetchEmailCampaigns());
    setCampaigns(response.payload.data);
  };

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    setActiveTab(newValue);
    if (newValue === "folder") {
    }
  };

  const handleCreateCampaign = () => {
    window.location.assign("/email-campaign/new-campaign");
  };

  const handleCreateFolder = () => {
    setCreateFolder(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <ContentContainer>
      <CustomTabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <CustomTab
          label={`All Campaigns (${campaigns.length})`}
          value="all_campaign"
        />
        <CustomTab label="Folders" value="folder" />
        {activeTab === "all_campaign" && (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginLeft: "auto",
              marginBottom: "10px",
            }}
          >
            <FilterIcon onClick={handleMenuOpen}>
              <FilterAltOutlinedIcon sx={{ color: "var(--icon-color)" }} />
            </FilterIcon>
            <SearchBar>
              <Search size={20} />
              <input placeholder="Search input..." />
            </SearchBar>
            <Button
              // color="white"
              onClick={handleCreateCampaign}
            >
              Create Campaign
            </Button>
          </Box>
        )}

        {activeTab === "folder" && (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <EmailCampaignDialog
              open={createFolder}
              onClose={() => setCreateFolder(false)}
            />
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </Box>
        )}
      </CustomTabs>

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

        {["Campaign Status", "Tag Name", "Team Member", "Client Name"].map(
          (label) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel shrink={false}>{label}</InputLabel>
              <Select sx={{background: "white!important"}}>
                <MenuItem value="">Select {label}</MenuItem>
              </Select>
            </FormControl>
          )
        )}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleMenuClose}>Cancel</Button>
          <Button>Apply</Button>
        </Box>
      </Menu>

      {activeTab === "all_campaign" && (
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: "8px" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8f9fc" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                  Campaign Details
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#35495c" }}>
                  Report
                </TableCell>
              </TableRow>
            </TableHead>

            {campaigns.length > 0 &&
              campaigns.map((campaign) => (
                <CustomTableBody>
                  <CustomTableRow>
                    <CustomTableCell>
                      <div>
                        <h3
                          style={{
                            marginBottom: "8px",
                            color: "var(--title-color)",
                          }}
                        >
                          {campaign.campaignName}
                        </h3>
                        <p
                          style={{
                            fontWeight: "400",
                            color: "var(--text-light)",
                          }}
                        >
                          {`Drafted | ${formatDate(campaign.createdAt)} | ${campaign.sequences.length} Sequences`}
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
                      <ModeEditOutlineOutlinedIcon />
                    </CustomTableCell>
                  </CustomTableRow>
                </CustomTableBody>
              ))}
          </Table>
        </TableContainer>
      )}

      {activeTab === "folder" && (
        <EmailCampaignContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ width: "100%" }}
          >
            <SectionTitle>All Folders</SectionTitle>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "60px 0px",
                width: "100%",
              }}
            >
              <Box
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "570px",
                  width: "100%",
                }}
              >
                <FolderOpenOutlinedIcon
                  style={{ height: "20%", width: "20%" }}
                />
                <Typography style={{ textAlign: "center", fontWeight: "200" }}>
                  Campaign Organization with Folders
                </Typography>
                Streamline Your Workflow by Grouping Campaigns into Folders 🚀.
                <EmailCampaignDialog
                  open={createFolder}
                  onClose={() => setCreateFolder(false)}
                />
                <Button
                  style={{ marginBottom: "10px !important" }}
                  onClick={handleCreateFolder}
                >
                  Create Folder
                </Button>
              </Box>
            </Box>
          </motion.div>
        </EmailCampaignContainer>
      )}
    </ContentContainer>
  );
};

export default EmailCampaign;
