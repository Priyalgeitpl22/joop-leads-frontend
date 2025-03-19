import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {Container, ContentBox, Subtitle, TextContainer, Title} from "./ViewSequencesCampaign.styled"
import { Button2 } from "../../../styles/layout.styled";
interface ViewSequencesEmailCampaignProps {
  campaignId: string;
}

const ViewSequencesEmailCampaign: React.FC<ViewSequencesEmailCampaignProps> = ({
  campaignId,
}) => {
  const navigate = useNavigate();

  const handleAddSequence = (id: string) => {
    navigate(`/email-campaign/new-campaign?edit&id=${id}`);
  };

  return (
    <Container>
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
            <Button2
              onClick={() => handleAddSequence(campaignId)}
              color={"#fff"}
              background={"var(--theme-color)"}
              style={{
                width: "30%",
                height: "35%",
                marginTop: "10px",
                padding: "0px",
              }}
            >
              Add Sequences
            </Button2>
          </TextContainer>
        </ContentBox>
      </motion.div>
    </Container>
  );
};

export default ViewSequencesEmailCampaign;