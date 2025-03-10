import { useRef, useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice";
import { AppDispatch } from "../../redux/store/store"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import industriesData from "../../components/Organization/Industry.json";
import {
  PageContainer,
  RegisterCard,
  IllustrationSection,
  FormSection,
  StyledTextField,
  StyledButton,
  PreviewContainer,
  PreviewImage,
  NavigateLink,
} from "./register.styled";
import Loader from "../../components/Loader"; 
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "../../utils/PasswordInput";
import { useNavigate } from "react-router-dom";

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

const formFields: {
  name: keyof Omit<RegisterFormData, "profilePicture">;
  label: string;
  type: string;
}[] = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "password", label: "Password", type: "text" },
  { name: "orgName", label: "Company Name", type: "text" },
  { name: "domain", label: "Domain", type: "text" },
];

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<{
    [key in keyof RegisterFormData]?: string;
  }>({});

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
  const navigate = useNavigate();
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
      await dispatch(registerUser(payload)).unwrap();
      toast.success("Registration successful!");
      navigate("/verify-otp", { state: { email: formData.email } });
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
          {formFields.map(({ name, label, type }) => {
            if (name === "domain") {
              return (
                <FormControl
                  key={name}
                  variant="outlined"
                  fullWidth
                  error={!!errors[name]}
                  sx={{ mb: 2 }}
                >
                  <InputLabel id="domain-label">{label}</InputLabel>

                  <Select
                    labelId="domain-label"
                    id="domain"
                    name="domain"
                    value={formData.domain}
                    onChange={handleSelectChange}
                    label={label}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "var(--text-white)",

                      "& .MuiOutlinedInput-input": {
                        backgroundColor: "var(--text-white)",
                      },
                    }}
                  >
                    {industriesData.industries.map((industry, index) => (
                      <MenuItem key={index} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>

                  {errors[name] && (
                    <FormHelperText>{errors[name]}</FormHelperText>
                  )}
                </FormControl>
              );
            }
            if (name === "password") {
              return (
                <PasswordInput
                  key={name}
                  name={name}
                  label={label}
                  value={formData[name]}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              );
            }
            return (
              <StyledTextField
                key={name}
                name={name}
                label={label}
                type={type}
                variant="outlined"
                value={formData[name]}
                onChange={handleChange}
                autoComplete="nope"
              />
            );
          })}


          <StyledButton variant="contained" fullWidth onClick={handleSubmit}>
            REGISTER
          </StyledButton>

          <Typography variant="body2" color="black" align="center" sx={{ my: 1 }}>
            Already have an account?{" "}<NavigateLink onClick={() => window.location.assign("/login")}>
              Login
            </NavigateLink>
          </Typography>
        </FormSection>
      </RegisterCard>

      {isLoading && <Loader />}
      <Toaster />
    </PageContainer>
  );
};

export default Register;
