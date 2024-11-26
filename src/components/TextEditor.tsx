import React, { FC, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorToolbarProps = {
  isEmailBodyToolbar?: boolean;
  isAnnoucementToolbar?: boolean;
  toolbarId: number;
};

type TextEditorProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  isAnnoucementToolbar?: boolean;
  defaultValue?: string;
  isEmailBodyToolbar?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

// Custom LineBreak component for Quill editor
const CustomLineBreak: FC = () => (
  <strong style={{ color: "black" }}>br</strong>
);

// LineBreakChange functions for Custom Toolbar
export function LineBreakChange(this: any) {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.clipboard.dangerouslyPasteHTML(cursorPosition, "<b><br></b>");
  this.quill.setSelection(cursorPosition + 1);
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

export const EditorToolbar: FC<EditorToolbarProps> = ({
  isEmailBodyToolbar,
  isAnnoucementToolbar,
  toolbarId,
}) => (
  <div id={`toolbar${toolbarId}`}>
    {isEmailBodyToolbar && (
      <>
        <span className="ql-formats">
          <select className="ql-header" defaultValue="3">
            <option value="1">Header 1</option>
            <option value="2">Header 2</option>
            <option value="4">Header 3</option>
            <option value="3">Normal</option>
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-linebreak">
            <CustomLineBreak />
          </button>
        </span>
      </>
    )}
    {isAnnoucementToolbar && (
      <span className="ql-formats">
        <select className="ql-header" defaultValue="3">
          <option value="1">Header 1</option>
          <option value="2">Header 2</option>
          <option value="4">Header 3</option>
          <option value="3">Normal</option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-link" />
        <button className="ql-code-block" />
        <button className="ql-underline" />
        <button className="ql-linebreak">
          <CustomLineBreak />
        </button>
      </span>
    )}
    {!isEmailBodyToolbar && !isAnnoucementToolbar && (
      <>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
        </span>
      </>
    )}
  </div>
);

const TextEditor: FC<TextEditorProps> = ({
  onChange,
  placeholder,
  isAnnoucementToolbar,
  defaultValue,
  isEmailBodyToolbar,
  className = "",
  style = { borderRadius: 3 },
}) => {
  const toolbarId = useMemo(() => Math.floor(Math.random() * 1e16), []);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: `#toolbar${toolbarId}`,
        handlers: {
          linebreak: LineBreakChange,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    };
  }, [toolbarId]);

  return (
    <div className={`text-editor ${className}`} style={style}>
      <EditorToolbar
        isEmailBodyToolbar={isEmailBodyToolbar}
        isAnnoucementToolbar={isAnnoucementToolbar}
        toolbarId={toolbarId}
      />
      <ReactQuill
        theme="snow"
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default TextEditor;
