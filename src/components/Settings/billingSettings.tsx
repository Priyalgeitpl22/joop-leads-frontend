import { Divider, Typography } from "@mui/material";
import { ChevronRight, CreditCard } from "lucide-react";
import {
  PageContainer,
  PageTitle,
  SectionLabel,
  Card,
  CardSection,
  ClickableRow,
  PlanTitle,
  PlanDescription,
  RowLabel,
  PaymentDate,
  PaymentMethod,
  PaymentBadge,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchCurrentOrgPlan } from "../../redux/slice/orgPlanSlice";
import { useEffect, useState } from "react";
import { Plan } from "../../redux/slice/planSlice";
import { formatDateOnly } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const BillingSettings = () => {

  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  // const [loading, setLoading] = useState(false);
  
  const paymentInfo = {
    nextPaymentDate: "16 December 2025",
    paymentMethod: "7•••@ptsbi",
  };

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const getCurrentOrgPlan = async () => {
    const response = await dispatch(fetchCurrentOrgPlan(user?.orgId ?? "")).unwrap();
    if (response && response.data) {
      setCurrentPlan(response.data as Plan);
    }
  };

  useEffect(() => {
    getCurrentOrgPlan();
  }, []);

  const handleChangePlan = () => {
    navigate("/subscription");
  };

  const handleManagePayment = () => {
    // Handle payment method management
    console.log("Manage payment clicked");
  };

  return (
    <PageContainer>
      <PageTitle>Subscription</PageTitle>

      <SectionLabel>Plan Details</SectionLabel>
      <Card accentColor="var(--primary)">
        <CardSection>
          <PlanTitle>{currentPlan?.name} Plan</PlanTitle>
          <PlanDescription>{currentPlan?.description}</PlanDescription>
        </CardSection>
        <Divider />
        <ClickableRow onClick={handleChangePlan}>
          <RowLabel>Change plan</RowLabel>
          <ChevronRight size={20} color="var(--text-secondary)" />
        </ClickableRow>
      </Card>

      {/* Payment Info Section */}
      <SectionLabel>Payment info</SectionLabel>
      <Card>
        <CardSection>
          <RowLabel>Next payment</RowLabel>
          <PaymentDate>{formatDateOnly(currentPlan?.endsAt ?? new Date())}</PaymentDate>
          <PaymentMethod>
            <PaymentBadge>
              <CreditCard size={12} style={{ marginRight: 4 }} />
              Card
            </PaymentBadge>
            <Typography fontSize={14} color="var(--text-secondary)">
              {paymentInfo.paymentMethod}
            </Typography>
          </PaymentMethod>
        </CardSection>
        <Divider />
        <ClickableRow onClick={handleManagePayment}>
          <RowLabel>Manage payment method</RowLabel>
          <ChevronRight size={20} color="var(--text-secondary)" />
        </ClickableRow>
        <Divider />
      </Card>
    </PageContainer>
  );
};

export default BillingSettings;
