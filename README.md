# BloodLink: Blood Donation Management System 🩸

A high-performance, full-stack web application designed to connect blood donors with those in emergency need. Built with a modern distributed architecture and a premium medical-grade UI.

## 🌐 Live Demo
- **Frontend:** [https://blood-donation-sage.vercel.app](https://blood-donation-sage.vercel.app)
- **Backend API:** [https://blooddonation-backend-wvpe.onrender.com](https://blooddonation-backend-wvpe.onrender.com)

---

## 🚀 Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS (Custom Design System), Axios |
| **Backend** | Spring Boot 3.3.5, Spring Data JPA, Java 17 |
| **Database** | PostgreSQL (Supabase Cloud - Sydney Region) |
| **Auth** | Native Role-Based Auth (Admin/Donor) |
| **Deployment** | Docker (Render), Vercel |

---

## ✨ Key Features
- 🩸 **Donor Registration:** Seamless onboarding with blood group and city validation.
- 🆘 **Emergency Request Help:** One-click modal to request immediate aid from specific donors.
- 🤖 **AI Chatbot:** Intelligent FAQ assistant integrated directly into the dashboard.
- 👤 **User Profiles:** Personalized dashboards for donors to manage their availability.
- 🛡️ **Admin Control Plane:** Statistics aggregation and donor database management.
- 🎨 **Premium UI:** Responsive Glassmorphism design with medical-grade aesthetics.

---

## 📁 Project Structure
```text
blooddonation/
├── blooddonation/          # Spring Boot Backend
│   ├── Dockerfile          # Production Build Config
│   ├── src/main/java/      # Controller, Service, Repository, Entity
│   └── src/main/resources/ # application.properties (Cloud Config)
└── frontend/               # React Frontend
    ├── src/
    │   ├── pages/          # Home, Admin, Profile, DonorList
    │   ├── components/     # Navbar, Chatbot, ProtectedRoute
    │   └── index.css       # Global Design Tokens & Media Queries
```

---

## 💻 Local Setup

### 1. Backend (Spring Boot)
```bash
cd blooddonation
./mvnw spring-boot:run
```
*Starts on [http://localhost:8080](http://localhost:8080). Connected to Supabase Cloud.*

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*Starts on [http://localhost:5173](http://localhost:5173).*

---

## 🌍 Deployment Summary
- **Backend:** Deployed via **Docker** on **Render**. Automatic builds via GitHub.
- **Frontend:** Deployed on **Vercel** with `VITE_API_URL` environment variable pointing to Render.
- **Database:** Hosted on **Supabase** using the Transaction Pooler (Port 6543) for high concurrency.

---

---

## 🔮 Future Enhancements
- 📱 **SMS/WhatsApp Alerts:** Automated notifications for emergency blood requests.
- 📍 **Map Integration:** Visualize donor locations using Google Maps API.
- 🏆 **Donor Rewards:** A badge/point system to encourage frequent donations.
- 🗓️ **Donation History:** Track and maintain records of past donations for each user.

**Developed with ❤️ for the Blood Donation Community.**
