import React, { useEffect } from "react";
import { Stack, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { showFolderDetail } from "../../../redux/slice/emailCampaignFolderSlice";
import {
  StyledDrawer,
  TitleContainer,
  StyledTypography,
  StyledCloseIconButton,
  ContactCard,
  CampaignCard,
  IconStyle,
  SectionTitle,
  StyleBox,
  ScrollableContent,
} from "../../Contacts/View-Drawer/ViewDrawer.styled";

interface ViewDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedId: string | null;
}

const ViewDrawer: React.FC<ViewDrawerProps> = ({
  open,
  onClose,
  selectedId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { folderDetail, loading, error } = useSelector(
    (state: RootState) => state.folder
  );

  useEffect(() => {
    if (selectedId) {
      dispatch(showFolderDetail(selectedId));
    }
  }, [dispatch, selectedId]);

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
              <SectionTitle variant="subtitle1">📢 Campaigns:</SectionTitle>
              {folderDetail.campaigns.length > 0 ? (
                folderDetail.campaigns.map((campaign: any) => (
                  <CampaignCard key={campaign.id}>
                    <Typography>
                      <CampaignIcon sx={IconStyle("#FF5722")} />
                      <strong>Name:</strong> {campaign.name}
                    </Typography>
                  </CampaignCard>
                ))
              ) : (
                <Typography>No campaigns available.</Typography>
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
