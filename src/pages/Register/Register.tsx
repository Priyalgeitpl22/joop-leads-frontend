import { useRef, useState } from "react";
import { Typography } from "@mui/material";
import { Facebook, Linkedin } from "lucide-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  PageContainer,
  RegisterCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  SocialButtonsContainer,
  SocialButton,
  PreviewContainer,
  PreviewImage,
} from "./register.styled";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../../components/Loader"; 
import toast, { Toaster } from "react-hot-toast";

interface RegisterFormData {
  profilePicture: File | null;
  fullName: string;
  email: string;
  orgName: string;
  domain: string;
  country: string;
  phone: string;
  password: string;
}

const formFields: { name: keyof Omit<RegisterFormData, "profilePicture">; label: string; type: string }[] = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "password", label: "Password", type: "text" },
  { name: "orgName", label: "Company Name", type: "text" },
  { name: "domain", label: "Company Domain", type: "text" },
  // { name: "country", label: "Country", type: "text" },
  // { name: "phone", label: "Phone Number", type: "tel" },
];

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    profilePicture: null,
    fullName: "",
    email: "",
    orgName: "",
    domain: "",
    country: "",
    phone: "",
    password: "",
  });

  // State to store the preview image URL
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // State to control the full screen loader
  const [isLoading, setIsLoading] = useState(false);

  // Handler for text input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for file input (profile picture)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      // Create and set the preview URL for the selected file
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle submit by converting our state into FormData
  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("orgName", formData.orgName);
    payload.append("domain", formData.domain);
    payload.append("country", formData.country);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);
    if (formData.profilePicture) {
      payload.append("profilePicture", formData.profilePicture);
    }
    try {
      const result = await dispatch(registerUser(payload)).unwrap();
      console.log("Registration successful:", result);
      toast.success("Registration successful!");
      window.location.assign("/verify-otp");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

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

          {/* Profile picture upload input */}
          <PreviewContainer>
            {previewImage ? (
              <PreviewImage src={previewImage} alt="Profile preview" onClick={handleIconClick} style={{ cursor: 'pointer' }} />
            ) : (
              <AccountCircleIcon
                style={{ fontSize: "50px", color: "var(--theme-color-dark)", marginBottom: "8px", cursor: 'pointer' }}
                onClick={handleIconClick}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </PreviewContainer>

          {/* Render other text fields */}
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
            <RouterLink to="/login" style={{ textDecoration: "none", color: "var(--theme-color-dark)" }}>
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

      {isLoading && <Loader />}
      <Toaster />
    </PageContainer>
  );
};

export default Register;
