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

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (userData: { fullName: string; email: string; role: string }) => void;
  user: { fullName: string; email: string; role: string } | null;
  loading: boolean;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  user,
  loading,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const filterOptions: Record<"Role", string[]> = {
    Role: ["Admin", "User"],
  };
  const [filters, setFilters] = useState({
    role: "",
  });
console.log("role",role)
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleFilterChange =
    (field: keyof typeof filters) => (event: SelectChangeEvent<string>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
 

  return (
    <Dialog open={open} onClose={onClose}>
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
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
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
          //   onClick={handleCreateUser}
          color={"white"}
          background={"var(--theme-color)"}
        >
          Save
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
