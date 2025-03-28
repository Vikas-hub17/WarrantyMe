import { useState } from "react";
import styled from "styled-components";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
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

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    if (content.trim()) {
      onSave(content);
      setContent(""); // Clear after saving
    } else {
      alert("Letter cannot be empty!");
    }
  };

  return (
    <EditorContainer>
      <h3>Write Your Letter</h3>
      <TextArea value={content} onChange={handleChange} placeholder="Type here..." />
      <SaveButton onClick={handleSave}>Save Letter</SaveButton>
    </EditorContainer>
  );
};

export default LetterEditor;
