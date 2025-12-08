import React from "react";
import { Tabs, Tab, TabsProps, TabProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface CustomTabsProps extends Omit<TabsProps, "children" | "indicatorColor"> {
  children?: React.ReactNode;
  // Custom styling props
  indicatorColor?: string; // Custom color (not MUI's indicatorColor)
  customIndicatorColor?: string; // Internal prop name to avoid conflict
  indicatorHeight?: number | string;
  indicatorBorderRadius?: number | string;
  tabBackground?: string;
  tabBorderRadius?: number | string;
  tabGap?: number | string;
  tabPadding?: string;
  // Tab styling
  tabFontSize?: number | string;
  tabFontWeight?: number | string;
  tabColor?: string;
  tabSelectedColor?: string;
  tabHoverColor?: string;
  tabMinWidth?: number | string;
  tabMaxWidth?: number | string;
  // Transitions
  transitionDuration?: string;
  // Border
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: number | string;
  // Spacing
  tabsPadding?: string;
  tabsMargin?: string;
}

export interface CustomTabProps extends TabProps {
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

const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) =>
    ![
      "customIndicatorColor",
      "indicatorHeight",
      "indicatorBorderRadius",
      "tabBackground",
      "tabBorderRadius",
      "tabGap",
      "tabPadding",
      "tabFontSize",
      "tabFontWeight",
      "tabColor",
      "tabSelectedColor",
      "tabHoverColor",
      "tabMinWidth",
      "tabMaxWidth",
      "transitionDuration",
      "showBorder",
      "borderColor",
      "borderWidth",
      "tabsPadding",
      "tabsMargin",
    ].includes(prop as string),
})<CustomTabsProps>`
  background: ${(props) => props.tabBackground || "var(--background-primary)"};
  padding: ${(props) => props.tabsPadding || "0"};
  margin: ${(props) => props.tabsMargin || "0"};
  ${(props) =>
    props.showBorder
      ? `border: ${props.borderWidth || "1px"} solid ${props.borderColor || "var(--border-grey)"};`
      : ""}
  border-radius: ${(props) => props.tabBorderRadius || "0"};

  .MuiTabs-indicator {
    background-color: ${(props) => (props as CustomTabsProps & { customIndicatorColor?: string }).customIndicatorColor || "#33475b"} !important;
    height: ${(props) =>
      typeof props.indicatorHeight === "number"
        ? `${props.indicatorHeight}px`
        : props.indicatorHeight || "2px"};
    border-radius: ${(props) =>
      typeof props.indicatorBorderRadius === "number"
        ? `${props.indicatorBorderRadius}px`
        : props.indicatorBorderRadius || "4px"};
    transition: all ${(props) => props.transitionDuration || "0.3s"} ease-in-out;
  }

  .MuiTabs-flexContainer {
    gap: ${(props) =>
      typeof props.tabGap === "number" ? `${props.tabGap}px` : props.tabGap || "0"};
  }

  .MuiTab-root {
    font-size: ${(props) =>
      typeof props.tabFontSize === "number"
        ? `${props.tabFontSize}px`
        : props.tabFontSize || "14px"};
    font-weight: ${(props) => props.tabFontWeight || "500"};
    text-transform: none;
    color: ${(props) => props.tabColor || "#33475b"};
    padding: ${(props) => props.tabPadding || "5px 16px"};
    min-width: ${(props) =>
      typeof props.tabMinWidth === "number"
        ? `${props.tabMinWidth}px`
        : props.tabMinWidth || "auto"};
    max-width: ${(props) =>
      typeof props.tabMaxWidth === "number"
        ? `${props.tabMaxWidth}px`
        : props.tabMaxWidth || "none"};
    transition: all ${(props) => props.transitionDuration || "0.3s"} ease-in-out;
    border-radius: ${(props) =>
      typeof props.tabBorderRadius === "number"
        ? `${props.tabBorderRadius}px`
        : props.tabBorderRadius || "0"};

    &:hover {
      color: ${(props) => props.tabHoverColor || props.tabSelectedColor || "var(--primary)"};
      background-color: ${(props) => props.tabBackground || "transparent"};
      opacity: 0.8;
    }

    &.Mui-selected {
      color: ${(props) => props.tabSelectedColor || "var(--primary)"};
      font-weight: ${(props) => props.tabFontWeight || "bold"};
    }

    &.Mui-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .MuiTabs-scrollButtons {
    color: ${(props) => props.tabColor || "#33475b"};
    
    &.Mui-disabled {
      opacity: 0.3;
    }
  }
`;

