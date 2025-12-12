import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import CheckIcon from "@mui/icons-material/Check";
import {
  UploadFile,
  PlaylistAddCheck,
  CheckCircle,
  Settings,
} from "@mui/icons-material";

const ColorlibConnector = styled(StepConnector)({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 14 },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "var(--primary-light-gradient)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "#e5e7eb",
    borderRadius: 1,
  },
});

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: "#f3f4f6",
  zIndex: 1,
  padding: "6px",
  color: "#6b7280",
  width: 20,
  height: 20,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #e5e7eb",
  transition: "all 0.3s ease-in-out",
  ...(ownerState.active && {
    background: "var(--primary-light-gradient)",
    color: "white",
    border: "2px solid var(--primary-dark)",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
  }),
  ...(ownerState.completed && {
    background: "var(--primary-light-gradient)",
    color: "white",
    border: "2px solid var(--primary-dark)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const stepIcons: Record<number, JSX.Element> = {
    1: <UploadFile sx={{ fontSize: "20px" }} />,
    2: <PlaylistAddCheck sx={{ fontSize: "20px" }} />,
    3: <Settings sx={{ fontSize: "20px" }} />,
    4: <CheckCircle sx={{ fontSize: "20px" }} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? (
        <CheckIcon sx={{ fontSize: "20px" }} />
      ) : (
        stepIcons[Number(icon)] &&
        React.cloneElement(stepIcons[Number(icon)], {
          sx: { color: active ? "white" : "#9ca3af" },
        })
      )}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  { label: "Import Leads", icon: <UploadFile fontSize="small" /> },
  { label: "Sequences", icon: <PlaylistAddCheck fontSize="small" /> },
  { label: "Setup", icon: <Settings fontSize="small" /> },
  { label: "Final Review", icon: <CheckCircle fontSize="small" /> },
];

interface CustomizedStepperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export const CustomizedStepper: React.FC<CustomizedStepperProps> = ({
  activeStep,
  setActiveStep,
}) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton
              onClick={() => setActiveStep(index)}
              sx={{
                "&:hover": { background: "transparent" },
              }}
            >
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                sx={{
                  "& .MuiStepLabel-label": {
                    color: activeStep >= index ? "#1f2937" : "#9ca3af",
                    fontWeight: activeStep >= index ? "600" : "500",
                    fontSize: "14px",
                    transition: "color 0.3s ease-in-out",
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
