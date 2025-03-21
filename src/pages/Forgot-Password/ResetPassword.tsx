import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  PageContainer,
  AuthCard,
  IllustrationSection,
  FormSection,
  StyledButton,
} from "../../components/ActivateAccount/activateAccount.styled";
import { resetPassword } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../../utils/PasswordInput";
import { validatePassword } from "../../utils/Validation";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const searchToken = searchParams.get("token");
    const searchEmail = searchParams.get("email");

    if (searchToken && searchEmail) {
      setToken(searchToken);
      setEmail(searchEmail);
    } else {
      window.location.assign("/login");
    }
  }, [searchParams, navigate]);




  const handleSubmitPassword = async () => {
    if (!password || !token || !email) {
      setError("Password is required");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }
    setError("");
   
    try {
     const response= await dispatch(resetPassword({ token, password, email })).unwrap();
      toast.success(response.message ||"Password reset successful!",{duration:2000});    
      setTimeout(() => {
        window.location.assign("/login");
      }, 1000); 
    } catch (err:any) {
      const errorMessage = err|| "Error resetting password. Please try again.";
      setError(errorMessage); 
      toast.error(errorMessage);
    }
  };

  return (
    <PageContainer>
      <Toaster position="top-right" />
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

          <PasswordInput
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error || ""}
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
