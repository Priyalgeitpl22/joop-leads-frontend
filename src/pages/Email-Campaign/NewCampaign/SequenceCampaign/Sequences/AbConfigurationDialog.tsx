import React from "react";
import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Content,
  DialogBox,
  DialogFooter,
  DialogHeader,
} from "../sequenceCampaign.styled";

interface AbConfigurationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AbConfigurationDialog: React.FC<AbConfigurationDialogProps> = ({
  open,
  onClose,
}) => {

  return (
    <DialogBox open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogHeader>
        <Typography fontWeight="600">A/B Testing Setting</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <DialogContent>
        <Content>
          <Typography fontWeight={600} fontSize={16}>
            Variant Percentage Distribution
          </Typography>
          <Typography fontWeight={500} fontSize={14} mt={1}>
            Select a different distribution % for each variant
          </Typography>
          <RadioGroup row sx={{mt: "10px"}}>
            <FormControlLabel
              value="replies"
              control={<Radio />}
              label="Manual Distribution"
            />
            <FormControlLabel
              value="clicks"
              control={<Radio />}
              label="AI Percentage Distribution"
            />
          </RadioGroup>
        </Content>

        <Content>
          <Typography variant="h6" fontWeight={600} fontSize={16} mt={2}>
            Allocate the Variant Percentage
          </Typography>
          <Box display="flex" alignItems="center">
            <Checkbox size="small" />
            <Typography variant="body2">
              Filter disconnected accounts
            </Typography>
          </Box>
        </Content>
      </DialogContent>

      <DialogFooter>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--theme-color)",
            color: "white",
            textTransform: "none",
            padding: "8px 24px",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#5a46d1" },
          }}
          onClick={onClose}
        >
          Save Manul Distribution
        </Button>
      </DialogFooter>
    </DialogBox>
  );
};

export default AbConfigurationDialog;
