import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import { Search } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import {
  fetchCampaignContacts,
  fetchCampaignSequences,
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
interface FinalReviewCampaignProps {
  campaignId?: string;
}

const FinalReviewCampaign: React.FC<FinalReviewCampaignProps> = ({
  campaignId,
}) => {
  const [selectedContact, setSelectedContact] = useState<IContacts>();
  const [selectedVariant, setSelectedVariant] = React.useState(1);
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<SequenceVariant | null>();
  const [contacts, setContacts] = React.useState<IContacts[]>([]);
  const [sequences, setSequences] = React.useState<Sequence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: any, newValue: number) => {
    setSelectedVariant(newValue);
    setSelectedTemplate(
      sequences.find((seq) => seq.seq_number === Number(newValue))
        ?.seq_variants[0] || null
    );
  };

  useEffect(() => {
    // setLoading(true);
    const campaignId = "14eb8d0d-b902-40c3-b8b4-78abde6545c5";

    if (campaignId) {
      Promise.all([
        dispatch(fetchCampaignContacts(campaignId)).unwrap(),
        dispatch(fetchCampaignSequences(campaignId)).unwrap(),
      ])
        .then(([contactsData, sequencesData]) => {
          console.log("Contacts:", contactsData.data);
          console.log("Sequences:", sequencesData.data);

          setContacts(contactsData.data);
          setSequences(sequencesData.data);
          setSelectedVariant(sequencesData.data[0].seq_number);
          setSelectedTemplate(
            sequences.find((seq) => seq.seq_number === Number(sequencesData.data[0].seq_variants[0]))
              ?.seq_variants[0] || null
          );

          setSelectedContact(contactsData.data[0]);

          // setLoading(false);
          toast.success("Data fetched successfully");
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          toast.error("Failed to fetch data");
        });
    }
  }, [dispatch]);

  return (
    <FinalReviewContainer>
      <SidebarContainer
        style={{
          padding: "16px",
          borderRight: "1px solid #ddd",
          paddingLeft: "2%",
          paddingTop: "2%",
          overflowY: "auto",
          height: "100%",
          backgroundColor: "#f8f9fc",
        }}
      >
        <Typography variant="h5" mb={2}>
          Review Your Mail Individually
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "var(--background-light)",
            borderRadius: "8px",
            padding: "8px",
            border: "border: 1px solid var(--border-dark)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "85%",
          }}
        >
          <Search size={20} />
          <input
            placeholder="Search by name, email id..."
            style={{
              border: "none",
              outline: "none",
              fontSize: "14px",
              width: "100%",
            }}
          />
        </Box>

        <Box mt={2}>
          {contacts.map((contact, index) => (
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
                "&:hover": { backgroundColor: "#f3f3f3" },
                backgroundColor:
                  selectedContact?.email === contact.email
                    ? "#e8e4fc"
                    : "transparent",
                border:
                  selectedContact?.email == contact.email
                    ? "1px solid grey"
                    : "",
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
          ))}
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

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 14,
              background: "var(--background-light)6d5",
              padding: "15px",
              borderRadius: "5px",
              display: "block",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            This sequence has been sent. Select "scheduled" leads to see any
            copy changes.
          </Typography>

          {selectedVariant && (
            <Box sx={{ paddingLeft: "8px" }}>
              <Typography mt={2} fontSize={14} color="gray">
                <strong>Email: </strong> {selectedContact?.email}
              </Typography>
              <Typography variant="body2" fontSize={14} color="gray" mt={1}>
                <strong>Subject: </strong>
                {selectedTemplate?.subject}
              </Typography>

              <Box mt={2} padding={2}>
                <Typography fontSize={14}>
                  Hi {selectedContact?.first_name} {selectedContact?.last_name},
                </Typography>
                <Typography fontSize={14} mt={2}>
                  {selectedTemplate?.emailBody}
                </Typography>
              </Box>
            </Box>
          )}
        </EmailPreviewContainer>
      </Box>
    </FinalReviewContainer>
  );
};

export default FinalReviewCampaign;
