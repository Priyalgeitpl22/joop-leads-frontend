import { Box, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  DescriptionContainer,
  ManualTemplateContainer,
  TitleBody,
  TitleContainer,
} from "./emailTemplate.styled";
import ReactQuill from "react-quill";
import { Sequence, SequenceVariant } from "../Sequences/interfaces";
import "./ManualEditor.css";

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
  selectedVariant?: SequenceVariant;
}

const ManualTemplate: React.FC<ManualTemplateProps> = ({
  handleEmailTemplateData,
  updateSequenceData,
  selectedVariant,
  selectedSequence,
}) => {
  const [subject, setSubject] = useState(selectedVariant?.subject || "");
  const [emailBody, setEmailBody] = useState(selectedVariant?.emailBody || "");

  useEffect(() => {
    if (selectedVariant) {
      setSubject(selectedVariant.subject || "");
      setEmailBody(selectedVariant.emailBody || "");
    }
  }, [selectedVariant]);

  const handleDataChange = (newSubject: string, newEmailBody: string) => {
    setSubject(newSubject);
    setEmailBody(newEmailBody);

    handleEmailTemplateData({ subject: newSubject, emailBody: newEmailBody });

    if (selectedSequence && selectedVariant) {
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
            onChange={setEmailBody}
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
