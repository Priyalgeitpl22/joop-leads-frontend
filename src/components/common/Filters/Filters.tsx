import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  FiltersBar,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  FilterDropdown,
  FilterTrigger,
  FilterPanel,
  FilterOption,
  ClearButton,
  ActiveBadge,
} from "./Filters.styled";

export interface FilterOptionItem {
  value: string;
  label: string;
}

export type FilterConfig =
  | {
      key: string;
      label: string;
      type: "select";
      options: FilterOptionItem[];
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: "multi";
      options: FilterOptionItem[];
      placeholder?: string;
    };

export type FilterValues = Record<string, string | string[] | null>;

export interface FiltersProps {
  /** Filter field definitions */
  filters: FilterConfig[];
  /** Current filter values (key -> value or array of values) */
  values: FilterValues;
  /** Called when any filter value changes */
  onChange: (values: FilterValues) => void;
  /** Optional: show "Clear all" when any filter is active */
  showClearAll?: boolean;
  /** Optional: custom class for the bar container */
  className?: string;
}

function getActiveCount(values: FilterValues): number {
  return Object.values(values).filter((v) => {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return v !== "";
  }).length;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  values,
  onChange,
  showClearAll = true,
  className,
}) => {
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        openDropdownKey &&
        dropdownRefs.current[openDropdownKey] &&
        !dropdownRefs.current[openDropdownKey]!.contains(target)
      ) {
        setOpenDropdownKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownKey]);

  const handleSelectChange = (key: string, value: string) => {
    const next = { ...values, [key]: value === "" ? null : value };
    onChange(next);
  };

  const handleMultiToggle = (key: string, optionValue: string) => {
    const current = (values[key] as string[] | null) ?? [];
    const next = current.includes(optionValue)
      ? current.filter((v) => v !== optionValue)
      : [...current, optionValue];
    onChange({ ...values, [key]: next.length ? next : null });
  };

  const handleClearAll = () => {
    const cleared: FilterValues = {};
    filters.forEach((f) => {
      cleared[f.key] = f.type === "multi" ? null : null;
    });
    onChange(cleared);
    setOpenDropdownKey(null);
  };

  const activeCount = getActiveCount(values);

  return (
    <FiltersBar className={className}>
      {filters.map((filter) => {
        if (filter.type === "select") {
          const value = (values[filter.key] as string | null) ?? "";
          return (
            <FilterGroup key={filter.key}>
              <FilterLabel>{filter.label}</FilterLabel>
              <FilterSelect
                value={value}
                onChange={(e) => handleSelectChange(filter.key, e.target.value)}
                aria-label={filter.label}
              >
                <option value="">
                  {filter.placeholder ?? `All ${filter.label}`}
                </option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
          );
        }

        // type === "multi"
        const selected = (values[filter.key] as string[] | null) ?? [];
        const isOpen = openDropdownKey === filter.key;
        const label =
          selected.length === 0
            ? filter.placeholder ?? filter.label
            : selected.length === 1
              ? filter.options.find((o) => o.value === selected[0])?.label ??
                selected[0]
              : `${selected.length} selected`;

        return (
          <FilterGroup key={filter.key}>
            <FilterLabel>{filter.label}</FilterLabel>
            <FilterDropdown
              ref={(el) => {
                dropdownRefs.current[filter.key] = el;
              }}
            >
              <FilterTrigger
                type="button"
                $active={selected.length > 0}
                onClick={() =>
                  setOpenDropdownKey(isOpen ? null : filter.key)
                }
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{label}</span>
                {selected.length > 1 && (
                  <ActiveBadge>{selected.length}</ActiveBadge>
                )}
                <ChevronDown size={16} />
              </FilterTrigger>
              {isOpen && (
                <FilterPanel role="listbox">
                  {filter.options.map((opt) => (
                    <FilterOption key={opt.value}>
                      <input
                        type="checkbox"
                        checked={selected.includes(opt.value)}
                        onChange={() =>
                          handleMultiToggle(filter.key, opt.value)
                        }
                        aria-label={opt.label}
                      />
                      <span>{opt.label}</span>
                    </FilterOption>
                  ))}
                </FilterPanel>
              )}
            </FilterDropdown>
          </FilterGroup>
        );
      })}
      {showClearAll && activeCount > 0 && (
        <ClearButton type="button" onClick={handleClearAll}>
          <X size={14} />
          Clear all
        </ClearButton>
      )}
    </FiltersBar>
  );
};

export default Filters;
