import { LeftPanel, PageContainer, RightPanel, VerificationContent } from "./EmailVerification.styled"
import StartVerificationOption from "./leftPanel/StartVerificationOption";
import UploadFileOption from "./rightPanel/UploadFileOption";

const EmailVerification = () => {
  
  return (
    <PageContainer>
      <VerificationContent>
        <LeftPanel><StartVerificationOption/> </LeftPanel>
        <RightPanel><UploadFileOption /></RightPanel>
      </VerificationContent>
    </PageContainer>
  );
}

export default EmailVerification