import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchPlans,
  fetchAddons,
  fetchCurrentOrgPlan,
  contactSales,
  setSelectedPlanCode,
} from "../../store/slices/subscriptionSlice";
import { BillingPeriod } from "../../types/enums";
import type { PlanWithFeatures } from "../../services/subscription.service";
import {
  PageContainer,
  GeneralPlanCardWrapper,
  ComparisonTableWrapper,
  BillingToggleContainer,
  BillingToggle,
  BillingOption,
  GetStartedContainer,
  GetStartedButton,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogActions,
  DialogButton,
  SuccessIcon,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
} from "./Subscription.styled";
import { GeneralPlanCard } from "./GeneralPlanCard";
import {
  type AddonOption,
  CompletePurchaseModal,
} from "./CompletePurchaseModal";
import {
  PlanComparisonTable,
  type AddedAddonsMap,
} from "./PlanComparisonTable";
import { AddOnCode } from "../../services/add-on.plan.service";
import { AlertChip } from "../../components/common";

function getAddonKey(addon: { code?: string; id: string | number }): string {
  return (addon.code?.toLowerCase() ?? String(addon.id)).trim();
}

const PLAN_NAME_MAP: Record<string, string> = {
  FREE: "Free",
  SILVER: "Silver",
  GOLD: "Gold",
  PLATINUM: "Platinum",
  STARTER: "Starter",
  PROFESSIONAL: "Professional",
  ENTERPRISE: "Enterprise",
};

