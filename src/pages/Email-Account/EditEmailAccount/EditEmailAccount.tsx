import { SetStateAction, useState, useEffect, useRef } from "react";
import {
  CustomTab,
  CustomTabs,
  ScrollableContent,
} from "../../Email-Campaign/EmailCampaign.styled";
import { ContentContainer } from "./EditCampaignEmailAccount.styled";
import EditGeneralEmailAccount, { EditGeneralEmailAccountRef } from "./EditGeneralEmailAccount";
import EditCampaignEmailAccount from "./EditCampaignEmailAccount";
import EditWarmupEmailAccount, { EditWarmupEmailAccountRef } from "./EditWarmupEmailAccount";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { getEmailAccountSmtpDetail } from "../../../redux/slice/emailAccountSlice";
import { PrimaryButton } from "../../../styles/global.styled";
import EditOverviewEmailAccount from "./EditOverviewEmailAccount";

interface EmailAccountData {
  _id?: string;
  name?: string;
  email?: string;
  type?: string;
  warmupEnabled?: boolean;
  warmupMaxPerDay?: number;
  warmupDailyRampup?: boolean;
  warmupRampupIncrement?: number;
  [key: string]: unknown;
}

const EditEmailAccount = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const generalRef = useRef<EditGeneralEmailAccountRef>(null);
  const warmupRef = useRef<EditWarmupEmailAccountRef>(null);

  const emailAccount = useSelector((state: RootState) =>
    id
      ? (state.emailAccount?.accounts?.[id] as EmailAccountData | undefined)
      : null
  );

  useEffect(() => {
    if (id) {
      dispatch(getEmailAccountSmtpDetail(id));
    }
  }, [id, dispatch]);

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: SetStateAction<string>
  ) => {
    if ((newValue as string) === "back") {
      navigate("/email-accounts");
    }
    const validTabs = ["overview", "general", "warmUp", "campaign"];
    setActiveTab(validTabs.includes(newValue as string) ? newValue : "overview");
  };

  const handleUpdate = async () => {
    try {
      if (activeTab === "general" && generalRef.current) {
        await generalRef.current.handleUpdate();
      } else if (activeTab === "warmUp" && warmupRef.current) {
        await warmupRef.current.handleUpdate();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const showUpdateButton = activeTab === "general" || activeTab === "warmUp";

  return (
    <Box style={{ paddingTop: "3rem" }}>
      <ContentContainer
        style={{ border: "1px solid var(--border-grey)", padding: "1rem" }}
      >
        <CustomTabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "white",
          }}
        >
          <CustomTab label={<ArrowLeft />} value="back" />
          <CustomTab label="Overview" value="overview" />
          <CustomTab label="General" value="general" />
          <CustomTab label="Warm Up" value="warmUp" />
          <CustomTab label="Campaign" value="campaign" />
        </CustomTabs>

        <ScrollableContent>
          {activeTab === "overview" && (
            <EditOverviewEmailAccount/>
          )}
          {activeTab === "general" && (
            <EditGeneralEmailAccount
              ref={generalRef}
              id={id}
              emailAccount={emailAccount || undefined}
            />
          )}
          {activeTab === "warmUp" && (
            <EditWarmupEmailAccount
              ref={warmupRef}
              id={id}
              emailAccount={emailAccount || undefined}
            />
          )}
          {activeTab === "campaign" && <EditCampaignEmailAccount id={id} />}
        </ScrollableContent>
        {showUpdateButton && (
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "16px",
              backgroundColor: "var(--background-color)",
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 10,
            }}
          ><PrimaryButton onClick={handleUpdate} style={{ minWidth: "150px" }}>
              Update
            </PrimaryButton>
          </Box>
        )}
      </ContentContainer>
    </Box>
  );
};

export default EditEmailAccount;
