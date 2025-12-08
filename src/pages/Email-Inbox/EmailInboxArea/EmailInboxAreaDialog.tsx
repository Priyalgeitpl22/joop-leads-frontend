import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { sentEmailReply } from "../../../redux/slice/emailInboxSlice";
import { Button, SecondaryButton } from "../../../styles/global.styled";
import { TextArea } from "../../../styles/layout.styled";
import { formatDateTimeWithRelative } from "../../../utils/utils";
import { EmailAccount } from "../../../redux/slice/emailAccountSlice";

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
  selectedAccount: EmailAccount;
}

const EmailThreadView: React.FC<EmailThreadViewProps> = ({
  messages,
  onClose,
  selectedAccount
}) => {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSend = () => {
    if (replyContent.trim()) {
      const lastMessage = messages[messages.length - 1];
      const firstMessage = messages[0];

      const replyPayload = {
        accountId: selectedAccount?._id as string,
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
          emailBody: replyContent,
        },
        messageId: lastMessage?.messageId || "",
        threadId: lastMessage?.threadId || "",
      };

      dispatch(sentEmailReply(replyPayload));

      setReplyContent("");
      setIsReplying(false);
    }
  };

  const handleDiscard = () => {
    setReplyContent("");
    setIsReplying(false);
  };

  const renderMessage = (msg: Message) => (
    <Box
      sx={{
        padding: 1,
        borderRadius: 2,
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border-grey)",
        overflowY: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Avatar
          src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_placeholder.png"
          sx={{ width: 40, height: 40 }}
        />
        <Box>
          <Typography fontSize={12} fontWeight={400}>
            {msg.from?.[0]?.address || "Unknown Sender"}
          </Typography>
          <Typography fontSize={12} color="text.secondary" fontWeight={400}>
            {formatDateTimeWithRelative(msg.date)}
          </Typography>
        </Box>
      </Box>
      <Typography fontSize={12} color="text.secondary" mb={1} fontWeight={400}>
        To: {msg.to?.[0]?.name || "Unknown"} (
        {msg.to?.[0]?.address || "No Email"})
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography
        component="div"
        dangerouslySetInnerHTML={{
          __html: msg.body || "No content available.",
        }}
        sx={{
          fontSize: "12px",
          minHeight: "140px",
          lineHeight: 1.6,
          flex: 1,
          overflowY: "auto",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ background: "var(--secondary-gradient)" }}
          onClick={() => setIsReplying(true)}
        >
          Reply
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        borderRadius: 3,
        gap: "10px",
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
      >
        <CloseIcon sx={{ fontSize: "16px" }} />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        {messages.length === 1
          ? renderMessage(messages[0])
          : messages.map((msg, index) => (
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
                      <Typography fontSize={12} fontWeight={400}>
                        {msg.from?.[0]?.address || "Unknown Sender"}
                      </Typography>
                      <Typography
                        fontSize={12}
                        color="text.secondary"
                        fontWeight={400}
                      >
                        {formatDateTimeWithRelative(msg.date)}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    fontSize={12}
                    color="text.secondary"
                    mb={1}
                    fontWeight={400}
                  >
                    To: {msg.to?.[0]?.name || "Unknown"} (
                    {msg.to?.[0]?.address || "No Email"})
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: msg.body || "No content available.",
                    }}
                    sx={{ fontSize: "12px", lineHeight: 1.6 }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => setIsReplying(true)}
                    >
                      Reply
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
      </Box>

      {isReplying && (
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextArea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply here..."
              minRows={4}
              style={{ borderRadius: "10px", fontSize: "12px", width: "100%" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <SecondaryButton
                onClick={handleDiscard}
              >
                Discard
              </SecondaryButton>
              <Button
                onClick={handleSend}
                disabled={!replyContent.trim()}
                style={{
                  background: "var(--secondary-gradient)",
                  color: "white",
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EmailThreadView;
