# 🏥 HealthPoint (Year: 2026)

## 📌 About the Project

**HealthPoint** is a smart healthcare platform designed to help users manage their medical information, connect with doctors, and receive support during medical emergencies.

The system provides secure medical profile management, doctor collaboration, emergency contact management, and focuses on improving emergency readiness while maintaining medical data privacy and security.

## ✨ Key Features

### 🔐 1. User Management Module

- User registration and login.
- Secure user profile creation.
- Emergency contact management.
- Role-based access for User, Doctor, and Admin.

### 👨‍⚕️ 2. Doctor Collaboration Module

- Secure access to patient medical history.
- Prescription review and clarification.
- Emergency consultation support.
- Medical risk discussion between doctors and patients.

### 🩺 3. Medical Profile & Emergency Readiness

- Blood group and allergy information.
- Chronic disease records.
- Ongoing medication details.
- Family doctor information.

### 🛡️ 4. Security & Privacy Module

- Secure data access control.
- Medical data confidentiality.
- Role-based information visibility.
- Emergency-only medical data access.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Backend | Java, Spring Boot |
| Database | MySQL |
| ORM | Spring Data JPA / Hibernate |
| API | REST APIs |
| Frontend | React.js |
| Tools | Git, GitHub, Postman, Maven |

## 👨‍💻 My Role & Responsibilities

**Role: Backend Developer**

- Developed backend functionality using Java and Spring Boot.
- Designed REST APIs for user and doctor management.
- Implemented user authentication and role-based authorization.
- Designed database entities and relationships using Spring Data JPA and Hibernate.
- Developed medical profile and emergency contact management functionality.
- Worked on secure access to patient medical information.

## 📂 Project Structure

```text
HealthPoint/
├── HealthPointFrontend/
│   ├── src/
│   └── package.json
│
├── HealthPointBackend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mdjaved2004/HealthPoint.git
cd HealthPoint
```

### 2. Run the Backend

Navigate to the backend directory:

```bash
cd HealthPointBackend
```

Configure your MySQL database credentials in `src/main/resources/application.properties`.

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

### 3. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd HealthPointFrontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

## 🎯 Expected Outcomes

- Centralized and secure medical information management.
- Improved communication between patients and doctors.
- Better emergency preparedness through accessible medical records.
- Secure sharing of patient information with authorized doctors.
- Improved healthcare accessibility and user experience.

## 🚀 Future Scope

- AI-based emergency suggestions.
- Offline access to essential medical information.
- SMS alerts to registered emergency contacts.
- Doctor approval workflow for patient information access.
