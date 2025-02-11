import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThreads } from '../../redux/slice/threadSlice';
import { AppDispatch, RootState } from '../../redux/store/store';
import ChatArea from './ChatArea/ChatArea';
import ChatList from './ChatList/ChatList';
import { ChatContainer } from './Chats.styled';
import ChatSideBar from './ChatSideBar/ChatSideBar';
import { useParams } from 'react-router-dom';

export default function Chats() {
  const dispatch = useDispatch<AppDispatch>(); 
  const { threads, loading, error } = useSelector((state: RootState) => state.thread);
  const { threadId } = useParams();

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllThreads());
  }, [dispatch]);

  useEffect(() => {
    console.log("Threads updated:", threads);
    if (threads.length > 0) {
      setSelectedThreadId(threadId ?? threads[0].id);
    }
  }, [threads, threadId]);

  return (
    <ChatContainer>
      <ChatSideBar />
      
      <ChatList 
        threads={threads} 
        onSelectThread={setSelectedThreadId}
      />

      {selectedThreadId && <ChatArea selectedThreadId={selectedThreadId} />}
    </ChatContainer>
  );
}
