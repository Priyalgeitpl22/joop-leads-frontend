import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { PageContainer, AuthCard, IllustrationSection, FormSection, StyledTextField, StyledButton } from "./forgot_password.styled"; // Import styled components
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP fields, 6 digits
  const [timer, setTimer] = useState(60); // Timer for OTP

  // Start the timer when OTP is sent
  useEffect(() => {
    let interval: any;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [otpSent, timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmitEmail = () => {
    console.log("Reset link sent to:", email);
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    console.log("OTP Verified:", otp.join(""));
    // Implement OTP verification logic
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
          {!otpSent ? (
            <>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Forgot Password?
              </Typography>
              <Typography variant="body1" color="black" mb={3}>
                Enter your email to receive a password reset link.
              </Typography>

              <StyledTextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <StyledButton fullWidth onClick={handleSubmitEmail}>
                RESET PASSWORD
              </StyledButton>

              <Typography variant="body2" align="center" sx={{ my: 2 }}>
                Remember your password?{" "}
                <RouterLink to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                  Login
                </RouterLink>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Verify OTP
              </Typography>
              <Typography variant="body1" color="black" mb={3}>
                We have sent an OTP to your email. Enter the OTP below to reset your password.
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={2}>
                {otp.map((digit, index) => (
                  <StyledTextField
                    key={index}
                    value={digit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(e, index)}
                    inputProps={{ maxLength: 1 }}
                    style={{ width: "40px", textAlign: "center" }}
                  />
                ))}
              </Box>

              <Typography variant="body2" align="center" sx={{ my: 2 }}>
                Time remaining: {timer}s
              </Typography>

              <StyledButton fullWidth onClick={handleVerifyOtp}>
                VERIFY OTP
              </StyledButton>

              <Typography variant="body2" align="center" sx={{ my: 2 }}>
                Didn't receive the OTP? <RouterLink to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>Resend OTP</RouterLink>
              </Typography>
            </>
          )}
        </FormSection>
      </AuthCard>
    </PageContainer>
  );
};

export default ForgotPassword;
