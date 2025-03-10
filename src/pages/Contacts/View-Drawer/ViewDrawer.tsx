import React from "react";
import {
  Avatar,
  Stack,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CampaignIcon from "@mui/icons-material/Campaign";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import {
  StyledDrawer,
  TitleContainer,
  Title,
  SectionTitle,
  ContactCard,
  CampaignCard,
} from "./ViewDrawer.styled"; 

interface ViewDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
}

const ViewDrawer: React.FC<ViewDrawerProps> = ({ open, onClose, selectedId }) => {
  const { campaignList } = useSelector((state: RootState) => state.contact);

  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
  
      <TitleContainer>
      <Title>Contact Details</Title>
      </TitleContainer>

      {/* <Divider sx={{ my: 2 }} /> */}

      
      <ContactCard>
        <Stack spacing={1.5}>
          <Typography>
            <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            <strong>Name:</strong> {campaignList?.first_name} {campaignList?.last_name}
          </Typography>
          <Typography>
            <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            <strong>Email:</strong> {campaignList?.email}
          </Typography>
          <Typography>
            <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            <strong>Phone:</strong> {campaignList?.phone_number || "N/A"}
          </Typography>
          <Typography>
            <BusinessIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            <strong>Company:</strong> {campaignList?.company_name || "N/A"}
          </Typography>
        </Stack>
      </ContactCard>

      {/* Uploaded By Section */}
      <SectionTitle>Uploaded By:</SectionTitle>
      <Typography>
        <WorkIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        {campaignList?.uploadedUser?.fullName} ({campaignList?.uploadedUser?.email})
      </Typography>

      {campaignList?.emailCampaigns?.length ? (
        <>
          <Divider sx={{ my: 2 }} />
          <SectionTitle>Campaigns:</SectionTitle>
          {campaignList.emailCampaigns.map((campaignItem, index) => (
            <CampaignCard key={index}>
              <Typography>
                <CampaignIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <strong>Name:</strong> {campaignItem?.campaign?.campaignName}
              </Typography>
              <Typography>
                <strong>Delivery Status:</strong> {campaignItem?.campaign?.status}
              </Typography>
            </CampaignCard>
          ))}
        </>
      ) : null}

         </StyledDrawer>
  );
};

export default ViewDrawer;
