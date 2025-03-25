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
} from "./activateAccount.styled";
import { AppDispatch, RootState } from "../../redux/store/store";
import { activateAccount } from "../../redux/slice/authSlice";
import { validatePassword } from "../../utils/Validation";
import PasswordInput from "../../utils/PasswordInput";
// import { activateAccount } from "../../redux/slice/authSlice";
import { toast } from "react-hot-toast";

const ActivateAccount = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  // const { loading } = useSelector((state: RootState) => state.user);
  const { success } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      setToken(token);
      setEmail(email);
    } else {
      navigate("/login")
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

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
      
    
    const payload = {
      token, 
      password,
      email
    }

    try {
      setLoading(true);
      const response = await dispatch(activateAccount(payload)).unwrap();
      if (response.code === 200) {
        toast.success(
          response.message|| "Account activated successfully. Please login to continue."
        );
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error || "Something went wrong");
      console.error("Error activating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <AuthCard>
        {/* <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Account Activation Illustration"
          />
        </IllustrationSection> */}
        <IllustrationSection>
          <img
            src="/great-learning.gif"
            alt="Email illustration"
            style={{ width: "75%", height: "auto" }}
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Activate Account
          </Typography>
          <Typography variant="body1" color="black" mb={3}>
            Enter your new password to activate your account.
          </Typography>

          <PasswordInput
            label="New Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error || ""}
          />

          <StyledButton
            fullWidth
            onClick={handleSubmitPassword}
            disabled={loading}
          >
            {loading ? "Activating..." : "Activate Account"}
          </StyledButton>
        </FormSection>
      </AuthCard>
    </PageContainer>
  );
};

export default ActivateAccount;