const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) =>
    ![
      "customFontSize",
      "customFontWeight",
      "customColor",
      "customSelectedColor",
      "customHoverColor",
      "customPadding",
      "customMinWidth",
      "customMaxWidth",
      "customBorderRadius",
      "customBackground",
      "customSelectedBackground",
      "customHoverBackground",
      "iconSpacing",
      "customTransition",
    ].includes(prop as string),
})<CustomTabProps>`
  font-size: ${(props) =>
    typeof props.customFontSize === "number"
      ? `${props.customFontSize}px !important`
      : props.customFontSize || "inherit !important"};
  font-weight: ${(props) => props.customFontWeight || "inherit"};
  color: ${(props) => props.customColor || "inherit"};
  padding: ${(props) => props.customPadding || "inherit"};
  min-width: ${(props) =>
    typeof props.customMinWidth === "number"
      ? `${props.customMinWidth}px`
      : props.customMinWidth || "inherit"};
  max-width: ${(props) =>
    typeof props.customMaxWidth === "number"
      ? `${props.customMaxWidth}px`
      : props.customMaxWidth || "inherit"};
  border-radius: ${(props) =>
    typeof props.customBorderRadius === "number"
      ? `${props.customBorderRadius}px`
      : props.customBorderRadius || "inherit"};
  background: ${(props) => props.customBackground || "transparent"};
  transition: ${(props) => props.customTransition || "all 0.3s ease-in-out"};

  .MuiTab-iconWrapper {
    margin-right: ${(props) =>
      typeof props.iconSpacing === "number"
        ? `${props.iconSpacing}px`
        : props.iconSpacing || "8px"};
  }

  &:hover {
    color: ${(props) => props.customHoverColor || props.customSelectedColor || "inherit"};
    background: ${(props) => props.customHoverBackground || "transparent"};
  }

  &.Mui-selected {
    color: ${(props) => props.customSelectedColor || "inherit"};
    background: ${(props) => props.customSelectedBackground || "transparent"};
    font-weight: ${(props) => props.customFontWeight || "bold"};
  }

  &.Mui-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CustomTabs: React.FC<CustomTabsProps> = ({
  children,
  indicatorColor,
  indicatorHeight,
  indicatorBorderRadius,
  tabBackground,
  tabBorderRadius,
  tabGap,
  tabPadding,
  tabFontSize,
  tabFontWeight,
  tabColor,
  tabSelectedColor,
  tabHoverColor,
  tabMinWidth,
  tabMaxWidth,
  transitionDuration,
  showBorder,
  borderColor,
  borderWidth,
  tabsPadding,
  tabsMargin,
  ...tabsProps
}) => {
  return (
    <StyledTabs
      customIndicatorColor={indicatorColor}
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
      {...tabsProps}
    >
      {children}
    </StyledTabs>
  );
};

export const CustomTab: React.FC<CustomTabProps> = ({
  customFontSize,
  customFontWeight,
  customColor,
  customSelectedColor,
  customHoverColor,
  customPadding,
  customMinWidth,
  customMaxWidth,
  customBorderRadius,
  customBackground,
  customSelectedBackground,
  customHoverBackground,
  iconSpacing,
  customTransition,
  ...tabProps
}) => {
  return (
    <StyledTab
      customFontSize={customFontSize}
      customFontWeight={customFontWeight}
      customColor={customColor}
      customSelectedColor={customSelectedColor}
      customHoverColor={customHoverColor}
      customPadding={customPadding}
      customMinWidth={customMinWidth}
      customMaxWidth={customMaxWidth}
      customBorderRadius={customBorderRadius}
      customBackground={customBackground}
      customSelectedBackground={customSelectedBackground}
      customHoverBackground={customHoverBackground}
      iconSpacing={iconSpacing}
      customTransition={customTransition}
      {...tabProps}
    />
  );
};

export default CustomTabs;

