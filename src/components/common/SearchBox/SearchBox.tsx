import React from "react";
import { Search } from "lucide-react";
import { SearchWrapper, SearchIconWrap, SearchInput } from "./SearchBox.styled";

export interface SearchBoxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Optional width (e.g. "280px") */
  width?: string;
  /** Optional min-width (default "250px") */
  minWidth?: string;
  /** Icon size in pixels (default 16) */
  iconSize?: number;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  width,
  minWidth,
  iconSize = 16,
  className,
  disabled,
  ...inputProps
}) => {
  return (
    <SearchWrapper
      className={className}
      $width={width}
      $minWidth={minWidth}
    >
      <SearchIconWrap aria-hidden>
        <Search size={iconSize} />
      </SearchIconWrap>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={placeholder}
        {...inputProps}
      />
    </SearchWrapper>
  );
};

export default SearchBox;
