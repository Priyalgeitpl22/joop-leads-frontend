import { styled } from '@mui/material/styles';
import { Box, ListItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  active?: boolean;
}

export const SidebarContainer = styled(Box)({
  width: 240,
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0', 
  height: '600px',
  overflowY: 'auto',
});

export const StatusIndicator = styled('div')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#4caf50',
  marginRight: 8,
});

export const SidebarItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<SidebarItemProps>(({ active }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    cursor: 'pointer',
  },
  backgroundColor: active ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
  position: 'relative',
}));

export const ActiveIndicator = styled(motion.div)({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 4,
  backgroundColor: '#e5f5f7', 
  borderRadius: '0 4px 4px 0',
});

export const CountBadge = styled(Typography)({
  marginLeft: 'auto',
  color: '#757575', 
});
