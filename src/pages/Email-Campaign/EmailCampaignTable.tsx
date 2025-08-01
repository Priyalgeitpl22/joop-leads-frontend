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
  // handleMoveFolderOpen: (campaignId: string) => void;
  handleDetailCampaign: (campaignId: string) => void;
  anchorEl: null | HTMLElement;
  selectedCampaign: string | null;
  handleMenuOpen: (
    event: React.MouseEvent<HTMLElement>,
    campaignId: string
  ) => void;
  handleMenuClose: () => void;
  handleRenameOpen: (campaignId: string, campaign_name: string) => void;
  handleRenameClose: () => void;
  visibleColumns?: Record<string, boolean>;
}

const EmailCampaignTable: React.FC<EmailCampaignTableProps> = ({
  campaigns,
  loading,
  handlePause,
  handleResume,
  handleEditCampaign,
  handleOpenDeleteDialog,
  // handleMoveFolderOpen,
  handleDetailCampaign,
  anchorEl,
  selectedCampaign,
  handleMenuOpen,
  handleMenuClose,
  handleRenameOpen,
  visibleColumns,
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

  const structureName = (name:string):string=>{
    const tempName  = name.split(" ") 
    const nameArray=tempName.map((elem)=>elem.charAt(0).toUpperCase()+elem.slice(1)) 
    const result:string  = nameArray.join(" ") 
    return result; 
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableData = [
    {
      label: "Leads",
      icon: PeopleIcon,
      color: "#6e58f1",
      countType: "custom",
      getCount: (campaign: any) => campaign.emailCampaigns?.length || campaign.contact_count,
      visibleKey: "Leads",
    },
    {
      label: "Sent",
      icon: ForwardToInboxOutlinedIcon,
      color: "#6e58f1",
      count_label: "sent_count",
      visibleKey: "Sent",
    },
    {
      label: "Opened",
      icon: DraftsOutlinedIcon,
      color: "#bf51c1",
      count_label: "opened_count",
      visibleKey: "Opened",
    },
    {
      label: "Clicked",
      icon: AdsClickOutlinedIcon,
      color: "#efba2f",
      count_label: "clicked_count",
      visibleKey: "Clicked",
    },
    {
      label: "Bounced",
      icon: ErrorOutlinedIcon,
      color: "var(--error-color)",
      count_label: "bounced_count",
      visibleKey: "Bounced",
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
        <TableHead>
          <TableRow>
            <TableCellHead>Campaign Details</TableCellHead>

            <TableCellHead>Leads</TableCellHead>
            <TableCellHead>sent</TableCellHead>
            <TableCellHead>Opened</TableCellHead>
            <TableCellHead>Clicked</TableCellHead>
            <TableCellHead>Bounced</TableCellHead>

            {user?.role === "Admin" && <TableCellHead>Action</TableCellHead>}
            <TableCellHead></TableCellHead>
          </TableRow>
        </TableHead>
        {paginatedCampaigns.map((campaign) => (
          <CustomTableBody key={campaign.id} >
            <CustomTableRow>
              <CustomTableCell
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: "12px",
                }}
                onClick={(event) => {event.stopPropagation(); handleDetailCampaign(campaign.id)}}
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
                  <h6>
                    {structureName(campaign?.campaignName)}
                    {campaign?.campaign_name}
                  </h6>
                  <p>
                  {campaign.status==="COMPLETED"?`✅ ${campaign.status}`:campaign.status==="SCHEDULED"?`⏳ ${campaign.status}`:campaign.status==="DRAFT"?`⏳ ${campaign.status}`:campaign.status === "RUNNING"?`▶️ ${campaign.status}`:campaign.status} 
                  | {`${formatDateTime(campaign.createdAt).split(",")[0]}, ${formatDateTime(campaign.createdAt).split(",")[1]}`} |{" "}
                    {campaign.sequences && campaign.sequences.length > 0
                      ? campaign.sequences.length
                      : campaign.sequence_count}{" "}
                    Sequences
                  </p>
                </div>
              </CustomTableCell>

              {tableData.map((item) => {
                const isVisible = visibleColumns
                  ? visibleColumns[item.visibleKey]
                  : true;
                return isVisible ? (
                  <CustomTableCell key={item.label}>
                    <TableItem>
                      <item.icon sx={{ fontSize: "20px", color: item.color }} />
                      <p>
                        {/* {item.label}:{" "} */}
                        {item.countType === "custom"
                          ? item.getCount?.(campaign)
                          : (campaign?.analytics_count?.[
                              item.count_label as keyof typeof campaign.analytics_count
                            ] ?? 0)}
                      </p>
                    </TableItem>
                  </CustomTableCell>
                ) : null;
              })}

              {/* {user?.role === "Admin" && (
                <CustomTableCell sx={{ display: "flex",height:"85px !important" }}>
                  <Tooltip title="Delete">
                    <GridDeleteIcon
                      onClick={() => handleOpenDeleteDialog(campaign.id)}
                    />
                  </Tooltip>
                </CustomTableCell>
              )} */}
              <CustomTableCell>
                <IconButton
                  size="large"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleMenuOpen(event, campaign.id)}}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <FolderMenu
                  anchorEl={selectedCampaign === campaign.id ? anchorEl : null}
                  open={Boolean(anchorEl && selectedCampaign === campaign.id)}
                  onClose={handleMenuClose}
                >{user?.role === "Admin"&&(<MenuItem onClick={(event) => {
                  event.stopPropagation()
                  handleOpenDeleteDialog(campaign.id)}}>
                    Delete
                  </MenuItem>)}
                  {/* <MenuItem onClick={() => handleMoveFolderOpen(campaign.id)}>
                    Move to folder
                  </MenuItem> */}
                  <MenuItem
                    onClick={(event) =>{
                      event.stopPropagation()
                      handleRenameOpen(
                        campaign.id,
                        campaign.campaignName ?? campaign.campaign_name ?? ""
                      )
                    }}
                  >
                    Edit
                  </MenuItem>
                  {/* <MenuItem onClick={handleMenuClose}>Details</MenuItem> */}
                  <MenuItem
                    onClick={(event) =>{
                      event.stopPropagation()
                      handleDetailCampaign(campaign.id)}}
                  >
                    View
                  </MenuItem>
                  <MenuItem onClick={(event)=>{
                    event.stopPropagation()
                    handleMenuClose()
                  }
                    }>Details</MenuItem>
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
          "& .MuiTablePagination-selectLabel, \
            & .MuiTablePagination-displayedRows, \
            & .MuiSelect-select, \
            & .MuiSvgIcon-root": {
            color: "black !important",
          },
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
