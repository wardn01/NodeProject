# 🌌 VISION - RPG Build Manager

**VISION** is a comprehensive Full-Stack web application designed for RPG enthusiasts. It allows players to create and manage unique character builds, customize vital statistics, and test their strength against challenging enemies across diverse realms like Shadow, Ice, and Sand.

---

## 👥 Contributors
* **Ward Nagar** - ID: 325523017
* **Mohammad Ryan** - ID: 327640835

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js (Vite), CSS Modules, Axios, React Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (Relational Database) |
| **Security** | Bcrypt (Password Hashing), Express-Session (Auth Management) |

---

## ✨ Key Features

* **Secure Authentication:** User registration and login protected by salt-hashed passwords using `Bcrypt`.
* **Profile Management:** A dedicated dashboard to update nicknames and passwords with real-time session updates.
* **Advanced Build Manager:** Create up to 5 unique builds per account, distributing points across HP, Attack, and Defense.
* **Ownership Verification:** Custom middleware ensures that users can only modify or delete builds they personally created.
* **Dynamic Enemy System:** A balanced combat environment featuring tiered difficulty levels and specific Bosses for each elemental stage.
* **Weaponry Arsenal:** Various weapons (e.g., Rusty Sword, Glacial Bow) that dynamically influence player stats and win probabilities.

---

## 🏗️ Project Architecture

The project follows the **MVC (Model-View-Controller)** pattern to ensure clean separation of concerns:

* **Controllers:** Handle the core business logic for users, builds, weapons, and enemies.
* **Middlewares:** Manage route protection (`checkAuth`), input sanitization (`sanitizeInput`), and limit enforcement (`checkBuildLimit`).
* **Routes:** Structured API endpoints organized by resource (User, Enemy, Build, Weapon).

---

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Configure your MySQL database using the provided schema
nodemon app.js