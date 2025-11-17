import React from "react";
import { Divider, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import {
  StyledDrawer,
  TitleContainer,
  StyledTypography,
  StyledCloseIconButton,
  ContactCard,
  CampaignCard,
  SectionTitle,
  UploadedByContainer,
  StyleBox,
  ScrollableContent,
  FieldLabel,
  DraftChip,
  FieldValue,
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
      <StyleBox>
        <TitleContainer sx={{ background:"var(--primary-gradient)" }}>
          <StyledTypography style={{color: "#ffffff", }}>Lead Details</StyledTypography>

          <StyledCloseIconButton onClick={onClose}>
            <CloseIcon />
          </StyledCloseIconButton>
        </TitleContainer>

        <ScrollableContent>
          {/* Contact Info */}
          <SectionTitle>Contact Information</SectionTitle>

          <ContactCard>
            <FieldLabel>Full Name</FieldLabel>
            <FieldValue>{campaignList?.first_name || "N/A"}</FieldValue>
            <Divider sx={{ my: 1 }} />

            <FieldLabel>Email</FieldLabel>
            <FieldValue>{campaignList?.email || "N/A"}</FieldValue>
            <Divider sx={{ my: 1 }} />

            <FieldLabel>Phone</FieldLabel>
            <FieldValue>{campaignList?.phone_number || "N/A"}</FieldValue>
            <Divider sx={{ my: 1 }} />

            <FieldLabel>Company</FieldLabel>
            <FieldValue>{campaignList?.company_name || "N/A"}</FieldValue>
          </ContactCard>

          {/* Campaigns */}
          {campaignList?.emailCampaigns?.length ? (
            <>
              <SectionTitle>Campaigns</SectionTitle>

              {campaignList.emailCampaigns.map((item, index) => (
                <CampaignCard key={index}>
                  <FieldLabel>Campaign Name</FieldLabel>
                  <Box style={{ display: "flex", justifyContent: "space-between " }}>
                    <FieldValue>
                      {item?.campaign?.campaignName || "Untitled Campaign"}
                    </FieldValue>

                    <DraftChip label="DRAFT" />
                  </Box>
                </CampaignCard>
              ))}
            </>
          ) : null}

          {/* Uploaded By */}
          <SectionTitle>Activity</SectionTitle>

          <UploadedByContainer sx={{ display: "flex", alignItems: "center" }}>
            <WorkIcon sx={{ marginRight: "6px", color: "#6b7280" }} />
            <Typography fontSize={15}>
              {campaignList?.uploadedUser?.fullName} (
              {campaignList?.uploadedUser?.email})
            </Typography>
          </UploadedByContainer>
        </ScrollableContent>
      </StyleBox>
    </StyledDrawer>
  );
};

export default ViewDrawer;
