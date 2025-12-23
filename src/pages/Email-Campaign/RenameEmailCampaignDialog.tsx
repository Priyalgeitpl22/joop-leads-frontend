import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button2 } from "../../styles/layout.styled";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { updateCampaignName } from "../../redux/slice/emailCampaignSlice";
import toast from 'react-hot-toast';
import { showFolderDetail } from "../../redux/slice/emailCampaignFolderSlice";


interface RenameEmailCampaignDialogProps {
  open: boolean;
  onClose: () => void;
  campaignId: string | null;
  campaign_name: string;
  fetchEmailCampaign: ()=> void;
  folderId: string | null;
}

const RenameEmailCampaignDialog: React.FC<RenameEmailCampaignDialogProps> = ({
  open,
  onClose,
  campaignId,
  campaign_name,
  fetchEmailCampaign,
  folderId,
}) => {
  const [newName, setNewName] = useState(campaign_name);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    setNewName(campaign_name);
  }, [campaign_name]);


  const handleSaveName = () => {
    if (campaignId) {
      dispatch(updateCampaignName({ campaignId, newName }))
        .unwrap()
        .then((response) => {
          if (response?.message) {
            fetchEmailCampaign()
            if(folderId){
              dispatch(showFolderDetail(folderId))
            }
            toast.success(response.message);
          }
          onClose();
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to update campaign name");
        });
    }
  };

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
        Edit Campaign Name
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
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
          onClick={handleSaveName}
        >
          Save
        </Button2>
      </DialogActions>
    </Dialog>
  );
};

export default RenameEmailCampaignDialog;