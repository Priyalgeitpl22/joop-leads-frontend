import { useState } from "react";
import {
  Switch,
  TextField,
  Slider,
  Checkbox,
} from "@mui/material";
import {
  WarmUpBlock,
  WarmupLabel,
  WarmUpHeading,
  WarmupBox,
} from "./EditEmailAccount.styled";

const EditWarmupEmailAccount = () => {
  const [warmupEnabled, setWarmupEnabled] = useState(true);
  const [dailyRampup, setDailyRampup] = useState(true);
  const [warmupEmails, setWarmupEmails] = useState(20);
  const [randomEmails, setRandomEmails] = useState(2);
  const [randomRamup, setRandomRamup] = useState(2);

  return (
    <WarmupBox>
      <div>
        Warming up an IP address involves sending low volumes of email on your
        dedicated IP and then systematically increasing your email volume over a
        period of time.
      </div>
      <WarmUpBlock>
        <WarmUpHeading>
          <Switch
            checked={warmupEnabled}
            onChange={() => setWarmupEnabled(!warmupEnabled)}
            color="primary"
          />
          <label style={{ fontWeight: "bold", color: "#1d1e22" }}>
            Email Warmup Enabled
          </label>
        </WarmUpHeading>
      </WarmUpBlock>
      <div
        style={{
          display: "flex",
          gap: "10%",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div>
          <b>
            <div>Total number of warm-up emails per day</div>
          </b>
          Maximum number of warm-up emails that could be sent via this email
          account per day
        </div>
        <TextField
          type="number"
          value={warmupEmails}
          onChange={(e) => setWarmupEmails(Number(e.target.value))}
          sx={{ width: "8%", marginBottom: "3%" }}
        />
      </div>
      <WarmUpBlock>
        <WarmUpHeading>
          <Switch
            checked={dailyRampup}
            onChange={() => setDailyRampup(!dailyRampup)}
            color="secondary"
          />
          <label style={{ fontWeight: "bold", color: "#1d1e22" }}>
            Daily Rampup
          </label>
        </WarmUpHeading>
      </WarmUpBlock>
      <WarmUpBlock>
        <b>
          <div>Randomise number of warm-up emails per day</div>
        </b>
        <div>
          Maximum number of emails that could be sent via this email account per
          day
        </div>
        <Slider
          value={randomEmails}
          min={1}
          max={50}
          onChange={(_e, newValue) => setRandomEmails(newValue as number)}
          sx={{ width: "80%", marginBottom: "3%" }}
        />
      </WarmUpBlock>
      <WarmUpBlock>
        <b>
          <div>Reply Rate (%)</div>
        </b>
        <div>Suggested - 20, Maximum - 100</div>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          sx={{ width: "30%", marginBottom: "3%" }}
        />
      </WarmUpBlock>
      <WarmUpBlock>
        <b>
          <div>Daily Target for Replies to Inbound Warmup Emails </div>
        </b>
        <div>
          Set how many replies this mailbox will send to inbound warmup emails
          each day.
        </div>
        <Slider
          value={randomRamup}
          min={1}
          max={50}
          onChange={(_e, newValue) => setRandomRamup(newValue as number)}
          sx={{ width: "80%", marginBottom: "3%" }}
        />
      </WarmUpBlock>
      <WarmUpBlock>
        <WarmupLabel>
          <Checkbox name="checkWarmupSending" />
          <b>Enable Auto-adjust warmup/sending ratio</b>
        </WarmupLabel>
        <div style={{ marginBottom: "3%" }}>
          Would you like us to adjust the warmups to optimize for email
          deliverability.
        </div>
      </WarmUpBlock>
      <WarmUpBlock>
        <WarmupLabel>
          <Checkbox name="checkWarmUp" />
          <b>Warmup the Custom Domain Tracking Link</b>
        </WarmupLabel>
        <div style={{ marginBottom: "3%" }}>
          We will warmup your custom domain tracking link for better
          deliverability.
        </div>
      </WarmUpBlock>
      <WarmUpBlock>
        <WarmupLabel>
          <Checkbox name="checkWarmupSending" />
          <b>Send warmup emails only on weekdays</b>
        </WarmupLabel>
        <div style={{ marginBottom: "3%" }}>
          To emulate human sending patterns, Smartlead AI will automatically
          pause sending warmup emails on weekends.
        </div>
      </WarmUpBlock>
    </WarmupBox>
  );
};

export default EditWarmupEmailAccount;
