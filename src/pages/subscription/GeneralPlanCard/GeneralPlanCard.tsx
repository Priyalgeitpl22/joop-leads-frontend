import React, { useEffect } from "react";
import {
  Card,
  CardTitle,
  Section,
  SectionLabel,
  CurrentPlanRow,
  PlanName,
  CancelInfo,
  UsageStatsHeading,
  UsageGrid,
  UsageItem,
  UsageLabel,
  ProgressRow,
  ProgressTrack,
  ProgressFill,
  UsageBadge,
} from "./GeneralPlanCard.styled";
import type { IOrganizationPlan } from "../../../types/organisation.plan.types";
import type { PlanWithFeatures } from "../../../services/subscription.service";
import { PLAN_FEATURE_ROWS, type FeatureRowDef } from "../PlanComparisonTable";

export interface GeneralPlanCardProps {
  currentOrgPlan?: (IOrganizationPlan & { plan?: PlanWithFeatures }) | null;
}

function formatLimit(value: number | null | undefined): string {
  if (value == null) return "∞";
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return value.toLocaleString();
}

/** Map a feature row to display value from the current plan */
function getPlanFeatureDisplay(plan: PlanWithFeatures | undefined, row: FeatureRowDef): string {
  if (!plan) return "—";
  const record = plan as unknown as Record<string, unknown>;
  if (row.type === "limit" && row.planKey) {
    const raw = record[row.planKey];
    const num = typeof raw === "number" ? raw : null;
    const suffix = row.planKey === "maxLeadsPerMonth" ? " Contacts" : row.planKey === "maxEmailsPerMonth" ? " Sends" : "";
    return formatLimit(num) + suffix;
  }
  if (row.type === "boolean" && row.planKey) {
    const v = record[row.planKey];
    return v ? "Yes" : "No";
  }
  if (row.type === "addon") return "Add-on";
  return "—";
}

/** Usage stat: label + how to get used/max from org plan and plan */
const USAGE_STAT_ROWS: {
  key: string;
  label: string;
  usedKey: keyof Pick<IOrganizationPlan, "emailsSentThisPeriod" | "leadsAddedThisPeriod" | "senderAccountsCount">;
  planLimitKey: keyof Pick<PlanWithFeatures, "maxEmailsPerMonth" | "maxLeadsPerMonth" | "maxSenderAccounts">;
}[] = [
  { key: "emails", label: "Monthly Sends", usedKey: "emailsSentThisPeriod", planLimitKey: "maxEmailsPerMonth" },
  { key: "contacts", label: "Contact Storage", usedKey: "leadsAddedThisPeriod", planLimitKey: "maxLeadsPerMonth" },
  { key: "sender_accounts", label: "Sender Accounts", usedKey: "senderAccountsCount", planLimitKey: "maxSenderAccounts" },
];

function formatCancelDate(endsAt: Date | string | null | undefined): string | null {
  if (!endsAt) return null;
  const d = typeof endsAt === "string" ? new Date(endsAt) : endsAt;
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const GeneralPlanCard: React.FC<GeneralPlanCardProps> = ({
  currentOrgPlan,
}) => {
  const planName =
    currentOrgPlan?.plan?.name ?? currentOrgPlan?.plan?.code ?? "Free Trial";

  useEffect(() => {
      console.log(currentOrgPlan);
    }, [currentOrgPlan]);

    const cancelDate = formatCancelDate(currentOrgPlan?.endsAt ?? null);
  return (
    <Card>
      <CardTitle>{planName} Plan</CardTitle>

      <Section>
        <SectionLabel>Current Plan</SectionLabel>
        <CurrentPlanRow>    
          <PlanName>{planName}</PlanName>
          {PLAN_FEATURE_ROWS?.length > 0 && PLAN_FEATURE_ROWS.map((row) => (
            <UsageItem key={row.key}>
              <UsageLabel>{row.label}</UsageLabel>
              <UsageBadge>{getPlanFeatureDisplay(currentOrgPlan?.plan, row)}</UsageBadge>
            </UsageItem>
          ))}
            {cancelDate && (
              <CancelInfo>
                Your plan is set to cancel on {cancelDate}
              </CancelInfo>
            )}
        </CurrentPlanRow>
      </Section>

      <Section>
        <UsageStatsHeading>Usage Stats</UsageStatsHeading>
        <UsageGrid>
          {USAGE_STAT_ROWS.map((row) => {
            const used = Number(currentOrgPlan?.[row.usedKey] ?? 0);
            const max = currentOrgPlan?.plan?.[row.planLimitKey];
            const maxNum = typeof max === "number" ? max : null;
            const percent =
              maxNum != null && maxNum > 0
                ? Math.min(100, (used / maxNum) * 100)
                : 0;
            const maxDisplay =
              maxNum === Infinity || maxNum == null ? "∞" : maxNum.toLocaleString();
            return (
              <UsageItem key={row.key}>
                <UsageLabel>{row.label}:</UsageLabel>
                <ProgressRow>
                  <ProgressTrack>
                    <ProgressFill $percent={percent} />
                  </ProgressTrack>
                  <UsageBadge>
                    {used.toLocaleString()}/{maxDisplay}
                  </UsageBadge>
                </ProgressRow>
              </UsageItem>
            );
          })}
        </UsageGrid>
      </Section>
    </Card>
  );
};

export default GeneralPlanCard;
