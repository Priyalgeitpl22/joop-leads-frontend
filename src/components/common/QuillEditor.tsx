import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styled from "styled-components";
import { Braces } from "lucide-react";
import { QUILL_MODULES, QUILL_FORMATS, VARIABLE_OPTIONS } from "./quillEditorConfig";

// Re-export constants for convenience
export {
  VARIABLE_OPTIONS,
  QUILL_MODULES,
  QUILL_FORMATS,
} from "./quillEditorConfig";

// Styled components for the editor wrapper
export const EditorContainer = styled.div<{ $minHeight?: string }>`
  position: relative;

  .ql-container {
    min-height: ${({ $minHeight }) => $minHeight || "200px"};
    font-size: 14px;
  }

  .ql-editor {
    min-height: ${({ $minHeight }) => $minHeight || "200px"};
  }

  .ql-toolbar {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: ${({ theme }) => theme.colors?.background || "#f8f9fa"};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .ql-container {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    max-height: 355px;
    overflow-y: auto;
    scrollbar-width: thin;
  }
`;

export const VariablesWrapper = styled.div`
  position: relative;
  display: inline-flex;
  margin-left: auto;
`;

export const VariablesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors?.primary?.main || "#6366f1"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "#f3f4f6"};
  }
`;

export const VariablesDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: ${({ theme }) => theme.colors?.background?.primary || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors?.border?.main || "#e5e7eb"};
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
`;

export const VariableOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  text-align: left;
  font-size: 13px;
  color: ${({ theme }) => theme.colors?.primary?.main || "#6366f1"};
  cursor: pointer;
  transition: background 0.15s;

  span {
    color: ${({ theme }) => theme.colors?.text?.secondary || "#6b7280"};
    font-size: 11px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.secondary || "#f3f4f6"};
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export interface QuillEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
  modules?: typeof QUILL_MODULES;
  formats?: typeof QUILL_FORMATS;
  showVariables?: boolean;
}

export interface QuillEditorRef {
  insertVariable: (variable: string) => void;
  getEditor: () => ReactQuill | null;
}

export const QuillEditor = React.forwardRef<QuillEditorRef, QuillEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = "Write your content here...",
      readOnly = false,
      minHeight = "200px",
      modules = QUILL_MODULES,
      formats = QUILL_FORMATS,
      showVariables = false,
    },
    ref
  ) => {
    const quillRef = useRef<ReactQuill>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const insertVariable = useCallback(
      (variable: string) => {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const variableText = `{{${variable}}}`;
          if (range) {
            quill.insertText(range.index, variableText);
            quill.setSelection(range.index + variableText.length, 0);
          } else {
            const length = quill.getLength();
            quill.insertText(length - 1, variableText);
          }
        } else if (onChange) {
          onChange(value + `{{${variable}}}`);
        }
        setShowDropdown(false);
      },
      [value, onChange]
    );

    // Expose methods via ref
    React.useImperativeHandle(
      ref,
      () => ({
        insertVariable,
        getEditor: () => quillRef.current,
      }),
      [insertVariable]
    );

    const handleChange = useCallback(
      (content: string) => {
        if (onChange) {
          onChange(content);
        }
      },
      [onChange]
    );

    return (
      <EditorContainer $minHeight={minHeight}>
        {showVariables && !readOnly && (
          <VariablesWrapper ref={dropdownRef}>
            <VariablesButton
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Braces size={14} />
              Variables
            </VariablesButton>
            {showDropdown && (
              <VariablesDropdown>
                {VARIABLE_OPTIONS.map((v) => (
                  <VariableOption
                    key={v.key}
                    type="button"
                    onClick={() => insertVariable(v.key)}
                  >
                    {`{{${v.key}}}`}
                    <span>{v.label}</span>
                  </VariableOption>
                ))}
              </VariablesDropdown>
            )}
          </VariablesWrapper>
        )}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </EditorContainer>
    );
  }
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
