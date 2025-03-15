import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import EmailInboxArea from "./EmailInboxArea/EmailInboxArea";
import EmailInboxList from "./EmailInboxList/EmailInboxList";
import EmailInboxSideBar from "./EmailInboxSidebar/EmailInboxSidebar";
import { EmailInboxContainer, EmailInboxHeader, EmailInbox } from "./EmailInboxSidebar/EmailInboxSidebar.styled";
import { getAllChats } from "../../redux/slice/emailInboxSlice";
import { SectionTitle } from "../../styles/layout.styled";

export default function EmailInboxs() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats());
    }, 1000);

    return () => clearTimeout(timer);
    
  }, [dispatch]);

  return (
    <>
      <EmailInbox>
        <EmailInboxHeader>
          <SectionTitle>Email Inbox</SectionTitle>
        </EmailInboxHeader>
        <EmailInboxContainer>
          <EmailInboxList />
          <EmailInboxSideBar />
          <EmailInboxArea />
        </EmailInboxContainer>
      </EmailInbox>
    </>
  );
}
