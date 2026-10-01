# ⚡ EV Charging Station

A full-stack **Electric Vehicle Charging Station Management and Booking System** designed to help EV users discover charging stations, view charger information, make bookings, manage vehicles, and track their bookings. The system also provides an **administrative dashboard** for managing users, charging stations, and bookings.

The application is built using **React.js** for the frontend, **FastAPI** for the backend, and **PostgreSQL** for data management. It also integrates real charging-station data and provides secure authentication with **OTP-based password recovery**.

---

## 📌 Table of Contents

* [Project Overview](#-project-overview)
* [Objectives](#-objectives)
* [Key Features](#-key-features)
* [System Users](#-system-users)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [User Workflow](#-user-workflow)
* [Admin Workflow](#-admin-workflow)
* [Authentication System](#-authentication-system)
* [Charging Station Management](#-charging-station-management)
* [Booking System](#-booking-system)
* [Vehicle Management](#-vehicle-management)
* [Profile Management](#-profile-management)
* [Theme and UI](#-theme-and-ui)
* [Database](#-database)
* [API Documentation](#-api-documentation)
* [Screenshots](#-screenshots)
* [Installation and Setup](#-installation-and-setup)
* [Environment Variables](#-environment-variables)
* [Running the Application](#-running-the-application)
* [Docker Setup](#-docker-setup)
* [Testing](#-testing)
* [Security](#-security)
* [Future Improvements](#-future-improvements)
* [Conclusion](#-conclusion)
* [Authors](#-authors)

---

# 📖 Project Overview

The **EV Charging Station** is a web-based platform developed to simplify the process of finding and booking electric vehicle charging stations.

As the number of electric vehicles increases, EV users need convenient ways to locate available charging stations and reserve charging slots. This project provides a centralized platform where users can:

* Create an account
* Log in securely
* Manage their profile
* Register their vehicles
* Find charging stations
* View station and charger information
* Book charging slots
* View booking history
* Cancel eligible bookings
* Automatically complete expired bookings
* Reset forgotten passwords using OTP verification

Administrators can manage the platform through a dedicated dashboard.

---

# 🎯 Objectives

The main objectives of this project are:

1. To develop a centralized platform for EV charging station discovery.
2. To allow users to book charging stations conveniently.
3. To provide secure user authentication.
4. To implement OTP-based password recovery.
5. To allow users to manage their vehicles.
6. To provide users with booking history and status information.
7. To provide administrators with tools to manage users, stations, and bookings.
8. To integrate real charging station information.
9. To provide responsive and user-friendly interfaces.
10. To support both light and dark themes.

---

# 🚀 Key Features

## 👤 User Features

* User registration
* User login/logout
* JWT-based authentication
* Profile management
* Vehicle management
* Charging station browsing
* Station details
* Charger information
* Charging slot booking
* Booking history
* Booking cancellation
* Automatic booking completion
* Forgot password
* OTP verification
* Password reset
* Light/dark mode
* Responsive UI

---

## 🛠️ Admin Features

Administrators have access to a dedicated dashboard with:

* Dashboard statistics
* User management
* User activation/deactivation
* Charging station management
* Booking management
* Booking status monitoring
* Station information
* Administrative navigation

---

# 👥 System Users

The system contains two main types of users.

### Regular User

A regular user can:

* Register an account
* Log in
* Manage their profile
* Add vehicles
* View charging stations
* Make bookings
* View bookings
* Cancel eligible bookings
* Reset their password

### Administrator

An administrator can:

* Access the admin dashboard
* View users
* Activate/deactivate users
* View charging stations
* View bookings
* Monitor system statistics

---

# 🧰 Technology Stack

## Frontend

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | Frontend application          |
| Vite         | Development and build tool    |
| React Router | Client-side routing           |
| Axios        | API communication             |
| CSS3         | Styling and responsive design |

## Backend

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| Python         | Backend programming language |
| FastAPI        | REST API framework           |
| SQLAlchemy     | ORM                          |
| PostgreSQL     | Relational database          |
| JWT            | Authentication               |
| Passlib/Bcrypt | Password hashing             |
| SMTP           | OTP email delivery           |

## External Services

| Service         | Purpose                     |
| --------------- | --------------------------- |
| Open Charge Map | Charging station data       |
| Gmail SMTP      | Password reset OTP delivery |

## Development and Deployment

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| Git            | Version control            |
| GitHub         | Source code hosting        |
| Docker         | Containerization           |
| Docker Compose | Multi-container management |

---

# 🏗️ System Architecture

The application follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │       User           │
                    │   Web Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       + Vite         │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    │                      │
                    │ Authentication       │
                    │ Users                │
                    │ Vehicles             │
                    │ Stations             │
                    │ Bookings             │
                    │ Admin                │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │      Database        │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   External Services  │
                    │                      │
                    │ Open Charge Map       │
                    │ Gmail SMTP           │
                    └──────────────────────┘
```

---

# 📂 Project Structure

A simplified project structure is shown below:

```text
EV Charging Station/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── email.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── vehicle.py
│   │   │   ├── station.py
│   │   │   └── booking.py
│   │   │
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── vehicles.py
│   │   │   ├── stations.py
│   │   │   ├── bookings.py
│   │   │   └── admin.py
│   │   │
│   │   ├── schemas/
│   │   │   └── auth.py
│   │   │
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── .env
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── public/
│   │   │   └── user/
│   │   │
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── images/
│       ├── landing-page.png
│       ├── login.png
│       ├── register.png
│       ├── forgot-password.png
│       ├── otp.png
│       ├── reset-password.png
│       ├── user-dashboard.png
│       ├── stations.png
│       ├── station-details.png
│       ├── booking.png
│       ├── my-bookings.png
│       ├── profile.png
│       ├── vehicles.png
│       ├── admin-dashboard.png
│       ├── admin-users.png
│       ├── admin-stations.png
│       └── admin-bookings.png
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# 🔄 User Workflow

The general user workflow is:

```text
Register
   │
   ▼
Login
   │
   ▼
User Dashboard
   │
   ├──────► Manage Profile
   │
   ├──────► Manage Vehicles
   │
   ├──────► Find Stations
   │             │
   │             ▼
   │       Station Details
   │             │
   │             ▼
   │          Booking
   │             │
   │             ▼
   │       My Bookings
   │
   └──────► Logout
```

---

# 🔐 Authentication System

The application uses secure authentication for user accounts.

## Registration

Users provide the required information to create an account.

Typical registration information includes:

* Full name
* Email
* Phone number
* Password

Passwords are not stored as plain text. They are hashed before being stored in the database.

### Registration Screenshot

![Register](docs/images/register.png)

---

## Login

Registered users can log in using their email and password.

After successful authentication, the backend provides an authentication token that is used to access protected resources.

### Login Screenshot

![Login](docs/images/login.png)

---

# 🔑 Forgot Password and OTP

The project implements an **OTP-based password reset system**.

The process is:

```text
Forgot Password
       │
       ▼
Enter Email
       │
       ▼
OTP Generated
       │
       ▼
OTP Sent Through Email
       │
       ▼
Enter OTP
       │
       ▼
Enter New Password
       │
       ▼
Password Updated
       │
       ▼
Login
```

The OTP:

* Is generated randomly
* Is sent through email
* Has a limited validity period
* Is stored securely as a hash
* Is removed after successful password reset

### Forgot Password

![Forgot Password](docs/images/forgot-password.png)

### OTP Verification

![OTP Verification](docs/images/otp.png)


---

# ⚡ Charging Station Management

The platform allows users to browse available EV charging stations.

Station information can include:

* Station name
* Location
* Address
* Charging information
* Charger details
* Availability information

The backend can synchronize station information from **Open Charge Map**.

### Charging Stations

![Charging Stations](docs/images/stations.png)

---

# 📍 Station Details

Users can select a charging station to view more detailed information before making a booking.

### Station Details

![Station Details](docs/images/station-details.png)

---

# 📅 Booking System

Users can book charging stations through the platform.

The booking system manages:

* User
* Vehicle
* Charging station
* Booking date
* Start time
* End time
* Booking status

A typical booking lifecycle is:

```text
Pending/Confirmed
       │
       ├──────► Cancelled
       │
       └──────► Completed
```

Bookings that have already started cannot be cancelled.

After the booking period has passed, the system can automatically update the booking status to completed.

### Booking

![Booking](docs/images/booking.png)

---

# 📋 My Bookings

Users can view their booking history from the **My Bookings** section.

The page displays booking information and its current status.

Possible statuses include:

* Confirmed
* Cancelled
* Completed

### My Bookings

![My Bookings](docs/images/my-bookings.png)

---

# 🚗 Vehicle Management

Users can manage the vehicles associated with their accounts.

Vehicle information can be used when creating charging reservations.

Users can:

* Add a vehicle
* View vehicle information
* Update vehicle information
* Manage registered vehicles

### Vehicles

![Vehicles](docs/images/vehicles.png)

---

# 👤 Profile Management

Users can manage their personal profile information.

The profile section provides:

* Personal information
* Email information
* Account role
* Account status
* Profile update functionality

### Profile

![Profile](docs/images/profile.png)

---

# 🖥️ User Dashboard

The user dashboard acts as the main interface after login.

It provides access to:

* Charging stations
* Bookings
* Vehicles
* Profile
* Other user-related functionality

### User Dashboard

![User Dashboard](docs/images/user-dashboard.png)

---

# 🛠️ Admin Dashboard

The administrator has access to a separate dashboard.

The dashboard provides an overview of the system and management functions.

### Admin Dashboard

![Admin Dashboard](docs/images/admin-dashboard.png)

---

# 👥 Admin User Management

Administrators can view registered users and manage their account status.

The system supports user activation and deactivation.

### Admin Users

![Admin Users](docs/images/admin-users.png)

---

# ⚡ Admin Station Management

Administrators can view and manage charging station information through the administrative interface.

### Admin Stations

![Admin Stations](docs/images/admin-stations.png)

---

# 📅 Admin Booking Management

Administrators can monitor bookings across the platform.

This provides an overview of:

* Users
* Stations
* Booking status
* Booking information

### Admin Bookings

![Admin Bookings](docs/images/admin-bookings.png)

---

# 🎨 Theme and UI

The application supports both **light mode and dark mode**.

The theme is implemented using centralized CSS variables.

For example:

```css
:root {
    --color-primary: #16a34a;
    --bg-primary: #ffffff;
    --bg-card: #ffffff;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --border-color: #e5e7eb;
}

[data-theme="dark"] {
    --color-primary: #4ade80;
    --bg-primary: #0f172a;
    --bg-card: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --border-color: #334155;
}
```

This allows the interface to automatically adapt between light and dark themes while maintaining consistent colors and components.

---

# 🗄️ Database

The project uses **PostgreSQL** as its primary relational database.

Important entities include:

```text
Users
  │
  ├────────────── Vehicles
  │
  └────────────── Bookings
                       │
                       └──────── Charging Stations
```

## Main Tables

### Users

Stores user account information.

Example fields:

```text
id
full_name
email
password_hash
phone
role
is_active
created_at
password_reset_otp_hash
password_reset_otp_expires_at
```

### Vehicles

Stores vehicles registered by users.

### Charging Stations

Stores charging station information and charger details.

### Bookings

Stores charging reservations and their statuses.

---

# 🔌 API Documentation

The FastAPI backend provides RESTful APIs for frontend communication.

When the backend is running locally, FastAPI provides interactive API documentation.

## Swagger UI

```text
http://127.0.0.1:8000/docs
```

## ReDoc

```text
http://127.0.0.1:8000/redoc
```

The API documentation can be used to:

* View endpoints
* Inspect request parameters
* Test APIs
* Review response structures
* Test authentication-protected endpoints

---

# 📦 Installation and Setup

## Prerequisites

Install the following software before running the project:

* Git
* Python 3.x
* Node.js
* npm
* PostgreSQL
* Docker Desktop (optional)

---

# 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd "EV Charging Station"
```

Replace the repository URL with your actual GitHub repository URL.

---

# 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

# 3. Backend Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5433/ev_charging

SECRET_KEY=your_secret_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
```

> **Important:** Never commit your actual `.env` file or Gmail App Password to GitHub.

---

# 4. Start the Backend

From the `backend` directory:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 5. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Environment variables are used to keep sensitive configuration outside the source code.

Example `.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5433/ev_charging

SECRET_KEY=your-secret-key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

The `.env` file should be included in `.gitignore`.

A safe `.env.example` can be committed instead:

```env
DATABASE_URL=
SECRET_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_FROM=
```

---

# 🐳 Docker Setup

Docker can be used to run the PostgreSQL database in a containerized environment.

Example:

```bash
docker compose up -d
```

To check running containers:

```bash
docker ps
```

To stop the containers:

```bash
docker compose down
```

To stop containers while preserving database volumes:

```bash
docker compose down
```

The PostgreSQL database is stored using a Docker volume so that database data can persist between container restarts.

---

# 🧪 Testing

The application should be tested across the major workflows.

## Authentication Testing

* [x] User registration
* [x] User login
* [x] Logout
* [x] Forgot password
* [x] OTP email
* [x] OTP expiration
* [x] Resend OTP
* [x] Password reset
* [x] Login using new password

## User Testing

* [x] Profile viewing
* [x] Profile updating
* [x] Vehicle creation
* [x] Vehicle management
* [x] Station browsing
* [x] Station details
* [x] Booking creation
* [x] Booking viewing
* [x] Booking cancellation
* [x] Booking completion

## Admin Testing

* [x] Admin authentication
* [x] Admin dashboard
* [x] User management
* [x] User activation/deactivation
* [x] Station management
* [x] Booking monitoring

## UI Testing

* [x] Light mode
* [x] Dark mode
* [x] Responsive layout
* [x] Mobile layout
* [x] Form validation
* [x] Loading states
* [x] Error messages

---

# 🔒 Security

Security is an important part of the application.

The project implements several security mechanisms.

### Password Hashing

User passwords are stored as password hashes rather than plain-text passwords.

### JWT Authentication

Protected API endpoints require valid authentication.

### Role-Based Access

Administrative functionality is restricted to users with administrative privileges.

### OTP Security

Password-reset OTPs:

* Are randomly generated
* Are time-limited
* Are stored as hashes
* Are cleared after successful password reset

### Environment Variables

Sensitive credentials such as database passwords and SMTP credentials are stored in environment variables.

### User Data Protection

Users are restricted from accessing resources belonging to other users.

---

# 🌐 External Data Integration

The application integrates external charging station information using **Open Charge Map**.

The backend can synchronize external charging station information into the local database.

This allows the application to maintain charging station data while still providing a local database for application-specific operations such as bookings.

---

# 🔄 Booking Lifecycle

The booking lifecycle can be represented as:

```text
             ┌─────────────┐
             │   Booking   │
             │  Confirmed  │
             └──────┬──────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   ┌─────────────┐     ┌─────────────┐
   │  Cancelled  │     │  Completed  │
   └─────────────┘     └─────────────┘
```

A booking can be cancelled while it is eligible for cancellation.

Once the booking has started, cancellation is not permitted.

After the booking period has passed, the booking can be marked as completed.

---

# 📱 Responsive Design

The frontend is designed to support different screen sizes.

The interface adapts to:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive CSS media queries are used throughout the application.

---

# 🖼️ Screenshots

## Landing Page

![Landing Page](docs/images/landing-page.png)

---

## Login

![Login](docs/images/login.png)

---

## Register

![Register](docs/images/register.png)

---

## Forgot Password

![Forgot Password](docs/images/forgot-password.png)

---

## OTP Verification

![OTP Verification](docs/images/otp.png)

---

## Reset Password

![Reset Password](docs/images/reset-password.png)

---

## User Dashboard

![User Dashboard](docs/images/user-dashboard.png)

---

## Charging Stations

![Charging Stations](docs/images/stations.png)

---

## Station Details

![Station Details](docs/images/station-details.png)

---

## Booking

![Booking](docs/images/booking.png)

---

## My Bookings

![My Bookings](docs/images/my-bookings.png)

---

## Vehicles

![Vehicles](docs/images/vehicles.png)

---

## Profile

![Profile](docs/images/profile.png)

---

## Admin Dashboard

![Admin Dashboard](docs/images/admin-dashboard.png)

---

## Admin Users

![Admin Users](docs/images/admin-users.png)

---

## Admin Stations

![Admin Stations](docs/images/admin-stations.png)

---

## Admin Bookings

![Admin Bookings](docs/images/admin-bookings.png)

---

# 🚧 Future Improvements

Although the current application provides the core functionality required for an EV charging station management system, several improvements can be implemented in future versions.

### 💳 Online Payment

Integrate online payment gateways to allow users to pay for charging sessions.

### 📍 Interactive Maps

Integrate map services to display charging stations visually and provide navigation.

### 🔔 Real-Time Notifications

Implement real-time notifications for:

* Booking confirmation
* Booking cancellation
* Booking completion
* Station availability
* Other important events

### 📊 Advanced Analytics

Provide administrators with:

* Revenue analytics
* Booking trends
* Station utilization
* User activity
* Popular charging locations

### 📱 Mobile Application

Develop dedicated Android and iOS applications for EV users.

### ⚡ Real-Time Charger Availability

Integrate with charging-station hardware or compatible APIs to display real-time charger availability.

### 🤖 Smart Recommendations

Future versions could recommend charging stations based on:

* User location
* Vehicle type
* Charging requirements
* Station availability
* Previous booking behavior

---

# 📈 Possible Future Architecture

```text
                     ┌───────────────────────┐
                     │   Web / Mobile App    │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │      API Gateway      │
                     └───────────┬───────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        Authentication       Booking Service    Station Service
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │      PostgreSQL       │
                     └───────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
             External APIs               Notifications
```

---

# 🧑‍💻 Development Workflow

The project follows a typical full-stack development workflow:

```text
Requirement Analysis
        │
        ▼
UI/UX Design
        │
        ▼
Frontend Development
        │
        ▼
Backend API Development
        │
        ▼
Database Integration
        │
        ▼
Authentication
        │
        ▼
Booking System
        │
        ▼
Admin Dashboard
        │
        ▼
Testing
        │
        ▼
Dockerization
        │
        ▼
Documentation
        │
        ▼
Deployment
```

---

# 📚 Learning Outcomes

Through the development of this project, the development team gained practical experience in:

* React.js development
* FastAPI development
* REST API design
* PostgreSQL database management
* SQLAlchemy ORM
* JWT authentication
* Password hashing
* OTP-based authentication workflows
* Email integration
* CRUD operations
* Role-based authorization
* API integration
* External data synchronization
* Docker
* Git and GitHub
* Responsive web design
* Dark/light theme implementation
* Full-stack application development

---

# 📄 License

This project was developed as an academic/project-based application.

If you intend to reuse, modify, or distribute this project, please follow the licensing terms specified by the repository owner.

---

# 👨‍💻 Authors

**EV Charging Station Development Team**

Developed as a full-stack software engineering project.

### Technologies Used

```text
React.js
FastAPI
Python
PostgreSQL
SQLAlchemy
JWT
Docker
Git
GitHub
Open Charge Map API
SMTP
```

---

# ⭐ Project Summary

The **EV Charging Station** project provides a complete web-based solution for managing electric vehicle charging station discovery and reservations.

The platform combines:

* 🔐 Secure authentication
* 📧 OTP-based password recovery
* 👤 Profile management
* 🚗 Vehicle management
* ⚡ Charging station discovery
* 📍 Station information
* 📅 Charging reservations
* 📋 Booking management
* 🛠️ Administrative management
* 🌙 Dark/light theme
* 🗄️ PostgreSQL database
* 🐳 Docker support
* 🔌 External charging station data

The project demonstrates the development of a complete full-stack application from frontend design and backend API development to database integration, authentication, external API integration, testing, and deployment preparation.
