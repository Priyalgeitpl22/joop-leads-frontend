import React, { useState } from "react";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validatePassword } from "./Validation";

interface PasswordInputProps {
  name?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
}

const StyledTextField = styled(TextField)`
  margin-bottom: 10px;

  .MuiOutlinedInput-root {
    border-radius: 10px;
    transition: 0.3s ease-in-out;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #ddd;
  }

  .MuiOutlinedInput-input {
    padding: 12px 10px !important;
  }
`;

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  value,
  onChange,
  readOnly = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    onChange(e);

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
    } else {
      setPasswordError(null);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <StyledTextField
      name={name}
      label={label}
      variant="outlined"
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={handleChange}
      autoComplete="new-password"
      error={!!passwordError}
      helperText={passwordError}
      required
      fullWidth
      InputProps={{
        readOnly: readOnly,
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
