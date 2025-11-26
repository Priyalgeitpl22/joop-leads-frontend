import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Switch, Slider } from "@mui/material";
import {
  WarmUpBlock,
  WarmUpHeading,
  WarmupBox,
} from "./EditEmailAccount.styled";
import { SmtpUpdateTextField } from "../../../styles/layout.styled";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { updateEmailAccountSmtpDetail } from "../../../redux/slice/emailAccountSlice";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";

interface EmailAccountData {
  warmupEnabled?: boolean;
  warmupMaxPerDay?: number;
  warmupDailyRampup?: boolean;
  warmupRampupIncrement?: number;
  [key: string]: unknown;
}

interface EditWarmupEmailAccountProps {
  id?: string;
  emailAccount?: EmailAccountData;
}

export interface EditWarmupEmailAccountRef {
  handleUpdate: () => Promise<void>;
  loading: boolean;
}

const EditWarmupEmailAccount = forwardRef<
  EditWarmupEmailAccountRef,
  EditWarmupEmailAccountProps
>(({ id, emailAccount }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [warmupEnabled, setWarmupEnabled] = useState(false);
  const [dailyRampup, setDailyRampup] = useState(false);
  const [warmupEmails, setWarmupEmails] = useState(20);
  const [replyRate, setReplyRate] = useState(20);
  const [rampupday, setRampupday] = useState(5);
  const [randomEmails, setRandomEmails] = useState<number[]>([3, 40]);
  const [dailyTargetEmails, setDailyTargetEmails] = useState(2);
  const [firstText, setFirstText] = useState("brain");
  const [secondText, setSecondText] = useState("stone");

  useEffect(() => {
    if (emailAccount) {
      setWarmupEnabled(emailAccount?.warmupEnabled || false);
      setWarmupEmails(emailAccount?.warmupMaxPerDay || 20);
      setDailyRampup(emailAccount?.warmupDailyRampup || false);
      setRampupday(emailAccount?.warmupRampupIncrement || 5);
    }
  }, [emailAccount]);

  const handleUpdateWarmup = async (): Promise<void> => {
    if (!id) {
      toast.error("Email account ID is missing");
      return;
    }

    setLoading(true);

    const payload = {
      warmupEnabled,
      warmupMaxPerDay: warmupEmails,
      warmupDailyRampup: dailyRampup,
      warmupRampupIncrement: rampupday,
    };

    try {
      const res = await dispatch(
        updateEmailAccountSmtpDetail({ id, data: payload })
      ).unwrap();
      console.log(res);
      toast.success(res?.message || "Warmup settings updated successfully");
    } catch (error) {
      console.log("Failed to update warmup settings: " + error);
      toast.error(
        typeof error === "string" ? error : "Failed to update warmup settings"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpdate: handleUpdateWarmup,
    loading,
  }));

  return !loading ? (
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
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "#BDBDBD",
                opacity: 1,
              },

              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "var(--primary) !important",
                opacity: 1,
              },

              "& .MuiSwitch-thumb": {
                backgroundColor: "#9E9E9E",
              },

              "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
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
              justifyContent: "space-between",
              alignItems: "center",
              // borderBottom: "1px solid #E0E0E0",
            }}
          >
            <div>
              <b>
                <div>Total number of warm-up emails per day</div>
              </b>
              Maximum number of warm-up emails that could be sent via this email
              account per day
            </div>
            <SmtpUpdateTextField
              type="number"
              value={warmupEmails}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWarmupEmails(Number(e.target.value))
              }
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
                    // TRACK (OFF state)
                    "& .MuiSwitch-track": {
                      backgroundColor: "#BDBDBD", // light grey
                      opacity: 1,
                    },

                    // TRACK (ON state)
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--secondary) !important",
                      opacity: 1,
                    },

                    // THUMB (OFF state)
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "#9E9E9E", // darker grey
                    },

                    // THUMB (ON state)
                    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
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
              <SmtpUpdateTextField
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
                <SmtpUpdateTextField
                  type="number"
                  value={replyRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setReplyRate(Number(e.target.value))
                  }
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
                  sx={{
                    width: "80%",
                    marginBottom: "2%",
                    color: "var(--secondary)",
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
                  <SmtpUpdateTextField
                    type="text"
                    value={firstText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFirstText(e.target.value)
                    }
                    sx={{ width: "20%", marginBottom: "2%", marginTop: "1%" }}
                  />
                  -
                  <SmtpUpdateTextField
                    type="text"
                    value={secondText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSecondText(e.target.value)
                    }
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
        </>
      )}
    </WarmupBox>
  ) : (
    <Loader />
  );
});

EditWarmupEmailAccount.displayName = "EditWarmupEmailAccount";

export default EditWarmupEmailAccount;
