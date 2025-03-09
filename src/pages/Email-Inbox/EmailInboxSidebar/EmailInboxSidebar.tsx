import {
  Box,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useEffect } from "react";
import { getAllAccountMailBox, getAllChats, setSelectedMailbox } from "../../../redux/slice/emailInboxSlice";

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

  return (
    <>
      <Box
        sx={{
          width: "18%",
          overflow: "scroll",
          padding: "10px",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            color: "#777",
            padding: "10px 15px",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          FOR ME
        </Box>
        <Divider />

        <List sx={{ paddingTop: "5px" }}>
          {uniqueMailboxes.length > 0 ? (
            uniqueMailboxes.map((mailbox) => (
              <ListItem
                key={mailbox._id}
                onClick={() => handleMailboxClick(mailbox)}
                sx={{
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor:
                    selectedMailboxId === mailbox._id
                      ? "#f1f3f5"
                      : "transparent",
                  color:
                    selectedMailboxId === mailbox._id
                      ? "rgb(9 16 115)"
                      : "#333",
                  fontWeight:
                    selectedMailboxId === mailbox._id ? "bold" : "normal",
                  transition: "background 0.2s",
                  "&:hover": { backgroundColor: "#f1f3f5" },
                }}
              >
                {mailbox.name}
              </ListItem>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                color: "#555",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "20px",
                height: "100%",
                width: "100%",
              }}
            >
              No mailboxes available
            </div>
          )}
        </List>
      </Box>
    </>
  );
};

export default EmailInboxSideBar;
