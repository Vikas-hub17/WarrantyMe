import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const Editor = ({ onSave }) => {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (text.trim() !== "") {
      onSave(text);
    } else {
      alert("Letter cannot be empty!");
    }
  };

  return (
    <EditorContainer>
      <h2>Write Your Letter</h2>
      <ReactQuill value={text} onChange={setText} theme="snow" />
      <SaveButton onClick={handleSave}>Save to Google Drive</SaveButton>
    </EditorContainer>
  );
};

export default Editor;
