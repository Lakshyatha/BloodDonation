# Blood Donation Management System 🩸

A full-stack web application for managing blood donors — built with **Spring Boot** (Java) + **React** (Vite) + **MySQL** (Aiven Cloud).

## 🚀 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite, Vanilla CSS, Axios |
| Backend | Spring Boot 3.3.5, Spring Data JPA |
| Database | MySQL (Aiven Cloud) |
| AI Features | Rule-based NLP Search + Chatbot |

## 📁 Project Structure
```
blooddonation/
├── blooddonation/          # Spring Boot Backend
│   ├── src/main/java/com/lakshyatha/blooddonation/
│   │   ├── controller/     # DonorController, AIController
│   │   ├── service/        # DonorService (business logic)
│   │   ├── repository/     # DonorRepository (JPA queries)
│   │   ├── entity/         # Donor entity
│   │   └── BlooddonationApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── config/api.js   # API base URL config
│   │   ├── components/     # Navbar, Chatbot
│   │   ├── pages/          # Home, RegisterDonor, DonorList
│   │   ├── App.jsx
│   │   └── index.css       # Premium design system
│   └── package.json
│
└── backend/                # Node.js backend (alternative)
```

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/donors` | Register a new donor |
| GET | `/donors` | Get all donors |
| GET | `/donors/{id}` | Get donor by ID |
| GET | `/donors/blood/{group}` | Filter by blood group |
| GET | `/donors/city/{city}` | Filter by city |
| PUT | `/donors/{id}` | Update donor |
| DELETE | `/donors/{id}` | Delete donor |
| POST | `/ai/search` | AI Natural Language Search |
| POST | `/ai/chat` | AI Chatbot |
| POST | `/ai/alert` | Emergency Alert Generator |

## 💻 Local Setup

### 1. Backend (Spring Boot)
```bash
cd blooddonation
./mvnw spring-boot:run
```
The backend starts on **http://localhost:8082**. The Aiven cloud MySQL is already configured in `application.properties`.

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Opens on **http://localhost:5173**. The frontend connects to the Spring Boot backend automatically.

## 🌍 Deployment

### Backend → Render / Railway
1. Push to GitHub
2. Connect repo on Render → set root to `blooddonation`
3. Build: `./mvnw clean package -DskipTests`
4. Start: `java -jar target/blooddonation-0.0.1-SNAPSHOT.jar`
5. Set env vars for DB credentials

### Frontend → Vercel
1. Import repo on Vercel → set root to `frontend`
2. Framework: Vite
3. Update `src/config/api.js` with your deployed backend URL
4. Deploy!

## ✨ Features
- 🩸 **Donor CRUD** — Full create, read, update, delete operations
- 🔍 **Smart Filters** — Filter by blood group and/or city
- 🤖 **AI Search** — Natural language queries like "Find O+ in Hyderabad"
- 💬 **AI Chatbot** — Floating assistant on all pages
- 🚨 **Emergency Alerts** — Generate shareable emergency messages
- ✏️ **Inline Editing** — Edit donors directly from the list
- 🎨 **Premium UI** — Glassmorphism, animations, responsive design
