import { styled } from '@mui/material/styles';
import { Box, ListItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SidebarItemProps {
  active?: boolean;
  online?: boolean
}

export const SidebarContainer = styled(Box)({
  width: 240,
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0', 
  height: '600px',
  overflowY: 'auto',
});

export const StatusIndicator = styled("div", {
  shouldForwardProp: (prop) => prop !== "online",
})<SidebarItemProps>(({ online }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: online ? "#4caf50" : "red",
}));

export const SidebarItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<SidebarItemProps>(({ active }) => ({
  '&:hover': {
    backgroundColor: '#e5f5f7',
    cursor: 'pointer',
  },
  backgroundColor: active ? '#e5f5f7' : 'transparent',
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

export const Count = styled(Typography)({
  marginLeft: 'auto',
  color: '#757575', 
});

export const CountBadge = styled(motion.div)({
  color: '#757575', 
  backgroundColor: '#7dd1e3',
  width: '18px',
  height: '20px',
  borderRadius: '10px'
});