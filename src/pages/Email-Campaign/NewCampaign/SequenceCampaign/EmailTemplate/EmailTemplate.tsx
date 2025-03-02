import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { Sequence } from "../Sequences/interfaces";
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

export const modules = {
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
  handleEmailTemplateData: (data: { subject: string; emailBody: string }) => void;
  updateSequenceData: (sequence: Sequence) => void;
  selectedSequence?: Sequence;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  handleEmailTemplateData,
  selectedSequence,
  updateSequenceData,
}) => {
  const [emailBody, setEmailBody] = useState(selectedSequence?.seq_variants[0]?.emailBody || "");
  const [subject, setSubject] = useState(selectedSequence?.seq_variants[0]?.subject || "");
  
  const quillRef = useRef<typeof ReactQuill | null>(null);

  useEffect(() => {
    setEmailBody(selectedSequence?.seq_variants[0]?.emailBody || "");
    setSubject(selectedSequence?.seq_variants[0]?.subject || "");
  }, [selectedSequence]);

  const insertVariable = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      if (range) {
        editor.insertText(range.index, "{{Variable}}");
      }
    }
  };

  const handleDataChange = (newSubject: string, newEmailBody: string) => {
    setSubject(newSubject);
    setEmailBody(newEmailBody);

    handleEmailTemplateData({ subject: newSubject, emailBody: newEmailBody });

    if (selectedSequence) {
      const updatedVariants = selectedSequence.seq_variants.map((variant) =>
        variant.variantLabel === selectedSequence.seq_variants[0]?.variantLabel
          ? { ...variant, subject: newSubject, emailBody: newEmailBody }
          : variant
      );

      const updatedSequence: Sequence = { ...selectedSequence, seq_variants: updatedVariants };

      updateSequenceData(updatedSequence);
    }
  };

  return (
    <EmailTemplateWrapper>
      <EmailTemplateHeader>
        <SubjectBox>Subject:</SubjectBox>
        <SubjectText
          placeholder="Hi {{ first_name }}"
          value={subject}
          onChange={(e) => handleDataChange(e.target.value, emailBody)}
        />
        <VariablesButton onClick={insertVariable}>{"{ } Variables"}</VariablesButton>
      </EmailTemplateHeader>

      <ReactQuill
        ref={quillRef}
        value={emailBody}
        onChange={(newValue: string) => handleDataChange(subject, newValue)}
        modules={modules}
        className="custom-quill-email"
      />

      <EmailTemplateFooter>
        <FooterContent>
          Type <strong>%signature%</strong> to insert your email account's signature where you
          want it added or it will be added at the end of the email by default.
        </FooterContent>
      </EmailTemplateFooter>
    </EmailTemplateWrapper>
  );
};

export default EmailTemplate;
