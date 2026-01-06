import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { inboxService } from "../../../../../services/inbox.service";
import {
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  DialogContent,
  DialogFooter,
  FormGroup,
  Label,
  Select,
  Input,
  CancelButton,
  SendButton,
  InfoText,
} from "./styled";
import { CloseButton } from "./SetupStep.styled";
import type { Account } from "../../../../../types";

interface SendTestEmailProps {
  isOpen: boolean;
  onClose: () => void;
  senderAccounts: Account[];
  compiledSubject: string;
  compiledBody: string;
  sendAsPlainText: boolean;
}

export const SendTestEmail: React.FC<SendTestEmailProps> = ({
  isOpen,
  onClose,
  senderAccounts,
  sendAsPlainText,
  compiledSubject,
  compiledBody,
}) => {
  const [senderEmail, setSenderEmail] = useState(
    senderAccounts[0]?.email || ""
  );
  const [isSending, setIsSending] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleSendTestEmail = async () => {
    if (!recipientEmail) {
      toast.error("Please enter a recipient email");
      return;
    }

    if (!senderEmail) {
      toast.error("Please select a sender account");
      return;
    }

    setIsSending(true);
    try {
      await inboxService.sendTestEmail({
        email: senderEmail || "",
        toEmail: recipientEmail,
        emailTemplate: {
          subject: compiledSubject,
          emailBody: compiledBody,
          sendAsPlainText,
        },
      });
      toast.success("Test email sent successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to send test email:", error);
      toast.error("Failed to send test email");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <h3>Send Test Email</h3>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>
        <DialogContent>
          <FormGroup>
            <Label>Sender Email</Label>
            <Select
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            >
              {senderAccounts.map((sender) => (
                <option key={sender._id} value={sender.email}>
                  {sender.email}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Recipient Email</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </FormGroup>
          <InfoText>
            A test email will be sent to{" "}
            {recipientEmail || "the recipient email"}
          </InfoText>
        </DialogContent>
        <DialogFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SendButton onClick={handleSendTestEmail} disabled={isSending}>
            {isSending ? "Sending..." : "Send Test"}
          </SendButton>
        </DialogFooter>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default SendTestEmail;
