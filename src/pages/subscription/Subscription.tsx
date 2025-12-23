import React, { useEffect, useState } from 'react';
import { Check, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  fetchPlans,
  fetchCurrentOrgPlan,
  contactSales,
  setSelectedPlanCode,
} from '../../store/slices/subscriptionSlice';
import { BillingPeriod, PlanCode } from '../../types/enums';
import type { PlanWithFeatures } from '../../services/subscription.service';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  BillingToggleContainer,
  BillingToggle,
  BillingOption,
  SaveBadge,
  PlansContainer,
  PlanCard,
  PlanHeader,
  PlanName,
  PlanBody,
  PlanDescription,
  PlanPriceContainer,
  PlanPrice,
  PlanPriceFree,
  FeaturesList,
  FeatureItem,
  SelectionIndicator,
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
  CurrentPlanBadge,
} from './Subscription.styled';

// Plan feature mapping for display
const PLAN_FEATURES = [
  { key: 'hasEmailVerification', name: 'Email Verification' },
  { key: 'hasEmailWarmup', name: 'Email Warmup' },
  { key: 'hasUnifiedInbox', name: 'Unified Inbox' },
  { key: 'maxUsers', name: 'Teammates', isLimit: true },
  { key: 'hasAdvancedAnalytics', name: 'AI Campaign Gen' },
  { key: 'hasAdvancedAnalytics', name: 'AI Tagging' },
  { key: 'hasAdvancedAnalytics', name: 'AI Responses' },
  { key: 'hasAdvancedAnalytics', name: 'AI Improvement' },
  { key: 'hasCustomDomain', name: 'Website Link Warmup' },
  { key: 'hasPrioritySupport', name: 'Support Type', isSupportType: true },
  { key: 'maxSenderAccounts', name: 'Max Sender Accounts', isLimit: true },
  { key: 'maxLeadsPerMonth', name: 'Max Lead List Per Month', isLimit: true },
  { key: 'maxEmailsPerMonth', name: 'Max Emails Per Month', isLimit: true },
  { key: 'maxCampaigns', name: 'Max Live Campaigns', isLimit: true },
];

const SUPPORT_TYPE_MAP: Record<string, string> = {
  COMMUNITY: 'Community Support Type',
  EMAIL_24x7: 'Email 24x7 Support Type',
  PRIORITY_EMAIL_CHAT: 'Priority Email Chat Support Type',
  PHONE_WHATSAPP: 'Phone WhatsApp Support Type',
};

const PLAN_NAME_MAP: Record<string, string> = {
  FREE: 'Free',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  STARTER: 'Starter',
  PROFESSIONAL: 'Professional',
  ENTERPRISE: 'Enterprise',
};

