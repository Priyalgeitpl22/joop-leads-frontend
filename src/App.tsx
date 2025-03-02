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
import { CustomSearchBar } from "./assets/Custom/customSearchBar";
import { SidebarFooter } from "./assets/Custom/customSidebarFooter";
import { ThemeProvider } from "@emotion/react";

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(
    window.location.pathname || initialPath
  );

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(window.location.search),
      navigate: (path: any) => {
        window.history.pushState({}, "", path);
        setPathname(path);
      },
    };
  }, [pathname]);

  React.useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return router as Router;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/");
  const isNewCampaignPage =
    location.pathname === "/email-campaign/new-campaign";

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={theme}>
      {isNewCampaignPage ? (
        <NewCampaign router={router} />
      ) : (
        <DashboardLayout
          sx={{
            background: "var(--background-light)",
          }}
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: CustomSearchBar,
            sidebarFooter: SidebarFooter,
          }}
        >
          <PageContainer
            title=""
            sx={{
              "& .MuiTypography-root": { display: "none" },
              "& a": { display: "none" },
            }}
          >
            {router.pathname === "/" && <Home />}
            {router.pathname === "/email-campaign" && (
              <EmailCampaign router={router} />
            )}
            {router.pathname === "/email-accounts" && <EmailAccount />}
            {router.pathname === "/inbox" && <EmailInboxs />}
            {router.pathname === "/leads" && <Leads />}
            {router.pathname === "/chats" && <Chats />}
            {router.pathname === "/organization" && <Organization />}
          </PageContainer>
        </DashboardLayout>
      )}
    </AppProvider>
  );
}
