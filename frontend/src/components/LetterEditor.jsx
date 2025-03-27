import { useState, lazy, Suspense } from "react";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

// Dynamically import ReactQuill for Vite
const ReactQuill = lazy(() => import("react-quill"));

const EditorContainer = styled.div`
  width: 60%;
  margin: auto;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const LetterEditor = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave(content);
  };

  return (
    <EditorContainer>
      <h2>Write Your Letter</h2>
      <Suspense fallback={<div>Loading editor...</div>}>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          placeholder="Write your letter here..."
          style={{ height: "300px", marginBottom: "20px" }}
        />
      </Suspense>
      <SaveButton onClick={handleSave}>Save Letter</SaveButton>
    </EditorContainer>
  );
};

export default LetterEditor;
