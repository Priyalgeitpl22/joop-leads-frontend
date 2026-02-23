import React, { useState, useCallback } from "react";
import { Check, X, Info, Plus } from "lucide-react";
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  ThPlan,
  TdLabel,
  TdCell,
  PlanHeaderCell,
  PlanName,
  PlanPrice,
  ChooseButton,
  CellValue,
  CellSubtext,
  LabelWithInfo,
  InfoIcon,
  AddonButton,
  AddonButtonAdded,
  AddonsSummaryBadge,
} from "./PlanComparisonTable.styled";
import type { PlanWithFeatures } from "../../../services/subscription.service";
import type { PlanAddon } from "../../../services/subscription.service";
import { BillingPeriod } from "../../../types/enums";

function formatLimit(value: number | null | undefined): string {
  if (value == null) return "∞ Unlimited";
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  return value.toLocaleString();
}

/** Canonical key for matching addons (API uses id number and code string, e.g. EMAIL_VERIFICATION) */
function getAddonKey(addon: PlanAddon): string {
  return (addon.code?.toLowerCase() ?? String(addon.id)).trim();
}

/** Plan code -> set of added addon ids */
export type AddedAddonsMap = Record<string, Set<string>>;

export interface PlanComparisonTableProps {
  plans: PlanWithFeatures[];
  addons: PlanAddon[];
  billingPeriod: BillingPeriod;
  selectedPlanCode: string | null;
  currentPlanCode?: string | null;
  onSelectPlan: (planCode: string) => void;
  onChoosePlan: (planCode: string) => void;
  getPlanPrice: (plan: PlanWithFeatures) => number | null;
  addedAddons?: AddedAddonsMap;
  onAddonToggle?: (planCode: string, addonId: string, added: boolean) => void;
}

export interface FeatureRowDef {
  key: string;
  label: string;
  showInfoIcon?: boolean;
  type: "limit" | "boolean" | "addon";
  planKey?: keyof PlanWithFeatures;
  addonId?: string;
}

export const PLAN_FEATURE_ROWS: FeatureRowDef[] = [
  { key: "maxSenderAccounts", label: "Sender Accounts", showInfoIcon: true, type: "limit", planKey: "maxSenderAccounts" },
  { key: "maxLeadsPerMonth", label: "Leads per month", showInfoIcon: true, type: "limit", planKey: "maxLeadsPerMonth" },
  { key: "maxEmailsPerMonth", label: "Emails per month", showInfoIcon: true, type: "limit", planKey: "maxEmailsPerMonth" },
  { key: "email_verification", label: "Email Verification", showInfoIcon: true, type: "addon", addonId: "email_verification" },
];

