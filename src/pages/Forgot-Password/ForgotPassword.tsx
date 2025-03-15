import { useState } from "react";
import { Typography } from "@mui/material";
import {
  PageContainer,
  AuthCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  NavigateLink,
} from "./forgot_password.styled";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/slice/authSlice";
import { AppDispatch } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utils/Validation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setError("Email is required");
    } else if (!validateEmail(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    try {
      const response = await dispatch(forgetPassword({ email })).unwrap();

      if (response.code === 202) {
        toast.success(response.message);
        window.location.assign("/confirmation");
      }
    } catch (err) {
      console.error("Error sending reset link", err);
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
          <Typography
            onClick={() => window.location.assign("/forgot-password")}
            variant="h4"
            fontWeight="bold"
            mb={1}
          >
            Forgot Password?
          </Typography>
          <Typography variant="body1" color="black" mb={3}>
            Enter your email to receive a password reset link.
          </Typography>

          <form onSubmit={handleSubmitEmail}>
            <StyledTextField
              label="Email Address"
              variant="outlined"
              // type="email"
              value={email}
              onChange={handleEmailChange}
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
            <NavigateLink onClick={() => window.location.assign("/login")}>
              Login
            </NavigateLink>
          </Typography>
        </FormSection>
      </AuthCard>
      <Toaster />
    </PageContainer>
  );
};

export default ForgotPassword;
