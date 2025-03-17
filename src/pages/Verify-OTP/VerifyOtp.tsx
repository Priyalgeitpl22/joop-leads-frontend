import { useState, useEffect, useRef } from "react";
import { Typography, Box, Stack,CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "../../redux/slice/authSlice";
import { AppDispatch } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import { CloseButton, OtpField, PageContainer, StyledButton, StyledCard, TimerText } from "./VerifyOtp.styled";
import Loader from "../../components/Loader";

const VerifyOtp = () => {
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otpSubmitted, setOtpSubmitted] = useState<boolean>(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index - 1] = "";
          return newOtp;
        });
        e.preventDefault();
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setIsLoading(true);
      setOtpSubmitted(true);
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  useEffect(() => {
    if (otpSubmitted) {
      const otpString = otp.join("");
      dispatch(verifyOtp({ email: email!, otp: otpString }))
        .unwrap()
        .then(() => {
          toast.success("OTP verified successfully!");
          window.location.assign("/login");
        })
        .catch(() => {
          toast.error("OTP verification failed. Please try again.");
        })
        .finally(() => {
          setOtpSubmitted(false);
          setIsLoading(false);
        });
    }
  }, [otpSubmitted, dispatch, email, otp, navigate]);

  const handleResendOtp = () => {
    if (!email) return;
    setIsLoading(true);
    dispatch(resendOtp(email!)) 
      .unwrap()
      .then(() => {
        toast.success("New OTP sent successfully!");
        setTimer(60);
        setIsTimerRunning(true);
        localStorage.setItem("otpTimer", "60");
      })
      .catch(() => {
        toast.error("Failed to resend OTP. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const storedTime = localStorage.getItem("otpTimer");
    if (storedTime) {
      const timeRemaining = parseInt(storedTime, 10);
      if (timeRemaining > 0) {
        setTimer(timeRemaining);
        setIsTimerRunning(true);
      } else {
        setIsTimerRunning(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      localStorage.setItem("otpTimer", timer.toString());
      const interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("otpTimer", newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setIsTimerRunning(false);
      localStorage.removeItem("otpTimer");
    }
  }, [isTimerRunning, timer]);

  return (
    <PageContainer>
      <Toaster />
      <StyledCard>
        <CloseButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </CloseButton>

        <LockIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
        <Typography variant="h4" fontWeight="bold" mb={1} color="">
        Verify OTP
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: 2, color: "gray" }}>
          Enter the 6-digit OTP sent to <br /><strong>{email}</strong> 
        </Typography>
        <Stack direction="row" justifyContent="center" mb={2} gap={1}>
          {otp.map((digit, index) => (
            <OtpField
            key={index}
            value={digit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOtpChange(e, index)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, index)
            }
            inputProps={{
              maxLength: 1,
              ref: (el: HTMLInputElement | null) => (otpRefs.current[index] = el),
            }}
          />
        ))}
        </Stack>
        <StyledButton variant="contained" onClick={handleVerifyOtp} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "VERIFY OTP"}
        </StyledButton>

            <Box sx={{ marginTop: 2 }}>
          {isTimerRunning ? (
                <TimerText>Time remaining: {timer}s</TimerText>
          ) : (
            <StyledButton variant="outlined" onClick={handleResendOtp} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "RESEND OTP"}
            </StyledButton>
          )}
        </Box>
      </StyledCard>
      {isLoading && <Loader />}
    </PageContainer>
  );
};

export default VerifyOtp;
