import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const ChatContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '600px',
  backgroundColor: '#fff',
});

export const ChatHeader = styled(Box)({
  padding: '12px', 
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff', 
});

export const ChatMessages = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
});


export const Message = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isbot',
})<{ isbot?: boolean }>(({ isbot }) => ({
  display: 'flex',
  gap: '8px',
  marginBottom: '24px',
  '& .message-content': {
    backgroundColor: isbot ? '#f5f5f5' : '#7ed8d6',
    color: isbot ? '#000' : '#fff',
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '100%',
  },
}));


export const ReassignmentNote = styled(Typography)({
  color: '#757575',      
  fontSize: '0.875rem',
  textAlign: 'center',
  margin: '16px 0',       
  padding: '8px',          
  backgroundColor: '#fafafa',
  borderRadius: '8px',    
});

export const ChatInputContainer = styled(Box)({
  padding: '16px', 
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#fff',
});

export const QuickReplyButton = styled(Button)({
  marginRight: '8px',  
  marginBottom: '8px',  
  borderColor: '#e0e0e0',
  color: '#000',      
});
export const PlaceholderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
});