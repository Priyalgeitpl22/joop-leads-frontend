import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThreads } from '../../redux/slice/threadSlice';
import { AppDispatch, RootState } from '../../redux/store/store';
import ChatArea from './ChatArea/ChatArea';
import ChatList from './ChatList/ChatList';
import { ChatContainer } from './Chats.styled';
import ChatSideBar from './ChatSideBar/ChatSideBar';
import { useParams, useNavigate } from 'react-router-dom';

export default function Chats() {
  const dispatch = useDispatch<AppDispatch>(); 
  const { threads } = useSelector((state: RootState) => state.thread);
  const { type, threadId } = useParams<{ type: string; threadId: string }>();
  const navigate = useNavigate();
  
  // Local state for the selected thread ID.
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threadId || null);

  useEffect(() => {
    dispatch(getAllThreads());
  }, [dispatch]);

  useEffect(() => {
    if (threads.length > 0) {
      const currentType = type || "unassigned";
      navigate(`/chats/${currentType}`, { replace: true });
    }
  }, [threads, type, threadId, navigate]);

  return (
    <ChatContainer>
      <ChatSideBar selectedType={type || "unassigned"} />
      <ChatList 
        threads={threads.filter(thread => thread.type === (type || "unassigned"))} 
        onSelectThread={(newThreadId: string) => setSelectedThreadId(newThreadId)}
        type={type || "unassigned"}
      />
      <ChatArea selectedThreadId={selectedThreadId} />
    </ChatContainer>
  );
}
