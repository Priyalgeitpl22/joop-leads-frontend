import {
  LeftPanel,
  PageContainer,
  RightPanel,
  VerificationContent,
} from "./EmailVerification.styled";
import StartVerificationOption from "./leftPanel/StartVerificationOption";
import UploadFileOption from "./rightPanel/UploadFileOption";
import { AlertBanner } from "../../../components/common";
import { useAppSelector } from "../../../store";
import { useNavigate } from "react-router-dom";
import { PlanCode } from "../../../types/enums";
import type { IAddOnPlan } from "../../../services/add-on.plan.service";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const emailVerificationAddOn =
    currentUser?.addOns?.some(
      (addOn: IAddOnPlan) => addOn.addOnId === 1,
    ) && currentUser?.planDetails?.planCode !== PlanCode.FREE;

  return (
    <PageContainer>
      {!emailVerificationAddOn && (
        <AlertBanner
          title="Upgrade Your Plan"
          detail="Email verification is only availble for paid plans. Please upgrade your plan to continue."
          type="warning"
          buttonText="Upgrade Plan"
          onButtonClick={() => navigate("/subscription")}
        />
      )}
      <VerificationContent $disabled={!emailVerificationAddOn}>
        <LeftPanel>
          <StartVerificationOption
            emailVerificationAddOn={emailVerificationAddOn}
          />{" "}
        </LeftPanel>
        <RightPanel>
          <UploadFileOption emailVerificationAddOn={emailVerificationAddOn} />
        </RightPanel>
      </VerificationContent>
    </PageContainer>
  );
};

export default EmailVerification;
