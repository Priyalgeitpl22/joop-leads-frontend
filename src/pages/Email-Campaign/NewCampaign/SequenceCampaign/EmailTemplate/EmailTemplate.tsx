import { Box, TextField, Typography, styled } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { Sequence, SequenceVariant } from "../Sequences/interfaces";
import {
  EmailTemplateFooter,
  EmailTemplateHeader,
  EmailTemplateWrapper,
  FooterContent,
  SubjectBox,
  SubjectText,
  VariablesButton,
} from "./emailTemplate.styled";
import "./EmailEditor.css";
import ReactQuill from "react-quill";

const StyledTextField = styled(TextField)`
  width: 100%;
  background: #f8f9fc;

  .MuiOutlinedInput-root {
    height: 100%;
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

interface EmailTemplateProps {
  handleEmailTemplateData: (data: {
    title: string;
    description: string;
  }) => void;
  updateSequenceData: (sequence: Sequence) => void;
  selectedSequence?: Sequence;
  selectedVariant?: SequenceVariant;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  handleEmailTemplateData,
  selectedSequence,
  selectedVariant,
  updateSequenceData,
}) => {
  const [emailBody, setEmailBody] = useState(selectedVariant?.emailBody || "");
  const [subject, setSubject] = useState(selectedVariant?.subject || "");
  const quillRef = useRef<typeof ReactQuill | null>(null) as React.MutableRefObject<typeof ReactQuill | null>;

  useEffect(() => {
    setEmailBody(selectedVariant?.emailBody || "");
    setSubject(selectedVariant?.subject || "");
  }, [selectedVariant]);


  const insertVariable = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      if (range) {
        editor.insertText(range.index, "{{Variable}}");
      }
    }
  };

  useEffect(() => {
    if (selectedSequence && selectedVariant) {
      const updatedVariants = selectedSequence.seq_variants.map((variant) =>
        variant.variantLabel === selectedVariant.variantLabel
          ? { ...variant, emailBody, subject }
          : variant
      );

      const updatedSequence = {
        ...selectedSequence,
        seq_variants: updatedVariants,
      };

      handleEmailTemplateData({ title: subject, description: emailBody });
      updateSequenceData(updatedSequence);
    }
  }, [subject, emailBody]);

  return (
    <EmailTemplateWrapper>
      <EmailTemplateHeader>
        <SubjectBox>Subject:</SubjectBox>
        <SubjectText placeholder="Hi {{ first_name }}"></SubjectText>
        <VariablesButton className="ql-insertVariables" onClick={() => insertVariable()}>{"{ } Variables"}</VariablesButton>
      </EmailTemplateHeader>
      <ReactQuill
        value={emailBody}
        onChange={setEmailBody}
        modules={modules}
        className="custom-quill-email"
      />
      <EmailTemplateFooter>
        <FooterContent>
        Type %signature% to insert your email account's signature where you want
        it added or it will be added at the end of the email by default.
        </FooterContent>
      </EmailTemplateFooter>
    </EmailTemplateWrapper>
  );
};

export default EmailTemplate;
