import {
  Box,
  Dialog,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  FieldWrapper,
  StyledTitle,
} from "../../../components/User-Profile/Profile-Details/profileDetail.styled";
import {  TextField } from "../../../styles/layout.styled";
import { toast } from "react-hot-toast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { createUser, getAllUsers } from "../../../redux/slice/userSlice";
import { validateEmail, validateFullName, validatePhoneNumber } from "../../../utils/Validation";
import { ButtonDisabled, DialogBox, DialogBoxHead } from "./AddUserDialog.styled";
import { Button } from "../../../styles/global.styled";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });
  const [addAccountInProgress, setAddAccountInProgress] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);

  const isFormValid =
    fullName.trim() &&
    !error.fullName &&
    email.trim() &&
    !error.email &&
    phone.trim() &&
    !error.phone &&
    role.trim() &&
    !error.role;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateFullNameField = (value: string) => {
    if (!value.trim()) return "Full Name is required";
    if (!validateFullName(value)) return "Enter a valid name";
    return "";
  };

  const validateEmailField = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (!validateEmail(value)) return "Enter a valid email address";
    return "";
  };

  const validatePhoneField = (value: string) => {
    if (!value.trim()) return "Phone number is required";

    const result = validatePhoneNumber(value, "IN");
    if (!result.isValid) return result.error;

    return "";
  };

  const validateRoleField = (value: string) => {
    if (!value.trim()) return "Role is required";
    return "";
  };

  const handleCreateUser = async () => {
    setAddAccountInProgress(true);

    try {
      const userPayload = new FormData();
      userPayload.append("fullName", fullName);
      userPayload.append("email", email);
      const phoneInfo = validatePhoneNumber(phone, "IN");
      const formattedPhone = phoneInfo.formatted || phone;
      userPayload.append("phone", formattedPhone);
      userPayload.append("role", role);
      if (profilePicture) {
        userPayload.append("profilePicture", profilePicture);
      }
      setAddAccountInProgress(true);
      const response = await dispatch(createUser(userPayload)).unwrap();
      toast.success(response.message || "User created successfully!");

      dispatch(getAllUsers());
      setAddAccountInProgress(false);
      onClose();
      setFullName("");
      setEmail("");
      setPhone("");
      setRole("");
      setProfilePicture(null);
      setPreview(null);
      setAddAccountInProgress(false);
    } catch (error) {
      toast.error("Failed to create user.");
    }
  };

  useEffect(() => {
    if (open) {
      setFullName("");
      setEmail("");
      setPhone("");
      setRole("");
      setProfilePicture(null);
      setPreview(null);
      setError({
        fullName: "",
        email: "",
        phone: "",
        role: "",
      });
      setAddAccountInProgress(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 10, top: 5 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogBox />

      <DialogHeader>
        <DialogBoxHead>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ fontSize: 80, color: "var(--primary-dark)" }}
                />
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              hidden
              onChange={handleFileChange}
            />
          </Box>

          <StyledTitle
            variant="h6"
            sx={{ color: "var(--text-secondary)", mt: 1 }}
          >
            Add New User
          </StyledTitle>
        </DialogBoxHead>
      </DialogHeader>

      <DialogBody dividers>
        <FieldWrapper>
          <TextField
            label="Full Name *"
            variant="outlined"
            fullWidth
            name="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setError((prev) => ({
                ...prev,
                fullName: validateFullNameField(e.target.value),
              }));
            }}
            error={!!error.fullName}
            autoComplete="off"
          />
          {error.fullName && (
            <Typography color="red" variant="caption">
              {error.fullName}
            </Typography>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Email *"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((prev) => ({
                ...prev,
                email: validateEmailField(e.target.value),
              }));
            }}
            error={!!error.email}
            autoComplete="off"
          />
          {error.email && (
            <Typography color="red" variant="caption">
              {error.email}
            </Typography>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <TextField
            label="Phone Number *"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              setPhone(value);

              setError((prev) => ({
                ...prev,
                phone: validatePhoneField(value) || "",
              }));
            }}
            autoComplete="off"
          />
          {error.phone && (
            <Typography color="red" variant="caption">
              {error.phone}
            </Typography>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError((prev) => ({
                  ...prev,
                  role: validateRoleField(e.target.value),
                }));
              }}
              label="Role *"
              name="role"
              sx={{
                background: "white!important",
                borderRadius: "4px",
                // boxShadow: "1px 1px 1px 1px #bebebe",
                height: "3rem",
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
            {error.role && (
              <Typography color="red" variant="caption">
                {error.role}
              </Typography>
            )}
          </FormControl>
        </FieldWrapper>
      </DialogBody>

      <DialogFooter>
        {!isFormValid ? (
          <ButtonDisabled disabled>
            {addAccountInProgress ? (
              <CircularProgress size={24} />
            ) : (
              "Create User"
            )}
          </ButtonDisabled>
        ) : (
          <Button onClick={handleCreateUser} color="white">
            {addAccountInProgress ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Create User"
            )}
          </Button>
        )}
      </DialogFooter>
      {loading || addAccountInProgress}
    </Dialog>
  );
};

export default AddUserDialog;
