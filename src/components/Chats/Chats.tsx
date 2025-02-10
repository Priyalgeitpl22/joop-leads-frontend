import ChatArea from './ChatArea/ChatArea';
import ChatList from './ChatList/ChatList';
import { ChatContainer } from './Chats.styled';
import ChatSideBar from './ChatSideBar/ChatSideBar';

export default function Chats() {
  return (
      <ChatContainer>
        <ChatSideBar/>
        <ChatList />
        <ChatArea />
      </ChatContainer>
  )
}
