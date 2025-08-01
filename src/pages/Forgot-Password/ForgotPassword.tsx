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
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utils/Validation";
import { NavigateLink } from "../Login/login.styled";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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
    setShowLoader(true);

    try {
      const response = await dispatch(forgetPassword({ email })).unwrap();
      setTimeout(() => {
        toast.success(response.message || "Reset link sent successfully!", { duration: 3000 });
        setShowLoader(false);

        setTimeout(() => {
          navigate("/confirmation");
        }, 2000);
      }, 1500);
    } catch (err: any) {
      setTimeout(() => {
        setShowLoader(false);
        toast.error(err?.message || "Failed to send reset link. Please try again.", { duration: 3000 });
      }, 1500);
    }
  };


  return (
    <PageContainer>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthCard>
        {/* <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Forgot Password Illustration"
          />
        </IllustrationSection> */}
        <IllustrationSection>
          <img
            src="/great-learning.gif"
            alt="Email illustration"
            style={{ width: "70%", height: "auto" }}
          />
        </IllustrationSection>
        <FormSection>
          <Typography
            onClick={() => window.location.assign("/forgot-password")}
            variant="h4"
            color="var(--text-black)"
            fontWeight="600"
            mb={1}
          >
            Forgot Password?
          </Typography>
          <Typography variant="body1" color="black" mb={3}>
            Enter your email to receive a password reset link.
          </Typography>

          <form onSubmit={handleSubmitEmail}>
            <StyledTextField
              label="Email Address *"
              variant="outlined"
              // type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              helperText={error}
              fullWidth
            />

            <StyledButton fullWidth type="submit" disabled={loading || showLoader}>
              {loading || showLoader ? "SENDING..." : "RESET PASSWORD"}
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
      {(loading || showLoader) && <Loader />}
    </PageContainer>
  );
};

export default ForgotPassword;
