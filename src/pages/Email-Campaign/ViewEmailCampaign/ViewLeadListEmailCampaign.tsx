import { useEffect, useState } from "react";
import { Table, TableHead, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { getCampaignById } from "../../../redux/slice/emailCampaignSlice";
import { IContacts } from "../NewCampaign/interfaces";
import {
  CustomTableBody,
  HeaderCell,
  CustomTableContainer,
  CustomTableCell,
  LeadInfo,
  IconText,
  SequenceStatus,
  ActiveStatus,
  InactiveStatus,
} from "./ViewLeadListCampaign.styled";
import { CheckCircle, XCircle } from "lucide-react";

interface ViewLeadListEmailCampaignProps {
  campaignId: string;
}

const ViewLeadListEmailCampaign: React.FC<ViewLeadListEmailCampaignProps> = ({
  campaignId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [contacts, setContacts] = useState<IContacts[]>([]);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await dispatch(getCampaignById(campaignId)).unwrap();
        setContacts(response.campaign.contacts);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };

    if (campaignId) {
      fetchCampaignDetails();
    }
  }, [dispatch, campaignId]);

  return (
    <CustomTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>Lead Details</HeaderCell>
            <HeaderCell>Sequence Status</HeaderCell>
            <HeaderCell>Other Details</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </TableRow>
        </TableHead>

        <CustomTableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <CustomTableCell>
                <LeadInfo>
                  <div>
                    <strong>
                      {contact.first_name} {contact.last_name}
                    </strong>
                    <IconText>{contact.email}</IconText>
                  </div>
                </LeadInfo>
              </CustomTableCell>

              <CustomTableCell>
                <SequenceStatus>Email</SequenceStatus>
              </CustomTableCell>

              <CustomTableCell>
                <IconText>LinkedIn</IconText>
                <IconText>Others</IconText>
              </CustomTableCell>

              <CustomTableCell>
                {contact?.active ? (
                  <ActiveStatus>
                    <CheckCircle size={16} /> Active
                  </ActiveStatus>
                ) : (
                  <InactiveStatus>
                    <XCircle size={16} /> Inactive
                  </InactiveStatus>
                )}
              </CustomTableCell>
            </TableRow>
          ))}
        </CustomTableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default ViewLeadListEmailCampaign;
