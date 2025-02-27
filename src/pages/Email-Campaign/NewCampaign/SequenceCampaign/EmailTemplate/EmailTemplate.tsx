import { Box, TextField, Typography, styled } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PreviewMailDialog from "../PreviewMailDialog";
import { useState } from "react";

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


const EmailTemplate = () => {
    const [editorValue, setEditorValue] = useState("");
    const [previewMail, setPreviewMail] = useState(false);
    const [subject, setSubject] = useState("");
  
    const handlePreviewMail = () => {
      setPreviewMail(true);
    };
  
return(
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
  )
}

export default EmailTemplate;