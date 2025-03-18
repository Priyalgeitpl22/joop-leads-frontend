// import DashboardIcon from "@mui/icons-material/Dashboard";
import { Navigation } from "@toolpad/core/AppProvider";
// import CampaignIcon from "@mui/icons-material/Campaign";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Dashboard",
    icon: (
      <img
        height="40px"
        width="40px"
        src="/Images/dashboard-monitor.png"
        alt=""
      />
    ),
  },
  {
    kind: "divider",
  },
  {
    segment: "email-campaign",
    title: "Email Campaigns",
    icon: (
      <img
        height="40px"
        width="40px"
        src="/Images/audience-megaphone.png"
        alt=""
      />
    ),
  },
  {
    kind: "divider",
  },
  {
    segment: "email-accounts",
    title: "Email Accounts",
    icon: <img height="40px" width="40px" src="/Images/envelopes.png" alt="" />,
  },
  {
    kind: "divider",
  },
  {
    segment: "contacts",
    title: "Contacts",
    icon: (
      <img height="40px" width="40px" src="/Images/address-book.png" alt="" />
    ),
  },
  {
    kind: "divider",
  },
  {
    segment: "inbox",
    title: "Master Inbox",
    icon: (
      <img
        height="40px"
        width="40px"
        src="/Images/mailbox-envelope.png"
        alt=""
      />
    ),
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
