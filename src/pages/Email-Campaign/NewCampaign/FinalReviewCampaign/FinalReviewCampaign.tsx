import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import { Search } from "lucide-react";
import { SearchBar } from "../../../../components/Header/header.styled";
import React from "react";

const contacts = [
  { name: "Jennifer Wehrmaker", email: "jeremy@venturecatalyst.nyc" },
  { name: "Hendrick Lee", email: "hendrick@palmdrivecap.com" },
  { name: "Brian Yormak", email: "brian@storyventures.vc" },
  { name: "Wendy Tsu", email: "wendy@alleycorp.com" },
  { name: "Nathan Tien", email: "ntien@goodwatercap.com" },
  { name: "Casey Hancock", email: "casey@eevo.com" },
  { name: "Nick Demarco", email: "ndemarco@practichem.com" },
];

const FinalReviewCampaign = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [value, setValue] = React.useState("one");

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{
          width: "18%",
          padding: 2,
          borderRight: "1px solid #ddd",
          paddingLeft: "1%",
          paddingTop: "2%",
          overflow: "scroll",
        }}
      >
        <Typography mb={2}>Review Your Mail Individually</Typography>
        <SearchBar style={{ width: "80%" }}>
          <Search size={20} color="#64748b" />
          <input placeholder="Search by name emailId..." />
        </SearchBar>
        {contacts.map((contact, index) => (
          <Box
            key={index}
            sx={{ borderBottom: "1px solid grey", cursor: "pointer" }}
            onClick={() => setSelectedContact(contact)}
          >
            <Box
              sx={{
                margin: "12px",
                padding: "6px",
                "&:hover": { background: "#eeecec" },
              }}
            >
              <Typography mt={1} fontSize={13}>
                {contact.name}
              </Typography>
              <Typography mt={2} fontSize={13}>
                {contact.email}
              </Typography>
            </Box>
          </Box>
        ))}
      </SidebarContainer>
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "10px 115px 30px 275px",
          border: "1px solid #E0E0E0",
          height: "92%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 14,
            background: "#fff6d5",
            padding: "15px",
            borderRadius: "5px",
            display: "block",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          This sequence has been sent. Select "scheduled" leads to see any copy
          changes.
        </Typography>
        <Box sx={{ paddingLeft: "8px" }}>
          <Typography mt={2} fontSize={14} color="gray">
            <strong>Email:</strong> {selectedContact.email}
          </Typography>
          <Typography variant="body2" fontSize={14} color="gray" mt={1}>
            <strong>Subject:</strong> Best Off-Shore resource for your hiring
            needs
          </Typography>

          <Box mt={2} padding={2}>
            <Typography fontSize={14}>Hi {selectedContact.name},</Typography>
            <Typography fontSize={14} mt={2}>
              I understand how critical it is to find the right tech talent
              quickly, especially when you're racing to meet market demands. At{" "}
              <strong>Golden Eagle</strong>, we specialize in seamlessly filling
              high-priority roles for growing teams.
            </Typography>
            <Typography fontSize={14} mt={2}>
              Recently, we partnered with a client to onboard 10 GenAI & ML
              Developers and 5 Front-end Developers within just 15 days—helping
              them meet tight deadlines without compromising on quality.
            </Typography>
            <Typography fontSize={14} mt={3}>
              Reply with "interested" if you'd like to schedule a quick chat.
            </Typography>
            <Typography fontSize={14} mb={2}>
              We’d love to explore how we can help accelerate your goals.
            </Typography>
            Best regards
            <br />
            Andrew Growth
            <br />
            Consultant at Golden Eagle
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "20%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Email 1" />
          <Tab value="two" label="Email 2" />
          <Tab value="three" label="Email 3" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default FinalReviewCampaign;
