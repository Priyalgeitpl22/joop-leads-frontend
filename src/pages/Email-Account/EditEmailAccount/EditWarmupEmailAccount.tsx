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
import { Button2 } from "../../../styles/layout.styled";
import { Button } from "../../../styles/global.styled";

const EditWarmupEmailAccount = () => {
  const [warmupEnabled, setWarmupEnabled] = useState(false);
  const [dailyRampup, setDailyRampup] = useState(false);
  const [warmupEmails, setWarmupEmails] = useState(20);
  const [replyRate, setReplyRate] = useState(20);
  const [rampupday, setRampupday] = useState(5);
  const [randomEmails, setRandomEmails] = useState<number[]>([3, 40]);
  const [dailyTargetEmails, setDailyTargetEmails] = useState(2);
  const [firstText, setFirstText] = useState("brain");
  const [secondText, setSecondText] = useState("stone");

  return (
    <WarmupBox>
      <div>
        Warming up an IP address involves sending low volumes of email on your
        dedicated IP and then systematically increasing your email volume over a
        period of time.
      </div>
      <WarmUpBlock>
        <WarmUpHeading style={{ marginBottom: "2%" }}>
          <Switch
            checked={warmupEnabled}
            onChange={() => setWarmupEnabled(!warmupEnabled)}
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "var(--primary-light)",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "var(--primary) !important",
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: "var(--primary-dark)",
              },
            }}
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
            <WarmUpHeading style={{ marginTop: "-5px", marginBottom: "2%" }}>
              <div>
                <Switch
                  checked={dailyRampup}
                  onChange={() => setDailyRampup(!dailyRampup)}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "var(--secondary-light)",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--secondary) !important",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "var(--secondary-dark)",
                    },
                  }}
                />
                <label style={{ fontWeight: "bold", color: "#1d1e22" }}>
                  Daily Rampup
                </label>
                <br />
                Rampup increment value per day (suggested 5 per day)
              </div>
              <TextField
                type="number"
                value={rampupday}
                onChange={(e) => setRampupday(Number(e.target.value))}
                inputProps={{
                  min: 5,
                  max: 100,
                }}
                sx={{ width: "20%", marginBottom: "1%", marginTop: "1%" }}
              />
            </WarmUpHeading>
          </WarmUpBlock>
          {dailyRampup && (
            <>
              <WarmUpBlock>
                <b>
                  <div>Randomise number of warm-up emails per day</div>
                </b>
                <div>
                  Maximum number of emails that could be sent via this email
                  account per day
                </div>
                <Slider
                  value={randomEmails}
                  min={1}
                  max={100}
                  onChange={(_e, newValue) =>
                    setRandomEmails(newValue as number[])
                  }
                  valueLabelDisplay="auto"
                  sx={{
                    width: "80%",
                    marginBottom: "2%",
                    color: "var(--primary)",
                  }}
                />
              </WarmUpBlock>

              <div
                style={{
                  gap: "10%",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <div>
                  <b>
                    <div>Reply Rate (%)</div>
                  </b>
                  Suggested - 20, Maximum - 100
                </div>
                <TextField
                  type="number"
                  value={replyRate}
                  onChange={(e) => setReplyRate(Number(e.target.value))}
                  inputProps={{
                    min: 20,
                    max: 100,
                  }}
                  sx={{ width: "20%", marginBottom: "2%", marginTop: "1%" }}
                />
              </div>

              <WarmUpBlock>
                <b style={{ marginTop: "2%" }}>
                  <div>Daily Target for Replies to Inbound Warmup Emails</div>
                </b>
                <div>
                  Set how many replies this mailbox will send to inbound warmup
                  emails each day.
                </div>
                <Slider
                  value={dailyTargetEmails}
                  min={1}
                  max={50}
                  onChange={(_e, newValue) =>
                    setDailyTargetEmails(newValue as number)
                  }
                  valueLabelDisplay="auto"
                  sx={{ width: "80%", marginBottom: "2%", color: "var(--secondary)" }}
                />
              </WarmUpBlock>

              <div
                style={{
                  gap: "10%",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <div>
                  <b>
                    <div>Custom Warmup Identifier Tag</div>
                  </b>
                  Use this two-worded tag to filter out any warmup emails from
                  your inbox.
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                  }}
                >
                  <TextField
                    type="text"
                    value={firstText}
                    onChange={(e) => setFirstText(e.target.value)}
                    sx={{ width: "20%", marginBottom: "2%", marginTop: "1%" }}
                  />
                  -
                  <TextField
                    type="text"
                    value={secondText}
                    onChange={(e) => setSecondText(e.target.value)}
                    sx={{ width: "20%", marginBottom: "2%", marginTop: "1%" }}
                  />
                  = {firstText} - {secondText}{" "}
                </div>
              </div>

              <WarmUpBlock>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: "10px",
                      width: "25px",
                      height: "20px",
                    }}
                  />{" "}
                  <b>Enable Auto-adjust warmup/sending ratio</b>{" "}
                </label>
                <div style={{ marginLeft: "34px", marginBottom: "2%" }}>
                  Would you like us to adjust the warmups to optimize for email
                  deliverability.
                </div>
              </WarmUpBlock>

              <WarmUpBlock>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: "10px",
                      width: "25px",
                      height: "20px",
                    }}
                  />{" "}
                  <b>
                    <div>Warmup the Custom Domain tracking Link</div>
                  </b>{" "}
                </label>
                <div style={{ marginLeft: "34px", marginBottom: "2%" }}>
                  We will warmup your custom domain tracking link for better
                  deliverability.
                </div>
              </WarmUpBlock>

              <WarmUpBlock>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{
                      marginRight: "10px",
                      width: "25px",
                      height: "20px",
                    }}
                  />{" "}
                  <b>
                    <div>Send warmup emails only on weekdays</div>
                  </b>{" "}
                </label>
                <div style={{ marginLeft: "34px", marginBottom: "2%" }}>
                  To emulate human sending patterns, Jooper AI will
                  automatically pause sending warmup emails on weekends.
                </div>
              </WarmUpBlock>
            </>
          )}
          <Button
            style={{
              width: "10%",
            }}
            color={"white"}
            // background={"var(--theme-color)"}
          >
            Update
          </Button>
        </>
      )}
    </WarmupBox>
  );
};

export default EditWarmupEmailAccount;