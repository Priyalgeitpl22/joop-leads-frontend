import { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
} from "@mui/material";
import { TextField } from "../../../../../styles/layout.styled";

const GeneralCampaignSetting = () => {
  const [stopSending, setStopSending] = useState("replies");
  const [trackEmailOpens, setTrackEmailOpens] = useState(false);
  const [trackLinkClicks, setTrackLinkClicks] = useState(false);
  const [priority, setPriority] = useState(50);

  return (
    <Box sx={{ padding: 3,  margin: "auto" }}>
      <Box>
        <Typography fontWeight="600">Campaign Name</Typography>
        <TextField fullWidth />
      </Box>
      <Typography fontWeight="600" mt={2}>
        Stop sending messages when your lead
      </Typography>
      <RadioGroup
        value={stopSending}
        onChange={(e) => setStopSending(e.target.value)}
      >
        <FormControlLabel
          value="replies"
          control={<Radio />}
          label="Replies to a message"
        />
        <FormControlLabel
          value="clicks"
          control={<Radio />}
          label="Clicks on a link"
        />
        <FormControlLabel
          value="opens"
          control={<Radio />}
          label="Opens an email"
        />
      </RadioGroup>

      <Typography fontWeight="600" mt={2}>
        Optimise Email Delivery
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Boost your deliverability by sending emails in plain text, without HTML"
      />

      <Typography fontWeight="600" mt={2}>
        What shouldn't we track
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={trackEmailOpens}
            onChange={(e) => setTrackEmailOpens(e.target.checked)}
          />
        }
        label="DON'T track email opens"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={trackLinkClicks}
            onChange={(e) => setTrackLinkClicks(e.target.checked)}
          />
        }
        label="DON'T track link clicks"
      />

      {/* <Typography fontWeight="600" mt={2}>
        Assign a SmartServer
      </Typography>
      <Typography>
        Assigning a SmartServer to a campaign provides a higher level of control
        over your infrastructure, improves email deliverability and reduces
        management overhead.
      </Typography>
      <Select
        value={smartServer}
        onChange={(e) => setSmartServer(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Select Smart Server</MenuItem>
        <MenuItem value="1">
          No IP Address added yet. Please add IP Address.
        </MenuItem>
      </Select> */}

      <Typography fontWeight="600" mt={2}>
        Prioritise sending pattern
      </Typography>
      <Slider
        value={priority}
        onChange={(e, newValue) => setPriority(newValue as number)}
        step={10}
        marks
        min={0}
        max={100}
        valueLabelDisplay="auto"
      />

      <Typography fontWeight="600" mt={2}>
        Company Level Auto-Pause
      </Typography>
      <Typography>
        Stops messaging other people within a company once a person replies from
        that company.
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Auto-pause if one of the leads from the same domain replies."
      />

      <Typography fontWeight="600" mt={2}>
        Enhanced Email Sending & Delivery
      </Typography>
      <Typography>
        AI Auto-matches your leads email providers + Your mailbox providers for
        boosted deliver (e.g Gmail to Gmail, Outlook to Outlook)
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Auto-analyse leads mailbox email service providers."
      />

      {/* <Typography fontWeight="600" mt={2}>
        Isolated Lead Email Provider Sending
      </Typography>
      <Typography>
        This campaign will auto-analyse your lead's MX records and only send to
        the ESP you select
      </Typography>
      <RadioGroup>
        <FormControlLabel
          value="send_all"
          control={<Radio />}
          label="Send To All"
        />
        <FormControlLabel value="gmail" control={<Radio />} label="Gmail" />
        <FormControlLabel
          value="outlooks"
          control={<Radio />}
          label="Outlooks"
        />
        <FormControlLabel value="others" control={<Radio />} label="Others" />
      </RadioGroup> */}

      {/* <Typography fontWeight="600" mt={2}>
        Intelligent AI Lead Categorisation (Max: 5)
      </Typography>
      <Typography>
        Our Machine Learning Engine will auto-categorise replies.
      </Typography>
      <RadioGroup>
        <FormControlLabel
          value="no_category"
          control={<Radio />}
          label="Don’t categorise lead with AI"
        />
        <FormControlLabel
          value="intelli_category"
          control={<Radio />}
          label="Intelli-categorise replies using Smartlead's AI"
        />
        <FormControlLabel
          value="prompt_category"
          control={<Radio />}
          label="Write your own prompt to categories lead through AI"
        />
      </RadioGroup> */}

      <Typography fontWeight="600" mt={2}>
        High Bounce Rate Auto-Protection
      </Typography>
      <Typography>
        Protect your mailbox reputation with auto-pause on high bounce rates
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Activate auto-pause protection from bounces"
      />

      <Typography fontWeight="600" mt={2}>
        Unsubscribe
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Add unsubscribe message in all emails"
      />

      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#E4D9FF",
          color: "white",
          background: "#6e58f1",
          marginTop: "40px",
          marginBottom: "20px",
          float: "right",
        }}
      >
        Save General Settings
      </Button>
    </Box>
  );
};

export default GeneralCampaignSetting;
