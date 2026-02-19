import { useState } from "react";
import SuccessDialog from "../SuccessDialog";
import {
  ButtonContent,
  Form,
  Input,
  InputGroup,
  InputLabel,
  InputWrapper, InputField,
  VerificationButton,
  CardContainer,
  OptionTitle,
} from "./StartVerificationOption.styled";

const StartVerificationOption = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleOpenSuccessDialog = () => {
    setOpenSuccessDialog(true);
  }
  
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  }

  return (
    <CardContainer>
      <OptionTitle>Option 1: Direct Submit Email Addresses</OptionTitle>

      <Form>
        <InputGroup>
          <InputLabel>Task Name</InputLabel>
          <InputWrapper>
            <Input type="text" placeholder="Enter a name" />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <InputLabel>Email Addresses</InputLabel>
          <InputWrapper>
            <InputField placeholder="Enter email addresses one per line" />
          </InputWrapper>
        </InputGroup>

        <VerificationButton onClick={handleOpenSuccessDialog} type="button">
          <ButtonContent>Start Verification</ButtonContent>
        </VerificationButton>
      </Form>
      <SuccessDialog
        isOpen={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
      />
    </CardContainer>
  );
};

export default StartVerificationOption