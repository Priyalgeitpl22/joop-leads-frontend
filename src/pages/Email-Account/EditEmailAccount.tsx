import { useState, useEffect, useRef } from "react";
import {
  BackButton,
  ScrollableContent,
  TabItem,
} from "../Email-Campaign/EmailCampaign.styled";
import EditCampaignEmailAccount from "./EditEmailAccount/EditCampaignEmailAccount";
import EditWarmupEmailAccount, { EditWarmupEmailAccountRef } from "./EditEmailAccount/EditWarmupEmailAccount";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  EmailAccount,
  getEmailAccountSmtpDetail,
} from "../../redux/slice/emailAccountSlice";
import EmailAccountOverview from "./Edit/Overview";
import GeneralAccount from "./Edit/General";
import { Container } from "../../styles/global.styled";
import TabsHeader from "../../components/CustomTabs/TabsHeader";

const EditEmailAccount = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("overview");
  const warmupRef = useRef<EditWarmupEmailAccountRef>(null);
  const emailAccount = useSelector(
    (state: RootState) =>
      state.emailAccount?.accounts?.[id || ""] as EmailAccount
  );

  const emailAccountTabs: TabItem[] = [
    { label: "Overview", value: "overview" },
    { label: "General", value: "general" },
    { label: "Warm Up", value: "warmUp" },
    { label: "Campaign", value: "campaign" },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getEmailAccountSmtpDetail(id));
    }
  }, [id, dispatch, activeTab]);

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "32px" }}>
        <BackButton onClick={() => navigate("/email-accounts")} />
        <TabsHeader tabs={emailAccountTabs} value={activeTab} onChange={setActiveTab} />
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-secondary)" }}>({emailAccount?.email})</p>
        </div>
      </div>
      <ScrollableContent>
        {activeTab === "overview" && (
          <EmailAccountOverview emailAccount={emailAccount} />
        )}
        {activeTab === "general" && (
          <GeneralAccount emailAccount={emailAccount} />
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
    </Container>
  );
};

export default EditEmailAccount;
