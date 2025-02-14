import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  PageContainer,
  AuthCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
} from "../../components/ActivateAccount/activateAccount.styled";
import { resetPassword } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const searchToken = searchParams.get("token");
    const searchEmail = searchParams.get("email");

    if (searchToken && searchEmail) {
      setToken(searchToken);
      setEmail(searchEmail);
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmitPassword = async () => {
    if (!password || !token || !email) {
      return;
    }

    try {
      await dispatch(resetPassword({ token, password, email })).unwrap();
      console.log("Password reset successful");
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  return (
    <PageContainer>
      <AuthCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Account Activation Illustration"
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Reset Password
          </Typography>
          <Typography variant="body1" color="black" mb={3}>
            Your identity has been verified. Set your new password.
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <StyledTextField
            label="New Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <StyledButton fullWidth onClick={handleSubmitPassword} disabled={loading}>
            {loading ? "Resetting password..." : "Reset Password"}
          </StyledButton>
        </FormSection>
      </AuthCard>
    </PageContainer>
  );
};

export default ResetPassword;
