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
  data?: any;
}

const VerificationDetailDialog = ({
  isOpen,
  onClose,
  data
}: VerificationDetailDialogProps) => {
  const verifiedData = data?.verified?.[0] ?? data;
  const verifiedResult = verifiedData?.verificationResult;
  const verifiedMxRecord = verifiedResult?.mx_records

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

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
              <EmailText>{verifiedData?.email}</EmailText>
            </TitleSection>
          </HeaderLeft>

          <MetaRow>
            <Badge>{formatDateTime(verifiedData?.createdAt)}</Badge>
            <Badge>
              {verifiedResult?.overall_score ?? verifiedData?.overall_score}
            </Badge>
          </MetaRow>
        </Header>
        <ContentWrapper>
          <Card>
            <Row>
              <Label>status</Label>
              <ValueBadge $success>
                {verifiedResult?.status ?? verifiedData?.status}
              </ValueBadge>
            </Row>

            <Row>
              <Label>overall_score</Label>
              <ScoreBadge>
                {verifiedResult?.overall_score ?? verifiedData?.overall_score}
              </ScoreBadge>
            </Row>

            <Row>
              <Label>is_safe_to_send</Label>
              <ValueBadge $success>
                {String(
                  verifiedResult?.is_safe_to_send ??
                    verifiedData?.is_safe_to_send,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_valid_syntax</Label>
              <ValueBadge $success>
                {String(
                  verifiedResult?.is_valid_syntax ??
                    verifiedData?.is_valid_syntax,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_role_account</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.is_role_account ??
                    verifiedData?.is_role_account,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_catch_all</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.is_catch_all ?? verifiedData?.is_catch_all,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_disposable</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.is_disposable ?? verifiedData?.is_disposable,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_free_email</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.is_free_email ?? verifiedData?.is_free_email,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>has_inbox_full</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.has_inbox_full ??
                    verifiedData?.has_inbox_full,
                )}
              </ValueBadge>
            </Row>
          </Card>

          <Card>
            <Row>
              <Label>can_connect_smtp</Label>
              <ValueBadge $success>
                {String(
                  verifiedResult?.can_connect_smtp ??
                    verifiedData?.can_connect_smtp,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>mx_accepts_mail</Label>
              <ValueBadge $success>
                {String(
                  verifiedResult?.mx_accepts_mail ??
                    verifiedData?.mx_accepts_mail,
                )}
              </ValueBadge>
            </Row>

            <Label>mx_records</Label>

            <MxList>
              {[...(verifiedMxRecord ?? verifiedData?.mx_records ?? [])]
                .sort()
                .map((record: string) => (
                  <MxItem key={record}>{record}</MxItem>
                ))}
            </MxList>

            <Row>
              <Label>is_disabled</Label>
              <ValueBadge>
                {String(
                  verifiedResult?.is_disabled ?? verifiedData?.is_disabled,
                )}
              </ValueBadge>
            </Row>

            <Row>
              <Label>is_deliverable</Label>
              <ValueBadge $success>
                {String(
                  verifiedResult?.is_deliverable ??
                    verifiedData?.is_deliverable,
                )}
              </ValueBadge>
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
