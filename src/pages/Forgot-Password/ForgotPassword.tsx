import { useState } from "react";
import { Typography } from "@mui/material";
import {
  PageContainer,
  AuthCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
} from "./forgot_password.styled";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/slice/authSlice"; // Import Redux action
import { AppDispatch } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email.trim()) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }
    setError("");
    try {
      const response = await dispatch(forgetPassword({ email })).unwrap();
      if (response.code === 200) {
        toast.success("Reset link sent successfully!");
        navigate('/confirmation');
      }
    } catch (err) {
      console.error("Error sending reset link:", err);
      setError("Failed to send reset link. Please try again.");
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <PageContainer>
      <AuthCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Forgot Password Illustration"
          />
        </IllustrationSection>
        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Forgot Password?
          </Typography>
          <Typography variant="body1" color="black" mb={3}>
            Enter your email to receive a password reset link.
          </Typography>

          <form onSubmit={handleSubmitEmail}>
            <StyledTextField
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              fullWidth
            />

            <StyledButton fullWidth type="submit">
              RESET PASSWORD
            </StyledButton>
          </form>

          <Typography variant="body2" align="center" sx={{ my: 2 }}>
            Remember your password?{" "}
            <RouterLink
              to="/login"
              style={{ textDecoration: "none", color: "var(--theme-color-dark)" }}
            >
              Login
            </RouterLink>
          </Typography>
        </FormSection>
      </AuthCard>
      <Toaster/>
    </PageContainer>
  );
};

export default ForgotPassword;
