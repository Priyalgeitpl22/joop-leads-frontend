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
} from "./EmailInboxSidebar.styled";

const EmailInboxSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllChats());
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
      <SidebarHeader>For Me</SidebarHeader>
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
