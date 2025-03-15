import React from "react";
import { Stack, Divider, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import CampaignIcon from "@mui/icons-material/Campaign";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import {
  StyledDrawer,
  TitleContainer,
  StyledTypography,
  StyledCloseIconButton,
  ContactCard,
  CampaignCard,
  IconStyle,
  SectionTitle,
  UploadedByContainer,
} from "./ViewDrawer.styled";

interface ViewDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;


}

const ViewDrawer: React.FC<ViewDrawerProps> = ({ open, onClose }) => {
  const { campaignList } = useSelector((state: RootState) => state.contact);

  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
      <TitleContainer>
        <StyledTypography variant="h6">Contact Details</StyledTypography>
        <StyledCloseIconButton onClick={onClose}>
          <CloseIcon />
        </StyledCloseIconButton>
      </TitleContainer>

      <ContactCard>
        <Stack spacing={2}>
          <Typography>
            <EmailIcon sx={IconStyle("#1976D2")} />
            <strong>Name:</strong> {campaignList?.first_name}
          </Typography>
          <Typography>
            <EmailIcon sx={IconStyle("#1976D2")} />
            <strong>Email:</strong> {campaignList?.email}
          </Typography>
          <Typography>
            <PhoneIcon sx={IconStyle("#43A047")} />
            <strong>Phone:</strong> {campaignList?.phone_number || "N/A"}
          </Typography>
          <Typography>
            <BusinessIcon sx={IconStyle("#D84315")} />
            <strong>Company:</strong> {campaignList?.company_name || "N/A"}
          </Typography>
        </Stack>
      </ContactCard>

      {campaignList?.emailCampaigns?.length ? (
        <>
          <Divider sx={{ my: 2 }} />
          <SectionTitle variant="subtitle1">Campaigns:</SectionTitle>
          {campaignList.emailCampaigns.map((campaignItem, index) => (
            <CampaignCard key={index}>
              <Typography>
                <CampaignIcon sx={IconStyle("#FF5722")} />
                <strong>Name:</strong> {campaignItem?.campaign?.campaignName}
              </Typography>
              <Typography>
                <strong>Delivery Status:</strong> {campaignItem?.campaign?.status}
              </Typography>
            </CampaignCard>
          ))}
        </>
      ) : null}

      <Divider sx={{ my: 2 }} />
      <SectionTitle variant="subtitle1">Uploaded By:</SectionTitle>
      <UploadedByContainer>
        <WorkIcon sx={IconStyle("#673AB7")} />
        {campaignList?.uploadedUser?.fullName} ({campaignList?.uploadedUser?.email})
      </UploadedByContainer>
    </StyledDrawer>
  );
};

export default ViewDrawer;
