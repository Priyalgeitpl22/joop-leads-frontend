import DashboardIcon from "@mui/icons-material/Dashboard";
import { Navigation } from "@toolpad/core/AppProvider";
import CampaignIcon from "@mui/icons-material/Campaign";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArchiveIcon from "@mui/icons-material/Archive";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
  {
    segment: "email-campaign/all",
    title: "Email Campaigns",
    icon: <CampaignIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
  {
    segment: "email-accounts",
    title: "Email Accounts",
    icon: <ContactMailIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
  {
    segment: "all-leads",
    title: "All Leads",
    icon: <ContactPhoneIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
  {
    segment: "inbox",
    title: "Master Inbox",
    icon: <ArchiveIcon style={{ color: "var(--icon-hover)" }} />,
  },
  // {
  //   segment: "leads",
  //   title: "All Leads",
  //   icon: <FollowTheSignsIcon style={{ color: "var(--icon-hover)" }}/>,
  // },
  {
    kind: "divider",
  },
  {
    segment: "user",
    title: "Users",
    icon: <AccountBoxIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
];
