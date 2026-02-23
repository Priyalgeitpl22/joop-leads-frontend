import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import { LimitReachedDialog } from "./components/common";

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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { fetchCurrentUser } from "./store/slices/userSlice";
import EmailVerification from "./pages/verifications/emailVerification/EmailVerification";
import TaskAndResults from "./pages/verifications/task&Results/Task&Results";
import BulkDetailsResult from "./pages/verifications/task&Results/bulkDetailsResult/BulkDetailsResult";

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-otp', '/activate-account'];

const PAYMENT_REQUIRED_EVENT = "api:payment-required";

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  useEffect(() => {
    const isPublicRoute = PUBLIC_ROUTES.some(route => location.pathname.startsWith(route));
    if (!isPublicRoute && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, location.pathname, user]);

  useEffect(() => {
    const handler = () => setShowLimitDialog(true);
    window.addEventListener(PAYMENT_REQUIRED_EVENT, handler);
    return () => window.removeEventListener(PAYMENT_REQUIRED_EVENT, handler);
  }, []);

  const handleLimitPrimaryAction = () => {
    setShowLimitDialog(false);
    navigate("/subscription");
  };

  return (
    <>
      <LimitReachedDialog
        isOpen={showLimitDialog}
        onClose={() => setShowLimitDialog(false)}
        limitType="plan limit"
        variant="subscribe"
        onPrimaryAction={handleLimitPrimaryAction}
        primaryActionLabel="View plans"
        secondaryActionLabel="Maybe later"
      />

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
          <Route
            path="/email-verification/verify-email"
            element={<EmailVerification />}
          />
          <Route
            path="/email-verification/task-and-results"
            element={<TaskAndResults />}
          />
          <Route
            path="/email-verification/task-and-results/bulk-detail/:taskId"
            element={<BulkDetailsResult />}
          />
          <Route path="/leads" element={<Leads />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/:tab" element={<Settings />} />
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
