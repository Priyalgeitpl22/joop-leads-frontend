import { motion } from "framer-motion";
import {
  Box,
} from "@mui/material";
import {
  EmailCampaignContainer,
} from "./../EmailCampaign.styled";
import { Button2 } from "../../../styles/layout.styled";
import { useNavigate } from "react-router-dom";
const ViewSequencesEmailCampaign = () => {
  const navigate = useNavigate();

  const handleAddSequence = () => {
    navigate("/email-campaign/new-campaign")
  }

  return (
    <EmailCampaignContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ width: "100%" }}
      >
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
            <b>
              <div>Automate Scenarios Using Your Leads’ Behaviour</div>
            </b>
            <div>
              Listen and react to your
              lead's replies automatically. <br/>Auto-handle & convert "Out of
              Office", "Not Interested" responses.
            </div>
            <Button2
              style={{ width: "40%" }}
              color={""}
              background={""}
              onClick={handleAddSequence}
            >
              Add Sequences
            </Button2>
          </Box>
        </Box>
      </motion.div>
    </EmailCampaignContainer>
  );
};

export default ViewSequencesEmailCampaign;
