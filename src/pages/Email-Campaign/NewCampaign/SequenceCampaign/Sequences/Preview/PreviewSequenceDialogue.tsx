import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import {
  CloseIconButton,
  StyledDialogTitle,
} from "./PreviewSequenceDialogue.styled";
import { Button2 } from "../../../../../../styles/layout.styled";

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

const PreviewSequenceDialogue: React.FC<EditUserDialogProps> = ({
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const filterOptions: Record<"Lead", string[]> = {
    Lead: ["Admin", "User"],
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
      setFilters({ role: user.role });
    }
  }, [user]);

  // const handleFilterChange =
  //   (field: keyof typeof filters) => (event: SelectChangeEvent<string>) => {
  //     setFilters((prev) => ({
  //       ...prev,
  //       [field]: event.target.value,
  //     }));
  //   };

  const handleSaveClick = () => {
    onSave?.({
      id: user?.id || "",
      fullName,
      email,
      role: filters.role || role,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <CloseIconButton onClick={onClose}>
        <GridCloseIcon />
      </CloseIconButton>
      <StyledDialogTitle>Sequence Preview</StyledDialogTitle>
      <DialogContent>
        <>
          <Typography sx={{ marginBottom: "-13px", marginTop: "16px" }}>
            Select a Lead
          </Typography>

          {Object.keys(filterOptions).map((label) => (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Select
                labelId={`select-label-${label.toLowerCase()}`}
                sx={{
                  background: "white!important",
                  width: "100%",
                  maxWidth: "800px",
                }}
                fullWidth
               
                variant="outlined"
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
        <Typography sx={{ marginTop: "17px" }}>
          <HelpOutlineSharpIcon sx={{margin:"-2px",marginInline:"2px",fontSize:"18px"}}/>Select a lead or add an email address to check the email preview with
          actual variables.
        </Typography>
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
          Save Changes
          {loading && <CircularProgress size={20} color="inherit" />}
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewSequenceDialogue;
