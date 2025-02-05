import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Facebook, Linkedin } from "lucide-react";
import { useDispatch} from "react-redux";
import { registerUser } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store"; 
import {
  PageContainer,
  RegisterCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  SocialButtonsContainer,
  SocialButton,
} from "./register.styled";
import { Link as RouterLink } from "react-router-dom";

// Define TypeScript Interface for form data
interface FormData {
  fullName: string;
  email: string;
  orgName: string;
  domain: string;
  country: string;
  phone: string;
  password:string;
}

const formFields: { name: keyof FormData; label: string; type: string }[] = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "orgName", label: "Organization Name", type: "text" },
  { name: "domain", label: "Domain", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "password", label: "Password", type: "text" },
];

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    orgName: "",
    domain: "",
    country: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = async() => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      dispatch(registerUser(formData))
        .unwrap() 
        .then((result) => {
          console.log("Registration successful:", result);
          navigate("/verify-otp", { state: { email: formData.email } });
        })
        .catch((err) => {
          console.error("Registration failed:", err);
        })
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted, dispatch, formData, navigate]);

  return (
    <PageContainer>
      <RegisterCard>
        <IllustrationSection>
          <img
            src="https://cdn.dribbble.com/users/2058540/screenshots/8225403/media/bc617eec455a72c77feab587e09daa96.gif"
            alt="Auth illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Create an Account
          </Typography>
          <Typography variant="body1" color="black" mb={2}>
            Register with your details
          </Typography>

          {formFields.map(({ name, label, type }) => (
            <StyledTextField
              key={name}
              name={name}
              label={label}
              type={type}
              variant="outlined"
              value={formData[name]}
              onChange={handleChange}
            />
          ))}

          <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
            REGISTER
          </StyledButton>

          <Typography variant="body2" color="black" align="center" sx={{ my: 1 }}>
            Already have an account?{" "}
            <RouterLink to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
              Login
            </RouterLink>
          </Typography>

          <Typography variant="body2" color="black" align="center">
            OR REGISTER WITH
          </Typography>

          <SocialButtonsContainer>
            <SocialButton>
              <Facebook size={20} color="#4267B2" />
            </SocialButton>
            <SocialButton>
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
            </SocialButton>
            <SocialButton>
              <Linkedin size={20} color="#0077B5" />
            </SocialButton>
          </SocialButtonsContainer>
        </FormSection>
      </RegisterCard>
    </PageContainer>
  );
};

export default Register;
