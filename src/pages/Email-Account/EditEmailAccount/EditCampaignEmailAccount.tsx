import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchEmailCampaigns } from "../../../redux/slice/emailCampaignSlice";
import { AppDispatch } from "../../../redux/store/store";
import { IEmailCampaign } from "./../../Email-Campaign/NewCampaign/interfaces";
import { useEffect, useState } from "react";
import { TableHeadingCell, TableDataCell } from "./EditEmailAccount.styled";

const EditCampaignEmailAccount = () => {
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
    setCampaigns(response.payload.data || []);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none", borderRadius: "8px" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "var(--background-heading)" }}>
          <TableRow>
            <TableHeadingCell>Campaign Name</TableHeadingCell>
            <TableHeadingCell>Campaign Status</TableHeadingCell>
            <TableHeadingCell>Time Added To Campaign</TableHeadingCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {campaigns?.length > 0 ? (
            campaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                sx={{ borderBottom: "1px solid #E0E0E0" }}
              >
                <TableDataCell>{campaign?.campaignName}</TableDataCell>
                <TableDataCell>{campaign?.status}</TableDataCell>
                <TableDataCell>{campaign?.createdAt}</TableDataCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ textAlign: "center", color: "#888", padding: "20px" }}
              >
                No Campaign found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditCampaignEmailAccount;
