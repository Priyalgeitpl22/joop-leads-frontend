import React, { useState } from "react";
import { CustomTabs, CustomTab, CustomTabsProps } from "./CustomTabs";
import { Box } from "@mui/material";

export interface TabItem {
  label: string | React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  // Individual tab styling overrides
  customFontSize?: number | string;
  customFontWeight?: number | string;
  customColor?: string;
  customSelectedColor?: string;
  customHoverColor?: string;
  customPadding?: string;
  customMinWidth?: number | string;
  customMaxWidth?: number | string;
  customBorderRadius?: number | string;
  customBackground?: string;
  customSelectedBackground?: string;
  customHoverBackground?: string;
  iconSpacing?: number | string;
  customTransition?: string;
}

export interface TabsHeaderProps extends Omit<CustomTabsProps, "children" | "value" | "onChange"> {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  // Container styling
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  // Show back button
  showBackButton?: boolean;
  backButton?: React.ReactNode;
  onBackClick?: () => void;
  // Layout
  alignTabs?: "left" | "center" | "right" | "space-between";
  // Divider
  showDivider?: boolean;
  dividerColor?: string;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  tabs,
  defaultValue,
  value: controlledValue,
  onChange,
  containerStyle,
  containerClassName,
  showBackButton = false,
  backButton,
  onBackClick,
  alignTabs = "left",
  showDivider = true,
  dividerColor = "var(--border-grey)",
  indicatorColor="rgb(61, 31, 190)",
  indicatorHeight = "2.5px",
  indicatorBorderRadius = 4,
  tabBackground = "var(--background-primary)",
  tabBorderRadius = 0,
  tabGap = 0,
  tabPadding = "5px 16px",
  tabFontSize = 14,
  tabFontWeight = 500,
  tabColor = "#33475b",
  tabSelectedColor = "rgb(61, 31, 190)",
  tabHoverColor = "rgb(61, 31, 190)",
  tabMinWidth = "auto",
  tabMaxWidth = "none",
  transitionDuration = "0.3s",
  showBorder = false,
  borderColor,
  borderWidth,
  tabsPadding = "0",
  tabsMargin = "0",
  ...restTabsProps
}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || tabs[0]?.value || "");

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    ...containerStyle,
  };

  const tabsContainerStyles: React.CSSProperties = {
    flex: 1,
    display: "flex",
    justifyContent:
      alignTabs === "left"
        ? "flex-start"
        : alignTabs === "center"
        ? "center"
        : alignTabs === "right"
        ? "flex-end"
        : "space-between",
  };

  return (
    <Box
      className={containerClassName}
      sx={{
        ...containerStyles,
        // borderBottom: showDivider ? `1px solid ${dividerColor}` : "none",
        // paddingBottom: showDivider ? "8px" : "0",
      }}
    >
      {showBackButton && backButton && (
        <Box
          onClick={onBackClick}
          sx={{
            cursor: onBackClick ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            padding: "4px",
            "&:hover": {
              opacity: onBackClick ? 0.7 : 1,
            },
          }}
        >
          {backButton}
        </Box>
      )}

      <Box sx={tabsContainerStyles}>
        <CustomTabs
          value={currentValue}
          onChange={handleChange}
          indicatorColor={indicatorColor}
          indicatorHeight={indicatorHeight}
          indicatorBorderRadius={indicatorBorderRadius}
          tabBackground={tabBackground}
          tabBorderRadius={tabBorderRadius}
          tabGap={tabGap}
          tabPadding={tabPadding}
          tabFontSize={tabFontSize}
          tabFontWeight={tabFontWeight}
          tabColor={tabColor}
          tabSelectedColor={tabSelectedColor}
          tabHoverColor={tabHoverColor}
          tabMinWidth={tabMinWidth}
          tabMaxWidth={tabMaxWidth}
          transitionDuration={transitionDuration}
          showBorder={showBorder}
          borderColor={borderColor}
          borderWidth={borderWidth}
          tabsPadding={tabsPadding}
          tabsMargin={tabsMargin}
          {...restTabsProps}
        >
          {tabs.map((tab) => (
            <CustomTab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              {...(tab.icon && { icon: tab.icon as React.ReactElement })}
              disabled={tab.disabled}
              customFontSize={tab.customFontSize}
              customFontWeight={tab.customFontWeight}
              customColor={tab.customColor}
              customSelectedColor={tab.customSelectedColor}
              customHoverColor={tab.customHoverColor}
              customPadding={tab.customPadding}
              customMinWidth={tab.customMinWidth}
              customMaxWidth={tab.customMaxWidth}
              customBorderRadius={tab.customBorderRadius}
              customBackground={tab.customBackground}
              customSelectedBackground={tab.customSelectedBackground}
              customHoverBackground={tab.customHoverBackground}
              iconSpacing={tab.iconSpacing}
              customTransition={tab.customTransition}
            />
          ))}
        </CustomTabs>
      </Box>
    </Box>
  );
};

export default TabsHeader;

