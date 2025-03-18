import { Stack, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
// import CampaignIcon from "@mui/icons-material/Campaign";

export function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <img height="50px" width="50px" src="/Images/campaign.png" alt="" />
      {/* <CampaignIcon sx={{ color: "#ffff", fontSize: "40px" }} /> */}
      <Typography variant="h3">Jooper.AI</Typography>
    </Stack>
  );
}
