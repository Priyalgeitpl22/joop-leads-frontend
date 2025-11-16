import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {Container, ContentBox, Subtitle, TextContainer, Title} from "./ViewSequencesCampaign.styled"
import { Button } from "../../../styles/global.styled";
interface ViewSequencesEmailCampaignProps {
  campaignId: string;
}

const ViewSequencesEmailCampaign: React.FC<ViewSequencesEmailCampaignProps> = ({
  campaignId,
}) => {
  const navigate = useNavigate();

  const handleAddSequence = () => {
    navigate(`/email-campaign/new-campaign?edit&id=${campaignId}`);
  };

  return (
    <Container style={{height: "100%"}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ width: "100%" }}
      >
        <ContentBox>
          <TextContainer>
            <Title>Automate Scenarios Using Your Leads’ Behaviour</Title>
            <Subtitle>
              Listen and react to your lead's replies automatically. <br />
              Auto-handle & convert "Out of Office", "Not Interested" responses.
            </Subtitle>
            <Button
              onClick={() => handleAddSequence()}
            >
              Add Sequences
            </Button>
          </TextContainer>
        </ContentBox>
      </motion.div>
    </Container>
  );
};

export default ViewSequencesEmailCampaign;