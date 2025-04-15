import { Typography } from "@mui/material";
import { useState } from "react";
import {
  FormSection,
  IllustrationSection,
  LoginCard,
  PageContainer,
  StyledButton,
} from "../Login/login.styled";
import { useDispatch } from "react-redux";
import { UnSubscribeContact } from "../../redux/slice/contactSlice";
import { AppDispatch } from "../../redux/store/store";
import toast, { Toaster } from "react-hot-toast";

const Unsubscribe = () => {
  const email = decodeURIComponent(
    window.location.pathname.split("/unsubscribe/")[1] || ""
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleUnsubscribe = async () => {
    try {
      setLoading(true);

      const response = await dispatch(UnSubscribeContact({ email })).unwrap();
      if (response) {
        toast.success(response.message || "User unsubscribed successfully");
      }
    } catch (error: any) {
      toast.error(error || "Failed to unsubscribe. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <Toaster position="top-right" />
        <IllustrationSection>
          <img
            src="/great-learning.gif"
            alt="Email illustration"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </IllustrationSection>

        <FormSection>
          <Typography variant="body1" fontWeight="bold" color="black" mb={2}>
            Click here to Unsubscribe...
          </Typography>

          <StyledButton
            variant="contained"
            onClick={handleUnsubscribe}
            disabled={loading}
          >
            {loading ? "Unsubscribing..." : "Unsubscribe"}
          </StyledButton>
        </FormSection>
      </LoginCard>
    </PageContainer>
  );
}

export default Unsubscribe;