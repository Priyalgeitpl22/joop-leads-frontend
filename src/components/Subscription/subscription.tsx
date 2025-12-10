import { fetchPlans, Plan } from "../../redux/slice/planSlice";
import { Container } from "../../styles/global.styled";
import {
  GetStartedButton,
  PlansContainer,
  SubscriptionContainer,
} from "./styled";
import SubscriptionCard from "./subscription.card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import {
  conatctSales,
  fetchCurrentOrgPlan,
} from "../../redux/slice/orgPlanSlice";
import { CustomDialog } from "../../assets/Custom/customDialog";
import { BillingPeriod, PlanName } from "./types";
import toast from "react-hot-toast";
import { CustomTab, CustomTabs } from "../CustomTabs";

const Subscription = () => {
  const subscriptionPlans = useSelector((state: RootState) => state.plan.plans);
  const dispatch = useDispatch<AppDispatch>();
  const [openContactAdminDialog, setOpenContactAdminDialog] = useState(false);
  const [openRequestSentDialog, setOpenRequestSentDialog] = useState(false);
  const [planCode, setPlanCode] = useState("");
  const [selectedPlanCode, setSelectedPlanCode] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(BillingPeriod.MONTHLY);
  const [offer, setOffer] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchPlans());
    getOrganizationPlan();
  }, []);

  const handleContactAdmin = async (planCode: string) => {
    setOpenContactAdminDialog(true);
    setPlanCode(planCode);
  };

  const getOrganizationPlan = async () => {
    const response = await dispatch(fetchCurrentOrgPlan(user?.orgId ?? "")).unwrap();
    if (response && response.data) {
      setSelectedPlanCode((response.data as Plan)?.code ?? "");
      setOffer((response.data as Plan)?.offer ?? 0);
    }
  };

  const handleConfirm = async () => {
    if (!planCode) {
      toast.error("Please select a plan to contact admin");
      return;
    }
    setLoading(true);
    const result = await dispatch(
      conatctSales({ planCode: planCode, billingPeriod: "MONTHLY" })
    ).unwrap();

    if (result) {
      setOpenRequestSentDialog(true);
      setOpenContactAdminDialog(false);
    }

    setLoading(false);
  };

  const handleSelectPlan = (planCode: string) => {
    setSelectedPlanCode(planCode);
  };

  const handleBiilingPeriodChange = (_: React.SyntheticEvent, newValue: string) => {
    setBillingPeriod(newValue as BillingPeriod);  
  };

  return (
    <Container style={{ padding: "20px" }}>
      <SubscriptionContainer>
        
      <CustomTabs
        value={billingPeriod}
        defaultValue={BillingPeriod.MONTHLY}
        defaultChecked={true}
        onChange={handleBiilingPeriodChange}
        sx={{
          display: "flex",
          alignItems: "center",
          borderColor: "divider",
        }}
      >
        <CustomTab customFontSize={18} label="Monthly" value={BillingPeriod.MONTHLY} />
        <CustomTab customFontSize={18} label={`Yearly (Save ${offer}%)`} value={BillingPeriod.YEARLY} />
      </CustomTabs>

        <PlansContainer>
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              offer={offer}
              selectedPlanCode={selectedPlanCode}
              handleSelectPlan={handleSelectPlan}
            />
          ))}
        </PlansContainer>
        <GetStartedButton
          disabled={selectedPlanCode === planCode}
          onClick={() => handleContactAdmin(selectedPlanCode)}
        >
          Get Started
        </GetStartedButton>
      </SubscriptionContainer>


      <CustomDialog
        title="Contact Admin"
        loading={loading}
        description={`Are you sure you want to activate the ${PlanName[planCode as keyof typeof PlanName]} subscription plan? We will contact you shortly.`}
        buttonText="Contact Admin"
        open={openContactAdminDialog}
        onClose={() => setOpenContactAdminDialog(false)}
        handleSave={handleConfirm}
      />

      <CustomDialog
        title="Request Sent"
        description="Your request for the activation of the subscription plan has been sent successfully. We will contact you shortly."
        cancelButtonText="Ok"
        open={openRequestSentDialog}
        showOkButton={false}
        onClose={() => setOpenRequestSentDialog(false)}
        handleSave={() => {}}
      />
    </Container>
  );
};

export default Subscription;
