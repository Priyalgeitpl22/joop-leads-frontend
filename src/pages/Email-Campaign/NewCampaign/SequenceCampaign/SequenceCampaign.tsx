import { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviewMailDialog from "./PreviewMailDialog";

const SequenceCampaign = () => {
  const [fields, setFields] = useState([""]);
  const [editorValue, setEditorValue] = useState("");
  const [previewMail, setPreviewMail] = useState<boolean>(false);
  const [showStepOptions, setShowStepOptions] = useState(false);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const handlePreviewMail = () => {
    setPreviewMail(true);
  };

  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{
          width: "20%",
          padding: 2,
          borderRight: "1px solid #ddd",
          paddingLeft: "2%",
          overflow: "scroll",
        }}
      >
        <Typography>Email Follow Up</Typography>
        {fields.map((field, index) => (
          <div style={{ marginTop: "10%", marginBottom: "15%" }} key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginRight: "8px" }}>{index + 1}.</Typography>
              <TextField
                value={field}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                margin="normal"
                placeholder="Subject----"
              />
            </div>
            <Button
              variant="outlined"
              onClick={addField}
              sx={{
                mr: 4,
                float: "right",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              + Add Varient
            </Button>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={() => setShowStepOptions(!showStepOptions)}
          sx={{
            mr: 4,
            float: "left",
            fontSize: "10px",
            fontWeight: "600",
            marginTop: "-15%",
            marginLeft: "7%",
          }}
        >
          + Add Step
        </Button>
        {showStepOptions && (
          <Box display="flex" justifyContent="center" gap={8} mt={5}>
            <IconButton>
              <EmailIcon color="primary" />
            </IconButton>
            <IconButton>
              <AssignmentIcon color="primary" />
            </IconButton>
          </Box>
        )}
      </SidebarContainer>

      <Box flex={1} padding={3}>
        <Box sx={{ display: "flex", gap: "83%" }}>
          <Typography variant="h6">Email Editor</Typography>
          <PreviewMailDialog
            open={previewMail}
            onClose={() => setPreviewMail(false)}
            emailContent={editorValue} // Pass the editor content
          />

          <Box onClick={handlePreviewMail} sx={{ cursor: "pointer" }}>
            <Typography>
              <PlayArrowIcon sx={{ marginBottom: "-6px" }} />
              Preview
            </Typography>
          </Box>
        </Box>
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          theme="snow"
          style={{
            backgroundColor: "white",
            height: "50%",
            paddingBottom: "3.5%",
          }}
        />
      </Box>
    </Box>
  );
};

export default SequenceCampaign;
