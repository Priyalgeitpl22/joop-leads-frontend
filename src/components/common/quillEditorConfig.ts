// Variable options for template insertion
export const VARIABLE_OPTIONS = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "company", label: "Company Name" },
  { key: "designation", label: "Job Title" },
  { key: "phone", label: "Phone" },
  { key: "website", label: "Website" },
  { key: "linkedinUrl", label: "LinkedIn" },
];

// Quill editor configuration
export const QUILL_MODULES = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["clean"],
  ],
};

export const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "align",
  "link",
  "image",
  "blockquote",
];

