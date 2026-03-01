import React, { useState, useRef, useEffect } from "react";
import { Filter, X } from "lucide-react";
import {
  FilterPanelWrapper,
  FilterPanelTrigger,
  FilterPanelBadge,
  FilterPanelCard,
  FilterPanelHeader,
  FilterPanelTitle,
  FilterPanelClearAll,
  FilterPanelBody,
  FilterPanelRow,
  FilterLabel,
  FilterSelectWrapper,
  FilterSelectWithClear,
  FilterClearField,
  FilterPanelFooter,
  FilterCancelButton,
  FilterApplyButton,
} from "./Filters.styled";

export interface FilterPanelOption {
  value: string;
  label: string;
}

export interface FilterPanelFieldConfig {
  key: string;
  label: string;
  options: FilterPanelOption[];
  placeholder?: string;
}

export type FilterPanelValues = Record<string, string | null>;

export interface FilterPanelPopoverProps {
  /** Filter field definitions (each is a single-select dropdown) */
  filters: FilterPanelFieldConfig[];
  /** Current applied filter values */
  values: FilterPanelValues;
  /** Called when user clicks Apply */
  onApply: (values: FilterPanelValues) => void;
  /** Optional: aria label for trigger */
  triggerLabel?: string;
  /** Optional: class for wrapper */
  className?: string;
}

function getActiveCount(values: FilterPanelValues): number {
  return Object.values(values).filter((v) => v != null && v !== "").length;
}

export const FilterPanelPopover: React.FC<FilterPanelPopoverProps> = ({
  filters,
  values,
  onApply,
  triggerLabel = "Open filters",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<FilterPanelValues>(values);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const activeCount = getActiveCount(values);

  // Keep draft in sync when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setDraft({ ...values });
      }, 0);
    }
  }, [isOpen, values]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDraftChange = (key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value === "" ? null : value }));
  };

  const handleClearField = (key: string) => {
    setDraft((prev) => ({ ...prev, [key]: null }));
  };

  const handleClearAll = () => {
    const cleared: FilterPanelValues = {};
    filters.forEach((f) => {
      cleared[f.key] = null;
    });
    setDraft(cleared);
  };

  const handleCancel = () => {
    setDraft({ ...values });
    setIsOpen(false);
  };

  const handleApply = () => {
    onApply(draft);
    setIsOpen(false);
  };

  return (
    <FilterPanelWrapper ref={wrapperRef} className={className}>
      <FilterPanelTrigger
        type="button"
        $active={activeCount > 0}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Filter size={20} />
        {activeCount > 0 && (
          <FilterPanelBadge aria-hidden>{activeCount}</FilterPanelBadge>
        )}
      </FilterPanelTrigger>

      {isOpen && (
        <FilterPanelCard role="dialog" aria-label="Filter">
          <FilterPanelHeader>
            <FilterPanelTitle>Filter</FilterPanelTitle>
            <FilterPanelClearAll type="button" onClick={handleClearAll}>
              Clear all
            </FilterPanelClearAll>
          </FilterPanelHeader>

          <FilterPanelBody>
            {filters.map((field) => {
              const value = draft[field.key] ?? "";
              const hasValue = value !== "";
              return (
                <FilterPanelRow key={field.key}>
                  <FilterLabel htmlFor={`filter-${field.key}`}>
                    {field.label}
                  </FilterLabel>
                  <FilterSelectWrapper>
                    <FilterSelectWithClear
                      id={`filter-${field.key}`}
                      value={value}
                      onChange={(e) =>
                        handleDraftChange(field.key, e.target.value)
                      }
                      aria-label={field.label}
                    >
                      <option value="">
                        {field.placeholder ?? `Select ${field.label}`}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </FilterSelectWithClear>
                    {hasValue && (
                      <FilterClearField
                        type="button"
                        onClick={() => handleClearField(field.key)}
                        aria-label={`Clear ${field.label}`}
                      >
                        <X size={14} />
                      </FilterClearField>
                    )}
                  </FilterSelectWrapper>
                </FilterPanelRow>
              );
            })}
          </FilterPanelBody>

          <FilterPanelFooter>
            <FilterCancelButton type="button" onClick={handleCancel}>
              Cancel
            </FilterCancelButton>
            <FilterApplyButton type="button" onClick={handleApply}>
              Apply
            </FilterApplyButton>
          </FilterPanelFooter>
        </FilterPanelCard>
      )}
    </FilterPanelWrapper>
  );
};

export default FilterPanelPopover;
