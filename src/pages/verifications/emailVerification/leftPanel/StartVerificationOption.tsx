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
  Error
} from "./StartVerificationOption.styled";
import { emailVerificationService } from "../../../../services/email.verification.service";
import { useNavigate } from "react-router-dom";

function parseEmailsInput(text: string): string {
  return text
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(",");
}

const StartVerificationOption = ({ emailVerificationAddOn }: { emailVerificationAddOn: boolean | undefined }) => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [emailAddresses, setEmailAddresses] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmails = (input: string): boolean => {
    const emails = parseEmailsInput(input).split(",");
    if (!emails.length) return false;
    return emails.every((email) => emailRegex.test(email));
  };

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

  const handleTaskChange = (value: string) => {
    setTaskName(value);

    if (!value.trim()) {
      setTaskError("Task name is required");
    } else if (value.trim().length < 3) {
      setTaskError("Task name must be at least 3 characters");
    } else {
      setTaskError("");
    }

    validateForm(value, emailAddresses);
  };

  const handleEmailChange = (value: string) => {
    setEmailAddresses(value);

    if (!value.trim()) {
      setEmailError("At least one email is required");
    } else if (!validateEmails(value)) {
      setEmailError(
        "Enter valid email(s), comma-separated or newline-separated",
      );
    } else {
      setEmailError("");
    }

    validateForm(taskName, value);
  };

  const validateForm = (task: string, emails: string) => {
    const isTaskValid = task.trim().length >= 3;
    const isEmailValid = validateEmails(emails);
    setIsFormValid(isTaskValid && isEmailValid);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleGoToTask = () => {
     navigate(`/email-verification/task-and-results`);
  }

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
              disabled={!emailVerificationAddOn}
              value={taskName}
              onChange={(e) => handleTaskChange(e.target.value)}
            />
          </InputWrapper>
          {taskError && <Error>{taskError}</Error>}
        </InputGroup>

        <InputGroup>
          <InputLabel>Email Addresses</InputLabel>
          <InputWrapper>
            <InputField
              placeholder="Enter email addresses one per line or comma-separated"
              disabled={!emailVerificationAddOn}
              value={emailAddresses}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </InputWrapper>
          {emailError && <Error>{emailError}</Error>}
        </InputGroup>

        <VerificationButton
          type="button"
          onClick={handleStartVerification}
          disabled={isVerifying || !isFormValid || !emailVerificationAddOn}
        >
          <ButtonContent>{isVerifying ? "Verifying..." : "Start Verification"}</ButtonContent>
        </VerificationButton>
      </Form>
      <SuccessDialog
        isOpen={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        textMessage='The verification process will start automatically within a few
              moments. You will get the credits refunded for all the emails with
              "unknown" status.'
        onGoToTask={handleGoToTask}
      />
    </CardContainer>
  );
};

export default StartVerificationOption;