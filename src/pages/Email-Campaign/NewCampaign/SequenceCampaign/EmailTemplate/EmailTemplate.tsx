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
} from "./emailTemplate.styled";
import "./EmailEditor.css";
import ReactQuill from "react-quill";
import { Menu, MenuItem } from "@mui/material";
import { Button } from "../../../../../styles/global.styled";
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
  ],
};

const variableOptions = [
  "first_name",
  "last_name",
  "email",
  "website",
  // "day of week",
  // "time of day",
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
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const open = Boolean(anchorEl);

  useEffect(() => {
    setEmailBody(selectedSequence?.seq_variants[0]?.emailBody || "");
    setSubject(selectedSequence?.seq_variants[0]?.subject || "");
  }, [selectedSequence]);

  useEffect(() => {
    setTimeout(addCustomButton, 500);
  }, []);

  const handleOpenMenu = (target: "subject" | "emailBody", _event?: any) => {
    setVariableTarget(target);

    if (target === "subject" && subjectRef.current) {
      const input = subjectRef.current;
      const cursorPosition = input.selectionStart || 0;

      const rect = input.getBoundingClientRect();

      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.font = window.getComputedStyle(input).font;
      tempSpan.innerText = input.value.substring(0, cursorPosition);
      document.body.appendChild(tempSpan);

      const cursorX = rect.left + tempSpan.offsetWidth;
      const cursorY = rect.bottom + window.scrollY;

      document.body.removeChild(tempSpan);

      setMenuPosition({ top: cursorY, left: cursorX });
      setAnchorEl(input);
    }

    if (target === "emailBody" && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      if (range) {
        const bounds = editor.getBounds(range.index);
        const editorContainer = editor.container.getBoundingClientRect();

        setMenuPosition({
          top: editorContainer.top + bounds.top + window.scrollY + 40,
          left: editorContainer.left + bounds.left + window.scrollX,
        });

        setAnchorEl(editor.container);
      }
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuPosition({ top: 0, left: 0 });
  };

  const insertVariable = (variable: string) => {
    let newSubject = subject;
    let newEmailBody = emailBody;
    if (variableTarget === "subject") {
      newSubject = subject + ` {{${variable}}}`;
      setSubject(newSubject);
    } else if (variableTarget === "emailBody" && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();

      if (range) {
        quill.insertText(range.index, ` {{${variable}}} `, "user");
        quill.setSelection(range.index + ` {{${variable}}} `.length);
      } else {
        quill.insertText(quill.getLength(), ` {{${variable}}} `, "user");
      }

      newEmailBody = quill.root.innerHTML;
      setEmailBody(newEmailBody);
    }

    handleEmailTemplateData({ subject: newSubject, emailBody: newEmailBody });

    if (selectedSequence) {
      const updatedSequence = JSON.parse(JSON.stringify(selectedSequence));
      if (updatedSequence.seq_variants && updatedSequence.seq_variants.length > 0) {
        updatedSequence.seq_variants[0].subject = newSubject;
        updatedSequence.seq_variants[0].emailBody = newEmailBody;
      }
      updateSequenceData(updatedSequence);
    }

    handleCloseMenu();
  };

  const handleDataChange = (newSubject: string, newEmailBody: string) => {
    setSubject(newSubject);
    setEmailBody(newEmailBody);

    handleEmailTemplateData({ subject: newSubject, emailBody: newEmailBody });

    if (selectedSequence) {
      const updatedSequence = JSON.parse(JSON.stringify(selectedSequence));
      if (updatedSequence.seq_variants && updatedSequence.seq_variants.length > 0) {
        updatedSequence.seq_variants[0].subject = newSubject;
        updatedSequence.seq_variants[0].emailBody = newEmailBody;
      }

      updateSequenceData(updatedSequence);
    }
  };

  const addCustomButton = () => {
    const toolbar = document.querySelector(".ql-toolbar");
    if (!toolbar) return;

    const existingButton = document.querySelector(".ql-variables");
    if (existingButton) return;

    const button = document.createElement("button");
    button.classList.add("ql-variables");
    button.innerHTML = `{ }`;

    button.addEventListener("click", (event) => {
      handleOpenMenu("emailBody", event);
    });
    const firstGroup = toolbar.querySelector(".ql-formats:first-child");
    if (firstGroup) {
      firstGroup.insertBefore(button, firstGroup.firstChild);
    } else {
      toolbar.insertBefore(button, toolbar.firstChild);
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
            width: "94%",
          }}
        >
          <SubjectText
            ref={subjectRef}
            placeholder="Hi {{ first_name }}"
            value={subject}
            onChange={(e) => handleDataChange(e.target.value, emailBody)}
          />
          <Button onClick={() => handleOpenMenu("subject")} style={{marginRight:"10px"}}>
            {"{ } Variables"}
          </Button>
        </div>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPosition.top, left: menuPosition.left }}
          open={open}
          onClose={handleCloseMenu}
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
