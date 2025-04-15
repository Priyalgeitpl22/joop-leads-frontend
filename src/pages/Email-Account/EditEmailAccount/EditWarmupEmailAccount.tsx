import { useState } from "react";
import {
  Switch,
  TextField,
  Slider,
} from "@mui/material";
import {
  WarmUpBlock,
  WarmUpHeading,
  WarmupBox,
} from "./EditEmailAccount.styled";

const EditWarmupEmailAccount = () => {
  const [warmupEnabled, setWarmupEnabled] = useState(false);
  const [dailyRampup, setDailyRampup] = useState(false);
  const [warmupEmails, setWarmupEmails] = useState(20);
  const [randomEmails, setRandomEmails] = useState(2);

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
      {warmupEnabled && (
        <>
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
          {dailyRampup && (
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
                sx={{ width: "80%" }}
              />
            </WarmUpBlock>
          )}
        </>
      )}
    </WarmupBox>
  );
};

export default EditWarmupEmailAccount;
