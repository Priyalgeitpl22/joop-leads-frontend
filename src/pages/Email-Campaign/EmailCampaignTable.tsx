import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { IEmailCampaign } from "./NewCampaign/interfaces";
import { formatDateTime } from "../../utils/utils";
import { TableItem } from "../../styles/layout.styled";
import { GridDeleteIcon } from "@mui/x-data-grid";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PeopleIcon from '@mui/icons-material/People';
import DoneIcon from "@mui/icons-material/Done";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FolderMenu } from "./Folder/CampaignFolder.styled";
import { CustomTableBody, CustomTableCell, CustomTableRow, TableCellHead } from "./EmailCampaign.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import TablePagination from "@mui/material/TablePagination";

export interface EmailCampaignTableProps {
  campaigns: IEmailCampaign[];
  loading: boolean;
  handlePause: (campaignId: string) => Promise<void>;
  handleResume: (campaignId: string) => Promise<void>;
  handleEditCampaign: (id: string) => void;
  handleOpenDeleteDialog: (campaignId: string) => void;
  handleMoveFolderOpen: (campaignId: string) => void;
  handleDetailCampaign: (campaignId: string) => void;
  anchorEl: null | HTMLElement;
  selectedCampaign: string | null;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    campaignId: string
  ) => void;
  handleMenuClose: () => void;
  handleRenameOpen: (campaignId: string, campaignName: string) => void;
  handleRenameClose: () => void;
}

const EmailCampaignTable: React.FC<EmailCampaignTableProps> = ({
  campaigns,
  loading,
  handlePause,
  handleResume,
  handleEditCampaign,
  handleOpenDeleteDialog,
  handleMoveFolderOpen,
  handleDetailCampaign,
  anchorEl,
  selectedCampaign,
  handleMenuOpen,
  handleMenuClose,
  handleRenameOpen,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedCampaigns = campaigns.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableData = [
    {
      count: 0,
      icon: PeopleIcon,
      label: "Leads",
      color: "#6e58f1",
      countType: "custom",
      getCount: (campaign: any) => campaign.emailCampaigns?.length || 0,
    },
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

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        borderRadius: "8px",
        overflowY: "auto",
        height: "calc(100vh - 150px)",
        paddingBottom: "4%",
      }}
    >
      <Table stickyHeader sx={{ position: "sticky" }}>
        <TableHead sx={{ backgroundColor: "#f8f9fc" }}>
          <TableRow>
            <TableCellHead>Campaign Details</TableCellHead>
            <TableCellHead colSpan={5}>Report</TableCellHead>
            {user?.role === "Admin" && 
            <TableCellHead>Action</TableCellHead>
            }
            <TableCellHead></TableCellHead>
          </TableRow>
        </TableHead>
        {paginatedCampaigns.map((campaign) => (
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
                      <DoneIcon style={{ fontSize: 20, color: "#acacac" }} />
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
                    {campaign?.campaignName}
                    {campaign?.campaign_name}
                  </h6>
                  <p>
                    {campaign.status} | {formatDateTime(campaign.createdAt)} |{" "}
                    {campaign.sequences && campaign.sequences.length > 0
                      ? campaign.sequences.length
                      : campaign.sequence_count}{" "}
                    Sequences
                  </p>
                </div>
              </CustomTableCell>

              {tableData.map((item, index) => (
                <CustomTableCell key={index}>
                  <TableItem>
                    <item.icon sx={{ fontSize: "20px", color: item.color }} />
                    <p>
                      {item.label}:{" "}
                      {item.countType === "custom"
                        ? item.getCount?.(campaign)
                        : (campaign?.analytics_count?.[
                            item.count_label as keyof typeof campaign.analytics_count
                          ] ?? 0)}
                    </p>
                  </TableItem>
                </CustomTableCell>
              ))}
              {user?.role === "Admin" && (
                <CustomTableCell sx={{ display: "flex" }}>
                  <Tooltip title="Delete">
                    <GridDeleteIcon
                      onClick={() => handleOpenDeleteDialog(campaign.id)}
                    />
                  </Tooltip>
                </CustomTableCell>
              )}
              <CustomTableCell>
                <IconButton
                  size="small"
                  onClick={(event) => handleMenuOpen(event, campaign.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <FolderMenu
                  anchorEl={selectedCampaign === campaign.id ? anchorEl : null}
                  open={Boolean(anchorEl && selectedCampaign === campaign.id)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleMoveFolderOpen(campaign.id)}>
                    Move to folder
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleRenameOpen(campaign.id, campaign.campaignName)
                    }
                  >
                    Rename
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Details</MenuItem>
                </FolderMenu>
              </CustomTableCell>
            </CustomTableRow>
          </CustomTableBody>
        ))}
      </Table>
      <TablePagination
        component="div"
        count={campaigns.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      />

      {campaigns.length === 0 && (
        <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
          No campaigns found
        </div>
      )}
    </TableContainer>
  );
};

export default EmailCampaignTable;
