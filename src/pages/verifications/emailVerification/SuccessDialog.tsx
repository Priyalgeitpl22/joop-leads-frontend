import CheckIcon from "@mui/icons-material/Check";
import {
  DialogContainer,
  ButtonWrapper,
  CenterBox,
  IconWrapper,
  MessageBox,
  PrimaryButton,
  SecondaryButton,
  StyledDialog,
  Subtitle,
  Title,
} from "./SuccessDialog.styled";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToTask?: () => void;
  textMessage: string;
}

const SuccessDialog = ({ isOpen, onClose, onGoToTask, textMessage }: SuccessDialogProps) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogContainer>
        <CenterBox>
          <IconWrapper>
            <CheckIcon />
          </IconWrapper>

          <Title>Emails Successfully Submitted!</Title>

          <Subtitle>Task created successfully</Subtitle>
          <MessageBox>
            <div>
              {textMessage}
            </div>
          </MessageBox>
          <ButtonWrapper>
            <PrimaryButton onClick={onGoToTask}>
              Go to Task Details
            </PrimaryButton>

            <SecondaryButton onClick={onClose}>Stay Here</SecondaryButton>
          </ButtonWrapper>
        </CenterBox>
      </DialogContainer>
    </StyledDialog>
  );
};

export default SuccessDialog;
