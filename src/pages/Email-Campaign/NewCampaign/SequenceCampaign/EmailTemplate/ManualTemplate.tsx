import { Box, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { DescriptionContainer, ManualTemplateContainer, TitleBody, TitleContainer } from "./emailTemplate.styled";
import ReactQuill from "react-quill";

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

const ManualTemplate = () => {
  const [editorValue, setEditorValue] = useState("");

  return (
    <ManualTemplateContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
        <TitleContainer>
          <Typography style={{ marginBottom: "8px" }}>Title</Typography>
          <TitleBody></TitleBody>
        </TitleContainer>
        <DescriptionContainer>
          <Typography style={{ marginBottom: "8px" }}>
            Task Description
          </Typography>
          <ReactQuill
            value={editorValue}
            onChange={setEditorValue}
            theme="snow"
            modules={modules}
          />
        </DescriptionContainer>
      </Box>
    </ManualTemplateContainer>
  );
};

export default ManualTemplate;
