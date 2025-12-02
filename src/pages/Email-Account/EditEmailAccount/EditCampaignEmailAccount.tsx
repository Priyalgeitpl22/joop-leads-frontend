import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableBody, CircularProgress } from "@mui/material";
import { AppDispatch } from "../../../redux/store/store";
import { getCampaignBySender } from "../../../redux/slice/emailCampaignSlice";
import { IEmailCampaign } from "../../Email-Campaign/NewCampaign/interfaces";
import { LoadingContainer, NoDataContainer, StyledTable, StyledTableContainer, StyledTableHead, TableDataCell, TableHeadingCell } from "./EditCampaignEmailAccount.styled";

interface EditCampaignEmailAccountProps {
  id?: string;
}

const tableColumns = [{
  label: "Campaign Name",
  key: "campaignName",
}, {
  label: "Campaign Status",
  key: "status",
}, {
  label: "Time Added",
  key: "createdAt",
}]

const EditCampaignEmailAccount: React.FC<EditCampaignEmailAccountProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [campaigns, setCampaigns] = useState<IEmailCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getCampaignBySender(id)).unwrap();
        setCampaigns(response?.campaigns || []);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [dispatch, id]);

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
          {tableColumns.map((column) => (
              <TableHeadingCell key={column.key}>{column.label}</TableHeadingCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody sx={{ height: "100%" }}>
          {isLoading ? (
            <TableRow>
              <td colSpan={3}>
                <LoadingContainer>
                  <CircularProgress size={24} />
                </LoadingContainer>
              </td>
            </TableRow>
          ) : campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableDataCell>{campaign?.campaignName}</TableDataCell>
                <TableDataCell>{campaign?.status}</TableDataCell>
                <TableDataCell>
                  {campaign?.createdAt
                    ? `${new Date(campaign.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                        }
                      )}, ${new Date(campaign.createdAt).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}`
                    : "N/A"}
                </TableDataCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <NoDataContainer colSpan={3}>No Campaigns found</NoDataContainer>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default EditCampaignEmailAccount;
