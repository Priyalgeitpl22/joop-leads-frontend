import { SetStateAction, useState } from "react";
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
  Button,
  Link,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Email,
  Replay,
  ErrorOutline,
} from "@mui/icons-material";
import { ContentContainer, CustomTab, CustomTabs, SectionTitle, EmailCampaignContainer } from "./EmailCampaign.styled";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { SearchBar } from "../../components/Header/header.styled";
import { FilterIcon } from "../Email-Account/EmailAccount.styled";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import EmailCampaignDialog from "./EmailCampaignDialog/AddEmailCampaignDialog";
import { Search } from "lucide-react";
import { Button2 } from "../../styles/layout.styled";
import { useNavigate } from "react-router-dom";


const EmailCampaign = () => {
  const [activeTab, setActiveTab] = useState("all_campaign");
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  

  const handleTabChange = (_: any, newValue: SetStateAction<string>) => {
    setActiveTab(newValue);
    if (newValue === "folder"){}
  };

  const handleCreateCampaign = () =>{
    navigate('/email-campaign/new-campaign')
  }

  const handleCreateFolder = () => {
    setCreateFolder(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const campaignData = [
    {
      progress: 31,
      name: "Newly created - Siva",
      createdAt: "22 Jan, 11:11 pm",
      sequences: 4,
      sent: 845,
      opened: 200,
      clicked: 0,
      replied: 1,
      positiveReply: true,
      bounced: 53,
    },
    {
      progress: 80,
      name: "Dharmendra 500 Leads",
      createdAt: "09 Jan, 11:40 pm",
      sequences: 5,
      sent: 666,
      opened: "NA",
      clicked: "NA",
      replied: 7,
      positiveReply: true,
      bounced: 7,
    },
  ];


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
        <CustomTab label="All Campaign" value="all_campaign" />
        <CustomTab label="Folders" value="folder" />
        {activeTab === "all_campaign" && (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <FilterIcon onClick={handleMenuOpen}>
              <FilterAltOutlinedIcon />
            </FilterIcon>
            <SearchBar>
              <Search size={20} color="#64748b" />
              <input placeholder="Search input..." />
            </SearchBar>
            <Button2
              background="#6e58f1"
              color="white"
              style={{ height: "80%" }}
              onClick={handleCreateCampaign}
            >
              Create Campaign
            </Button2>
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
            <Button2
              background="#6e58f1"
              color="white"
              style={{ height: "90%" }}
              onClick={handleCreateFolder}
            >
              Create Folder
            </Button2>
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
            sx={{ color: "#6e58f1", fontSize: "14px" }}
          >
            Clear all
          </Link>
        </Box>

        {["Campaign Status", "Tag Name", "Team Member", "Client Name"].map(
          (label) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel shrink={false}>{label}</InputLabel>
              <Select>
                <MenuItem value="">Select {label}</MenuItem>
              </Select>
            </FormControl>
          )
        )}

        <Box display="flex" justifyContent="space-between" mt={2}>
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

            <TableBody>
              {campaignData.map((campaign, index) => (
                <TableRow key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: `conic-gradient(#6e58f1 ${campaign.progress}%, #ddd ${campaign.progress}%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#35495c",
                          fontSize: "14px",
                          fontWeight: "bold",
                          mr: 1.5,
                        }}
                      >
                        {campaign.progress}%
                      </Box>

                      <Box>
                        <Link
                          href="#"
                          sx={{
                            fontWeight: "bold",
                            color: "#6e58f1",
                            textDecoration: "none",
                          }}
                        >
                          {campaign.name}
                        </Link>
                        <Typography variant="body2" sx={{ color: "#667085" }}>
                          Paused | Created At: {campaign.createdAt} |{" "}
                          {campaign.sequences} sequences
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography
                        sx={{
                          color: "#6e58f1",
                          fontWeight: "bold",
                          width: "50px",
                        }}
                      >
                        {campaign.sent}
                      </Typography>
                      <Email
                        sx={{
                          fontSize: "18px",
                          color: "#667085",
                          marginLeft: "4px",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#9b51e0",
                          fontWeight: "bold",
                          width: "50px",
                          marginLeft: "16px",
                        }}
                      >
                        {campaign.opened}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#667085",
                          fontWeight: "bold",
                          width: "50px",
                          marginLeft: "16px",
                        }}
                      >
                        {campaign.clicked}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#2db5a7",
                          fontWeight: "bold",
                          width: "50px",
                          marginLeft: "16px",
                        }}
                      >
                        {campaign.replied}
                      </Typography>
                      <Replay
                        sx={{
                          fontSize: "18px",
                          color: "#2db5a7",
                          marginLeft: "4px",
                        }}
                      />

                      {campaign.positiveReply && (
                        <Button
                          size="small"
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#edf8f6",
                            color: "#2db5a7",
                            fontSize: "12px",
                            ml: 2,
                          }}
                        >
                          Go To Master Inbox
                        </Button>
                      )}

                      <Typography
                        sx={{
                          color: "#e74c3c",
                          fontWeight: "bold",
                          width: "50px",
                          marginLeft: "16px",
                        }}
                      >
                        {campaign.bounced}
                      </Typography>
                      <ErrorOutline
                        sx={{
                          fontSize: "18px",
                          color: "#e74c3c",
                          marginLeft: "4px",
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
                <Button2
                  background="#6e58f1"
                  color="white"
                  style={{
                    width: "21%",
                    height: "16%",
                    marginTop: "10px",
                    padding: "0px",
                  }}
                  onClick={handleCreateFolder}
                >
                  Create Folder
                </Button2>
              </Box>
            </Box>
          </motion.div>
        </EmailCampaignContainer>
      )}
    </ContentContainer>
  );
};

export default EmailCampaign;
