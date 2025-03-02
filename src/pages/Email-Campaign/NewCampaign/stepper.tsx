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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 14 },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "var(--white-fade-gradient)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ ownerState }) => ({
  backgroundColor:
    ownerState.completed || ownerState.active ? "transparent" : "#ccc",
  zIndex: 1,
  padding: "16px",
  color: "var(--background-light)",
  width: 20,
  height: 20,
  marginBottom: "-8px",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(36 24 80), rgb(145 131 208), rgb(89 16 222))",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(36 24 80), rgb(145 131 208), rgb(89 16 222))",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const stepIcons: Record<number, JSX.Element> = {
    1: <UploadFile sx={{ fontSize: "18px" }} />,
    2: <PlaylistAddCheck sx={{ fontSize: "18px" }} />,
    3: <Settings sx={{ fontSize: "18px" }} />,
    4: <CheckCircle sx={{ fontSize: "18px" }} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? (
        <CheckIcon sx={{ fontSize: "18px", color: "var(--background-light)" }} />
      ) : active ? (
        stepIcons[Number(icon)] &&
        React.cloneElement(stepIcons[Number(icon)], {
          sx: { color: "var(--theme-color-light)" },
        })
      ) : (
        stepIcons[Number(icon)] &&
        React.cloneElement(stepIcons[Number(icon)], {
          sx: { color: "var(--hover-color)" },
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
    <Stack sx={{ width: "100%" }} spacing={3}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton onClick={() => setActiveStep(index)}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                sx={{
                  "& .MuiStepLabel-label": {
                    color:
                      activeStep >= index
                        ? "var(--background-light) !important"
                        : "var(--background-light)",
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
