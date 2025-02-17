import { styled } from '@mui/material/styles';
import { Box, Typography, ListItem, TypographyProps, List} from '@mui/material';
import { motion } from 'framer-motion';

export const ChatListContainer = styled(Box)({
  width: 300,
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px'
});

export const ChatListHeader = styled(Box)({
  padding: '10px', 
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)', 
  backgroundColor: '#fff', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px', 
});

export const ThreadList = styled(List)`
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;
    gap: 5px;
    display: flex;
    flex-direction: column;
`
interface ChatListItemProps {
  active?: boolean;
}

export const ChatListItem = styled(motion.create(ListItem), {
  shouldForwardProp: (prop) => prop !== 'active',
})<ChatListItemProps>(({ active }) => ({
  '&:hover': {
    backgroundColor: 'var(--theme-color)',
    cursor: 'pointer',
  },
  padding: '12px 16px',
  backgroundColor: active ? 'var(--theme-color)' : 'transparent',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '8px'
}));

export const TimeStamp = styled(Typography)({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.75rem',
  color: 'rgba(0, 0, 0, 0.6)',
  alignItems: 'center'
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


