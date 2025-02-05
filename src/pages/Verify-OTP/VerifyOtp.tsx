import { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import {
  PageContainer,
  VerifyCard,
  OtpFieldsContainer,
  OtpField,
  StyledButton,
  TimerText,
  IllustrationSection,
  FormSection
} from "./VerifyOtp.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/slice/userSlice";
import { AppDispatch } from "../../redux/store/store";

const VerifyOtp = () => {
  const { state } = useLocation();
  const email = state?.email;  

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [otpSubmitted, setOtpSubmitted] = useState<boolean>(false);
  const otpRefs = useRef<(HTMLInputElement|null)[]>([]);
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
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
      setOtpSubmitted(true);
    } else {
      console.log("Please enter a valid OTP");
    }
  };

  // Dispatch verifyOtp when otpSubmitted flag is set.
  useEffect(() => {
    if (otpSubmitted) {
      const otpString = otp.join("");
      dispatch(verifyOtp({ email: email!, otp: otpString }))
        .unwrap()
        .then(result => {
          console.log("OTP verified successfully:", result);
          navigate("/login");
        })
        .catch(err => {
          console.error("OTP verification failed:", err);
        })
        .finally(() => {
          // Reset the submission flag whether the verification succeeded or failed.
          setOtpSubmitted(false);
        });
    }
  }, [otpSubmitted, dispatch, email, otp, navigate]);

  return (
    <PageContainer>
      <VerifyCard>
      <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Auth illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection>
        <FormSection>
        <Typography variant="h4" fontWeight="bold" mb={1}>
            Verify OTP
          </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Enter the OTP sent to your email
        </Typography>

        <OtpFieldsContainer>
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
        </OtpFieldsContainer>

        <StyledButton variant="contained" onClick={handleVerifyOtp}>
          VERIFY OTP
        </StyledButton>

        <Box sx={{ marginTop: 2 }}>
          {isTimerRunning &&(
            <TimerText>Time remaining: {timer}s</TimerText>
          ) }
        </Box>
        </FormSection>
      </VerifyCard>
    </PageContainer>
  );
};

export default VerifyOtp;
