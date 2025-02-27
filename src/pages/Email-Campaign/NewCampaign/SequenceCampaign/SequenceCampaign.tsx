import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmailFollowUpStep from "./Sequences/EmailFollowUpStep";
import { AddStepButton } from "./Sequences/sequences.styled";
import ManualFollowUp from "./Sequences/ManualFollowUp";

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

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
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
            <EmailFollowUpStep
              key={index}
              onAddStep={function (): void {
                throw new Error("Function not implemented.");
              }}
              onDelete={() => handleRemoveStep(index)}
            />
          ) : (
            <ManualFollowUp
              key={index}
              onAddStep={function (): void {
                throw new Error("Function not implemented.");
              }}
              onDelete={() => handleRemoveStep(index)}
            />
          )
        )}

        <AddStepButton onClick={handleAddStep}>
          <AddIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <Typography fontSize={14}>Add step</Typography>
        </AddStepButton>

        {showStepOptions && (
          <div>
            <Box display="flex" justifyContent="center" gap={16} pt={2}>
              <IconButton onClick={handleAddEmailStep}>
                <EmailIcon sx={{ color: "#6e58f1" }} />
              </IconButton>

              <IconButton onClick={handleAddManualStep}>
                <AssignmentIcon sx={{color: "#6e58f1"}} />
              </IconButton>
            </Box>
          </div>
        )}
      </SidebarContainer>

      <Box flex={1} padding={3}>
        <EmailTemplate />
      </Box>
    </Box>
  );
};

export default SequenceCampaign;
