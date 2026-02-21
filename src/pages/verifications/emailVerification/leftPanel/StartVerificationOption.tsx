import { useState } from "react";
import toast from "react-hot-toast";
import SuccessDialog from "../SuccessDialog";
import {
  ButtonContent,
  Form,
  Input,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputField,
  VerificationButton,
  CardContainer,
  OptionTitle,
} from "./StartVerificationOption.styled";
import { emailVerificationService } from "../../../../services/email.verification.service";

function parseEmailsInput(text: string): string {
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(",");
}

const StartVerificationOption = () => {
  const [taskName, setTaskName] = useState("");
  const [emailAddresses, setEmailAddresses] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleStartVerification = async () => {
    const emails = parseEmailsInput(emailAddresses);
    if (!emails) {
      toast.error("Enter at least one email address (one per line or comma-separated)");
      return;
    }
    setIsVerifying(true);
    try {
      const result = await emailVerificationService.verifyEmails({
        emails,
        mode: "power",
      });
      const verifiedCount = result?.verifiedCount ?? 0;
      const failedCount = result?.failedCount ?? 0;
      if (verifiedCount > 0 || failedCount === 0) {
        toast.success(
          failedCount > 0
            ? `Verified ${verifiedCount} email(s), ${failedCount} failed`
            : `Verified ${verifiedCount} email(s) successfully`
        );
        setOpenSuccessDialog(true);
      } else {
        toast.error(`Verification failed for ${failedCount} email(s)`);
      }
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Verification failed";
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  return (
    <CardContainer>
      <OptionTitle>Option 1: Direct Submit Email Addresses</OptionTitle>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <InputLabel>Task Name</InputLabel>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Enter a name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <InputLabel>Email Addresses</InputLabel>
          <InputWrapper>
            <InputField
              placeholder="Enter email addresses one per line or comma-separated"
              value={emailAddresses}
              onChange={(e) => setEmailAddresses(e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <VerificationButton
          type="button"
          onClick={handleStartVerification}
          disabled={isVerifying || !parseEmailsInput(emailAddresses)}
        >
          <ButtonContent>{isVerifying ? "Verifying..." : "Start Verification"}</ButtonContent>
        </VerificationButton>
      </Form>
      <SuccessDialog
        isOpen={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
      />
    </CardContainer>
  );
};

export default StartVerificationOption;