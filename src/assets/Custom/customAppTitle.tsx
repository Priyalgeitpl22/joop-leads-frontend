import { Stack, Typography } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

export function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CampaignIcon sx={{ color: "#ffff", fontSize: "40px" }} />
      <Typography variant="h3">Jooper.ai</Typography>
    </Stack>
  );
}
