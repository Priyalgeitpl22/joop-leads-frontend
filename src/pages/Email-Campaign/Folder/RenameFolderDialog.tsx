import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Button2 } from "../../../styles/layout.styled";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { showFolders, updateFolder } from "../../../redux/slice/emailCampaignFolderSlice";
import { AppDispatch } from "../../../redux/store/store";
import toast from 'react-hot-toast';

interface RenameFolderDialogProps {
  open: boolean;
  onClose: () => void;
  folderId: string | null;
  folderName: string;
}

const RenameFolderDialog: React.FC<RenameFolderDialogProps> = ({
  open,
  onClose,
  folderId,
  folderName,
}) => {
  const [newName, setNewName] = useState(folderName);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSave = () => {
    if (folderId) {
      dispatch(updateFolder({ id: folderId, data: { name: newName } }))
        .unwrap()
        .then((response) => {
          if (response?.message) {
            toast.success(response.message);
          }
          dispatch(showFolders());
          onClose();
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to update folder");
        });
    }
  };

  useEffect(() => {
    setNewName(folderName);
  }, [folderName]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 10, top: 2 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 18,
          background: "#f1f2fb",
          padding: "12px 24px",
        }}
      >
        Edit Folder Name
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          value={newName}
          onChange={handleChange}
          variant="outlined"
          placeholder="Type here..."
          sx={{
            background: "white",
            borderRadius: "6px",
            marginTop: "10px",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px", gap: "8px" }}>
        <Button2
          color="white"
          background="var(--theme-color)"
          onClick={handleSave}
        >
          Save
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default RenameFolderDialog;
