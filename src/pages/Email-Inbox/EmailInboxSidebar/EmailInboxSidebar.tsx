import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import {
  getAllAccountMailBox,
  getAllChats,
  setSelectedMailbox,
} from "../../../redux/slice/emailInboxSlice";
import {
  SidebarContainer,
  SidebarHeader,
  StyledDivider,
  StyledList,
  StyledListItem,
  NoMailboxMessage,
  EmailInboxListHeader
} from "./EmailInboxSidebar.styled";

const EmailInboxSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats({ orgId: user?.orgId || "" }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );

  const handleMailboxClick = (mailbox: { _id: string }) => {
    if (!selectedAccountId) return;
    dispatch(setSelectedMailbox(mailbox._id));
    dispatch(
      getAllAccountMailBox({
        accountId: selectedAccountId,
        mailBoxId: mailbox._id,
        page: 1,
        limit: 10,
      })
    );
  };

  const selectedMailboxId = useSelector(
    (state: RootState) => state.emailInbox.selectedMailboxId
  );

  const mailboxes = useSelector(
    (state: RootState) => state.emailInbox.mailboxes
  );

  const uniqueMailboxes = mailboxes.filter(
    (mailbox, index, self) =>
      index === self.findIndex((m) => m.name === mailbox.name)
  );

  // const truncateText = (text: string, maxLength: number) => {
  //   return text.length > maxLength
  //     ? `${text.substring(0, maxLength)}...`
  //     : text;
  // };

  useEffect(() => {
    if (uniqueMailboxes.length > 0 && selectedAccountId && !selectedMailboxId) {
      const firstMailbox = uniqueMailboxes[0];
      dispatch(setSelectedMailbox(firstMailbox._id));
      dispatch(
        getAllAccountMailBox({
          accountId: selectedAccountId,
          mailBoxId: firstMailbox._id,
         
        })
      );
    }
  }, [uniqueMailboxes, selectedMailboxId, selectedAccountId, dispatch]);

  return (
    <SidebarContainer>
      <EmailInboxListHeader>
        <SidebarHeader>Mailbox</SidebarHeader>
      </EmailInboxListHeader>
      <StyledDivider />
      <StyledList>
        {uniqueMailboxes.length > 0 ? (
          uniqueMailboxes.map((mailbox) => (
            <StyledListItem
              key={mailbox._id}
              onClick={() => handleMailboxClick(mailbox)}
              active={selectedMailboxId === mailbox._id}
            >
              {mailbox.name}
            </StyledListItem>
          ))
        ) : (
          <NoMailboxMessage>No mailboxes available</NoMailboxMessage>
        )}
      </StyledList>
    </SidebarContainer>
  );
};

export default EmailInboxSideBar;
