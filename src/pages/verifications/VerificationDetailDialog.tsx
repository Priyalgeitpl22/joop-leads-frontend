import { Mail } from "lucide-react";
import {
  DialogContainer,
  Header,
  HeaderLeft,
  IconBox,
  TitleSection,
  EmailText,
  MetaRow,
  Badge,
  ContentWrapper,
  Card,
  Row,
  Label,
  ValueBadge,
  ScoreBadge,
  MxList,
  MxItem,
  Footer,
  CloseButton,
  StyledDialog,
} from "./VerificationDetailDialog.styled";

interface VerificationDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationDetailDialog = ({
  isOpen,
  onClose,
}: VerificationDetailDialogProps) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContainer>
        <Header>
          <HeaderLeft>
            <IconBox>
              <Mail size={22} />
            </IconBox>

            <TitleSection>
              <h3>Verification Details</h3>
              <EmailText>priyanshi@goldeneagle.ai</EmailText>
            </TitleSection>
          </HeaderLeft>

          <MetaRow>
            <Badge>06:29:12 18/02/2026</Badge>
            <Badge $primary>DASHBOARD</Badge>
            <Badge>0.44s</Badge>
          </MetaRow>
        </Header>
        <ContentWrapper>
          <Card>
            <Row>
              <Label>status</Label>
              <ValueBadge $success>safe</ValueBadge>
            </Row>

            <Row>
              <Label>overall_score</Label>
              <ScoreBadge>98</ScoreBadge>
            </Row>

            <Row>
              <Label>is_safe_to_send</Label>
              <ValueBadge $success>true</ValueBadge>
            </Row>

            <Row>
              <Label>is_valid_syntax</Label>
              <ValueBadge $success>true</ValueBadge>
            </Row>

            <Row>
              <Label>is_role_account</Label>
              <ValueBadge>false</ValueBadge>
            </Row>

            <Row>
              <Label>is_catch_all</Label>
              <ValueBadge>false</ValueBadge>
            </Row>

            <Row>
              <Label>is_disposable</Label>
              <ValueBadge>false</ValueBadge>
            </Row>

            <Row>
              <Label>is_free_email</Label>
              <ValueBadge>false</ValueBadge>
            </Row>

            <Row>
              <Label>has_inbox_full</Label>
              <ValueBadge>false</ValueBadge>
            </Row>
          </Card>

          <Card>
            <Row>
              <Label>can_connect_smtp</Label>
              <ValueBadge $success>true</ValueBadge>
            </Row>

            <Row>
              <Label>mx_accepts_mail</Label>
              <ValueBadge $success>true</ValueBadge>
            </Row>

            <Label>mx_records</Label>

            <MxList>
              <MxItem>aspmx.l.google.com</MxItem>
              <MxItem>alt1.aspmx.l.google.com</MxItem>
              <MxItem>alt2.aspmx.l.google.com</MxItem>
              <MxItem>aspmx2.googlemail.com</MxItem>
              <MxItem>aspmx3.googlemail.com</MxItem>
            </MxList>

            <Row>
              <Label>is_disabled</Label>
              <ValueBadge>false</ValueBadge>
            </Row>

            <Row>
              <Label>is_deliverable</Label>
              <ValueBadge $success>true</ValueBadge>
            </Row>
          </Card>
        </ContentWrapper>

        <Footer>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </Footer>
      </DialogContainer>
    </StyledDialog>
  );
};

export default VerificationDetailDialog;