export const Subscription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { plans, addons, currentOrgPlan, selectedPlanCode, isLoading } =
    useAppSelector((state) => state.subscription);
  const { currentUser } = useAppSelector((state) => state.user);

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(
    BillingPeriod.MONTHLY,
  );
  const [completePurchaseOpen, setCompletePurchaseOpen] = useState(false);
  const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);
  const [addedAddons, setAddedAddons] = useState<AddedAddonsMap>({});
  const yearlyDiscount = 20;

  const handleAddonToggle = (
    planCode: string,
    addonId: string,
    added: boolean,
  ) => {
    setAddedAddons((prev) => {
      const set = new Set(prev[planCode] ?? []);
      if (added) set.add(addonId);
      else set.delete(addonId);
      return { ...prev, [planCode]: set };
    });
  };

  const preselectedAddonIds =
    selectedPlanCode && addons.length > 0
      ? addons
          .filter((a) => addedAddons[selectedPlanCode]?.has(getAddonKey(a)))
          .map((a) => String(a.id))
      : [];

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchAddons());
    if (currentUser?.orgId) {
      dispatch(fetchCurrentOrgPlan(currentUser.orgId));
    }
  }, [dispatch, currentUser?.orgId]);

  const handleSelectPlan = (planCode: string) => {
    dispatch(setSelectedPlanCode(planCode));
  };

  const handleGetStarted = () => {
    if (!selectedPlanCode || selectedPlanCode === currentOrgPlan?.plan?.code) {
      return;
    }
    setCompletePurchaseOpen(true);
  };

  const handleCompletePurchaseConfirm = (selection: {
    addons: {
      id: string;
      code: AddOnCode;
      name: string;
      enabled: boolean;
      quantity?: number;
    }[];
    totalCost: number;
  }) => {
    console.log(selection);
    handleConfirmContact(selection);
  };

  const handleConfirmContact = async (selection: {
    addons: {
      id: string;
      code: AddOnCode;
      name: string;
      enabled: boolean;
      quantity?: number;
    }[];
    totalCost: number;
  }) => {
    if (!selectedPlanCode) return;
    try {
      await dispatch(
        contactSales({
          planCode: selectedPlanCode,
          addOns: selection.addons.map((addon) => ({
            name: addon.name,
            code: addon.code,
          })),
          billingPeriod,
          totalCost: selection.totalCost,
        }),
      ).unwrap();

      setCompletePurchaseOpen(false);
      setThankYouDialogOpen(true);
    } catch {
      toast.error("Failed to submit request. Please try again.");
    }
  };

  const getPrice = (plan: PlanWithFeatures) => {
    const monthlyPrice = plan.priceMonthly || plan.priceUsd || 0;

    if (monthlyPrice === 0) return null; // Free plan

    if (billingPeriod === BillingPeriod.YEARLY) {
      return Math.round(monthlyPrice * 12 * (1 - yearlyDiscount / 100));
    }
    return monthlyPrice;
  };

  if (isLoading && plans.length === 0) {
    return (
      <PageContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading subscription plans...</LoadingText>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {!currentOrgPlan?.isActive &&
        (currentOrgPlan as { isContactSales?: boolean } | null)
          ?.isContactSales && (
          <AlertChip
            variant="info"
            showIcon={false}
          >
            Your request for the activation of the subscription plan has been sent
            successfully. We will contact you shortly. Meanwhile if you want to
            change your plan, you can do so by contacting our sales team.
          </AlertChip>
        )}
      <GeneralPlanCardWrapper>
        <GeneralPlanCard currentOrgPlan={currentOrgPlan} />
      </GeneralPlanCardWrapper>

      <BillingToggleContainer>
        <BillingToggle>
          <BillingOption
            $active={billingPeriod === BillingPeriod.MONTHLY}
            onClick={() => setBillingPeriod(BillingPeriod.MONTHLY)}
          >
            Monthly
          </BillingOption>
          <BillingOption
            $active={billingPeriod === BillingPeriod.YEARLY}
            onClick={() => setBillingPeriod(BillingPeriod.YEARLY)}
          >
            Yearly (Save {yearlyDiscount}%)
          </BillingOption>
        </BillingToggle>
      </BillingToggleContainer>

      <ComparisonTableWrapper>
        <PlanComparisonTable
          plans={plans}
          addons={addons}
          billingPeriod={billingPeriod}
          selectedPlanCode={selectedPlanCode}
          currentPlanCode={currentOrgPlan?.plan?.code}
          onSelectPlan={handleSelectPlan}
          onChoosePlan={handleSelectPlan}
          getPlanPrice={getPrice}
          addedAddons={addedAddons}
          onAddonToggle={handleAddonToggle}
        />
      </ComparisonTableWrapper>

      <GetStartedContainer>
        <GetStartedButton
          disabled={
            !selectedPlanCode || selectedPlanCode === currentOrgPlan?.plan?.code
          }
          onClick={handleGetStarted}
        >
          GET STARTED
        </GetStartedButton>
      </GetStartedContainer>

      <CompletePurchaseModal
        open={completePurchaseOpen}
        onClose={() => setCompletePurchaseOpen(false)}
        planName={
          PLAN_NAME_MAP[selectedPlanCode || ""] ||
          selectedPlanCode ||
          "Pro Plan"
        }
        planPrice={(() => {
          const plan = plans.find((p) => p.code === selectedPlanCode);
          const price = plan ? getPrice(plan) : null;
          return price ?? 0;
        })()}
        planPeriod={billingPeriod === BillingPeriod.YEARLY ? "year" : "month"}
        onConfirm={handleCompletePurchaseConfirm}
        addons={
          addons.map((addon) => ({
            id: addon.id as string,
            code: addon.code as AddOnCode,
            name: addon.name,
            title: addon.name,
            description: addon.description ?? "",
            pricePerMonth: Number(addon.priceMonthly) || 0,
            pricePerYear: Number(addon.priceYearly) || 0,
          })) as AddonOption[]
        }
        preselectedAddonIds={preselectedAddonIds}
      />

      {/* Thank You Dialog */}
      <DialogOverlay
        $open={thankYouDialogOpen}
        onClick={() => setThankYouDialogOpen(false)}
      >
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>Thank You</DialogTitle>
          <DialogDescription>
            Thank you for your purchase! We will contact you shortly to complete
            the process.
          </DialogDescription>
          <DialogActions>
            <DialogButton
              $variant="primary"
              onClick={() => setThankYouDialogOpen(false)}
            >
              OK
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>

      {/* Success Dialog */}
      <DialogOverlay
        $open={thankYouDialogOpen}
        onClick={() => setThankYouDialogOpen(false)}
      >
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <SuccessIcon>
            <CheckCircle />
          </SuccessIcon>
          <DialogTitle>Request Sent</DialogTitle>
          <DialogDescription>
            Your request for the activation of the subscription plan has been
            sent successfully. We will contact you shortly.
          </DialogDescription>
          <DialogActions>
            <DialogButton
              $variant="primary"
              onClick={() => setThankYouDialogOpen(false)}
            >
              OK
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>
    </PageContainer>
  );
};

export default Subscription;
