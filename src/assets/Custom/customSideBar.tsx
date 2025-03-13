import DashboardIcon from "@mui/icons-material/Dashboard";
import { Navigation } from "@toolpad/core/AppProvider";
import CampaignIcon from "@mui/icons-material/Campaign";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArchiveIcon from "@mui/icons-material/Archive";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

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
    segment: "email-campaign",
    title: "Email Campaigns",
    icon: <CampaignIcon style={{ color: "var(--icon-hover)" }}/>,
  },
  {
    kind: "divider",
  },
  {
    segment: "email-accounts",
    title: "Email Accounts",
    icon: <ContactMailIcon style={{ color: "var(--icon-hover)" }}/>,
  },
  {
    kind: "divider",
  },
  {
    segment: "contacts",
    title: "Contacts",
    icon: <ContactPhoneIcon style={{ color: "var(--icon-hover)" }} />,
  },
  {
    kind: "divider",
  },
  {
    segment: "inbox",
    title: "Master Inbox",
    icon: <ArchiveIcon style={{ color: "var(--icon-hover)" }}/>,
  },
  // {
  //   segment: "leads",
  //   title: "All Leads",
  //   icon: <FollowTheSignsIcon style={{ color: "var(--icon-hover)" }}/>,
  // },
  // {
  //   kind: "divider",
  // },
  // {
  //   segment: "chats",
  //   title: "Chats",
  //   icon: <ForumIcon style={{ color: "var(--icon-hover)" }}/>,
  // },
  // {
  //   kind: "divider",
  // },
];
