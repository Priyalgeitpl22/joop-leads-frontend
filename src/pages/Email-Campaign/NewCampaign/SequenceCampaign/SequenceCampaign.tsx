import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PreviewMailDialog from "./PreviewMailDialog";

const SequenceCampaign = () => {
  const [fields, setFields] = useState([""]);
  const [editorValue, setEditorValue] = useState("");
  const [previewMail, setPreviewMail] = useState<boolean>(false);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const handlePreviewMail = () => {
    setPreviewMail(true)
  };

  return (
    <Box display="flex" sx={{ height: "80%" }}>
      <SidebarContainer
        style={{ width: "18%", padding: 2, borderRight: "1px solid #ddd", paddingLeft: "2%", paddingTop: "2%" }}
      >
        <Typography >Email Follow Up</Typography>
        {fields.map((field, index) => (
          <TextField
            key={index}
            value={field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            margin="normal"
            placeholder="Enter value"
          />
        ))}
        <Button variant="outlined" onClick={addField} sx={{ mt: 2 }}>
          + Add Field
        </Button>
      </SidebarContainer>

      <Box flex={1} padding={3}>
        <Box sx={{ display: "flex", gap: "83%" }}>
          <Typography variant="h6">Email Editor</Typography>
          <PreviewMailDialog
            open={previewMail}
            onClose={() => setPreviewMail(false)}
          />

          <Box onClick={handlePreviewMail} sx={{cursor: "pointer"}}>
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
