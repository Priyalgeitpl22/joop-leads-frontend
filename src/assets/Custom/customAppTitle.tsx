import { Stack, Typography, IconButton } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useNavigate } from "react-router-dom";

export function CustomAppTitle() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <IconButton onClick={handleOnClick} sx={{ p: 0 }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <CampaignIcon sx={{ color: "#ffff", fontSize: "40px" }} />
      <Typography variant="h3">JooperLead.ai</Typography>
    </Stack>
    </IconButton>
  );
}