import { Container } from "../../styles/global.styled";
import { SectionTitle } from "../../styles/layout.styled";
import { Box } from "@mui/material";

const Settings = () => {
  return (
    <Container>
      <Box sx={{ padding: "20px", width: "100%" }}>
        <SectionTitle>Settings</SectionTitle>
        <Box sx={{ marginTop: "20px" }}>
          <h1>Settings</h1>
          <p>Settings page content will go here.</p>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;
