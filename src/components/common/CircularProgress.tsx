import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "styled-components";

interface Props {
  value: number;
  size?: number;
  thickness?: number;
}

export default function CircularProgressWithStatus({
  value,
  size = 40,
  thickness = 4,
}: Props) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      {/* Background ring */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: "#e0e0e0",
        }}
      />

      {/* Foreground progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color: "#7ac943", // green
          position: "absolute",
          left: 0,
        }}
      />

      {/* Center text */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{ fontSize: '10px', color: theme.colors.text.primary }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
