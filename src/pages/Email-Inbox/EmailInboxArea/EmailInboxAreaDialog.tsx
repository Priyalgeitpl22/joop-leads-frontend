import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/store";
import { sentEmailReply } from "../../../redux/slice/emailInboxSlice";

interface Message {
  id: string;
  threadId: string;
  messageId: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  subject: string;
  body: string;
  date: string;
}

interface EmailThreadViewProps {
  messages: Message[];
  onClose: () => void;
}

const EmailThreadView: React.FC<EmailThreadViewProps> = ({ messages, onClose }) => {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const selectedAccount = useSelector((state: RootState) =>
    state.emailInbox.accounts.find(
      (account) => account._id === state.emailInbox.selectedAccountId
    )
  );

  const handleSend = () => {
    if (replyContent.trim()) {
      const lastMessage = messages[messages.length - 1];
      const firstMessage = messages[0];

      const replyPayload = {
        from: {
          name: selectedAccount?.name || "Unknown",
          address: selectedAccount?.email || "",
        },
        to: {
          name: lastMessage?.from?.[0]?.name || "Unknown",
          address: lastMessage?.from?.[0]?.address || "",
        },
        emailTemplate: {
          subject: firstMessage?.subject || "No Subject",
          emailBody: replyContent, // plain text from TextField
        },
        messageId: lastMessage?.messageId || "",
        threadId: lastMessage?.threadId || "",
      };

      dispatch(sentEmailReply(replyPayload));

      console.log("Calling Reply API", replyPayload);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const handleDiscard = () => {
    setReplyContent("");
    setIsReplying(false);
  };

  const renderMessage = (msg: Message) => (
    <Paper elevation={2} sx={{ padding: 2, borderRadius: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar
          src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography fontWeight={600} fontSize={16}>
            {msg.from?.[0]?.name || "Unknown Sender"}
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            {new Date(msg.date).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize={14} color="text.secondary" mb={1}>
        To: {msg.to?.[0]?.name || "Unknown"} ({msg.to?.[0]?.address || "No Email"})
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography
        component="div"
        dangerouslySetInnerHTML={{ __html: msg.body || "No content available." }}
        sx={{ fontSize: "15px", lineHeight: 1.6 }}
      />
    </Paper>
  );

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        position: "relative",
      }}
    >
      <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" fontWeight={700} mb={3}>
        {messages[0]?.subject || "No Subject"}
      </Typography>

      {messages.length === 1 ? (
        renderMessage(messages[0])
      ) : (
        messages.map((msg, index) => (
          <Accordion
            key={index}
            defaultExpanded={index === messages.length - 1}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              mb: 2,
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography fontWeight={600} fontSize={16}>
                    {msg.from?.[0]?.name || "Unknown Sender"}
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    {new Date(msg.date).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize={14} color="text.secondary" mb={1}>
                To: {msg.to?.[0]?.name || "Unknown"} ({msg.to?.[0]?.address || "No Email"})
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: msg.body || "No content available." }}
                sx={{ fontSize: "15px", lineHeight: 1.6 }}
              />
            </AccordionDetails>
          </Accordion>
        ))
      )}

      <Box mt={4}>
        {isReplying ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
              multiline
              minRows={4}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
              <Button variant="outlined" onClick={handleDiscard}>
                Discard
              </Button>
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={!replyContent.trim()}
              >
                Send
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" onClick={() => setIsReplying(true)}>
              Reply
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmailThreadView;