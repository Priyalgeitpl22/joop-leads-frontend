import React, { useState, useEffect } from "react";
import { CheckCircle, Circle, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { campaignService } from "../../../../../services/campaign.service.ts";
import {
  SetupContainer,
  SetupCard,
  SetupRow,
  SetupInfo,
  SetupIcon,
  SetupText,
  SetupButton,
  DialogOverlay,
  DialogContainer,
  DialogHeader,
  CloseButton,
  DialogContent,
  DialogFooter,
  CancelButton,
  SaveButton,
  FormGroup,
  Label,
  Input,
  Select,
  TimeInputRow,
  DaysGrid,
  DayButton,
  SettingsSection,
  SectionHeader,
  RadioGroup,
  RadioOption,
  CheckboxOption,
  SliderContainer,
  SliderInput,
  SliderMarks,
  SettingsDialogContent,
  RequiredLabel,
} from "./SetupStep.styled.ts";
import { DAYS_OF_WEEK, TIMEZONES } from "../../../../../constants/index.ts";
import SenderAccounts from "./SenderAccounts.tsx";
import { StopSending } from "../../../../../types/enums.ts";
import type { Campaign } from "../../../../../interfaces/index.ts";
import { toDatetimeLocal } from "../../../../../utils/index.ts";
import type { Account } from "../../../../../types/index.ts";

interface SetupStepProps {
  campaign: Campaign | null;
  onSettingsUpdate: (data: Record<string, unknown>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const getNowForDatetimeLocal = () => {
  const now = new Date();
  now.setSeconds(0, 0);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const SetupStep: React.FC<SetupStepProps> = ({
  campaign,
  onSettingsUpdate,
  onValidationChange,
}) => {
  const [showSenderDialog, setShowSenderDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    scheduledAt: getNowForDatetimeLocal(),
    timezone: "UTC",
    windowStart: "09:00",
    windowEnd: "18:00",
    sendDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    intervalMinutes: 5,
    maxEmailsPerDay: 100,
  });
  const [selectedSenderAccounts, setSelectedSenderAccounts] = useState<Account[]>([]);
  const [settingsData, setSettingsData] = useState({
    name: "",
    stopSending: StopSending.REPLY,
    sendAsPlainText: false,
    trackOpens: true,
    trackClicks: true,
    sendingPriority: 50,
    autoPauseSameDomain: false,
    autoPauseOnHighBounce: false,
    includeUnsubscribeLink: false,
  });
  const [senderCompleted, setSenderCompleted] = useState(false);
  const [scheduleCompleted, setScheduleCompleted] = useState(false);
  const [settingsCompleted, setSettingsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isValid = senderCompleted && scheduleCompleted && settingsCompleted;
    onValidationChange(isValid);
  }, [
    senderCompleted,
    scheduleCompleted,
    settingsCompleted,
    onValidationChange,
  ]);

  useEffect(() => {
    if (campaign) {
      const campaignSenderAccounts: any = campaign.sender_accounts.map((s)=> {
        return {
          _id: s.accountId,
          name: s.name || "",
          email: s.email,
          minDelaySeconds: s.minDelaySeconds,
          dailyLimit: s.dailyLimit,
          warmupStatus: s.warmupStatus,
          orgId: campaign.orgId || "",
        };
      });
      setSelectedSenderAccounts(campaignSenderAccounts || []);
      setScheduleData({
        scheduledAt: campaign.scheduledAt ? toDatetimeLocal(campaign.scheduledAt) : getNowForDatetimeLocal(),
        timezone: campaign.timezone || "UTC",
        windowStart: campaign.windowStart || "09:00",
        windowEnd: campaign.windowEnd || "18:00",
        sendDays: campaign.sendDays || ["Mon", "Tue", "Wed", "Thu", "Fri"],
        intervalMinutes: campaign.intervalMinutes || 5,
        maxEmailsPerDay: campaign.maxEmailsPerDay || 100,
      });
      setSettingsData({
        name: campaign.name || "",
        stopSending: campaign.stopSending as StopSending || StopSending.REPLY,
        sendAsPlainText: campaign.sendAsPlainText || false,
        trackOpens: campaign.trackOpens || true,
        trackClicks: campaign.trackClicks || true,
        sendingPriority: campaign.sendingPriority || 50,
        autoPauseSameDomain: campaign.autoPauseSameDomain || false,
        autoPauseOnHighBounce: campaign.autoPauseOnHighBounce || false,
        includeUnsubscribeLink: campaign.includeUnsubscribeLink || false,
      });
    }
  }, [campaign]);

  const setSetupData = async () => {
    if (campaign && campaign.sender_accounts && campaign.sender_accounts.length > 0) {
      setSenderCompleted(true);
    }
    if (campaign && campaign.scheduledAt && campaign.timezone && campaign.windowStart && campaign.windowEnd && campaign.sendDays.length > 0) {
      setScheduleCompleted(true);
    }
    if (campaign && campaign.name !== 'Untitled Campaign' && campaign.stopSending && campaign.sendingPriority) {
      setSettingsCompleted(true);
    }
  };

  useEffect(() => {
    setSetupData();
  }, [campaign]);

  const handleSaveSchedule = async () => {
    if (scheduleData.sendDays.length === 0) {
      toast.error("Please select at least one day");
      return;
    }
    if (!scheduleData.scheduledAt) {
      toast.error("Please select a campaign start date");
      return;
    }

    setIsSaving(true);
    try {
      await campaignService.addCampaignSettings({
        campaign_id: campaign?.id || '',
        timezone: scheduleData.timezone,
        windowStart: scheduleData.windowStart,
        windowEnd: scheduleData.windowEnd,
        sendDays: scheduleData.sendDays,
        intervalMinutes: scheduleData.intervalMinutes,
        maxEmailsPerDay: scheduleData.maxEmailsPerDay,
        scheduledAt: scheduleData.scheduledAt,
        nextTrigger: scheduleData.scheduledAt,
      });
      setScheduleCompleted(true);
      setShowScheduleDialog(false);
      onSettingsUpdate({ schedule: scheduleData });
      toast.success("Schedule settings saved");
    } catch (error) {
      console.error("Failed to save schedule:", error);
      toast.error("Failed to save schedule settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settingsData.name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }

    setIsSaving(true);
    try {
      await campaignService.addCampaignSettings({
        campaign_id: campaign?.id || '',
        name: settingsData.name,
        stopSending: settingsData.stopSending,
        sendAsPlainText: settingsData.sendAsPlainText,
        trackOpens: settingsData.trackOpens,
        trackClicks: settingsData.trackClicks,
        sendingPriority: settingsData.sendingPriority,
        autoPauseSameDomain: settingsData.autoPauseSameDomain,
        autoPauseOnHighBounce: settingsData.autoPauseOnHighBounce,
        includeUnsubscribeLink: settingsData.includeUnsubscribeLink,
      });
      setSettingsCompleted(true);
      setShowSettingsDialog(false);
      onSettingsUpdate({ settings: settingsData });
      toast.success("Campaign settings saved");
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save campaign settings");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDay = (day: string) => {
    setScheduleData((prev) => ({
      ...prev,
      sendDays: prev.sendDays.includes(day)
        ? prev.sendDays.filter((d) => d !== day)
        : [...prev.sendDays, day],
    }));
  };

  const handleSaveSenderAccounts = async () => {
    await campaignService.addCampaignSettings({
      campaign_id: campaign?.id || '',
      sender_accounts: selectedSenderAccounts,
    });
    setSenderCompleted(true);
    setShowSenderDialog(false);
    onSettingsUpdate({ senderAccounts: selectedSenderAccounts });
    toast.success("Sender accounts saved");
  };

  return (
    <SetupContainer>
      <SetupCard>
        <SetupRow>
          <SetupInfo>
            <SetupIcon $completed={senderCompleted}>
              {senderCompleted ? (
                <CheckCircle size={24} />
              ) : (
                <Circle size={24} />
              )}
            </SetupIcon>
            <SetupText>
              <h4>Sender Accounts</h4>
              <p>Who is sending this campaign?</p>
            </SetupText>
          </SetupInfo>
          <SetupButton onClick={() => setShowSenderDialog(true)}>
            {senderCompleted ? "Edit" : "Choose"} Sender Accounts
          </SetupButton>
        </SetupRow>

        <SetupRow>
          <SetupInfo>
            <SetupIcon $completed={scheduleCompleted}>
              {scheduleCompleted ? (
                <CheckCircle size={24} />
              ) : (
                <Circle size={24} />
              )}
            </SetupIcon>
            <SetupText>
              <h4>Schedule Settings</h4>
              <p>When should emails be sent?</p>
            </SetupText>
          </SetupInfo>
          <SetupButton onClick={() => setShowScheduleDialog(true)}>
            {scheduleCompleted ? "Edit" : "Set"} Schedule
          </SetupButton>
        </SetupRow>

        <SetupRow>
          <SetupInfo>
            <SetupIcon $completed={settingsCompleted}>
              {settingsCompleted ? (
                <CheckCircle size={24} />
              ) : (
                <Circle size={24} />
              )}
            </SetupIcon>
            <SetupText>
              <h4>Campaign Settings</h4>
              <p>Configure name, tracking and stop conditions</p>
            </SetupText>
          </SetupInfo>
          <SetupButton onClick={() => setShowSettingsDialog(true)}>
            {settingsCompleted ? "Edit" : "Configure"} Settings
          </SetupButton>
        </SetupRow>
      </SetupCard>

      {showSenderDialog && (
        <DialogOverlay onClick={() => setShowSenderDialog(false)}>
          <DialogContainer onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <h3>Sender Accounts</h3>
              <CloseButton onClick={() => setShowSenderDialog(false)}>
                <X size={20} />
              </CloseButton>
            </DialogHeader>
            <SenderAccounts
              selectedSenderAccounts={selectedSenderAccounts as Account[]}
              onSelectionChange={setSelectedSenderAccounts as (selectedAccounts: Account[]) => void}
              showSaveButton={true}
              handleSaveSenderAccounts={handleSaveSenderAccounts}
            />
          </DialogContainer>
        </DialogOverlay>
      )}

      {showScheduleDialog && (
        <DialogOverlay onClick={() => setShowScheduleDialog(false)}>
          <DialogContainer onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <h3>Schedule Settings</h3>
              <CloseButton onClick={() => setShowScheduleDialog(false)}>
                <X size={20} />
              </CloseButton>
            </DialogHeader>
            <DialogContent>
              <FormGroup>
                <Label>Campaign Start Date</Label>
                <Input
                  type="datetime-local"
                  defaultValue={getNowForDatetimeLocal()}
                  min={getNowForDatetimeLocal()}
                  value={scheduleData.scheduledAt}
                  onChange={(e) =>
                    setScheduleData((prev) => ({
                      ...prev,
                      scheduledAt: e.target.value,
                    }))
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>Timezone</Label>
                <Select
                  value={scheduleData.timezone}
                  onChange={(e) =>
                    setScheduleData((prev) => ({
                      ...prev,
                      timezone: e.target.value,
                    }))
                  }
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Sending Window</Label>
                <TimeInputRow>
                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={scheduleData.windowStart}
                      onChange={(e) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          windowStart: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={scheduleData.windowEnd}
                      onChange={(e) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          windowEnd: e.target.value,
                        }))
                      }
                    />
                  </div>
                </TimeInputRow>
              </FormGroup>

              <FormGroup>
                <Label>Days of Week</Label>
                <DaysGrid>
                  {DAYS_OF_WEEK.map((day) => (
                    <DayButton
                      key={day.key}
                      $selected={scheduleData.sendDays.includes(day.key)}
                      onClick={() => toggleDay(day.key)}
                    >
                      {day.label}
                    </DayButton>
                  ))}
                </DaysGrid>
              </FormGroup>

              <FormGroup>
                <TimeInputRow>
                  <div>
                    <Label>Interval Between Emails (minutes)</Label>
                    <Input
                      type="number"
                      min={1}
                      max={60}
                      value={scheduleData.intervalMinutes}
                      onChange={(e) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          intervalMinutes: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <FormGroup>
                      <Label>Max Emails Per Day</Label>
                      <Input
                        type="number"
                        min={1}
                        max={1000}
                        value={scheduleData.maxEmailsPerDay}
                        onChange={(e) =>
                          setScheduleData((prev) => ({
                            ...prev,
                            maxEmailsPerDay: Number(e.target.value),
                          }))
                        }
                      />
                    </FormGroup>
                  </div>
                </TimeInputRow>
              </FormGroup>
            </DialogContent>
            <DialogFooter>
              <CancelButton onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </CancelButton>
              <SaveButton onClick={handleSaveSchedule} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </SaveButton>
            </DialogFooter>
          </DialogContainer>
        </DialogOverlay>
      )}

      {showSettingsDialog && (
        <DialogOverlay onClick={() => setShowSettingsDialog(false)}>
          <DialogContainer
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "700px" }}
          >
            <DialogHeader>
              <h3>Campaign Settings</h3>
              <CloseButton onClick={() => setShowSettingsDialog(false)}>
                <X size={20} />
              </CloseButton>
            </DialogHeader>
            <SettingsDialogContent>
              <SettingsSection>
                <SectionHeader>
                  <h4>
                    Campaign Name <RequiredLabel>*</RequiredLabel>
                  </h4>
                </SectionHeader>
                <Input
                  type="text"
                  placeholder="Enter campaign name"
                  value={settingsData.name}
                  onChange={(e) =>
                    setSettingsData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </SettingsSection>

              <SettingsSection>
                <SectionHeader>
                  <h4>Stop Sending When Your Lead</h4>
                  <p>
                    Automatically pause campaigns when leads take these actions
                  </p>
                </SectionHeader>
                <RadioGroup>
                  <RadioOption
                    $selected={settingsData.stopSending === StopSending.REPLY}
                  >
                    <input
                      type="radio"
                      name="stopCondition"
                      checked={settingsData.stopSending === StopSending.REPLY}
                      onChange={() =>
                        setSettingsData((prev) => ({
                          ...prev,
                          stopSending: StopSending.REPLY,
                        }))
                      }
                    />
                    <span>Replies to a message</span>
                  </RadioOption>
                  <RadioOption
                    $selected={settingsData.stopSending === StopSending.CLICK}
                  >
                    <input
                      type="radio"
                      name="stopCondition"
                      checked={settingsData.stopSending === StopSending.CLICK}
                      onChange={() =>
                        setSettingsData((prev) => ({
                          ...prev,
                          stopSending: StopSending.CLICK,
                        }))
                      }
                    />
                    <span>Clicks on a link</span>
                  </RadioOption>
                  <RadioOption
                    $selected={settingsData.stopSending === StopSending.OPEN}
                  >
                    <input
                      type="radio"
                      name="stopCondition"
                      checked={settingsData.stopSending === StopSending.OPEN}
                      onChange={() =>
                        setSettingsData((prev) => ({
                          ...prev,
                          stopSending: StopSending.OPEN,
                        }))
                      }
                    />
                    <span>Opens an email</span>
                  </RadioOption>
                </RadioGroup>
              </SettingsSection>

              <SettingsSection>
                <SectionHeader>
                  <h4>Email Delivery</h4>
                  <p>
                    Boost your deliverability by sending emails in plain text,
                    without HTML
                  </p>
                </SectionHeader>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={settingsData.sendAsPlainText}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        sendAsPlainText: e.target.checked,
                      }))
                    }
                  />
                  <span>Optimize for plain text delivery</span>
                </CheckboxOption>
              </SettingsSection>

              <SettingsSection>
                <SectionHeader>
                  <h4>Tracking Preferences</h4>
                  <p>Choose what metrics to exclude from tracking</p>
                </SectionHeader>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={!settingsData.trackOpens}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        trackOpens: !e.target.checked,
                      }))
                    }
                  />
                  <span>Don't track email opens</span>
                </CheckboxOption>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={!settingsData.trackClicks}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        trackClicks: !e.target.checked,
                      }))
                    }
                  />
                  <span>Don't track link clicks</span>
                </CheckboxOption>
              </SettingsSection>v

              <SettingsSection>
                <SectionHeader>
                  <h4>Sending Priority</h4>
                  <p>
                    Set the priority level for sending followup emails (0 = low, 100 = high)
                  </p>
                </SectionHeader>
                <SliderContainer>
                  <SliderInput
                    type="range"
                    min={0}
                    max={100}
                    value={settingsData.sendingPriority}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        sendingPriority: Number(e.target.value),
                      }))
                    }
                    style={
                      {
                        "--value": `${settingsData.sendingPriority}%`,
                      } as React.CSSProperties
                    }
                  />
                  <SliderMarks>
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                      (mark) => (
                        <span key={mark}>{mark}</span>
                      )
                    )}
                  </SliderMarks>
                </SliderContainer>
              </SettingsSection>

              {/* Company Level Auto-Pause */}
              <SettingsSection>
                <SectionHeader>
                  <h4>Company Level Auto-Pause</h4>
                  <p>
                    Automatically stops messaging other people from a company
                    once one person replies
                  </p>
                </SectionHeader>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={settingsData.autoPauseSameDomain}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        autoPauseSameDomain: e.target.checked,
                      }))
                    }
                  />
                  <span>Enable auto-pause for same domain replies</span>
                </CheckboxOption>
              </SettingsSection>

              {/* Bounce Rate Protection */}
              <SettingsSection>
                <SectionHeader>
                  <h4>Bounce Rate Protection</h4>
                  <p>
                    Protect your mailbox reputation with automatic pause on high
                    bounce rates
                  </p>
                </SectionHeader>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={settingsData.autoPauseOnHighBounce}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        autoPauseOnHighBounce: e.target.checked,
                      }))
                    }
                  />
                  <span>Activate auto-pause protection from bounces</span>
                </CheckboxOption>
              </SettingsSection>

              {/* Unsubscribe Option */}
              <SettingsSection>
                <SectionHeader>
                  <h4>Unsubscribe Option</h4>
                  <p>Add unsubscribe message in all sent emails</p>
                </SectionHeader>
                <CheckboxOption>
                  <input
                    type="checkbox"
                    checked={settingsData.includeUnsubscribeLink}
                    onChange={(e) =>
                      setSettingsData((prev) => ({
                        ...prev,
                        includeUnsubscribeLink: e.target.checked,
                      }))
                    }
                  />
                  <span>Include unsubscribe link in emails</span>
                </CheckboxOption>
              </SettingsSection>
            </SettingsDialogContent>
            <DialogFooter>
              <CancelButton onClick={() => setShowSettingsDialog(false)}>
                Cancel
              </CancelButton>
              <SaveButton onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </SaveButton>
            </DialogFooter>
          </DialogContainer>
        </DialogOverlay>
      )}
    </SetupContainer>
  );
};

export default SetupStep;
