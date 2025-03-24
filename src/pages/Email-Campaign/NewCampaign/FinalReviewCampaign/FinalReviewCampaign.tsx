import { useEffect, useRef, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import { Search } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import {
  fetchCampaignSequences,
  getCampaignById,
  searchContactsByCampaign,
} from "../../../../redux/slice/emailCampaignSlice";
import { IContacts } from "../interfaces";
import {
  Sequence,
  SequenceVariant,
} from "../SequenceCampaign/Sequences/interfaces";
import {
  EmailPreviewContainer,
  FinalReviewContainer,
  TabsHeader,
} from "./finalReview.styled";
import ReactQuill from "react-quill";
import { modules } from "../SequenceCampaign/EmailTemplate/EmailTemplate";

interface FinalReviewCampaignProps {
  campaign_id: string;
  setSelectedEmailTemplate:any
}

const FinalReviewCampaign: React.FC<FinalReviewCampaignProps> = ({
  campaign_id,
  setSelectedEmailTemplate
}) => {
  const [selectedContact, setSelectedContact] = useState<IContacts>();
  const [selectedVariant, setSelectedVariant] = React.useState(1);
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<SequenceVariant | null>();
  const [contacts, setContacts] = React.useState<IContacts[]>([]);
  const [sequences, setSequences] = React.useState<Sequence[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const quillRef = useRef<typeof ReactQuill | null>(null);

  const handleChange = (event: any, newValue: number) => {
    setSelectedVariant(newValue);
    console.log("event",event)
    setSelectedTemplate(
      sequences.find((seq) => seq.seq_number === Number(newValue))
        ?.seq_variants[0] || null
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("id");

    if (campaignId) {
      fetchCampaignDetails(campaignId);
    } else {
      fetchContactsAndSequences();
    }
  }, [dispatch]);

  const fetchContactsAndSequences = async () => {
    try {
      const contacts = await dispatch(
        searchContactsByCampaign({ campaign_id })
      ).unwrap();
      const sequences = await dispatch(
        fetchCampaignSequences(campaign_id)
      ).unwrap();

      setContacts(contacts.data);
      setSequences(sequences.data);
      setSelectedVariant(sequences.data[0].seq_number);
      setSelectedTemplate(sequences.data[0].seq_variants[0]);
      setSelectedContact(contacts.data[0]);
    } catch (error) {
      console.error("Error fetching contacts or sequences:", error);
    }
  };

  const fetchCampaignDetails = async (id: string) => {
    try {
      const response = await dispatch(getCampaignById(id)).unwrap();
      const campaign = response.campaign;
      setContacts(campaign.contacts);
      setSequences(campaign.sequences);
      setSelectedVariant(campaign.sequences[0].seq_number);
      setSelectedTemplate(campaign.sequences[0].seq_variants[0]);
      setSelectedContact(campaign.contacts[0]);
      return response.campaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  };

  // Handle search input and call API
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    try {
      const response = await dispatch(
        searchContactsByCampaign({ campaign_id, email: value })
      ).unwrap();
      setContacts(response.data);
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };
  setSelectedEmailTemplate(selectedTemplate);
  return (
    <FinalReviewContainer>
      <SidebarContainer
        style={{
          padding: "16px",
          border: "1px solid var(--border-grey)",
          overflowY: "auto",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" mb={2}>
          Review Your Mail Individually
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "8px",
            border: "1px solid var(--border-grey)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Search size={20} />
          <input
            placeholder="Search by email..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
              width: "100%",
            }}
          />
        </Box>

        <Box mt={2}>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px 16px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  position: "relative",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "var(--background-light)" },
                  backgroundColor:
                    selectedContact?.email === contact.email
                      ? "var(--background-light)"
                      : "white",
                }}
                onClick={() => setSelectedContact(contact)}
              >
                <Typography fontSize={14} fontWeight="bold" color="#333">
                  {contact.first_name} {contact?.last_name}
                </Typography>
                <Typography fontSize={13} color="gray">
                  {contact.email}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography mt={2} color="gray" textAlign="center">
              No contacts found
            </Typography>
          )}
        </Box>
      </SidebarContainer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <EmailPreviewContainer>
          <TabsHeader>
            <Tabs
              value={selectedVariant}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {sequences.map((sequence) => (
                <Tab
                  key={sequence.seq_number}
                  value={sequence.seq_number}
                  label={`${sequence.seq_type} ${sequence.seq_number}`}
                />
              ))}
            </Tabs>
          </TabsHeader>

          {selectedVariant && (
            <Box
              sx={{
                padding: "8px",
                width: "100%",
                height: "92%",
                border: "1px solid var(--border-grey)",
              }}
            >
              <Typography
                sx={{ margin: "12px 5px 0px 16px" }}
                fontSize={14}
                color="gray"
              >
                <strong>Email: </strong> {selectedContact?.email}
              </Typography>
              <Typography
                sx={{ margin: "12px 5px 0px 16px" }}
                variant="body2"
                fontSize={14}
                color="gray"
              >
                <strong>Subject: </strong>
                {selectedTemplate?.subject}
              </Typography>

              <Box mt={2}>
                <ReactQuill
                  ref={quillRef}
                  value={selectedTemplate?.emailBody}
                  modules={modules}
                  className="custom-quill-email"
                />
              </Box>
            </Box>
          )}
        </EmailPreviewContainer>
      </Box>
    </FinalReviewContainer>
  );
};

export default FinalReviewCampaign;
