import { useEffect, useState } from "react";
import { Table, TableHead, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
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
import { NoDataContainer } from "../../Email-Account/EditEmailAccount/EditCampaignEmailAccount.styled";

interface ViewLeadListEmailCampaignProps {
  // campaignId: string;
  leads: any;
}

const ViewLeadListEmailCampaign: React.FC<ViewLeadListEmailCampaignProps> = ({
  // campaignId,
  leads
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [contacts, setContacts] = useState<IContacts[]>([]);

  useEffect(() => {
    console.log("leads", leads)
    setContacts(leads);
  }, [dispatch]);

  return (
    <CustomTableContainer sx={{
      borderRadius:"10px",
      width:"98%",

    }} >
      <Table style={{
        border:"1px solid var(--border-grey)",
        overflow:"auto",
      }}>
        <TableHead>
          <TableRow>
            <HeaderCell>Lead Details</HeaderCell>
            <HeaderCell>Sequence Status</HeaderCell>
            <HeaderCell>Other Details</HeaderCell>
            <HeaderCell>Status</HeaderCell>
          </TableRow>
        </TableHead>

        <CustomTableBody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
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
            ))
          ) : (
            <TableRow>
              <NoDataContainer colSpan={4}>No leads found</NoDataContainer>
            </TableRow>
          )}
        </CustomTableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default ViewLeadListEmailCampaign;
