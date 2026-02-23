import React, { useState, useMemo } from "react";
import { X, Lock } from "lucide-react";
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Body,
  PlanCard,
  PlanName,
  PlanPrice,
  SectionTitle,
  AddonList,
  AddonRow,
  Checkbox,
  AddonContent,
  AddonTitle,
  AddonDescription,
  AddonPrice,
  QuantityRow,
  QuantityButton,
  QuantityValue,
  SummarySection,
  SummaryRow,
  SummaryTotalRow,
  TotalAmount,
  Footer,
  CancelButton,
  SubmitButton,
} from "./CompletePurchaseModal.styled";
import { AddOnCode } from "../../../services/add-on.plan.service";

export interface AddonOption {
  id: string;
  code: AddOnCode;
  name: string;
  title: string;
  description: string;
  pricePerMonth: number;
  pricePerYear: number;
  quantity?: number;
}

export interface CompletePurchaseModalProps {
  open: boolean;
  onClose: () => void;
  planName?: string;
  planPrice?: number;
  planPeriod?: "year" | "month";
  addons?: AddonOption[];
  /** Addon ids (from comparison table "Added") to show as checked when modal opens. */
  preselectedAddonIds?: string[];
  onConfirm?: (selection: {
    addons: { id: string; code: AddOnCode; name: string; enabled: boolean; quantity?: number }[];
    totalCost: number;
  }) => void;
}

export const CompletePurchaseModal: React.FC<CompletePurchaseModalProps> = ({
  open,
  onClose,
  planName = "Pro Plan",
  planPrice = 78,
  planPeriod = "month",
  addons,
  preselectedAddonIds,
  onConfirm,
}) => {
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const preselectedSet = useMemo(
    () => new Set(preselectedAddonIds ?? []),
    [preselectedAddonIds],
  );

  const selectedAddons = useMemo(() => {
    const out: Record<string, boolean> = {};
    addons?.forEach((a) => {
      const id = String(a.id);
      out[id] = id in overrides ? overrides[id]! : preselectedSet.has(id);
    });
    return out;
  }, [addons, preselectedSet, overrides]);

  const toggleAddon = (id: string) => {
    setOverrides((prev) => ({ ...prev, [id]: !selectedAddons[id] }));
  };

  const setQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) + delta;
      return { ...prev, [id]: Math.max(0, next) };
    });
  };

  const addonsCost = addons?.reduce((sum: number, addon: AddonOption) => {
    if (addon.quantity) {
      const q = quantities[addon.id] ?? 0;
      return sum + (planPeriod === "month" ? addon.pricePerMonth * q : addon.pricePerYear * q);
    }
    return sum + (selectedAddons[addon.id] ? (planPeriod === "month" ? addon.pricePerMonth : addon.pricePerYear) : 0);
  }, 0) ?? 0;

  const totalCost = Number(planPrice) + Number(addonsCost);

  const handleSubmit = () => {
    const all: { id: string; code: AddOnCode; name: string; enabled: boolean }[] = addons?.map((a) => ({
      id: a.id,
      code: a.code,
      name: a.name,
      enabled: a.quantity ? (quantities[a.id] ?? 0) > 0 : !!selectedAddons[a.id],
    })) ?? [];
    const selectedOnly = all.filter((a) => a.enabled);
    onConfirm?.({ addons: selectedOnly, totalCost });
    onClose();
  };

  if (!open) return null;

  const periodLabel = planPeriod === "month" ? "month" : "year";

  return (
    <Overlay $open={open} onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Complete Your Purchase</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </CloseButton>
        </Header>
        <Body>
          <PlanCard>
            <PlanName>{planName}</PlanName>
            <PlanPrice>
              ${planPrice.toLocaleString()}/{periodLabel}
            </PlanPrice>
          </PlanCard>

          <SectionTitle>Available Add-ons</SectionTitle>
          <AddonList>
            {addons?.map((addon) => (
              <AddonRow
                key={addon.id}
                $checked={
                  addon.quantity
                    ? (quantities[addon.id] ?? 0) > 0
                    : !!selectedAddons[addon.id]
                }
              >
                {addon.quantity ? (
                  <>
                    <AddonContent>
                      <AddonTitle>{addon.title}</AddonTitle>
                      <AddonDescription>{addon.description}</AddonDescription>
                      <QuantityRow>
                        <QuantityButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setQuantity(addon.id, -1);
                          }}
                          disabled={(quantities[addon.id] ?? 0) <= 0}
                        >
                          −
                        </QuantityButton>
                        <QuantityValue>{quantities[addon.id] ?? 0}</QuantityValue>
                        <QuantityButton
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setQuantity(addon.id, 1);
                          }}
                        >
                          +
                        </QuantityButton>
                      </QuantityRow>
                    </AddonContent>
                    <AddonPrice>
                      ${(addon.quantity ? addon.pricePerMonth * (quantities[addon.id] ?? 0) : addon.pricePerYear * (quantities[addon.id] ?? 0)).toLocaleString()}/{periodLabel}
                    </AddonPrice>
                  </>
                ) : (
                  <>
                    <Checkbox
                      checked={!!selectedAddons[addon.id]}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <AddonContent>
                      <AddonTitle>{addon.title}</AddonTitle>
                      <AddonDescription>{addon.description}</AddonDescription>
                    </AddonContent>
                    <AddonPrice>${planPeriod === "month" ? addon.pricePerMonth.toLocaleString() : addon.pricePerYear.toLocaleString()}/{periodLabel}</AddonPrice>
                  </>
                )}
              </AddonRow>
            ))}
          </AddonList>

          <SummarySection>
            <SummaryRow>
              <span>{planName}</span>
              <span>${planPrice.toLocaleString()}</span>
            </SummaryRow>
            {addons?.map((addon) => {
              const amount = addon.quantity
                ? planPeriod === "month" ? addon.pricePerMonth * (quantities[addon.id] ?? 0) : addon.pricePerYear * (quantities[addon.id] ?? 0)
                : selectedAddons[addon.id]
                  ? planPeriod === "month" ? addon.pricePerMonth : addon.pricePerYear
                  : 0;
              if (amount <= 0) return null;
              return (
                <SummaryRow key={addon.id}>
                  <span>{addon.title}</span>
                  <span>${amount.toLocaleString()}</span>
                </SummaryRow>
              );
            })}
            <SummaryTotalRow>
              <span>Total Cost</span>
              <TotalAmount>${totalCost.toLocaleString()}</TotalAmount>
            </SummaryTotalRow>
          </SummarySection>

          {/* Payment Details section intentionally omitted (skipped) */}

          <Footer>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="button" onClick={handleSubmit}>
              <Lock size={16} />
              Contact Sales
            </SubmitButton>
          </Footer>
        </Body>
      </Modal>
    </Overlay>
  );
};

export default CompletePurchaseModal;
