import { useEffect, useState } from "react";
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
  EmailInboxListHeader,
} from "./EmailInboxSidebar.styled";
import CircularLoader from "../../../assets/Custom/circularProgress";

const EmailInboxSideBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedAccountId = useSelector(
    (state: RootState) => state.emailInbox.selectedAccountId
  );
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
    const timer = setTimeout(() => {
      dispatch(getAllChats({ orgId: user?.orgId || "" }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, user?.orgId]);

  useEffect(() => {
    const fetchInitialMailbox = async () => {
      setLoading(true);
      if (uniqueMailboxes.length > 0 && selectedAccountId && !selectedMailboxId) {
        const firstMailbox = uniqueMailboxes[0];
        dispatch(setSelectedMailbox(firstMailbox._id));
        await dispatch(
          getAllAccountMailBox({
            accountId: selectedAccountId,
            mailBoxId: firstMailbox._id,
          })
        );
      }
      setLoading(false);
    };

    fetchInitialMailbox();
  }, [uniqueMailboxes, selectedMailboxId, selectedAccountId, dispatch]);

  const handleMailboxClick = async (mailbox: { _id: string }) => {
    if (!selectedAccountId) return;
    setLoading(true);
    dispatch(setSelectedMailbox(mailbox._id));
    await dispatch(
      getAllAccountMailBox({
        accountId: selectedAccountId,
        mailBoxId: mailbox._id,
        page: 1,
        limit: 10,
      })
    );
    setLoading(false);
  };

  return (
    <SidebarContainer>
      <EmailInboxListHeader>
        <SidebarHeader>Mailbox</SidebarHeader>
      </EmailInboxListHeader>
      <StyledDivider />
      <StyledList>
        {loading ? (
          <CircularLoader />
        ) : uniqueMailboxes.length > 0 ? (
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
