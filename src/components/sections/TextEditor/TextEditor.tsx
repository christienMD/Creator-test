import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  onContentChange?: (content: string) => void;
  initialValue?: string;
  placeholder?: string;
  required?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  onContentChange,
  //   placeholder = 'Enter your product description...',

  //   initialValue = '<p>This is the initial content of the editor.</p>',
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      if (onContentChange) {
        // console.log(content)
        onContentChange(content);
      }
    }
  };


  return (
    <div className="">
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={handleEditorChange}
        init={{
          height: 250,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6; }",
          content_css: "default",
          branding: false,
        }}
      />
    </div>
  );
};

export default TextEditor;
