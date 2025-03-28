import { useEffect, useState } from "react";
import { logout } from "../firebase/authService";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { saveToGoogleDrive, fetchLettersFromDrive } from "../utils/googleDrive";
import styled from "styled-components";
import LetterEditor from "../components/LetterEditor";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f9;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #007bff;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #a71d2a;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const SavedLettersSection = styled.div`
  margin-top: 20px;
`;

const SavedLetterContainer = styled.div`
  border-left: 5px solid #007bff;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

function Dashboard() {
  const [user, setUser] = useState(null);
  const [letters, setLetters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const savedLetters = await fetchLettersFromDrive();
          setLetters(savedLetters);
        } catch (error) {
          console.error("Error fetching letters:", error);
        }
      } else {
        console.log("User is logged out, redirecting...");
        navigate("/"); // Ensure redirection
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSaveLetter = async (content) => {
    await saveToGoogleDrive(content);
    setLetters([...letters, content]);
    alert("Letter saved to Google Drive!");
  };

  const handleLogout = async () => {
    console.log("Logout button clicked!"); // Debugging
    try {
      await logout();
      console.log("User logged out successfully"); // Debugging
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <Content>
        {user && <h2>Welcome, {user.displayName}!</h2>}
        <LetterEditor onSave={handleSaveLetter} />
        <SavedLettersSection>
          <h3>Saved Letters</h3>
          {letters.length === 0 ? (
            <p>No saved letters yet.</p>
          ) : (
            letters.map((letter, index) => (
              <SavedLetterContainer key={index}>
                <div dangerouslySetInnerHTML={{ __html: letter }} />
              </SavedLetterContainer>
            ))
          )}
        </SavedLettersSection>
      </Content>
    </DashboardContainer>
  );
}

export default Dashboard;