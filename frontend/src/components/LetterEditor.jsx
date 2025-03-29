import { useState } from "react";
import styled from "styled-components";
import { saveToGoogleDrive } from "../utils/googleDrive"; // Import save function

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
  background-color: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#545b62")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Message = styled.p`
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "green")};
  text-align: center;
`;

const LetterEditor = ({ onSaveDraft }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveToDrive = async () => {
    if (!content.trim()) {
      setMessage("Letter cannot be empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    const success = await saveToGoogleDrive(content);
    setLoading(false);

    if (success) {
      setMessage("Letter saved to Google Drive successfully!");
      setContent(""); // Clear text area
    } else {
      setMessage("Failed to save letter. Please try again.");
    }
  };

  const handleSaveAsDraft = () => {
    if (!content.trim()) {
      setMessage("Draft cannot be empty!");
      return;
    }
    onSaveDraft(content);
    setContent("");
    setMessage("Draft saved successfully!");
  };

  return (
    <EditorContainer>
      <h3>Write Your Letter</h3>
      <TextArea value={content} onChange={handleChange} placeholder="Type here..." />
      {message && <Message error={message.includes("Failed")}>{message}</Message>}
      <ButtonContainer>
        <SaveButton primary onClick={handleSaveToDrive} disabled={loading}>
          {loading ? "Saving..." : "Save to Google Drive"}
        </SaveButton>
        <SaveButton onClick={handleSaveAsDraft} disabled={loading}>
          Save as Draft
        </SaveButton>
      </ButtonContainer>
    </EditorContainer>
  );
};

export default LetterEditor;
