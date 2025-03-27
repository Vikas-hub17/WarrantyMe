import { useEffect, useState } from "react";
import { logout } from "../firebase/authService";
import {auth} from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { saveToGoogleDrive, fetchLettersFromDrive } from "../utils/googleDrive";
import styled from "styled-components";
import Editor from "../components/LetterEditor";

const DashboardContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #a71d2a;
  }
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const SavedLetterContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

function Dashboard() {
  const [user, setUser] = useState(null);
  const [letters, setLetters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const savedLetters = await fetchLettersFromDrive();
        setLetters(savedLetters);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSaveLetter = async (content) => {
    await saveToGoogleDrive(content);
    setLetters([...letters, content]);
    alert("Letter saved to Google Drive!");
  };

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      {user && <h2>Welcome, {user.displayName}!</h2>}
      <LogoutButton onClick={() => { logout(); navigate("/"); }}>Logout</LogoutButton>

      <Editor onSave={handleSaveLetter} />

      <h3>Saved Letters</h3>
      {letters.map((letter, index) => (
        <SavedLetterContainer key={index}>
          <div dangerouslySetInnerHTML={{ __html: letter }} />
        </SavedLetterContainer>
      ))}
    </DashboardContainer>
  );
}

export default Dashboard;
