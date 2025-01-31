import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Send, AttachFile, InsertEmoticon, Chat } from '@mui/icons-material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { ChevronDown } from 'lucide-react';
import {
  ChatContainer,
  Header,
  Logo,
  ChatBody,
  Message,
  InputContainer,
  StyledTextField,
  OpenButton,
  EmojiPickerContainer,
  DropdownIconButton
} from './chatBot.styled'; // Import styled components

function ChatBot({ settings }: any) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleMenuClick = () => {
    setIsOpen(false);  // Close the chatbot directly
  };

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: "relative"
    }}>
      {isOpen ? (
        <ChatContainer>
          <Header bgcolor={settings.selectedColor}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Logo src="https://i.pravatar.cc/300" alt="Logo" />
              <span>ChatBot</span>
            </div>
            <DropdownIconButton onClick={handleMenuClick}>
              <ChevronDown />
            </DropdownIconButton>
          </Header>

          <ChatBody>
           {/* First message is from bot */}
           <div style={{ display: 'flex', flexDirection: 'column' }}>
           <Message style={{ backgroundColor: '#e9ecef' }}>
           Hello! How can I help you?
            </Message>
              <span style={{ fontSize: '10px',color:'#6b7280', marginBlock:'0.5rem'}}>10:30 AM</span>
              </div>
            {/* Second message is from user */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Message style={{ backgroundColor: settings.selectedColor, color: '#fff' }}>
            I need assistance with my order.
            </Message>
            <span style={{ fontSize: '10px', color:'#6b7280', marginBlock:'0.5rem'}}>10:31 AM</span>
            </div>
          </ChatBody>

          <InputContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              size="small"
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {settings.allowEmoji && (
                      <>
                        <IconButton sx={{ padding: '3px' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                          <InsertEmoticon />
                        </IconButton>
                        {showEmojiPicker && (
                          <EmojiPickerContainer>
                            <Picker 
                              data={data} 
                              onEmojiSelect={(emoji: any) => setMessage((prev) => prev + emoji.native)} 
                            />
                          </EmojiPickerContainer>
                        )}
                      </>
                    )}
                    
                    {settings.allowFileUpload && (
                      <IconButton sx={{ padding: '3px' }} component="label">
                        <AttachFile />
                        <input type="file" hidden />
                      </IconButton>
                    )}

                    <IconButton sx={{ padding: '3px' }}>
                      <Send />
                    </IconButton>
                  </>
                ),
              }}
            />
          </InputContainer>
        </ChatContainer>
      ) : (
        // Open Button at Bottom Right Corner
        <OpenButton bgcolor={settings.selectedColor} onClick={() => setIsOpen(true)}>
          <Chat />
        </OpenButton>
      )}
    </Box>
  );
}

export default ChatBot;
