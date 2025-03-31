import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ContentContainer,
  SectionHeader,
  EmailCampaignContainer,
  SectionTitle,
} from "./EmailCampaign.styled";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteEmailCampaign,
  fetchEmailCampaigns,
  SearchEmailCampaign,
  UpdateCampaignStatus,
} from "../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../redux/store/store";
import { IEmailCampaign } from "./NewCampaign/interfaces";
import { Button } from "../../styles/global.styled";
import { Button2 } from "../../styles/layout.styled";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../../assets/Custom/linearProgress";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import toast from "react-hot-toast";
import EmailCampaignDialog from "./EmailCampaignDialog/AddEmailCampaignDialog";
import CampaignFolder from "./Folder/CampaignFolder";
import MoveToFolderDialog from "./MoveToFolderDialog";
import EmailCampaignTable from "./EmailCampaignTable";

const EmailCampaign: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const tab = pathParts[2]; 
  console.log("active tab--->",tab )

  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tab);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moveToFolderDialog, setMoveToFolderDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // const open = Boolean(anchorEl);
  const folders = useSelector((state: any) => state.folder.folders);
  console.log("folderrr", folders.length);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    const getEmailCampaigns = async () => {
      await getAllEmailCampaigns();
    };

    getEmailCampaigns();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    if(newValue==='all')
    {
      setSelectedFolder(null);
    }
    navigate(`/email-campaign/${newValue}`, { replace: true });
  };

  // useEffect(() => {
  //   dispatch(showFolders());
  // }, [dispatch]);

  // const handleMenuOpen = (
  //     event: React.MouseEvent<HTMLButtonElement>,
  //   ) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    campaignId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaign(campaignId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCampaign(null);
  };

  const handleCreateFolder = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setCreateFolder(true);
  };

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

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000));

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

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 1000));

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

  const handleMoveFolderOpen = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    setMoveToFolderDialog(true);
    setAnchorEl(null);
  };

  const handleMoveFolderClose = () => {
    setMoveToFolderDialog(false);
  };

  const handleFolderChange = () =>{
    setSelectedFolder(null);
    navigate(`/email-campaign/folders`)
  }

  return (
    <ContentContainer>
      <SectionHeader>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              fontSize: "14px",
              fontWeight: "600",
              color: "#35495c",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "var(--theme-color)",
            },
          }}
        >
          <SectionTitle label="All Campaign" value="all" />
          <SectionTitle label="Folders" value="folders" />
          {activeTab === "all" && (
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
          )}
          {activeTab === "folders" && (
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
                background="var(--theme-color)"
                color="white"
                style={{ height: "90%" }}
                onClick={(event) => handleCreateFolder(event)}
              >
                Create Folder
              </Button2>
            </Box>
          )}
        </Tabs>
      </SectionHeader>

      {loading && <ProgressBar />}
      {activeTab === "all" ? (
        <EmailCampaignTable
          campaigns={campaigns}
          loading={loading}
          handlePause={handlePause}
          handleResume={handleResume}
          handleEditCampaign={handleEditCampaign}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleMoveFolderOpen={handleMoveFolderOpen}
          handleDetailCampaign={handleDetailCampaign}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          selectedCampaign={selectedCampaign}
        />
      ) : (
        <EmailCampaignContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                fontWeight: "bold",
                marginTop: "10px",
                marginBottom: "10px",
                cursor: "pointer"
              }}
            >
              <span
                onClick={handleFolderChange}
                style={{
                  color: selectedFolder ? "grey" : "var(--theme-color)",
                }}
              >
                All Folders
              </span>
              {selectedFolder && (
                <>
                  <span style={{ color: "var(--theme-color)" }}>{">"}</span>
                  <span style={{ color: "var(--theme-color)" }}>
                    {selectedFolder}
                  </span>
                </>
              )}
            </Box>
            <CampaignFolder
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />
          </motion.div>
        </EmailCampaignContainer>
      )}

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleCampaignDelete}
        title="Delete Campaign?"
        message="Are you sure you want to delete this campaign?"
        confirmText="Delete"
        cancelText="Cancel"
      />
      <MoveToFolderDialog
        open={moveToFolderDialog}
        onClose={handleMoveFolderClose}
        campaignId={selectedCampaign}
      />
    </ContentContainer>
  );
};

export default EmailCampaign;
