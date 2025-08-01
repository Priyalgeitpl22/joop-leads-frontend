import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import {
  PageContainer,
  VerifyCard,
  OtpFieldsContainer,
  OtpField,
  StyledButton,
  TimerText,
  IllustrationSection,
  FormSection,
} from "./VerifyOtp.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOtp, verifyOtp } from "../../redux/slice/authSlice";
import { AppDispatch } from "../../redux/store/store";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const VerifyOtp = () => {
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const handleResendOtp = () => {
    if (!email) return;
    setIsLoading(true);
    dispatch(resendOtp(email!))
      .unwrap()
      .then(() => {
        toast.success("New OTP sent successfully!");
        setTimer(60);
        setIsTimerRunning(true);
      })
      .catch(() => {
        toast.error("Failed to resend OTP. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveButton = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setIsLoading(true);
      dispatch(verifyOtp({ email, otp: otpString }))
        .unwrap()
        .then(() => {
          toast.success("OTP Verified Successfully!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Invalid OTP. Please try again.");
          setIsLoading(false);
        });
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  }

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
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
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });
      e.preventDefault();
    }
  }

  return (
    <PageContainer>
      <Toaster position="top-right" />
      <VerifyCard>
        {/* <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Auth illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection> */}
        <IllustrationSection>
          <img
            src="/great-learning.gif"
            alt="Email illustration"
            style={{ width: "75%", height: "auto"}}
          />
        </IllustrationSection>
        <FormSection>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            color="var(--text-black)"
          >
            Verify OTP
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Enter the OTP sent to <b>{email}</b>
          </Typography>

          <OtpFieldsContainer>
            {otp.map((digit, index) => (
              <OtpField
                key={index}
                value={digit}
                onChange={(e) => handleKeyChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  ref: (el: HTMLInputElement | null) =>
                    (otpRefs.current[index] = el),
                }}
              />
            ))}
          </OtpFieldsContainer>

          <StyledButton
            variant="contained"
            onClick={handleSaveButton}
            disabled={isLoading || !isTimerRunning}
          >
            {!isLoading &&
              "VERIFY OTP"
            }
          </StyledButton>

          <Box sx={{ marginTop: 2 }}>
            {isTimerRunning ? (
              <TimerText>Time remaining: {timer}s</TimerText>
            ) : (
              <StyledButton
                variant="outlined"
                onClick={handleResendOtp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "RESEND OTP"
                )}
              </StyledButton>
            )}
          </Box>
        </FormSection>
      </VerifyCard>
      {isLoading && <Loader />}
    </PageContainer>
  );
};

export default VerifyOtp;
