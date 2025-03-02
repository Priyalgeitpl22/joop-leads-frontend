import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        sx={{
          backgroundColor: 'lightgray',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'var(--theme-color)', 
          },
        }}
      />
    </Box>
  );
}
