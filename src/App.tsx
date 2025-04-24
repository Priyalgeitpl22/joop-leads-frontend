import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NAVIGATION } from "./assets/Custom/customSideBar";
import EmailCampaign from "./pages/Email-Campaign/EmailCampaign";
import Chats from "./components/Chats/Chats";
import Organization from "./components/Organization/Organization";
import EmailAccount from "./pages/Email-Account/EmailAccount";
import EmailInboxs from "./pages/Email-Inbox/EmailInbox";
import Leads from "./pages/Leads/Leads";
import Home from "./pages/Home/Home";
import NewCampaign from "./pages/Email-Campaign/NewCampaign/NewCampaign";
import theme from "./styles/theme";
import { CustomAppTitle } from "./assets/Custom/customAppTitle";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./redux/slice/userSlice";
import { AppDispatch, RootState } from "./redux/store/store";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/Forgot-Password/ForgotPassword";
import ActivateAccount from "./components/ActivateAccount/ActivateAccount";
import ChangePassword from "./components/Change-Password/ChangePassword";
import PasswordResetConfirmation from "./pages/Forgot-Password/PasswordResetConfirmation";
import ResetPassword from "./pages/Forgot-Password/ResetPassword";
import VerifyOtp from "./pages/Verify-OTP/VerifyOtp";
import UserProfileMenu from "./assets/Custom/customUserProfile";
import ContactTable from "./pages/Contacts/ContactTable";
import EditEmailAccount from "./pages/Email-Account/EditEmailAccount/EditEmailAccount";
import ViewEmailCampaign from "./pages/Email-Campaign/ViewEmailCampaign/ViewEmailCampaign";
import { Toaster } from "react-hot-toast";
import Users from "./pages/Users/User";
import Unsubscribe from "./pages/Unsubscribe/Unsubscribe";

const UNPROTECTED_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/confirmation",
  "/change-password",
  "/activate-account",
  "/unsubscribe",
];

function ResponsiveDashboardLayout({ 
  router, 
  children 
}: { 
  router: Router; 
  children: React.ReactNode;
}) {
  const [key, setKey] = React.useState(0);
  
  React.useEffect(() => {
    setKey(prev => prev + 1);
  }, [router.pathname === "/inbox"]);
  
  return (
    <DashboardLayout
      key={key}
      defaultSidebarCollapsed={router.pathname === "/inbox"}
      sx={{
        background: "var(--background-light)",
      }}
      slots={{
        appTitle: CustomAppTitle,
        toolbarActions: () => (
          <>
            <UserProfileMenu />
          </>
        ),
      }}
    >
      {children}
    </DashboardLayout>
  );
}

function useDemoRouter(initialPath: string): Router {
  const navigate = useNavigate();
  const [pathname, setPathname] = React.useState(
    window.location.pathname || initialPath
  );

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);

  return {
    pathname,
    searchParams: new URLSearchParams(window.location.search),
    navigate: (path: any) => {
      navigate(path);
    },
  };
}

export default function DashboardLayoutBasic() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useDemoRouter("/");
  const navigate = useNavigate();
  const isNewCampaignPage = router.pathname === "/email-campaign/new-campaign";

  const { user } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const hideChatWidget = () => {
      const chatWidgetIframe = document.querySelector(
        "iframe[src*='chat.jooper.ai']"
      ) as HTMLElement;
      const chatWidgetContainer = document.getElementById("chat-widget");

      if (UNPROTECTED_ROUTES.includes(router.pathname)) {
        if (chatWidgetIframe) chatWidgetIframe.style.display = "none";
        if (chatWidgetContainer) chatWidgetContainer.style.display = "none";
      } else {
        if (chatWidgetIframe) chatWidgetIframe.style.display = "block";
        if (chatWidgetContainer) chatWidgetContainer.style.display = "block";
      }
    };

    hideChatWidget();
    const delayHide = setTimeout(hideChatWidget, 1000);
    return () => clearTimeout(delayHide);
  }, [router.pathname]);

  React.useEffect(() => {
    const token = Cookies.get("access_token");

    if (!UNPROTECTED_ROUTES.includes(router.pathname)) {
      if (!token) {
        navigate("/login");
      } else {
        dispatch(getUserDetails(token))
          .unwrap()
          .catch((error) => {
            console.error("Failed to fetch user details:", error);
            navigate("/login");
          });
      }
    }
  }, [dispatch, router.pathname, navigate]);

  if (
    UNPROTECTED_ROUTES.some((path) => router.pathname.startsWith(path)) ||
    router.pathname.startsWith("/unsubscribe")
  ) {
    return (
      <AppProvider router={router} theme={theme}>
        <PageContainer>
          {router.pathname === "/login" && <Login />}
          {router.pathname === "/signup" && <Register />}
          {router.pathname === "/forgot-password" && <ForgotPassword />}
          {router.pathname === "/reset-password" && <ResetPassword />}
          {router.pathname === "/verify-otp" && <VerifyOtp />}
          {router.pathname === "/confirmation" && <PasswordResetConfirmation />}
          {router.pathname === "/change-password" && <ChangePassword />}
          {router.pathname === "/activate-account" && <ActivateAccount />}
          {router.pathname.startsWith("/unsubscribe") && <Unsubscribe />}
        </PageContainer>
      </AppProvider>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {isNewCampaignPage ? (
        <NewCampaign router={router} />
      ) : (
        <ResponsiveDashboardLayout router={router}>
          <PageContainer
            maxWidth={false}
            title=""
            sx={{
              marginTop: "0 !important",
              "& .MuiTypography-root": { display: "none" },
              "& a": { display: "none" },
            }}
          >
            {router.pathname === "/" && <Home />}
            {router.pathname.startsWith("/email-campaign") && <EmailCampaign />}
            {/* {router.pathname === "/email-campaign/folders" && (
              <CampaignFolder />
            )} */}
            {router.pathname === "/email-accounts" && <EmailAccount />}
            {router.pathname.startsWith(
              "/email-account/edit-email-account/"
            ) && <EditEmailAccount id={router.pathname.split("/").pop()} />}
            {router.pathname.startsWith(
              "/email-campaign/view-email-campaign"
            ) && <ViewEmailCampaign />}
            {router.pathname === "/inbox" && <EmailInboxs />}
            {router.pathname === "/user" && <Users />}
            {router.pathname === "/leads" && <Leads />}
            {router.pathname === "/chats" && <Chats />}
            {router.pathname === "/all-leads" && <ContactTable />}
            {router.pathname === "/organization" && <Organization />}
          </PageContainer>
        </ResponsiveDashboardLayout>
      )}
    </AppProvider>
  );
}