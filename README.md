# 📜 Letter Editor & Saver

## 📝 Project Overview
This project is a **Letter Editor & Saver** web application where users can:
- Write and edit letters.
- Save letters to **Google Drive**.
- Save and retrieve letters from **MongoDB**.
- View all saved letters.
- Delete letters from MongoDB.

## 🚀 Features
- **Letter Editor**: Write and edit letters.
- **Save to Google Drive**: Store letters in Google Drive (without authentication).
- **Save to MongoDB**: Save letters in a MongoDB database.
- **View Saved Letters**: Retrieve and display saved letters.
- **Delete Saved Letters**: Remove saved letters from MongoDB.

---

## 🏗 Tech Stack
### **Frontend:**
- React.js
- Styled-components
- Fetch API (for backend communication)

### **Backend:**
- Node.js
- Express.js
- MongoDB (using Mongoose)

---

## 📂 Folder Structure
```
/letter-editor-app
│── /frontend
│   ├── /src
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── LetterEditor.js
│   │   ├── index.js
│   │   ├── styles.js
│── /backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── config.js
│   ├── controllers/
│── package.json
│── README.md
```

---

## 🛠 Installation & Setup
### **1️⃣ Backend Setup**
```bash
cd backend
npm install
node server.js
```
- Ensure MongoDB is running (or connect to **MongoDB Atlas**).

### **2️⃣ Frontend Setup**
```bash
cd frontend
npm install
npm start
```
- The frontend will run at `http://localhost:3000`.
- Update API URLs in frontend (`LetterEditor.js`) to match the backend server.

---

## 🌍 Deployment
### **Deploy Backend on CodeSandbox**
1. Go to [CodeSandbox](https://codesandbox.io/)
2. Create a new sandbox → Choose **Node.js**
3. Upload your backend files.
4. Copy the API URL provided.

### **Deploy Frontend on CodeSandbox**
1. Create a new sandbox → Choose **React**
2. Upload your frontend files.
3. Update API URLs to use the backend's CodeSandbox URL.
4. Run the app and test it.

---

## 📌 API Endpoints
### **Save Letter to MongoDB**
**POST** `/api/letters/save`
```json
{
  "content": "This is my letter."
}
```

### **Get All Saved Letters**
**GET** `/api/letters/all`

### **Delete Letter from MongoDB**
**DELETE** `/api/letters/delete/:id`

---

## 🛑 Troubleshooting
1. **Google Drive Save Error?** Check API credentials.
2. **CORS Issues?** Enable CORS in the backend.
3. **MongoDB Connection Error?** Ensure MongoDB is running or use MongoDB Atlas.

---


