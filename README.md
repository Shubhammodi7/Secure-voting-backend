# Secure Voting System API 🗳️

A robust, production-ready Backend API for a digital voting platform built using the MERN stack (Node.js, Express, MongoDB). This system implements a secure, transparent, and high-integrity election process with strict business logic.

## 🚀 Project Overview
The core of this application is the backend logic. It manages user identities, verifies eligibility, prevents duplicate voting, and maintains a real-time tally of election results.

## 🛠️ Tech Stack
* **Server:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Security:** JSON Web Tokens (JWT) for session management & Bcrypt for password encryption

---

## 🏗️ System Architecture
The application is logically divided into three distinct modules to maintain a clean separation of concerns:

### 1. User Authentication & Profile (`/api/v1/user`)
Handles the onboarding and identity management of voters and administrators.
* **Aadhar Verification:** Uses a unique government ID (Aadhar Number) as the primary login credential.
* **Role-Based Access (RBAC):** Users are assigned either a `voter` or `admin` role.

### 2. Candidate Management (`/api/v1/candidate`)
A protected module reserved for administrators to maintain the election ballot.
* **CRUD Operations:** Create, Update, and Delete candidates.
* **Party Tracking:** Each candidate is associated with a specific political party.

### 3. Voting Logic (`/api/v1/vote`)
The engine that powers the election.
* **One Person, One Vote:** Implements a strict check on the `isVoted` flag to prevent duplicate entries.
* **Admin Restriction:** Business logic ensures that users with the `admin` role cannot cast votes.
* **Live Aggregation:** Uses MongoDB's sorting capabilities to provide a live, sorted leaderboard.

---

## 📡 API Reference

### User Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Register a new user | Public |
| `POST` | `/login` | Login with Aadhar/Password | Public |
| `GET` | `/profile` | Get current user's profile | Private |
| `PUT` | `/profile/password` | Update account password | Private |

### Candidate Routes (Admin Only)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/add` | Add a new candidate | Admin |
| `PUT` | `/:id` | Update candidate details | Admin |
| `DELETE` | `/:id` | Remove a candidate | Admin |

### Voting Routes
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Fetch all candidates | Private |
| `POST` | `/:candidateId` | Cast a vote for a candidate | Voter |
| `GET` | `/count` | Get sorted vote counts | Public |

---

## 🔒 Security Measures
* **Password Hashing:** Uses `bcrypt` with a salt factor to store passwords securely.
* **Middleware Protection:** Custom `jwtAuthMiddleware` ensures only authorized users can hit sensitive endpoints.
* **Admin Authorization:** A secondary `isAdmin` check prevents voters from modifying candidate data.

## 🏁 Setup Instructions
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Shubhammodi7/Secure-voting-backend.git
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the root directory and add:
    ```text
    PORT=2000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  **Run the Server:**
    ```bash
    node server.js
    ```

---

### Author
**Shubham Modi**
* GitHub: [@Shubhammodi7](https://github.com/Shubhammodi7)
