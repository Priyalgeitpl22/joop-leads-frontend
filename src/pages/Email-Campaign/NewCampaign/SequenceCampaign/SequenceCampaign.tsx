import { useState } from "react";
import { Box, TextField, Button, Typography, IconButton, styled } from "@mui/material";
import { SidebarContainer } from "../../../../styles/layout.styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviewMailDialog from "./PreviewMailDialog";

const StyledTextField = styled(TextField)`
  width: 100%;
  background: #f8f9fc;

  .MuiOutlinedInput-root {
    height: 100%; /* Ensures full height inside container */
  }
`;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
    ["insertVariables"],
  ],
};

const SequenceCampaign = () => {
  const [fields, setFields] = useState([""]);
  const [editorValue, setEditorValue] = useState("");
  const [previewMail, setPreviewMail] = useState(false);
  const [showStepOptions, setShowStepOptions] = useState(false);
  const [subject, setSubject] = useState("");

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Stage 1: Email</Typography>
          <PreviewMailDialog
            open={previewMail}
            onClose={() => setPreviewMail(false)}
            emailContent={editorValue}
          />
          <Box onClick={handlePreviewMail} sx={{ cursor: "pointer" }}>
            <Typography>
              <PlayArrowIcon sx={{ marginBottom: "-6px" }} />
              Preview
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            background: "#f8f9fc",
            marginTop: "10px",
            height: "8%",
          }}
        >
          <Typography sx={{ marginRight: "5px" }}>
            Subject:
          </Typography>
          <StyledTextField
            variant="outlined"
            value={subject}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSubject(event.target.value)
            }
            placeholder="Hi {{first_name}}"
            sx={{ height: "100%" }}
          />
        </Box>
        <ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          theme="snow"
          modules={modules}
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
