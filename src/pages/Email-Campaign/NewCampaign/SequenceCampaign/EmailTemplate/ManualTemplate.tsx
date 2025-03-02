import { Box, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  DescriptionContainer,
  ManualTemplateContainer,
  TitleContainer,
} from "./emailTemplate.styled";
import ReactQuill from "react-quill";
import { Sequence } from "../Sequences/interfaces";
import "./ManualEditor.css";
import { TitleBody } from "../../../../../styles/global.styled";

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

interface ManualTemplateProps {
  handleEmailTemplateData: (data: {
    subject: string;
    emailBody: string;
  }) => void;
  updateSequenceData: (sequence: Sequence) => void;
  selectedSequence?: Sequence;
}

const ManualTemplate: React.FC<ManualTemplateProps> = ({
  handleEmailTemplateData,
  updateSequenceData,
  selectedSequence,
}) => {
  const [emailBody, setEmailBody] = useState(selectedSequence?.seq_variants[0]?.emailBody || "");
  const [subject, setSubject] = useState(selectedSequence?.seq_variants[0]?.subject || "");

  useEffect(() => {
    setEmailBody(selectedSequence?.seq_variants[0]?.emailBody || "");
    setSubject(selectedSequence?.seq_variants[0]?.subject || "");
  }, [selectedSequence]);

  const handleDataChange = (newSubject: string, newEmailBody: string) => {
    setSubject(newSubject);
    setEmailBody(newEmailBody);

    handleEmailTemplateData({ subject: newSubject, emailBody: newEmailBody });

    if (selectedSequence) {
      const updatedVariants = selectedSequence.seq_variants.map((variant) => ({
        ...variant,
        subject: newSubject,
        emailBody: newEmailBody,
      }));

      const updatedSequence: Sequence = {
        ...selectedSequence,
        seq_variants: updatedVariants,
      };

      updateSequenceData(updatedSequence);
    }
  };

  return (
    <ManualTemplateContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <TitleContainer>
          <Typography style={{ marginBottom: "8px" }}>Title</Typography>
          <TitleBody
            value={subject}
            onChange={(e) => handleDataChange(e.target.value, emailBody)}
          />
        </TitleContainer>
        <DescriptionContainer>
          <Typography style={{ marginBottom: "8px" }}>
            Task Description
          </Typography>
          <div style={{border: '1px solid #d5d5d5 !important'}}>
          <ReactQuill
            value={emailBody}
            onChange={(newValue: string) => handleDataChange(subject, newValue)}
            modules={modules}
            className="custom-quill-manual"
          />
          </div>
        </DescriptionContainer>
      </Box>
    </ManualTemplateContainer>
  );
};

export default ManualTemplate;