export const PlanComparisonTable: React.FC<PlanComparisonTableProps> = ({
  plans,
  addons,
  billingPeriod,
  selectedPlanCode,
  currentPlanCode,
  onSelectPlan,
  onChoosePlan,
  getPlanPrice,
  addedAddons: controlledAddedAddons,
  onAddonToggle,
}) => {
  const periodLabel = billingPeriod === BillingPeriod.YEARLY ? "year" : "month";

  const [internalAddedAddons, setInternalAddedAddons] = useState<AddedAddonsMap>({});
  const addedAddons = controlledAddedAddons ?? internalAddedAddons;

  const isAddonAdded = useCallback(
    (planCode: string, addonId: string) => addedAddons[planCode]?.has(addonId) ?? false,
    [addedAddons],
  );

  const toggleAddon = useCallback(
    (planCode: string, addonId: string) => {
      const set = addedAddons[planCode] ?? new Set<string>();
      const next = new Set(set);
      const added = !next.has(addonId);
      if (added) next.add(addonId);
      else next.delete(addonId);
      const nextMap = { ...addedAddons, [planCode]: next };
      if (controlledAddedAddons === undefined) setInternalAddedAddons(nextMap);
      onAddonToggle?.(planCode, addonId, added);
    },
    [addedAddons, controlledAddedAddons, onAddonToggle],
  );

  const getAddonsTotalForPlan = useCallback(
    (planCode: string): number => {
      const set = addedAddons[planCode];
      if (!set || set.size === 0) return 0;
      const matching = addons.filter(
        (a) => set.has(getAddonKey(a)) && (a.perPlan?.[planCode]?.included !== true),
      );
      return matching.reduce((sum, a) => sum + (Number(a.priceMonthly) || 0), 0);
    },
    [addons, addedAddons],
  );

  const getPlanCell = (plan: PlanWithFeatures, row: FeatureRowDef): React.ReactNode => {
    if (row.type === "addon" && row.addonId) {
      const rowKey = row.addonId.toLowerCase();
      const addon = addons.find((a) => getAddonKey(a) === rowKey);
      const addonKey = addon ? getAddonKey(addon) : row.addonId;
      const perPlan = addon?.perPlan?.[plan.code];
      const added = isAddonAdded(plan.code, addonKey);

      if (addon && perPlan?.included) {
        const limit = perPlan.limit ?? "Included";
        const price = perPlan.priceMonthly != null && Number(perPlan.priceMonthly) > 0 ? `$${perPlan.priceMonthly}/mo` : "FREE";
        return (
          <>
            <CellValue>{limit}</CellValue>
            <CellSubtext>{price}</CellSubtext>
          </>
        );
      }

      const priceNum = periodLabel === "month" ? addon?.priceMonthly : addon?.priceYearly;
      const priceLabel = addon && priceNum != null && Number(priceNum) > 0 ? `$${priceNum}/${periodLabel}` : "Add-on";
      const detailLabel = addon && priceNum != null && Number(priceNum) != 0 ? priceLabel : "";

      const handleAddonToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        toggleAddon(plan.code, addonKey);
      };

      if (added) {
        return (
          <AddonButtonAdded
            type="button"
            onClick={handleAddonToggle}
          >
            <Check size={12} />
            Added
          </AddonButtonAdded>
        );
      }
      return (
        <AddonButton
          type="button"
          onClick={handleAddonToggle}
        >
          <Plus size={12} />
          Add-on
          {detailLabel ? ` (${priceLabel})` : ""}
        </AddonButton>
      );
    }

    if (row.type === "limit" && row.planKey) {
      const value = (plan as unknown as Record<string, unknown>)[row.planKey];
      const num = typeof value === "number" ? value : null;
      const str = formatLimit(num);
      const suffix = row.planKey === "maxLeadsPerMonth" ? (num == null ? " Unlim." : " Contacts") : "";
      return <CellValue>{str}{suffix}</CellValue>;
    }

    if (row.type === "boolean") {
      const key = row.planKey;
      const value = key ? (plan as unknown as Record<string, unknown>)[key] : false;
      const included = !!value;
      return included ? <Check size={16} color="#22c55e" /> : <X size={16} color="#94a3b8" />;
    }

    return null;
  };

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th style={{ width: "1%", minWidth: "200px" }} />
            {plans.map((plan) => {
              const addonsTotal = getAddonsTotalForPlan(plan.code);
              const isSelected = selectedPlanCode === plan.code;
              const handlePlanClick = () => {
                onSelectPlan(plan.code);
                onChoosePlan(plan.code);
              };
              return (
                <ThPlan
                  key={plan.id}
                  $selected={isSelected}
                  onClick={handlePlanClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePlanClick();
                    }
                  }}
                >
                  <PlanHeaderCell>
                    <PlanName>{plan.name || plan.code}</PlanName>
                    {getPlanPrice(plan) != null ? (
                      <PlanPrice>
                        ${getPlanPrice(plan)!.toLocaleString()} / {periodLabel}
                      </PlanPrice>
                    ) : (
                      <PlanPrice>Free</PlanPrice>
                    )}
                    {addonsTotal > 0 && (
                      <AddonsSummaryBadge>+${addonsTotal} add-ons</AddonsSummaryBadge>
                    )}
                    <ChooseButton
                      type="button"
                      $selected={isSelected && plan.code !== currentPlanCode}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanClick();
                      }}
                    >
                      Choose {plan.name || plan.code}
                    </ChooseButton>
                  </PlanHeaderCell>
                </ThPlan>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {PLAN_FEATURE_ROWS.map((row, rowIndex) => (
            <Tr key={row.key}>
              <TdLabel>
                <LabelWithInfo>
                  {row.label}
                  {row.showInfoIcon && (
                    <InfoIcon title={row.label}>
                      <Info size={10} />
                    </InfoIcon>
                  )}
                </LabelWithInfo>
              </TdLabel>
              {plans.map((plan) => (
                <TdCell
                  key={plan.id}
                  $selected={selectedPlanCode === plan.code}
                  $isLastRow={rowIndex === PLAN_FEATURE_ROWS.length - 1}
                  onClick={() => {
                    onSelectPlan(plan.code);
                    onChoosePlan(plan.code);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectPlan(plan.code);
                      onChoosePlan(plan.code);
                    }
                  }}
                >
                  {getPlanCell(plan, row)}
                </TdCell>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default PlanComparisonTable;
