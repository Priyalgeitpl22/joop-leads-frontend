import { styled } from '@mui/material/styles';
import { Box, Typography, ListItem, TypographyProps} from '@mui/material';
import { motion } from 'framer-motion';

export const ChatListContainer = styled(Box)({
  width: 300,
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
});

export const ChatListHeader = styled(Box)({
  padding: '16px', 
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)', 
  backgroundColor: '#fff', 
  display: 'flex',
  alignItems: 'center',
  gap: '8px', 
});

interface ChatListItemProps {
  active?: boolean;
}

export const ChatListItem = styled(motion.create(ListItem), {
  shouldForwardProp: (prop) => prop !== 'active',
})<ChatListItemProps>(({ active }) => ({
  '&:hover': {
    backgroundColor: '#e5f5f7',
    cursor: 'pointer',
  },
  padding: '12px 16px',
  backgroundColor: active ? '#e5f5f7' : 'transparent',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

export const TimeStamp = styled(Typography)({
  fontSize: '0.75rem',
  color: 'rgba(0, 0, 0, 0.6)',
});

export const MessagePreview = styled(Typography)<TypographyProps>({
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '0.7rem',
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  maxWidth: '22ch',
  textOverflow: 'clip',
});

MessagePreview.defaultProps = {
  component: 'span',
};


