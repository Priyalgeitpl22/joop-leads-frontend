
import {
  Box,
  Typography,
} from "@mui/material";
import { Button2 } from "../../../../../styles/layout.styled";
import AddWbhookDialog from "./AddWebhookDialog";
import { useState } from "react";
import WebhookIcon from "@mui/icons-material/Webhook";

const WebhooksCampaignSetting = () => {
  const [addWebhook, setAddWebhook] = useState<boolean>(false);

  const handleAddWebhook = () => {
    setAddWebhook(true);
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "60px 0px",
        width: "100%",
      }}
    >
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: "570px",
          width: "100%",
        }}
      >
        <WebhookIcon
          style={{ height: "40%", width: "40%", color: "#6e58f1" }}
        />
        <Typography style={{ textAlign: "center", fontWeight: "200" }}>
          No Webhooks Yet
        </Typography>
        Webhooks send real time notification about each campaign activity on the
        go
        <AddWbhookDialog
          open={addWebhook}
          onClose={() => setAddWebhook(false)}
        />
        <Button2
          background="#6e58f1"
          color="white"
          style={{
            width: "21%",
            height: "16%",
            marginTop: "10px",
            padding: "0px",
          }}
          onClick={handleAddWebhook}
        >
          Add Webhook
        </Button2>
      </Box>
    </Box>
  );
};

export default WebhooksCampaignSetting;
