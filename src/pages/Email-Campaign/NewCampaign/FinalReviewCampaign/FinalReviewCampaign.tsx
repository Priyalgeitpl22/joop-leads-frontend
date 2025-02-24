import { Box, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import "react-quill/dist/quill.snow.css";
import { Search } from "lucide-react";
import {SearchBar} from "../../../../components/Header/header.styled";

const FinalReviewCampaign = () => {
  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{
          width: "18%",
          padding: 2,
          borderRight: "1px solid #ddd",
          paddingLeft: "2%",
          paddingTop: "2%",
        }}
      >
        <Typography mb={2}>Review Your Mail Individually</Typography>
        <SearchBar style={{ width: "70%" }}>
          <Search size={20} color="#64748b" />
          <input placeholder="Search by name emailId..." />
        </SearchBar>
        <Typography mt={2} fontSize={13}>No data available</Typography>
      </SidebarContainer>
    </Box>
  );
};

export default FinalReviewCampaign;
