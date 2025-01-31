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
      minHeight: '100vh', 
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
            <Box sx={{ color: '#6c757d', textAlign: 'center', mb: 2 }}>
              September 5
            </Box>
            <Message>
              Hi there! Let me know if you have any questions about the product or pricing.
            </Message>
          </ChatBody>

          <InputContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Write a message"
              size="small"
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {settings.allowEmoji && (
                      <>
                        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
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
                      <IconButton component="label">
                        <AttachFile />
                        <input type="file" hidden />
                      </IconButton>
                    )}

                    <IconButton color="primary">
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