export const Subscription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { plans, currentOrgPlan, selectedPlanCode, isLoading } = useAppSelector(
    (state) => state.subscription
  );
  const { currentUser } = useAppSelector((state) => state.user);

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(BillingPeriod.MONTHLY);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate yearly discount
  const yearlyDiscount = 20; // 20% discount for yearly

  useEffect(() => {
    dispatch(fetchPlans());
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
    setContactDialogOpen(true);
  };

  const handleConfirmContact = async () => {
    if (!selectedPlanCode) return;

    setIsSubmitting(true);
    try {
      await dispatch(
        contactSales({
          planCode: selectedPlanCode,
          billingPeriod,
        })
      ).unwrap();

      setContactDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  const getFeatureValue = (plan: PlanWithFeatures, feature: typeof PLAN_FEATURES[0]) => {
    const value = (plan as unknown as Record<string, unknown>)[feature.key];

    if (feature.isLimit) {
      if (value === null || value === undefined) return { included: true, display: 'Unlimited' };
      if (typeof value === 'number') return { included: true, display: value.toLocaleString() };
      return { included: false, display: null };
    }

    if (feature.isSupportType) {
      // Handle support type from featureNames or hasPrioritySupport
      if (plan.featureNames) {
        const supportFeature = plan.featureNames.find((f) => f.name.includes('Support'));
        if (supportFeature && typeof supportFeature.value === 'string') {
          return {
            included: true,
            display: SUPPORT_TYPE_MAP[supportFeature.value] || supportFeature.value,
          };
        }
      }
      return {
        included: !!value,
        display: value ? 'Priority Support' : null,
      };
    }

    return { included: !!value, display: null };
  };

  const isCurrentPlan = (planCode: string) => {
    return currentOrgPlan?.plan?.code === planCode;
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
      <PageHeader>
        <PageTitle>Subscription</PageTitle>
        <PageSubtitle>Manage your subscription</PageSubtitle>
      </PageHeader>

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
        {billingPeriod === BillingPeriod.YEARLY && (
          <SaveBadge>Best Value!</SaveBadge>
        )}
      </BillingToggleContainer>

      <PlansContainer>
        {plans.map((plan) => {
          const price = getPrice(plan);
          const isSelected = selectedPlanCode === plan.code;
          const isCurrent = isCurrentPlan(plan.code);
          const isFeatured = plan.code === PlanCode.STARTER || plan.code === PlanCode.PROFESSIONAL;

          return (
            <PlanCard
              key={plan.id}
              $selected={isSelected}
              $featured={isFeatured}
              onClick={() => handleSelectPlan(plan.code)}
            >
              {isCurrent && <CurrentPlanBadge>Current Plan</CurrentPlanBadge>}
              
              <SelectionIndicator $selected={isSelected}>
                {isSelected && <Check size={14} />}
              </SelectionIndicator>

              <PlanHeader $planType={plan.code}>
                <PlanName>{plan.name || PLAN_NAME_MAP[plan.code] || plan.code}</PlanName>
              </PlanHeader>

              <PlanBody>
                <PlanDescription>
                  {plan.description || 'Perfect for getting started with email outreach.'}
                </PlanDescription>

                <PlanPriceContainer>
                  {price === null ? (
                    <PlanPriceFree>Free</PlanPriceFree>
                  ) : (
                    <PlanPrice>
                      ${price}
                      <span>/{billingPeriod === BillingPeriod.MONTHLY ? 'month' : 'year'}</span>
                    </PlanPrice>
                  )}
                </PlanPriceContainer>

                <FeaturesList>
                  {PLAN_FEATURES.map((feature, index) => {
                    const { included, display } = getFeatureValue(plan, feature);
                    
                    // Skip duplicate features
                    if (feature.key === 'hasAdvancedAnalytics' && index > 4) {
                      // Use plan.featureNames if available for AI features
                      if (plan.featureNames) {
                        const aiFeature = plan.featureNames.find(
                          (f) => f.name === feature.name
                        );
                        if (aiFeature) {
                          return (
                            <FeatureItem key={feature.name} $included={!!aiFeature.value}>
                              {aiFeature.value ? (
                                <Check size={16} />
                              ) : (
                                <X size={16} />
                              )}
                              {feature.name}
                            </FeatureItem>
                          );
                        }
                      }
                    }

                    return (
                      <FeatureItem key={feature.name + index} $included={included}>
                        {included ? <Check size={16} /> : <X size={16} />}
                        {display ? (
                          <>
                            {display} {feature.name}
                          </>
                        ) : (
                          feature.name
                        )}
                      </FeatureItem>
                    );
                  })}
                </FeaturesList>
              </PlanBody>
            </PlanCard>
          );
        })}
      </PlansContainer>

      <GetStartedContainer>
        <GetStartedButton
          disabled={!selectedPlanCode || selectedPlanCode === currentOrgPlan?.plan?.code}
          onClick={handleGetStarted}
        >
          GET STARTED
        </GetStartedButton>
      </GetStartedContainer>

      {/* Contact Admin Dialog */}
      <DialogOverlay $open={contactDialogOpen} onClick={() => setContactDialogOpen(false)}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>Contact Admin</DialogTitle>
          <DialogDescription>
            Are you sure you want to activate the{' '}
            <strong>{PLAN_NAME_MAP[selectedPlanCode || ''] || selectedPlanCode}</strong>{' '}
            subscription plan? We will contact you shortly to complete the process.
          </DialogDescription>
          <DialogActions>
            <DialogButton
              $variant="secondary"
              onClick={() => setContactDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </DialogButton>
            <DialogButton
              $variant="primary"
              onClick={handleConfirmContact}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Contact Admin'}
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>

      {/* Success Dialog */}
      <DialogOverlay $open={successDialogOpen} onClick={() => setSuccessDialogOpen(false)}>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <SuccessIcon>
            <CheckCircle />
          </SuccessIcon>
          <DialogTitle>Request Sent</DialogTitle>
          <DialogDescription>
            Your request for the activation of the subscription plan has been sent
            successfully. We will contact you shortly.
          </DialogDescription>
          <DialogActions>
            <DialogButton $variant="primary" onClick={() => setSuccessDialogOpen(false)}>
              OK
            </DialogButton>
          </DialogActions>
        </DialogContent>
      </DialogOverlay>
    </PageContainer>
  );
};

export default Subscription;

