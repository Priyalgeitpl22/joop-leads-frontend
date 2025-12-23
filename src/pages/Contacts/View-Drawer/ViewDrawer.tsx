import React from "react";
import { Typography, Box } from "@mui/material";
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
  UploadedByContainer,
  StyleBox,
  ScrollableContent,
  FieldLabel,
  DraftChip,
  FieldValue,
} from "./ViewDrawer.styled";
import { CSV_COLUMNS } from "../../../constants";
import { CampaignList } from "../../../redux/slice/contactSlice";
import { SectionTitle } from "../../../styles/layout.styled";

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
        <TitleContainer sx={{ background: "var(--primary-gradient)" }}>
          <StyledTypography style={{ color: "#ffffff" }}>
            Lead Details
          </StyledTypography>

          <StyledCloseIconButton onClick={onClose}>
            <CloseIcon />
          </StyledCloseIconButton>
        </TitleContainer>

        <ScrollableContent>
          <SectionTitle>Contact Information</SectionTitle>
          <ContactCard>
            {CSV_COLUMNS.map((item) => {
              const value = campaignList?.[item.key as keyof CampaignList];

              return value ? (
                <div key={item.key}>
                  <FieldLabel>{item.label}</FieldLabel>
                  <FieldValue>{value as string || "N/A"}</FieldValue>
                </div>
              ) : null;
            })}
          </ContactCard>

          {campaignList?.emailCampaigns?.length ? (
            <>
              <SectionTitle>Campaigns</SectionTitle>

              {campaignList.emailCampaigns.map((item, index) => (
                <CampaignCard key={index}>
                  <FieldLabel>Campaign Name</FieldLabel>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between ",
                    }}
                  >
                    <FieldValue>
                      {item?.campaign?.campaign_name || "Untitled Campaign"}
                    </FieldValue>

                    <DraftChip label="DRAFT" />
                  </Box>
                </CampaignCard>
              ))}
            </>
          ) : null}

          {/* Uploaded By */}
          <SectionTitle>Activity</SectionTitle>

          <UploadedByContainer>
            <WorkIcon sx={{ marginRight: "6px", color: "#6b7280" }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={15}>
              {campaignList?.uploadedUser?.fullName}
            </Typography>
            <Typography fontSize={12}>
              {campaignList?.uploadedUser?.email}
            </Typography>
            </Box>
          </UploadedByContainer>
        </ScrollableContent>
      </StyleBox>
    </StyledDrawer>
  );
};

export default ViewDrawer;
