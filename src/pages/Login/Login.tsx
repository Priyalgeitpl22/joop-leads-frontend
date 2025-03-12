import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  PageContainer,
  LoginCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  NavigateLink,
} from "./login.styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import Loader from "../../components/Loader";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/slice/userSlice";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../../utils/PasswordInput";

function Login() {
  // Local state for controlled inputs.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // A flag to trigger the login effect.
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve login-related state from Redux.
  const { loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (loginSubmitted) {
      (async () => {
        try {
          const response = await dispatch(
            loginUser({ email, password })
          ).unwrap();
          if (response?.code === 200) {
            toast.success(response?.message);

            const token = Cookies.get("access_token");
            if (token) {
              await dispatch(getUserDetails(token)).unwrap();
            }

            window.location.assign("/dashboard");
          } else {
            toast.error(response?.message);
          }
        } catch (err: any) {
          toast.error(err);
        } finally {
          setLoginSubmitted(false);
        }
      })();
    }
  }, [loginSubmitted, dispatch, navigate]);

  const handleSignIn = () => {
    setLoginSubmitted(true);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <PageContainer>
      <LoginCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Login illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Welcome!
          </Typography>
          <Typography variant="body1" color="black" mb={4}>
            Sign in to your Account
          </Typography>

          <StyledTextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <NavigateLink
            style={{ alignSelf: "flex-end", marginBlock: 2 }}
            onClick={() => window.location.assign("/forgot-password")}
          >
            Forgot Password?
          </NavigateLink>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSignIn}
            disabled={loading}
          >
            SIGN IN
          </StyledButton>
          <Typography
            variant="body2"
            color="black"
            align="center"
            sx={{ my: 2 }}
          >
            Don't have an account?{" "}
            <NavigateLink onClick={() => window.location.assign("/signup")}>
              Register
            </NavigateLink>
          </Typography>
        </FormSection>
      </LoginCard>

      {loading && <Loader />}
      <Toaster />
    </PageContainer>
  );
}

export default Login;
