import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import EmailInboxArea from "./EmailInboxArea/EmailInboxArea";
import EmailInboxList from "./EmailInboxList/EmailInboxList";
import EmailInboxSideBar from "./EmailInboxSidebar/EmailInboxSidebar";
import { EmailInboxContainer } from "./EmailInboxSidebar/EmailInboxSidebar.styled";
import { ThreadType } from "../../enums";
import { PlaceholderContainer } from "./EmailInboxArea/EmailInboxArea.styled";
import { Typography } from "@mui/material";

export default function EmailInboxs() {
  const { threads = [] } = useSelector((state: RootState) => state.thread);

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedThreadType, setSelectedThreadType] = useState<string>(
    ThreadType.UNASSIGNED
  );

  return (
    <>
      {threads.length > 0 ? (
        <EmailInboxContainer>
          <EmailInboxSideBar
            selectedType={selectedThreadType}
            onSelectType={setSelectedThreadType}
          />
          <EmailInboxList
            threads={threads.filter(
              (thread) => thread.type === selectedThreadType
            )}
            onSelectThread={(newThreadId: string) =>
              setSelectedThreadId(newThreadId)
            }
            type={selectedThreadType}
            selectedThreadId={selectedThreadId}
          />
          <EmailInboxArea/>
        </EmailInboxContainer>
      ) : (
        <PlaceholderContainer>
          <img
            src="https://img.freepik.com/free-vector/cartoon-style-robot-vectorart_78370-4103.jpg"
            alt="No conversation selected"
            width="300"
          />
          <Typography sx={{ color: "#000000" }}>No EmailInboxs available.</Typography>
        </PlaceholderContainer>
      )}
    </>
  );
}
