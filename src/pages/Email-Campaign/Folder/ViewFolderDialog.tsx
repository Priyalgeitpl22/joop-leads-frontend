import React from "react";
import { Stack, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import {
  StyledDrawer,
  TitleContainer,
  StyledTypography,
  StyledCloseIconButton,
  ContactCard,
  CampaignCard,
  IconStyle,
  StyleBox,
  ScrollableContent,
} from "../../Contacts/View-Drawer/ViewDrawer.styled";
import { SectionTitle } from "../../../styles/layout.styled";
import { IEmailCampaign } from "../NewCampaign/interfaces";

interface ViewDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
}

const ViewDrawer: React.FC<ViewDrawerProps> = ({
  open,
  onClose,
}) => {

  const { folderDetail, loading, error } = useSelector(
    (state: RootState) => state.folder
  );

  // useEffect(() => {
  //   if (selectedId) {
  //     dispatch(showFolderDetail(selectedId));
  //   }
  // }, [dispatch, selectedId]);

  return (
    <StyledDrawer anchor="right" open={open} onClose={onClose}>
      <StyleBox>
        <TitleContainer>
          <StyledTypography variant="h6">📌 Folder Details</StyledTypography>
          <StyledCloseIconButton onClick={onClose}>
            <CloseIcon />
          </StyledCloseIconButton>
        </TitleContainer>
        <ScrollableContent>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : folderDetail ? (
            <>
              <ContactCard>
                <Stack spacing={2}>
                  <Typography>
                    <strong>Name:</strong> {folderDetail.name}
                  </Typography>
                  <Typography>
                    <strong>Created At:</strong>{" "}
                    {new Date(folderDetail.createdAt).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Campaign Count:</strong>{" "}
                    {folderDetail.campaignCount}
                  </Typography>
                </Stack>
              </ContactCard>

              <Divider sx={{ my: 2 }} />
              <SectionTitle>Campaigns</SectionTitle>
              {folderDetail.campaigns.length > 0 ? (
                folderDetail.campaigns.map((campaign: IEmailCampaign) => (
                  <CampaignCard key={campaign.id}>
                    <Typography>
                      <CampaignIcon sx={IconStyle("#FF5722")} />
                      <strong>Name:</strong> {campaign.name}
                    </Typography>
                  </CampaignCard>
                ))
              ) : (
                <CampaignCard>
                  <Typography>No campaigns available.</Typography>
                </CampaignCard>
              )}
            </>
          ) : (
            <Typography>No folder details available.</Typography>
          )}
        </ScrollableContent>
      </StyleBox>
    </StyledDrawer>
  );
};

export default ViewDrawer;
