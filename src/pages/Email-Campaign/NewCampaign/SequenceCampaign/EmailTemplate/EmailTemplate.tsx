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
import { Menu, MenuItem } from "@mui/material";
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
    ["variables"],
  ],
};

const variableOptions = [
  "first_name",
  "last_name",
  "email",
  "website",
  "day of week",
  "time of day",
];
interface EmailTemplateProps {
  handleEmailTemplateData: (data: {
    subject: string;
    emailBody: string;
  }) => void;
  updateSequenceData: (sequence: Sequence) => void;
  selectedSequence?: Sequence;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  handleEmailTemplateData,
  selectedSequence,
  updateSequenceData,
}) => {
  const [emailBody, setEmailBody] = useState(
    selectedSequence?.seq_variants[0]?.emailBody || ""
  );
  const [subject, setSubject] = useState(
    selectedSequence?.seq_variants[0]?.subject || ""
  );

  const [variableTarget, setVariableTarget] = useState<"subject" | "emailBody">(
    "subject"
  );

  const quillRef = useRef<typeof ReactQuill | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const addCustomButton = () => {
    const toolbar = document.querySelector(".ql-toolbar");
    if (!toolbar) return;
  
    const existingButton = document.querySelector(".ql-variables");
    if (existingButton) existingButton.remove();
  
    const button = document.createElement("button");
    button.classList.add("ql-variables");
  
    button.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <text x="3" y="14" font-size="14" font-weight="bold" fill="var(--border-color)">{ } Variables</text>
    </svg>
  `;
    button.onclick = () => handleOpenMenu("subject");
    const formatGroup = toolbar.querySelector(".ql-formats:last-child");
    if (formatGroup) {
      formatGroup.appendChild(button);
    } else {
      toolbar.appendChild(button);
    }
  };
  
  useEffect(() => {
    setTimeout(addCustomButton, 500);
  }, []);

  useEffect(() => {
    setEmailBody(selectedSequence?.seq_variants[0]?.emailBody || "");
    setSubject(selectedSequence?.seq_variants[0]?.subject || "");
  }, [selectedSequence]);

  const handleOpenMenu = (target: "subject" | "emailBody") => {
    setVariableTarget(target);
    if (target === "subject" && subjectRef.current) {
      setAnchorEl(subjectRef.current);
    } else if (target === "emailBody" && quillRef.current) {
      setAnchorEl(quillRef.current.getEditor().container);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const insertVariable = (variable: string) => {
    if (variableTarget === "subject") {
      setSubject((prev) => prev + ` {{${variable}}}`);
    } else if (variableTarget === "emailBody" && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        quill.insertText(range.index, ` {{${variable}}}`);
      }
    }
    handleCloseMenu();
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

      const updatedSequence: Sequence = {
        ...selectedSequence,
        seq_variants: updatedVariants,
      };

      updateSequenceData(updatedSequence);
    }
  };

  return (
    <EmailTemplateWrapper>
      <EmailTemplateHeader>
        <SubjectBox>Subject:</SubjectBox>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <SubjectText
            ref={subjectRef}
            placeholder="Hi {{ first_name }}"
            value={subject}
            onChange={(e) => handleDataChange(e.target.value, emailBody)}
          />
          <VariablesButton onClick={() => handleOpenMenu("subject")}>
            {"{ } Variables"}
          </VariablesButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {variableOptions.map((variable) => (
            <MenuItem key={variable} onClick={() => insertVariable(variable)}>
              {variable}
            </MenuItem>
          ))}
        </Menu>
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
          Type <strong>%signature%</strong> to insert your email account's
          signature where you want it added or it will be added at the end of
          the email by default.
        </FooterContent>
      </EmailTemplateFooter>
    </EmailTemplateWrapper>
  );
};

export default EmailTemplate;
