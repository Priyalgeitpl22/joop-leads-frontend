import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  Button,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Button2 } from "../../../styles/layout.styled";
import { GridCloseIcon } from "@mui/x-data-grid";
import { CloseIconButton, StyledDialogTitle } from "./EditUser.styled";
import {  ButtonDisabled } from "../../../styles/global.styled";

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (userData: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }) => void;
  user: { id: string; fullName: string; email: string; role: string } | null;
  loading: boolean;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  user,
  loading,
  onSave,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [filters, setFilters] = useState({ role: "" });

  const filterOptions: Record<"Role", string[]> = {
    Role: ["Admin", "User"],
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
      setFilters({ role: user.role });
    }
  }, [user]);

  const handleFilterChange =
    (field: keyof typeof filters) => (event: SelectChangeEvent<string>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSaveClick = () => {
    onSave?.({
      id: user?.id || "",
      fullName,
      email,
      role: filters.role || role,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <CloseIconButton
        onClick={onClose}
      >
        <GridCloseIcon />
      </CloseIconButton>
      <StyledDialogTitle
      >
        Edit User Role
        </StyledDialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              disabled
              margin="normal"
              sx={{
                "& .MuiInputBase-input":{
                  height:"1rem"
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000", // for disabled text
                },
              }}
            />
            <TextField
              label="Email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000", // for disabled text
                },
                "& .MuiInputBase-input":{
                  height:"1rem"
                }
              }}
            />
            {Object.keys(filterOptions).map((label) => (
              <FormControl key={label} fullWidth sx={{ mt: 2 }}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={
                    filters[label.toLowerCase() as keyof typeof filters] || ""
                  }
                  onChange={handleFilterChange(
                    label.toLowerCase() as keyof typeof filters
                  )}
                  sx={{ background: "white!important", borderRadius: "4px" }}
                  label={label}
                >
                  {filterOptions[label as keyof typeof filterOptions]?.map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
       <Button
                  onClick={onClose}
                  style={{
                    marginRight: "10px",
                    color: "red",
                    backgroundColor: "#ffff !important",
                    outline: "1px solid red",
                  }}
                >
                  Cancel
                </Button>
        <ButtonDisabled
          onClick={handleSaveClick}
          color={"white"}
          // background={"var(--secondary-gradient)"}
        >
          Save Changes
          {loading && <CircularProgress size={20} color="inherit" />}
        </ButtonDisabled>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;