import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailFollowUp from "./Sequences/EmailFollowUp";
import { AddStepButton } from "./Sequences/sequences.styled";

const SequenceCampaign = () => {
  const [steps, setSteps] = useState(["email"]);
  const [showStepOptions, setShowStepOptions] = useState(false);

  const handleAddStep = () => {
    setShowStepOptions(!showStepOptions);
  };

  const handleAddEmailStep = () => {
    setSteps([...steps, "email"]);
    setShowStepOptions(false);
  };

  const handleAddManualStep = () => {
    setSteps([...steps, "manual"]);
    setShowStepOptions(false);
  };

  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{
          borderRight: "1px solid #ddd",
          paddingLeft: "2%",
          overflow: "scroll",
          width: "fitContent",
          padding: "18px",
        }}
      >
        {steps.map((step, index) =>
          step === "email" ? (
            <EmailFollowUp
              key={index}
              onAddStep={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ) : null
        )}

        <AddStepButton onClick={handleAddStep}>
          <AddIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <Typography fontSize={14}>Add step</Typography>
        </AddStepButton>

        {showStepOptions && (
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <IconButton onClick={handleAddEmailStep}>
              <EmailIcon color="primary" />
            </IconButton>

            <IconButton onClick={handleAddManualStep}>
              <AssignmentIcon color="primary" />
            </IconButton>
          </Box>
        )}
      </SidebarContainer>

      <Box flex={1} padding={3}>
        <EmailTemplate />
      </Box>
    </Box>
  );
};

export default SequenceCampaign;
