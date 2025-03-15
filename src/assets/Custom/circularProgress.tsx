import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function CircularLoader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(15px)',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
      }}
    >
      <CircularProgress sx={{ color: 'var(--border-color)' }} />
    </Box>
  );
}
