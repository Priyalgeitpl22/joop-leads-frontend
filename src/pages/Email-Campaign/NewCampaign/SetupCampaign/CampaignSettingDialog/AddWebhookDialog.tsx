import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


interface AddWebhookDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddWebhookDialog: React.FC<AddWebhookDialogProps> = ({
  open,
  onClose,
}) => {
  const [webhookName, setWebhookName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [eventType, setEventType] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{ "& .MuiDialog-paper": { width: "450px", height: "530px" } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Webhook</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Typography sx={{ mb: 1, cursor: "pointer" }}>
          <a href="#" style={{ textDecoration: "none", color: "#6e58f1" }}>
            Click here
          </a>{" "}
          to view the easy step by step guide
        </Typography>

        <InputLabel>Webhook Name *</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          sx={{ mb: 1 }}
          value={webhookName}
          onChange={(e) => setWebhookName(e.target.value)}
        />

        <InputLabel>Webhook URL *</InputLabel>
        <TextField
          fullWidth
          variant="outlined"
          sx={{ mb: 1 }}
          placeholder="https://"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
        />

        <InputLabel>Event Type *</InputLabel>
        <FormControl fullWidth sx={{ mb: 1 }}>
          <Select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select an event type
            </MenuItem>
            <MenuItem value="event1">Event 1</MenuItem>
          </Select>
        </FormControl>

        <Typography sx={{ mb: 1, cursor: "pointer" }}>
          <a href="#" style={{ textDecoration: "none", color: "#6e58f1" }}>
            Click here
          </a>{" "}
          to view the JSON body sent
        </Typography>

        <TextField
          fullWidth
          disabled
          placeholder="Select 1 Event For Testing"
          sx={{ mb: 2, backgroundColor: "#F1F2F6" }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6e58f1",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              ":hover": { backgroundColor: "#5a4ed1" },
            }}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddWebhookDialog;
