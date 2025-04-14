import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Button2 } from "../../../styles/layout.styled";
import toast, { Toaster } from "react-hot-toast";

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
    toast.success("User updated successfully!");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Toaster position="top-right" />
      <DialogTitle>Edit User</DialogTitle>
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
            />
            <TextField
              label="Email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
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
                  sx={{ background: "white!important" }}
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
        <Button2 onClick={onClose} color="secondary" background={""}>
          Cancel
        </Button2>
        <Button2
          onClick={handleSaveClick}
          color={"white"}
          background={"var(--theme-color)"}
        >
          Save
          {loading && <CircularProgress size={20} color="inherit" />}
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
