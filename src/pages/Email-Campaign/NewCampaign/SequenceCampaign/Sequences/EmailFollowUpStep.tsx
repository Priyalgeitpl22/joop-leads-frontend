import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AbConfiguration,
  AddVarientButton,
  BorderConatiner,
  EmailFollowUp,
  EmailFollowUpContainer,
  LeftDashedBorder,
} from "./sequences.styled";

interface EmailFollowUpStepProps {
  onAddStep: () => void;
  onDelete: () => void;
  openAbConfigurationDialog: () => void;
}

const EmailFollowUpStep: React.FC<EmailFollowUpStepProps> = ({ onDelete, openAbConfigurationDialog }) => {
  const [subjects, setSubjects] = useState<string[]>(["Subject 1"]);

  const handleAddVariant = () => {
    setSubjects([...subjects, `Subject ${subjects.length + 1}`]);
  };
  const colors = [
    "#6e58f1",
    "#ff6b6b",
    "#ffb400",
    "#4caf50",
    "#2196f3",
    "#9c27b0",
  ];

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  return (
    <>
      <EmailFollowUpContainer>
        <BorderConatiner>
          <MailOutlineIcon sx={{ fontSize: 20, color: "#6e58f1" }} />
          <LeftDashedBorder />
        </BorderConatiner>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "58px" }}>
            <Typography fontWeight="bold" sx={{ marginLeft: "8px" }}>
              Email follow up
            </Typography>
            <AbConfiguration onClick={openAbConfigurationDialog}>
              A/B Configuration
            </AbConfiguration>
          </div>

          <EmailFollowUp>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={14}>Email</Typography>
              <DeleteOutlineIcon onClick={onDelete} />
            </div>
            {subjects.length > 1 ? (
              subjects.map((subject, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  width="100%"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: colors[index % colors.length],
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        margin: "4px",
                        fontSize: 14,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </Box>
                    <Typography fontSize={14}>
                      {subject.replace(/\d+/g, "").trim()}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSubject(index)}
                    sx={{ marginLeft: "auto" }}
                  >
                    <CloseIcon fontSize="small" sx={{ color: "black" }} />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography fontSize={14}>Subject ---</Typography>
            )}
          </EmailFollowUp>

          <div>
            <AddVarientButton onClick={handleAddVariant}>
              + Add Variant
            </AddVarientButton>
          </div>
        </div>
      </EmailFollowUpContainer>
    </>
  );
};

export default EmailFollowUpStep;
