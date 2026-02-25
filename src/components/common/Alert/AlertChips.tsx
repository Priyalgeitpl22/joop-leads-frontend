import React from "react";
import { Chip, IconWrap, Label } from "./styled";
import type { AlertChipVariant } from "./styled";
import { AlertTriangle } from "lucide-react";

export type { AlertChipVariant } from "./styled";

export interface AlertChipProps {
  variant: AlertChipVariant;
  showIcon?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AlertChip: React.FC<AlertChipProps> = ({
  variant,
  showIcon = true,
  children,
  className,
}) => {
  return (
    <Chip $variant={variant} className={className}>
      {showIcon && (
        <IconWrap>
        <AlertTriangle size={14} strokeWidth={2.5} />
        </IconWrap>
      )}
      <Label>{children}</Label>
    </Chip>
  );
};

export default AlertChip;
