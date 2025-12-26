import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import { Login, Register, ForgotPassword, ResetPassword, VerifyOTP, ActivateAccount } from "./pages/auth";
import { Settings } from "./pages/settings";
import { Profile } from "./pages/profile";
import { Campaigns } from "./pages/campaigns";
import { CampaignWizard } from "./pages/campaigns/CampaignWizard";
import { CampaignDetails } from "./pages/campaigns/CampaignDetails";
import EmailAccounts from "./pages/emailAccounts";
import EmailAccountDetails from "./pages/emailAccounts/EmailAccountDetails";
import { Leads } from "./pages/leads";
import { Subscription } from "./pages/subscription";
import { Users } from "./pages/users";
import { Inbox } from "./pages/inbox";
import { Dashboard } from "./pages/dashboard";

// Layouts & Components
import { MainLayout } from "./layouts";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "./store";
import { fetchCurrentUser } from "./store/slices/userSlice";

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-otp', '/activate-account'];

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.some(route => location.pathname.startsWith(route));
    if (!isPublicRoute) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/activate-account" element={<ActivateAccount />} />

        {/* Full-page protected routes (without MainLayout) */}
        <Route
          path="/campaign/:id"
          element={
            <ProtectedRoute>
              <CampaignWizard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes with MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/accounts" element={<EmailAccounts />} />
          <Route path="/accounts/:id" element={<EmailAccountDetails />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
