import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreads } from "../../redux/slice/threadSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import ChatArea from "./ChatArea/ChatArea";
import ChatList from "./ChatList/ChatList";
import ChatSideBar from "./ChatSideBar/ChatSideBar";
import { useSocket } from "../../context/SocketContext";
import Loader from "../../components/Loader";
import { ChatContainer } from "./ChatSideBar/chatSidebar.styled";
import { ThreadType } from "../../enums";
import { PlaceholderContainer } from "./ChatArea/chatArea.styled";
import { Typography } from "@mui/material";

export default function Chats() {
  const dispatch = useDispatch<AppDispatch>();
  const { threads = [] } = useSelector((state: RootState) => state.thread);
  const { socket } = useSocket();

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedThreadType, setSelectedThreadType] = useState<string>(
    ThreadType.UNASSIGNED
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllThreads());
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (threads.length > 0 && !selectedThreadId) {
      setSelectedThreadId(threads[0].id);
    }
  }, [threads, selectedThreadId]);

  useEffect(() => {
    if (!socket) return;

    const handleAnyEvent = (eventName: string, ...args: any[]) => {
      console.log(`📡 Event received: ${eventName}`, args);
      setLastEvent(eventName);
      if (eventName === "receiveMessage") {
        setMessages((prevMessages) => [...prevMessages, args[0]]);
      }
    };

    socket.onAny(handleAnyEvent);

    return () => {
      socket.offAny(handleAnyEvent);
    };
  }, [socket]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {threads.length > 0 ? (
        <ChatContainer>
          <ChatSideBar
            selectedType={selectedThreadType}
            onSelectType={setSelectedThreadType}
          />
          <ChatList
            threads={threads.filter(
              (thread) => thread.type === selectedThreadType
            )}
            onSelectThread={(newThreadId: string) =>
              setSelectedThreadId(newThreadId)
            }
            type={selectedThreadType}
            selectedThreadId={selectedThreadId}
          />
          <ChatArea
            onSelectThread={(newThreadId: string) =>
              setSelectedThreadId(newThreadId)
            }
            selectedThreadId={selectedThreadId}
          />
        </ChatContainer>
      ) : (
        <PlaceholderContainer>
        <img
          src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg"
          alt="No conversation selected"
          width="300"
        />
        <Typography sx={{ color: "#000000" }}>
          No chats available.
        </Typography>
      </PlaceholderContainer>
      )}
    </>
  );
}
